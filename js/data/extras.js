/* Plan B si llueve, eventos del fin de semana y compras/recuerdos.
   horas: mismo formato que en comida.js ("lu-sa 10:00-19:00", "24h" o null). */
window.GUIA = window.GUIA || {};

/* ─────────────────────────── PLAN B SI LLUEVE ─────────────────────────── */
GUIA.planB = {
  umbral: 50, // % de probabilidad de lluvia en la tarde para mostrar el aviso en la portada
  intro: "Esta semana ha llovido fuerte por las tardes. Si se suelta el agua durante la tarde libre del sábado, estas opciones son techadas y están a pocos minutos del hotel.",

  /* Opciones techadas cerca del hotel (ref = ficha en cercanos; venue = establecimiento en comida) */
  techados: [
    { ref: "artepopular", nota: "A una cuadra y media del hotel: lo más cercano si llueve justo al llegar." },
    { ref: "bellasartes", nota: "Vestíbulo art déco y murales; el museo cierra a las 18:00." },
    { ref: "memoria", nota: "Recorrido largo (1.5–2 h) y completamente bajo techo; sábado hasta las 19:00." },
    { ref: "muraldiego", nota: "Visita corta a un solo mural gigante." },
    { ref: "franzmayer", nota: "Claustro con cafetería para esperar a que escampe." },
    { ref: "palaciopostal", nota: "Edificio espectacular, pero el sábado probablemente cierre temprano (verificar)." },
    { ref: "azulejos", nota: "Patio techado de Sanborns: buen refugio para cenar o tomar café." },
    { ref: "torrelatino", nota: "Mirador con nivel cerrado; con lluvia la vista se reduce mucho." },
    { id: "iturbide", nombre: "Palacio de Iturbide (Palacio de Cultura Citibanamex)", tipo: "Exposiciones gratuitas", icono: "🏛️",
      coords: [19.4336, -99.1376], maps: "Palacio de Cultura Citibanamex, Madero 17, Centro",
      direccion: "Francisco I. Madero 17, Centro", horas: "lu-do 10:00-19:00",
      horario: "Aprox. 10:00 a 19:00 todos los días (dato no reciente; verificar).", costo: "Gratis",
      txt: "Palacio barroco del siglo XVIII donde vivió Agustín de Iturbide; su patio monumental alberga exposiciones temporales gratuitas.",
      fuente: ["Turismo CDMX — Palacio de Iturbide", "https://mexicocity.cdmx.gob.mx/venues/banamex-palace-iturbide"] },
    { id: "porrua", nombre: "Librería Porrúa (casa matriz)", tipo: "Librería histórica", foto: "porrua",
      coords: [19.4357, -99.1319], maps: "Librería Porrúa, República de Argentina 15, Centro",
      direccion: "República de Argentina 15 esq. Justo Sierra (junto al Templo Mayor)", horas: "lu-sa 09:00-22:00; do 09:00-18:00",
      horario: "Lun–sáb 9:00–22:00; dom 9:00–18:00 (Time Out; verificar).", costo: "Gratis (entrar a hojear)",
      txt: "La librería de la familia Porrúa, fundada a principios del siglo XX frente al recinto del Templo Mayor. Buen refugio al final de la ruta.",
      fuente: ["Time Out México — Librería Porrúa", "https://www.timeoutmexico.mx/ciudad-de-mexico/shopping/libreria-porrua"] },
    { venue: "sanjuan", nota: "Mercado techado; cierra alrededor de las 17:00." },
    { venue: "tacuba", nota: "Cena en un salón histórico con estudiantina." },
    { venue: "moro", nota: "Churros y chocolate caliente: el plan perfecto con lluvia." },
    { id: "ciudadela-pb", ref2: "ciudadela", nota: "Mercado de artesanías techado (ver Compras)." },
    { id: "cartelera", nombre: "Cine, teatro o espectáculo", tipo: "Cartelera", icono: "🎭",
      txt: "No encontré una función confirmada para el sábado en la tarde. Revisen la cartelera de Bellas Artes, el Teatro de la Ciudad Esperanza Iris (Donceles 36) y la cartelera oficial de la ciudad.",
      links: [["Cartelera de la Ciudad de México", "https://cartelera.cdmx.gob.mx/"], ["Palacio de Bellas Artes", "https://palacio.inba.gob.mx/"]] }
  ],

  /* Ruta alternativa techada (sustituye a la ruta a pie si llueve) */
  ruta: {
    titulo: "Ruta techada para tarde de lluvia",
    duracion: "3 a 4 horas · tramos cortos a pie (≈ 2 km)",
    paradas: [
      { hora: "15:45", txt: "Del hotel al **Museo de Arte Popular** (150 m). Recorran las salas y la tienda.", id: "artepopular" },
      { hora: "16:50", txt: "Cruzando la Alameda, **Palacio de Bellas Artes por dentro**: vestíbulo y murales (cierra 18:00).", id: "bellasartes" },
      { hora: "17:50", txt: "**Casa de los Azulejos**: patio techado y mural de Orozco; café si sigue lloviendo.", id: "azulejos" },
      { hora: "18:20", txt: "**Palacio de Iturbide** (Madero 17): exposición gratuita en el patio.", pb: "iturbide" },
      { hora: "19:00", txt: "**Cena en Café de Tacuba** (Tacuba 28).", comida: "tacuba" },
      { hora: "20:30", txt: "**Churros en El Moro** (Eje Central 42) y regreso al hotel (≈ 800 m); si llueve fuerte, taxi de app.", comida: "moro" }
    ],
    linea: [
      [19.4341, -99.1447], [19.4334, -99.1456], [19.4341, -99.1447], [19.4349, -99.1425], [19.4352, -99.1412],
      [19.4344, -99.1408], [19.4342, -99.1403], [19.4336, -99.1376], [19.4350, -99.1378], [19.4363, -99.1380],
      [19.4350, -99.1405], [19.4320, -99.1413], [19.4330, -99.1430], [19.4341, -99.1447]
    ]
  },

  /* Qué cambia si llueve en cada lugar del itinerario */
  porLugar: [
    { lugar: "basilica", titulo: "Basílica de Guadalupe", icono: "⛪",
      txt: ["La nueva Basílica, la antigua, la Capilla del Pocito y la Capilla de Indios son espacios techados amplios: la misa y la visita a la imagen no se afectan.",
            "La gran plaza (atrio) es descubierta y la subida al **Cerrito del Tepeyac** tiene escalinatas que resbalan mojadas: si llueve, déjenla para el final o sáltenla.",
            "Llegamos a las 7:30; las lluvias de esta temporada suelen ser por la tarde, así que la mañana probablemente esté seca."] },
    { lugar: "xochimilco", titulo: "Xochimilco", icono: "🛶",
      txt: ["Las trajineras tienen **techo** (se añadió originalmente para dar sombra): con lluvia ligera el paseo sigue cómodo bajo cubierta.",
            "Con **tormenta eléctrica** es más seguro no estar en el agua: hagan caso a los remeros y al personal del embarcadero si deciden esperar o regresar.",
            "Guarden el celular en bolsa impermeable; los bordes y el piso de la trajinera se mojan."] },
    { lugar: "chapultepec", titulo: "Castillo de Chapultepec", icono: "🏰",
      txt: ["Casi todo el recorrido es **dentro del castillo**: salas del museo, Alcázar y la cafetería La Emperatriz.",
            "Lo que queda a la intemperie es la **subida a pie** (≈ 15 min de rampa), las terrazas y el jardín del Alcázar. Con lluvia, consideren el trenecito (con costo) y vean la terraza al final si escampa.",
            "Es por la mañana: hay menos probabilidad de lluvia que por la tarde."] },
    { lugar: "teotihuacan", titulo: "Teotihuacán", icono: "🔺",
      txt: ["En la **Calzada de los Muertos no hay dónde cubrirse**: lleven impermeable (mejor que paraguas) y calzado que no resbale.",
            "Hay dos **museos de sitio** techados: el Museo de la Cultura Teotihuacana (junto a la Pirámide del Sol) y el Museo de Murales Teotihuacanos “Beatriz de la Fuente” (cerca de la Pirámide de la Luna). Según reportes de abril de 2026 siguieron abiertos tras la reapertura; verifiquen en la entrada.",
            "Con **rayos**, aléjense de las partes altas y de las explanadas abiertas y busquen refugio en los museos o en los edificios de servicios."],
      fuente: ["Eje Central (abr. 2026) — Espacios abiertos en Teotihuacán", "https://www.ejecentral.com.mx/nuestro-eje/hoy-reabre-teotihuacan-sin-acceso-a-las-piramides-de-la-luna-y-el-sol-que-espacios-si-estan-abiertos-horario-y-articulos-permitidos"] }
  ],

  tips: [
    ["🧥", "Impermeable mejor que paraguas", "En lugares concurridos (Basílica, Madero, Zócalo) el paraguas estorba y pica ojos; un impermeable ligero deja las manos libres."],
    ["👟", "Calzado que no resbale", "El piso de cantera y los adoquines del Centro se ponen muy resbalosos mojados."],
    ["📱", "Protejan el celular", "Bolsa impermeable o una bolsa de plástico con cierre; carguen la batería externa."],
    ["🌊", "Eviten encharcamientos", "Las calles se inundan rápido con aguaceros fuertes: no crucen corrientes de agua ni pasos a desnivel inundados, y cuidado con coladeras."],
    ["⚡", "Tormenta eléctrica", "Refúgiense en edificios; eviten árboles aislados, explanadas abiertas y el agua."],
    ["🚕", "Transporte con lluvia", "El metro va más lleno y las apps de transporte suelen subir tarifa y tardar más: pidan el auto con tiempo o esperen a que escampe."]
  ]
};

/* ─────────────────────────── EVENTOS DEL FIN DE SEMANA ─────────────────────────── */
GUIA.eventos = {
  nota: "Solo se incluyen eventos con fuente oficial o, cuando no la hay, marcados como “confirmar”. Revisen las carteleras el mismo día: los horarios pueden cambiar.",
  lista: [
    { id: "desfile-alebrijes", tipo: "evento", dia: "sab", oficial: true, foto: "alebrijes-1",
      nombre: "Desfile de Alebrijes Monumentales 2026",
      cuando: "Sábado 17 de octubre · 12:00 (≈ 2 a 3 h de recorrido)", ini: "2026-10-17T12:00", fin: "2026-10-17T15:30",
      lugar: "Sale del Zócalo → 5 de Mayo → Av. Juárez → Paseo de la Reforma → Columna de la Independencia",
      coords: [19.4349, -99.1432], costo: "Gratis",
      desc: "La edición 18 del desfile que organiza el **Museo de Arte Popular**: cientos de alebrijes gigantes hechos por artesanos de varios estados. **Pasa por la Av. Juárez, a media cuadra del hotel.** A esa hora el grupo estará en Xochimilco o de camino al hotel; si llegan antes de que termine, podrían ver el final desde la Av. Juárez o Reforma.",
      linea: [[19.4326, -99.1332], [19.4347, -99.1360], [19.4350, -99.1400], [19.4346, -99.1420], [19.4350, -99.1460], [19.4362, -99.1520], [19.4320, -99.1590], [19.4270, -99.1677]],
      fuentes: [["Museo de Arte Popular — Bases del desfile 2026 (PDF oficial)", "https://www.map.cdmx.gob.mx/storage/app/uploads/public/6a2/754/643/6a27546439713131336429.pdf"], ["Expansión (16 oct 2026) — fecha, hora y ruta", "https://politica.expansion.mx/cdmx/2026/10/16/desfile-alebrijes-monumentales-2026-ya-tiene-fecha-hora-ruta"]] },
    { id: "expo-alebrijes", tipo: "evento", dia: "ambos", oficial: true, foto: "alebrijes-2",
      nombre: "Exhibición de alebrijes en Paseo de la Reforma",
      cuando: "Del 17 de octubre al 8 de noviembre (todo el día)", ini: "2026-10-17T15:30", fin: "2026-11-08T20:00",
      lugar: "Aceras de Paseo de la Reforma, entre la Columna de la Independencia y la Estela de Luz",
      coords: [19.4270, -99.1677], costo: "Gratis",
      desc: "Después del desfile, los alebrijes se quedan en exhibición sobre Reforma. Está a ≈ 3 km del hotel (≈ 40 min a pie o un viaje corto en taxi de app). Opción para el sábado al atardecer.",
      fuentes: [["Museo de Arte Popular — Bases del desfile 2026 (PDF oficial)", "https://www.map.cdmx.gob.mx/storage/app/uploads/public/6a2/754/643/6a27546439713131336429.pdf"], ["Infobae — exhibición hasta el 8 de noviembre", "https://www.infobae.com/mexico/2026/09/27/alebrijes-monumentales-regresan-a-paseo-de-la-reforma-cuando-sera-el-desfile-y-hasta-que-fecha-podras-visitar-las-figuras-gigantes/"]] },
    { id: "fil-zocalo", tipo: "evento", dia: "ambos", oficial: true, foto: "filzocalo",
      nombre: "Feria Internacional del Libro del Zócalo (FIL Zócalo 2026)",
      cuando: "Del 9 al 18 de octubre · 11:00 a 21:00 (sábado 17 es su penúltimo día)", ini: "2026-10-17T11:00", fin: "2026-10-17T21:00",
      lugar: "Plaza de la Constitución (Zócalo)", coords: [19.4320, -99.1335], costo: "Gratis",
      desc: "XXVI edición, organizada por la Secretaría de Cultura de la CDMX: carpas de editoriales, presentaciones y música en cuatro foros. El sábado hay, entre otras actividades, un tributo musical a 31 Minutos y una mesa de novela policiaca con Paco Ignacio Taibo II. **Las carpas ocupan la plancha del Zócalo**, así que la vista de la plaza cambia. Las carpas también sirven de refugio si llueve.",
      fuentes: [["Capital 21 (Gobierno CDMX) — Llega la FIL 2026 al Zócalo", "https://noticiasc21.cdmx.gob.mx/noticia/llega-la-feria-internacional-del-libro-2026-al-zocalo"], ["N+ — Programa del 17 y 18 de octubre", "https://www.nmas.com.mx/ciudad-de-mexico/cultura/que-evento-hay-zocalo-cdmx-17-18-de-octubre-2026-agenda-conciertos-presentaciones/"]] },
    { id: "feria-barrios", tipo: "evento", dia: "ambos", oficial: false, foto: "santodomingo",
      nombre: "Feria de los Barrios del Centro Histórico",
      cuando: "Del 14 al 18 de octubre · 11:00 a 18:00", ini: "2026-10-17T11:00", fin: "2026-10-17T18:00",
      lugar: "Plaza de Santo Domingo (República de Brasil, entre Cuba y Venezuela)", coords: [19.4380, -99.1335], costo: "Entrada gratuita",
      desc: "Negocios de comida y oficios tradicionales de barrios como Tepito, La Merced y la Guerrero (cochinita, migas, machetes). Cierra a las 18:00: si les interesa, vayan temprano en la tarde libre. **Confirmar:** la fuente es periodística; según la nota, la invitación la publicó el Gobierno capitalino en sus redes.",
      fuentes: [["Chilango — Feria de los Barrios 2026", "https://www.chilango.com/noticias/feria-de-los-barrios-del-centro-historico-2026-comida-y-oficios-fechas-y-sede/"]] },

    /* Avisos que pueden afectar el viaje */
    { id: "cierres-desfile", tipo: "aviso", dia: "sab", oficial: false,
      nombre: "Cierres viales por el desfile de alebrijes",
      cuando: "Sábado 17 · aprox. de mediodía a media tarde", ini: "2026-10-17T11:00", fin: "2026-10-17T16:00",
      lugar: "5 de Mayo, cruce de Eje Central frente a Bellas Artes, Av. Juárez (ambos sentidos) y carriles centrales de Reforma",
      coords: [19.4349, -99.1440],
      desc: "**Puede afectar el traslado de Xochimilco al hotel** (≈ 14:15–15:30): el autobús quizá tenga que desviarse o dejarlos a algunas cuadras, porque el hotel está a media cuadra de la Av. Juárez. Vías alternas sugeridas: Av. Chapultepec, Izazaga, Fray Servando, Eje 1 Norte y Oriente. La estación Zócalo del metro podría cerrar. Medios citan estos cierres; no encontré un comunicado de la SSC.",
      fuentes: [["Telediario — Calles cerradas por el desfile", "https://www.telediario.mx/comunidad/calles-cerradas-desfile-alebrijes-monumentales-2026-cdmx-alternativas"], ["N+ — Ruta, calles cerradas y alternas", "https://www.nmas.com.mx/sociedad/ruta-desfile-alebrijes-2026-cdmx-calles-cerradas-alternativas-viales-sabado-17-de-octubre/"]] },
    { id: "marcha-zombie", tipo: "aviso", dia: "dom", oficial: false,
      nombre: "Marcha Zombie (evento ciudadano)",
      cuando: "Domingo 18 · concentración desde las 11:00, salida 16:00", ini: "2026-10-18T11:00", fin: "2026-10-18T19:00",
      lugar: "Monumento a la Revolución → Av. de la República → Av. Juárez → Eje Central → 5 de Mayo → Zócalo",
      coords: [19.4362, -99.1547],
      desc: "No es un evento oficial. Para el grupo casi no afecta: a esa hora estaremos en Teotihuacán o de regreso, pero puede haber tráfico en el Centro por la tarde.",
      fuentes: [["Crónica — Marcha Zombie 2026", "https://www.cronica.com.mx/metropoli/2026/10/06/marcha-zombie-en-cdmx-cuando-es-la-edicion-2026/"], ["N+ — Hora y ruta", "https://www.nmas.com.mx/sociedad/marcha-zombie-cdmx-2026-cuando-a-que-hora-es-desfile-calles-centro-historico/"]] }
  ],
  carteleras: [
    ["Cartelera de la Ciudad de México (Secretaría de Cultura)", "https://cartelera.cdmx.gob.mx/"],
    ["Agenda del INAH (museos y zonas arqueológicas)", "https://www.inah.gob.mx/"],
    ["Bosque de Chapultepec — actividades", "https://www.chapultepec.org.mx/"],
    ["Museo de Arte Popular", "https://www.map.cdmx.gob.mx/"],
    ["SSC CDMX — avisos viales (X/Twitter)", "https://x.com/SSC_CDMX"]
  ]
};

/* ─────────────────────────── COMPRAS Y RECUERDOS ─────────────────────────── */
GUIA.compras = {
  precioNota: "Precios orientativos con escala $ (económico) · $$ (medio) · $$$ (alto); no son tarifas verificadas. Pregunten en 2 o 3 puestos antes de comprar.",

  porLugar: [
    { lugar: "basilica", titulo: "Basílica de Guadalupe", icono: "⛪", items: [
        ["Imágenes y estampas de la Virgen", "$"], ["Rosarios, medallas y escapularios", "$"], ["Veladoras y figuras", "$–$$"], ["Gorditas de La Villa para regalar", "$"] ],
      donde: "Locales y puestos alrededor del atrio y sobre las calles de acceso, más la tienda oficial del santuario (“Colecturía”).",
      tip: "Comparen precios entre locales y cuiden la cartera: es la zona más concurrida." },
    { lugar: "xochimilco", titulo: "Xochimilco", icono: "🛶", items: [
        ["Alegrías y dulces de amaranto de Tulyehualco", "$"], ["Plantas y flores (pequeñas, que aguanten el viaje)", "$–$$"], ["Artesanías del embarcadero", "$–$$"] ],
      donde: "Puestos del embarcadero y vendedores en lanchas.",
      tip: "Las plantas grandes no viajan bien en el autobús de regreso; mejor semillas o suculentas pequeñas." },
    { lugar: "chapultepec", titulo: "Castillo de Chapultepec", icono: "🏰", items: [
        ["Libros de historia de México", "$$"], ["Réplicas y recuerdos del museo", "$–$$"] ],
      donde: "Tienda del Museo Nacional de Historia (verificar ubicación y horario al entrar).",
      tip: "Buen lugar para un recuerdo “con historia” para niños: libros ilustrados." },
    { lugar: "teotihuacan", titulo: "Teotihuacán", icono: "🔺", items: [
        ["Obsidiana (figuras, joyería, espejos)", "$–$$$"], ["Réplicas de piezas teotihuacanas", "$–$$"], ["Silbatos de jaguar y artesanías", "$"] ],
      donde: "Vendedores dentro y afuera de la zona arqueológica y tiendas del circuito (algunos tours paran en talleres de obsidiana).",
      tip: "La obsidiana natural es fría al tacto, muy filosa en los bordes y suele tener pequeñas irregularidades; el vidrio moldeado puede tener burbujas o marcas de molde. Regateen con amabilidad y no compren nada que se ofrezca como “pieza arqueológica original”." }
  ],

  cerca: [
    { id: "ciudadela", nombre: "Mercado de Artesanías La Ciudadela", tipo: "Mercado de artesanías", foto: "ciudadela-2", fotos: [["ciudadela-2", "Pasillo del mercado de La Ciudadela con textiles y artesanías"], ["ciudadela-1", "Exterior del Mercado de Artesanías La Ciudadela"]],
      coords: [19.4300, -99.1480], maps: "Mercado de Artesanías La Ciudadela, Balderas, Centro",
      direccion: "Av. Balderas esq. Emilio Dondé, Centro (≈ 700 m al sur del hotel)", horas: "lu-sa 10:00-19:00; do 10:00-17:00",
      horario: "Lun–sáb aprox. 10:00–19:00; dom 10:00–17:00/18:00 (fuentes varían; verificar).",
      comprar: "Artesanías de todo el país en un solo lugar: textiles, talavera, alebrijes, barro, plata, juguetes, sombreros. Ideal para regalos.",
      historia: "Funciona desde **1965** frente a la Plaza de La Ciudadela y reúne cientos de locales de artesanos y comerciantes de distintos estados. Es el lugar más práctico para comprar recuerdos en el Centro.",
      tags: ["Techado", "Regateo amable"],
      fuente: ["México Desconocido — Mercado de La Ciudadela", "https://www.mexicodesconocido.com.mx/mercado-de-la-ciudadela-ciudad-de-mexico.html"] },
    { id: "tienda-map", ref: "artepopular", nombre: "Tienda del Museo de Arte Popular", tipo: "Tienda de museo", foto: "artepopular-1",
      coords: [19.4334, -99.1456], maps: "Museo de Arte Popular, Revillagigedo 11, Centro",
      direccion: "Revillagigedo 11, Centro (≈ 150 m del hotel)", horas: "ma-do 10:00-18:00",
      horario: "Mismo horario del museo: mar–dom 10:00–18:00.",
      comprar: "Piezas seleccionadas de artesanos de todo México, con precio fijo.",
      historia: "Precio más alto que en mercados, pero con piezas auténticas y de buena calidad.", tags: ["Precio fijo", "Calidad"] },
    { id: "compras-sanjuan", venue: "sanjuan", nombre: "Mercado de San Juan", tipo: "Mercado gourmet", foto: "r-sanjuan",
      coords: [19.4296, -99.1445], maps: "Mercado de San Juan, Ernesto Pugibet 21",
      direccion: "Ernesto Pugibet 21, Centro", horas: "lu-do 07:00-17:00", horario: "Aprox. 7:00–17:00.",
      comprar: "Chiles secos, moles en pasta, quesos, chapulines, café y especias para llevar.", tags: ["Gourmet"] },
    { id: "compras-celaya", venue: "celaya", nombre: "Dulcería de Celaya", tipo: "Dulces tradicionales", foto: "r-celaya",
      coords: [19.4347, -99.1374], maps: "Dulcería de Celaya, 5 de Mayo 39",
      direccion: "5 de Mayo 39, Centro", horas: "lu-do 10:30-19:30", horario: "Aprox. 10:30–19:30.",
      comprar: "Cocadas, jamoncillos, camotes y frutas cubiertas en cajas de regalo.", historia: "Fundada en 1874.", tags: ["Histórico", "Regalo"] },
    { id: "compras-madero", nombre: "Calle Madero y alrededores", tipo: "Tiendas", foto: "madero-1",
      coords: [19.4337, -99.1372], maps: "Calle Madero, Centro Histórico",
      direccion: "De Eje Central al Zócalo", horas: null, horario: "Comercios aprox. 10:00–21:00 (varía).",
      comprar: "Recuerdos, libros, chocolate, playeras y tiendas de plata en calles cercanas.", tags: ["Peatonal"] }
  ],

  artesanias: [
    { id: "alebrijes", nombre: "Alebrijes", foto: "a-alebrije", origen: "CDMX (cartonería) y Oaxaca (madera)",
      txt: "Criaturas fantásticas de colores. El cartonero chilango **Pedro Linares** contó que las vio en un sueño en los años treinta; en Oaxaca, pueblos como San Martín Tilcajete y San Antonio Arrazola los tallan en madera de copal.",
      tip: "Los de madera tallada a mano son más caros; revisen los detalles de pintura." },
    { id: "talavera", nombre: "Talavera", foto: "a-talavera", origen: "Puebla y Tlaxcala",
      txt: "Cerámica vidriada de tradición hispano-árabe que llegó en el siglo XVI. Tiene **denominación de origen** y sus procesos artesanales son Patrimonio Inmaterial de la UNESCO (2019, junto con Talavera de la Reina, España).",
      tip: "La talavera certificada lleva sello del Consejo Regulador; la de imitación es más barata." },
    { id: "barronegro", nombre: "Barro negro", foto: "a-barronegro", origen: "San Bartolo Coyotepec, Oaxaca",
      txt: "Cerámica negra brillante. El brillo se logra puliendo la pieza antes de cocerla, técnica que popularizó **doña Rosa Real** a mediados del siglo XX.",
      tip: "Es frágil: envuélvanlo bien para el autobús." },
    { id: "textiles", nombre: "Textiles bordados y huipiles", foto: "a-huipil", origen: "Oaxaca, Chiapas, Yucatán y muchos estados",
      txt: "El **huipil** es la blusa o túnica tradicional de las mujeres indígenas, de origen prehispánico; los diseños y colores identifican a cada comunidad. También hay rebozos, servilletas y blusas bordadas.",
      tip: "El bordado a mano tiene pequeñas irregularidades; el de máquina es perfecto y más barato." },
    { id: "sombreros", nombre: "Sombreros", foto: "a-sombrero", origen: "Jalisco y centro del país",
      txt: "Del sombrero de charro bordado a los de palma tejida. La charrería, de la que forma parte el traje de charro, es Patrimonio Inmaterial de la UNESCO desde 2016.",
      tip: "Los grandes son difíciles de cargar en el autobús: piénsenlo antes." },
    { id: "pinatas", nombre: "Piñatas", foto: "a-pinata", origen: "Acolman, Estado de México (cerca de Teotihuacán)",
      txt: "La tradición dice que los frailes agustinos de **Acolman** las usaron en el siglo XVI para las posadas; la clásica de siete picos representa los pecados capitales.",
      tip: "Hay piñatas mini que caben en la maleta." },
    { id: "juguetes", nombre: "Juguetes tradicionales", foto: "a-juguetes", origen: "Todo el país",
      txt: "Balero, trompo, yoyo, matraca, lotería, muñecas de trapo y figuras de madera pintada: juguetes sencillos que siguen hechos a mano.",
      tip: "Regalos baratos y ligeros para niños." },
    { id: "plata", nombre: "Joyería de plata", foto: null, icono: "💍", origen: "Taxco, Guerrero",
      txt: "Taxco es la capital de la platería mexicana; su auge moderno empezó en los años treinta con el diseñador William Spratling.",
      tip: "La plata ley lleva el sello **.925**; desconfíen de precios demasiado bajos." },
    { id: "papelpicado", nombre: "Papel picado", foto: "a-papelpicado", origen: "San Salvador Huixcolotla, Puebla",
      txt: "Papel de china recortado con cinceles en grandes bloques. Adorna fiestas, ofrendas de Día de Muertos y calles (y esta guía).",
      tip: "Ligero y barato: perfecto para llevar." },
    { id: "arbolvida", nombre: "Árbol de la vida", foto: "a-arbolvida", origen: "Metepec, Estado de México",
      txt: "Escultura de barro policromado con ramas llenas de figuras; los primeros representaban la creación bíblica y hoy tratan cualquier tema.",
      tip: "Muy frágil: solo si pueden llevarlo en las piernas." },
    { id: "obsidiana", nombre: "Obsidiana", foto: null, icono: "🖤", origen: "Valle de Teotihuacán e Hidalgo",
      txt: "Vidrio volcánico que fue la base de la economía de Teotihuacán. Hoy se talla en figuras, joyería y espejos; hay variedades negra, dorada, arcoíris y “copo de nieve”.",
      tip: "Ver consejos para distinguirla en Teotihuacán (arriba)." }
  ],

  tips: [
    ["🤝", "Regatear con respeto", "En mercados y con vendedores ambulantes se vale pedir “¿me lo deja en…?”, con amabilidad. En tiendas con precio fijo (museos, Sanborns) no se regatea."],
    ["💵", "Efectivo y billetes chicos", "Muchos artesanos no aceptan tarjeta; lleven billetes de $20–$200."],
    ["🔍", "Revisen la calidad", "Miren costuras, pintura, despostilladuras y que las piezas no estén pegadas."],
    ["📦", "Empacar para el autobús", "Envuelvan lo frágil en ropa o papel periódico, dentro de una caja o del equipaje de mano; no lo pongan en la bodega del autobús."],
    ["🚫", "Nada de piezas arqueológicas", "Comprar, vender o sacar piezas arqueológicas reales está prohibido por la ley federal. Si alguien ofrece una “original”, es ilegal o es falsa: compren réplicas."]
  ]
};
