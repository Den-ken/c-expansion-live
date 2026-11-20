// Contenido de Expansión Live. Solo se afirma lo que la agencia ha confirmado:
// agencia de influencers en Perú · forma y representa a sus talentos · bailes en vivo, transmisiones,
// podcasts ("En otro plano", de terror con invitados, y "No lo oíste de mí", de farándula y actualidad), risas y shows con el público por redes ·
// todos los talentos son mayores de 18 y firman contrato.
// Cualquier dato nuevo (talentos, nombres de podcasts, cifras, pagos) se añade solo cuando la agencia lo entregue.

export const contact = {
  email: '',
  phone: '',
  whatsapp: '', // solo dígitos con prefijo de Perú, p. ej. '51999999999'
  social: [] as { label: string; url: string }[], // p. ej. { label: 'TikTok', url: 'https://tiktok.com/@...' }
};

export const ticker = ['Bailes en vivo', 'Transmisiones', 'Podcast de terror', 'Farándula y actualidad', 'Risas', 'Shows con el público'];

export const activities = [
  { n: '01', title: 'Bailes en vivo', text: 'Baila en directo y conecta con tu público en tiempo real.', image: `${import.meta.env.BASE_URL}images/dance.jpg`, pos: '50% 48%', size: 'a' },
  { n: '02', title: 'Transmisiones', text: 'Directos por redes sociales donde tu comunidad participa.', image: `${import.meta.env.BASE_URL}images/stream-desk.jpg`, pos: '70% 50%', size: 'b' },
  { n: '03', title: 'Podcasts', text: 'Dos formatos: uno de terror con invitados y otro de farándula y actualidad.', image: `${import.meta.env.BASE_URL}images/pod-mic.jpg`, pos: '70% 50%', size: 'c' },
  { n: '04', title: 'Risas y shows con el público', text: 'Humor y shows donde el público es parte de la experiencia.', image: `${import.meta.env.BASE_URL}images/red-lights.jpg`, pos: '50% 35%', size: 'd' },
];

export const podcasts = [
  { id: 'terror', tag: 'Terror · Con invitados', title: 'En otro plano', text: 'Podcast de terror con invitados.' },
  { id: 'farandula', tag: 'Farándula y actualidad', title: 'No lo oíste de mí', text: 'Podcast de farándula y actualidad.' },
];

// Beneficios derivados de lo confirmado. Confirmar y ampliar con los beneficios reales de la agencia.
export const benefits = [
  { n: '01', t: 'Te formamos', d: 'Te preparamos para convertirte en influencer.' },
  { n: '02', t: 'Te representamos', d: 'Somos tus representantes: trabajamos para que te conozcan.' },
  { n: '03', t: 'Contrato claro', d: 'Trabajamos bajo contrato firmado, desde el primer día.' },
  { n: '04', t: 'Dónde brillar', d: 'Bailes en vivo, transmisiones, podcasts, risas y shows con el público.' },
  { n: '05', t: 'Un público real', d: 'Shows y directos por redes sociales para llegar a más personas.' },
];

export const steps = [
  { n: '01', t: 'Postula', d: 'Llena el formulario con tus datos y tu red principal.' },
  { n: '02', t: 'Te contactamos', d: 'Nos ponemos en contacto contigo.' },
  { n: '03', t: 'Firmas contrato', d: 'Todos los talentos firman un contrato con la agencia.' },
];
