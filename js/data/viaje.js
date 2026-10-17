/* Itinerario, checklist, recomendaciones y contactos.
   Todas las horas son de la Ciudad de México (UTC−6, sin horario de verano). */
window.GUIA = window.GUIA || {};

GUIA.viaje = {
  titulo: "Viaje a la Ciudad de México",
  fechas: "17 – 19 de octubre 2026",
  llegada: "2026-10-17T07:30",   // inicio de la cuenta regresiva
  fin: "2026-10-19T01:00",
  zona: "America/Mexico_City",
  offset: "-06:00"
};

/* Cada actividad: ini / fin en "AAAA-MM-DDTHH:MM". lugar = ficha a abrir (lugares o cercanos). */
GUIA.itinerario = [
  { id: "vie", corto: "Vie 16", titulo: "Viernes 16 de octubre", sub: "Salida nocturna", items: [
    { ini: "2026-10-16T22:00", fin: "2026-10-17T07:30", icono: "🚌", titulo: "Salida desde Guadalajara", aprox: true,
      desc: "Viaje nocturno en autobús. La hora exacta de salida la confirma el guía. Lleven cobija o abrigo, almohada y audífonos." }
  ]},
  { id: "sab", corto: "Sáb 17", titulo: "Sábado 17 de octubre", sub: "Basílica · Xochimilco · Centro", items: [
    { ini: "2026-10-17T07:30", fin: "2026-10-17T11:15", icono: "⛪", titulo: "Basílica de Guadalupe", lugar: "basilica", aprox: true,
      dur: "3:30 a 4:00 h libres", desc: "Tiempo libre para desayunar, ir a misa o comprar recuerdos. Acuerden la hora de regreso al autobús." },
    { ini: "2026-10-17T11:15", fin: "2026-10-17T12:15", icono: "🚌", titulo: "Traslado a Xochimilco", aprox: true,
      desc: "≈ 1 h según el tráfico (unos 25 km al sur)." },
    { ini: "2026-10-17T12:15", fin: "2026-10-17T14:15", icono: "🛶", titulo: "Paseo en trajinera por Xochimilco", lugar: "xochimilco", aprox: true,
      dur: "≈ 2 h", desc: "Recorrido por los canales con mariachis, antojitos y chinampas." },
    { ini: "2026-10-17T14:15", fin: "2026-10-17T15:30", icono: "🏨", titulo: "Traslado al Hotel San Francisco", lugar: "hotel", aprox: true,
      desc: "Centro Histórico, a media cuadra de la Alameda. Check-in a partir de las 15:00. **Aviso:** el Desfile de Alebrijes (12:00, por 5 de Mayo y Av. Juárez) puede cerrar calles junto al hotel; el autobús quizá los deje a unas cuadras." },
    { ini: "2026-10-17T15:30", fin: "2026-10-18T00:00", icono: "✨", titulo: "Tarde y noche libres", lugar: "cerca", aprox: true,
      desc: "Bellas Artes, Madero, Zócalo (con la Feria del Libro), cena en el Centro. Vean la ruta a pie sugerida y el mapa; si llueve, el **Plan B** tiene una ruta techada." }
  ]},
  { id: "dom", corto: "Dom 18", titulo: "Domingo 18 de octubre", sub: "Chapultepec · Teotihuacán · Regreso", items: [
    { ini: "2026-10-18T08:00", fin: "2026-10-18T08:30", icono: "🚌", titulo: "Salida del hotel",
      desc: "Puntuales: 08:00. Desayunen antes o planeen hacerlo en Chapultepec (el castillo abre a las 9:00)." },
    { ini: "2026-10-18T08:30", fin: "2026-10-18T11:30", icono: "🏰", titulo: "Castillo de Chapultepec y desayuno", lugar: "chapultepec", aprox: true,
      dur: "≈ 3 h", desc: "Domingo: entrada libre para mexicanos con INE. Desayuno y visita al Museo Nacional de Historia." },
    { ini: "2026-10-18T11:30", fin: "2026-10-18T12:45", icono: "🚌", titulo: "Traslado a Teotihuacán", aprox: true,
      desc: "≈ 1 h 15 min (unos 50 km al noreste)." },
    { ini: "2026-10-18T12:45", fin: "2026-10-18T14:45", icono: "🔺", titulo: "Zona Arqueológica de Teotihuacán", lugar: "teotihuacan", aprox: true,
      dur: "≈ 2 h", desc: "Calzada de los Muertos, Pirámides del Sol y de la Luna (no se suben). Domingo gratis para nacionales con INE." },
    { ini: "2026-10-18T14:45", fin: "2026-10-18T16:15", icono: "🍽️", titulo: "Comida afuera de la zona arqueológica", lugar: "comida-teotihuacan", aprox: true,
      desc: "Restaurantes de la zona: barbacoa, consomé, pulque." },
    { ini: "2026-10-18T16:15", fin: "2026-10-19T00:30", icono: "🚌", titulo: "Regreso a Guadalajara", aprox: true,
      desc: "Llegada estimada entre las 00:00 y la 01:00 del lunes." }
  ]},
  { id: "lun", corto: "Lun 19", titulo: "Lunes 19 de octubre", sub: "Llegada", items: [
    { ini: "2026-10-19T00:00", fin: "2026-10-19T01:00", icono: "🏠", titulo: "Llegada a Guadalajara", aprox: true,
      desc: "Llegada estimada 00:00 – 01:00. ¡Bienvenidos a casa!" }
  ]}
];

GUIA.checklist = [
  { grupo: "Documentos y dinero", items: [
    "INE o identificación (necesaria para la entrada gratis del domingo)",
    "Credencial de estudiante (si aplica)",
    "Efectivo en billetes chicos y monedas (baños, trajineras, propinas)",
    "Tarjeta de débito o crédito"
  ]},
  { grupo: "Ropa", items: [
    "Impermeable o paraguas",
    "Chamarra o sudadera",
    "Ropa cómoda",
    "Calzado cómodo para caminar mucho",
    "Gorra o sombrero"
  ]},
  { grupo: "Para el camino", items: [
    "Cobija o abrigo para el autobús",
    "Almohada de viaje",
    "Audífonos"
  ]},
  { grupo: "Otros", items: [
    "Cargador y batería externa",
    "Bloqueador solar",
    "Lentes de sol",
    "Botella de agua",
    "Gel antibacterial",
    "Bolsa para basura",
    "Medicamentos personales",
    "Bolsa impermeable para el celular"
  ]}
];

GUIA.recomendaciones = {
  originales: [
    "Llevar ropa adecuada para las actividades; contemplar que puede llover.",
    "Calzado cómodo para las actividades.",
    "Llevar abrigos o cobijas para el camino."
  ],
  extra: [
    ["🔒", "Seguridad", "Cuiden celular y cartera en lugares concurridos (Basílica, Madero, Zócalo, metro). Mochila al frente. No dejen el celular sobre la mesa en terrazas."],
    ["🚕", "Transporte", "Para moverse de noche usen apps de transporte (Uber, DiDi) en vez de taxis de la calle. El metro cuesta $5, pero en horas pico va muy lleno."],
    ["💧", "Altitud e hidratación", "La CDMX está a 2 240 m y Teotihuacán a ~2 300 m. Beban agua, coman ligero y tómenlo con calma si se cansan rápido."],
    ["🚻", "Baños", "En la Basílica, embarcaderos, museos y zonas arqueológicas hay baños (algunos con cuota de $5–$10). En el Centro: Sanborns y cafeterías."],
    ["🌧️", "Lluvia", "En octubre todavía puede llover fuerte por la tarde. Si hay tormenta, eviten pasos a desnivel y calles inundadas."],
    ["📶", "Sin señal", "Abran esta guía una vez con internet: después funciona sin conexión (excepto mapa y clima)."],
    ["👥", "En grupo", "Acuerden siempre punto y hora de reunión. Tomen foto del autobús y de su placa."],
    ["🆔", "Domingo", "Lleven INE: es la llave para la entrada libre en Chapultepec y Teotihuacán."]
  ]
};

GUIA.contactos = [
  { nombre: "Emergencias", tel: "911", nota: "Policía, ambulancia y bomberos (todo el país)." },
  { nombre: "Asistencia turística (Ángeles Verdes)", tel: "078", nota: "Información y auxilio a turistas y en carretera." },
  { nombre: "Locatel CDMX", tel: "55 5658 1111", nota: "Información de la ciudad, personas extraviadas, objetos perdidos." },
  { nombre: "Denuncia anónima", tel: "089", nota: "" },
  { nombre: "Hotel San Francisco", tel: "55 5521 8960", nota: "Publicado en sitios de reservas; verificar en recepción." },
  { nombre: "Basílica de Guadalupe", tel: "55 5118 0500", nota: "Informes del santuario." }
];

GUIA.climaRespaldo = {
  texto: "Mañanas frescas (≈ 11–13 °C), tardes templadas (≈ 17–21 °C) y probables lluvias fuertes por la tarde, como ha estado la semana. En Teotihuacán el sol pega más fuerte al mediodía.",
  consejo: "Capas: playera + sudadera, y algo impermeable en la mochila."
};
