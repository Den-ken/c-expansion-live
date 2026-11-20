import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));

/* ---------- Menú móvil ---------- */
const burger = $('.burger');
const menu = $('#menu');
const closeMenu = () => { menu?.classList.remove('open'); burger?.setAttribute('aria-expanded', 'false'); };
burger?.addEventListener('click', () => {
  const open = menu!.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu?.classList.contains('open')) { closeMenu(); (burger as HTMLElement | null)?.focus(); }
});

/* ---------- Scroll suave ---------- */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.14 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href')!;
    const target = id === '#top' ? document.body : $(id);
    if (!target) return;
    e.preventDefault();
    closeMenu();
    if (lenis) lenis.scrollTo(target as HTMLElement, { offset: 0 });
    else target.scrollIntoView();
  })
);

/* ---------- Titulares divididos en palabras ---------- */
function splitWords(el: HTMLElement) {
  const frag = document.createDocumentFragment();
  const wrap = (node: Node) => {
    const w = document.createElement('span'); w.className = 'w';
    const i = document.createElement('span'); i.appendChild(node); w.appendChild(i);
    return w;
  };
  Array.from(el.childNodes).forEach((n) => {
    if (n.nodeType === 3) {
      (n.textContent || '').split(/(\s+)/).forEach((p) => {
        if (!p) return;
        if (/^\s+$/.test(p)) frag.appendChild(document.createTextNode(' '));
        else frag.appendChild(wrap(document.createTextNode(p)));
      });
    } else frag.appendChild(wrap(n));
  });
  el.replaceChildren(frag);
}
$$('[data-split]').forEach(splitWords);

/* ---------- Entrada del hero ---------- */
function heroIn() {
  if (reduce) { gsap.set('[data-hero-in]', { opacity: 1 }); return; }
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.from('.hero h1 .ln:not(.hl) > span', { yPercent: 110, duration: 1.2, stagger: 0.12 }, 0.1)
    .from('.hero h1 .hl > span', { y: 40, opacity: 0, rotate: -5, duration: 1, ease: 'back.out(1.6)' }, 0.5)
    .from('[data-hero-in]', { opacity: 0, y: 16, duration: 0.9, stagger: 0.1 }, 0.4)
    .from('.wall .wrow', { opacity: 0, x: (i) => (i % 2 ? -160 : 160), duration: 1.6, stagger: 0.15 }, 0.1);
}

/* ---------- Revelados al hacer scroll ---------- */
function scrollAnims() {
  if (reduce) return;
  $$('[data-split]').forEach((h) => {
    gsap.from($$('.w > span', h), { yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.06, scrollTrigger: { trigger: h, start: 'top 85%' } });
  });
  $$('[data-reveal]').forEach((el, i) => {
    gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: (i % 3) * 0.05, scrollTrigger: { trigger: el, start: 'top 90%' } });
  });
  $$('.card').forEach((c, i) => gsap.from(c, { opacity: 0, y: 60, duration: 1, delay: (i % 4) * 0.06, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 94%' } }));
}

/* ---------- Caminos: el botón de postular hereda el interés ---------- */
const form = $<HTMLFormElement>('#postula-form');

/* ---------- Formulario de postulación ---------- */
form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = $('#fstatus')!;
  let ok = true;
  $$<HTMLInputElement>('input[required], select[required], textarea[required]', form).forEach((f) => {
    const box = f.closest('.f')!;
    const err = $('.err', box)!;
    let msg = '';
    if (f.type === 'checkbox') { if (!f.checked) msg = 'Debes confirmar que eres mayor de 18 años.'; }
    else if (!f.value.trim()) msg = 'Este campo es obligatorio.';
    else if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value)) msg = 'Introduce un correo válido.';
    err.textContent = msg;
    box.classList.toggle('bad', !!msg);
    f.setAttribute('aria-invalid', String(!!msg));
    if (msg) ok = false;
  });
  if (!ok) { status.textContent = 'Revisa los campos marcados.'; $('.bad input, .bad select, .bad textarea', form)?.focus(); return; }
  const endpoint = form.dataset.endpoint;
  if (!endpoint) {
    // Sin destino configurado no se envía nada: se dice con claridad para no dar una falsa confirmación.
    if (import.meta.env.DEV) console.warn('[formulario] Falta PUBLIC_FORM_ENDPOINT en .env: la postulación no se envió.');
    status.textContent = 'Todavía no podemos recibir postulaciones desde este formulario. No se ha enviado nada; vuelve a intentarlo pronto.';
    return;
  }
  try {
    const r = await fetch(endpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
    if (!r.ok) throw new Error();
    status.textContent = 'Gracias. Recibimos tu postulación y te contactaremos pronto.';
    form.reset();
  } catch { status.textContent = 'No se pudo enviar. Inténtalo de nuevo más tarde.'; }
});

/* ---------- Menú: marca la sección visible ---------- */
const navLinks = $$<HTMLAnchorElement>('#menu a[href^="#"]');
const spy = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const id = '#' + e.target.id;
    navLinks.forEach((a) => (a.getAttribute('href') === id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
  }),
  { rootMargin: '-45% 0px -50% 0px' }
);
$$('main > section[id]').forEach((s) => spy.observe(s));

/* ---------- Barra: fondo sólido al desplazarse ---------- */
const navEl = $('.nav');
const onScroll = () => navEl?.classList.toggle('solid', window.scrollY > 80);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Arranque ---------- */
heroIn();
scrollAnims();
ScrollTrigger.refresh();
if (reduce) $$('[data-reveal]').forEach((e) => ((e as HTMLElement).style.opacity = '1'));
