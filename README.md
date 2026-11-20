# Expansión Live

Web de la agencia de influencers Expansión Live (Perú). Astro + GSAP + Lenis.

```
npm install   # primera vez
npm run dev   # desarrollo
npm run build # producción en /dist
```

## Pendiente de la agencia
- Datos de contacto reales en `src/data/site.ts` (`contact`): WhatsApp con prefijo de Perú (`51…`), correo, teléfono y redes. Mientras estén vacíos no se muestran y el botón flotante lleva al formulario.
- Destino del formulario: crea `.env` con `PUBLIC_FORM_ENDPOINT=https://…`. Sin él, el formulario avisa de que no puede enviar.
- Talentos reales y los beneficios definitivos. Los podcasts ya tienen nombre: "En otro plano" (terror, con invitados) y "No lo oíste de mí" (farándula y actualidad).
- Logo oficial (el actual es una marca tipográfica provisional) y fotos propias: las de `public/images/` son de stock de Unsplash.
- Política de privacidad: el formulario recoge datos personales.

Para trabajar con la agencia hay que ser mayor de 18 años y firmar un contrato; ese requisito está en el formulario.
