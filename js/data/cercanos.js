/* Lugares cerca del Hotel San Francisco (tarde-noche libre del sábado).
   cat: imperdible | museo | mirador | noche
   horas: formato "lu-vi 09:00-17:00; sa-do 10:00-19:00" (24 h). null = sin confirmar. */
window.GUIA = window.GUIA || {};

GUIA.hotel = {
  nombre: "Hotel San Francisco",
  direccion: "Luis Moya 11, Col. Centro, Cuauhtémoc, CDMX",
  coords: [19.4341, -99.1447],
  maps: "Hotel San Francisco Centro Histórico, Luis Moya 11, Centro, Ciudad de México",
  telefono: "55 5521 8960",
  telefonoNota: "Número publicado en sitios de reservas (algunos muestran 5521 8961). Verificar en recepción.",
  checkin: "15:00",
  checkout: "12:00",
  nota: "Horarios de entrada/salida según sitios de reservas; confirmar en recepción. Al llegar piden identificación oficial.",
  metro: "Juárez (Línea 3) y Bellas Artes (Líneas 2 y 8), ambos a pocos minutos a pie.",
  cerca: "A media cuadra de la Alameda Central y de la Avenida Juárez.",
  foto: ["hotel", "Avenida Juárez y la Alameda Central vistas desde lo alto"]
};

GUIA.cercanos = {

  alameda: {
    nombre: "Alameda Central", cat: "imperdible", color: "verde",
    coords: [19.4357, -99.1445], maps: "Alameda Central, Ciudad de México",
    direccion: "Entre Av. Juárez y Av. Hidalgo, Centro",
    horas: "24h", horario: "Abierta todo el día (parque público). De noche, mejor en las zonas iluminadas.",
    costo: "Gratis", estancia: "20–40 min",
    dato: "Se creó en 1592: se considera el parque público más antiguo de América.",
    fotos: [["alameda-1", "Vista aérea de la Alameda Central con sus árboles y el Palacio de Bellas Artes al fondo"], ["alameda-2", "Hemiciclo a Juárez, monumento semicircular de mármol blanco"], ["alameda-3", "Fuente con chorros de agua en la Alameda Central"]],
    historia: [
      { h: "Un paseo de álamos para la nobleza", p: ["En **1592**, el virrey **Luis de Velasco (hijo)** ordenó crear un paseo arbolado en el borde poniente de la ciudad, que entonces terminaba aquí. Se plantaron **álamos** —de ahí su nombre— y se convirtió en lugar de paseo de la sociedad virreinal, aunque durante mucho tiempo estuvo cercado y reservado a las clases altas. Por eso se le considera el **parque público más antiguo de América**.", "Del lado poniente, frente al convento de San Diego, se ubicaba el **quemadero** de la Inquisición, donde se ejecutaban las sentencias más graves del Santo Oficio. A fines del siglo XVIII el parque se amplió a su tamaño actual y se le dio su trazo de senderos diagonales con fuentes."] },
      { h: "Del siglo XIX a hoy", p: ["En el siglo XIX se abrió a todo el público y se llenó de kioscos, bancas de hierro y esculturas. En **1910**, para el Centenario de la Independencia, Porfirio Díaz inauguró el **Hemiciclo a Juárez**, de mármol de Carrara, frente a la Avenida Juárez. El parque sufrió con los sismos de 1985, que destruyeron varios edificios de la avenida, y en **2012–2013** se renovó por completo: nuevos pavimentos, fuentes restauradas e iluminación.", "Es el escenario del famoso mural de Diego Rivera **Sueño de una tarde dominical en la Alameda Central**, que hoy se exhibe en el museo de su extremo poniente."] }
    ],
    lineaTiempo: [["1592", "El virrey Luis de Velasco crea el paseo."], ["s. XVIII", "Se amplía y se traza con fuentes."], ["1910", "Se inaugura el Hemiciclo a Juárez."], ["1947", "Rivera pinta “Sueño de una tarde dominical…”."], ["2013", "Gran renovación del parque."]],
    arquitectura: ["**Hemiciclo a Juárez (1910):** columnas dóricas de mármol blanco y, al centro, Benito Juárez sentado, coronado por la Patria.", "**Fuentes:** con esculturas de figuras mitológicas como Venus y Neptuno.", "**Bordes:** al oriente el Palacio de Bellas Artes; al norte el Templo de San Juan de Dios y la Santa Veracruz; al poniente el Museo Mural Diego Rivera."],
    leyendas: [{ h: "El quemadero (historia y leyenda)", p: "Junto a la Alameda estaba el lugar donde la Inquisición ejecutaba a los condenados. Se cuenta que por las noches se escuchan lamentos cerca del Laboratorio Arte Alameda (antiguo convento de San Diego)." }],
    curiosos: ["Su nombre viene de los álamos que se plantaron al principio.", "El Hemiciclo es uno de los puntos de reunión de marchas y celebraciones.", "Durante siglos marcó el límite poniente de la ciudad.", "El hotel está a media cuadra: es el mejor punto de partida."],
    queVer: ["Hemiciclo a Juárez", "Fuentes centrales", "Vista del Palacio de Bellas Artes desde el lado oriente", "Templo de San Juan de Dios en Av. Hidalgo"],
    tips: ["Por la noche, prefieran los andadores iluminados y vayan en grupo.", "Los domingos se llena de familias y vendedores."],
    fuentes: [["Alameda Central — Wikipedia", "https://es.wikipedia.org/wiki/Alameda_Central"], ["UNESCO — Centro Histórico", "https://whc.unesco.org/en/list/412"]]
  },

  bellasartes: {
    nombre: "Palacio de Bellas Artes", cat: "imperdible", color: "amarillo",
    coords: [19.4352, -99.1412], maps: "Palacio de Bellas Artes, Ciudad de México",
    direccion: "Av. Juárez s/n esq. Eje Central, Centro",
    horas: "ma-do 10:00-18:00", horario: "Museo: martes a domingo, aprox. 10:00 a 18:00 (verificar). La explanada y la fachada iluminada se disfrutan de noche.",
    costo: "Museo $95 (estudiantes, maestros, INAPAM y menores de 13: tarifa reducida). Domingo entrada libre.", estancia: "30–60 min",
    dato: "Tardó 30 años en construirse (1904–1934) y combina art nouveau por fuera y art déco por dentro.",
    fotos: [["bellasartes-1", "Fachada de mármol blanco del Palacio de Bellas Artes con su cúpula dorada"], ["bellasartes-2", "Plafón de cristal en el interior de Bellas Artes"], ["bellasartes-3", "Bellas Artes iluminado de noche"]],
    historia: [
      { h: "Un teatro para el Centenario", p: ["A inicios del siglo XX el gobierno de Porfirio Díaz decidió construir un nuevo **Teatro Nacional** digno de las celebraciones del Centenario de la Independencia. El proyecto se encargó al arquitecto italiano **Adamo Boari**, quien también diseñó el Palacio Postal. La obra comenzó en **1904** con una estructura de acero y un recubrimiento de **mármol de Carrara**, en estilo **art nouveau** con detalles neoclásicos.", "El enorme peso del edificio sobre el suelo blando del antiguo lago provocó que **se hundiera** de forma notable desde la construcción; por eso hoy la explanada queda por debajo del nivel de la calle y se baja a ella por escalones."] },
      { h: "La Revolución y el art déco", p: ["La **Revolución** detuvo los trabajos hacia 1913; Boari regresó a Italia en 1916 y el edificio quedó inconcluso durante casi dos décadas. En **1932** el arquitecto mexicano **Federico Mariscal** retomó la obra y diseñó los interiores en **art déco**, con motivos prehispánicos y mexicanos. El Palacio se inauguró el **29 de noviembre de 1934**, ya con el nombre de Palacio de Bellas Artes.", "En sus muros hay murales de **Diego Rivera**, **José Clemente Orozco**, **David Alfaro Siqueiros**, **Rufino Tamayo**, **Jorge González Camarena** y **Roberto Montenegro**. El de Rivera, *El hombre controlador del universo*, es la recreación del mural que le destruyeron en el Rockefeller Center de Nueva York en 1934."] },
      { h: "El escenario más importante del país", p: ["Aquí se presentan ópera, danza, conciertos y el **Ballet Folklórico de México de Amalia Hernández**. La sala principal tiene un **telón de cristal** hecho por la casa **Tiffany** de Nueva York, con el paisaje de los volcanes Popocatépetl e Iztaccíhuatl, formado por cerca de un millón de piezas de cristal opalescente. Bellas Artes también es el lugar donde México despide a sus grandes artistas: aquí se han velado figuras como Frida Kahlo, Juan Gabriel y Gabriel García Márquez."] }
    ],
    lineaTiempo: [["1904", "Inicia la obra de Adamo Boari."], ["≈1913–1916", "La Revolución detiene los trabajos."], ["1932", "Federico Mariscal retoma el proyecto (art déco)."], ["1934", "Inauguración (29 de noviembre)."], ["1987", "Forma parte del Centro Histórico, Patrimonio Mundial."]],
    arquitectura: ["**Exterior art nouveau:** mármol blanco con esculturas, guirnaldas y máscaras; la cúpula está cubierta de cerámica en tonos dorados y naranjas.", "**Interior art déco:** mármoles de colores, lámparas geométricas y motivos inspirados en el arte prehispánico.", "**Plafón de cristal** de la sala principal, diseñado por el húngaro Géza Maróti.", "**Pegasos** en la explanada, obra del escultor español Agustín Querol."],
    leyendas: [{ h: "El palacio que se hunde (dato y mito)", p: "Es cierto que se hundió durante su construcción; el mito popular exagera diciendo que “se sigue hundiendo cada año sin remedio”. Hoy está estabilizado y monitoreado." }],
    curiosos: ["El telón de Tiffany pesa varias toneladas y se muestra al público en algunas funciones.", "Adamo Boari diseñó también el Palacio Postal, justo enfrente.", "Su nombre original iba a ser Teatro Nacional.", "La explanada quedó por debajo del nivel de la calle por el hundimiento.", "La mejor vista de la fachada es desde la terraza del edificio Sears / Finca Don Porfirio."],
    queVer: ["Fachada y cúpula desde la Alameda", "Vestíbulo art déco y murales del 2.º y 3.er piso", "Explanada iluminada de noche"],
    tips: ["Revisión de bolsas a la entrada.", "De noche es uno de los lugares más fotogénicos de la ciudad."],
    fuentes: [["Palacio de Bellas Artes (INBAL)", "https://palacio.inba.gob.mx/"], ["Palacio de Bellas Artes — Wikipedia", "https://es.wikipedia.org/wiki/Palacio_de_Bellas_Artes"], ["Excélsior — precio de entrada", "https://www.excelsior.com.mx/expresiones/monet-y-matisse-llegan-a-bellas-artes-cual-es-el-precio-y-horario/1706796"]]
  },

  madero: {
    nombre: "Calle Madero", cat: "imperdible", color: "rosa",
    coords: [19.4337, -99.1372], maps: "Calle Francisco I. Madero, Centro Histórico, Ciudad de México",
    direccion: "De Eje Central al Zócalo (peatonal)",
    horas: "24h", horario: "Calle peatonal, abierta siempre. Comercios aprox. 10:00–21:00.",
    costo: "Gratis", estancia: "30–45 min caminando",
    dato: "Pancho Villa cambió en persona el letrero de la calle en 1914 para nombrarla en honor de Francisco I. Madero.",
    fotos: [["madero-1", "Calle Madero llena de gente caminando entre edificios históricos"], ["madero-2", "Torre Latinoamericana vista desde la calle Madero"]],
    historia: [
      { h: "La calle de los plateros", p: ["Es una de las calles más antiguas de la ciudad: su trazo viene de la primera traza española sobre Tenochtitlan. En el virreinato se llamó **San Francisco** —por el enorme convento franciscano que estaba en su extremo poniente— y **Plateros**, por los talleres de orfebres que la ocupaban. Era la calle elegante por excelencia: por aquí pasaban los desfiles y entradas de los virreyes rumbo a la Plaza Mayor.", "En **diciembre de 1914**, cuando los ejércitos de Villa y Zapata ocuparon la capital, **Francisco Villa** subió a una escalera y colocó él mismo la placa con el nuevo nombre: **Avenida Francisco I. Madero**, en honor al presidente asesinado en 1913."] },
      { h: "Hoy: la calle más caminada", p: ["En **2010** se volvió completamente peatonal y hoy la recorren decenas de miles de personas al día. A lo largo de sus cinco cuadras hay joyas como el **Templo de San Francisco** (restos del primer gran convento franciscano de la Nueva España), la **Casa de los Azulejos**, el **Palacio de Iturbide** —donde vivió Agustín de Iturbide al ser proclamado emperador en 1822, hoy centro cultural con exposiciones gratuitas—, el **Templo de La Profesa** y el **Museo del Estanquillo**, con la colección de Carlos Monsiváis."] }
    ],
    lineaTiempo: [["1524", "Llegan los franciscanos; su convento da nombre a la calle."], ["1779–1785", "Se construye el Palacio de Iturbide."], ["1914", "Villa la renombra Madero."], ["2010", "Se vuelve peatonal."]],
    arquitectura: ["**Palacio de Iturbide:** fachada barroca de cantera y tezontle de tres pisos con un patio monumental.", "**Templo de San Francisco:** fachada churrigueresca, por debajo del nivel de la calle.", "Edificios del Porfiriato con balcones de hierro forjado y cafés en las plantas bajas."],
    leyendas: [{ h: "La Profesa y los conspiradores", p: "En el Templo de La Profesa se reunieron en 1820 los conspiradores que planearon cómo consumar la Independencia; de ahí salió el apoyo para Iturbide." }],
    curiosos: ["Es peatonal desde 2010.", "Pancho Villa puso la placa con su nombre.", "El Palacio de Iturbide tiene exposiciones gratuitas.", "En el extremo oriente desemboca directo en el Zócalo."],
    queVer: ["Templo de San Francisco", "Casa de los Azulejos", "Palacio de Iturbide (patio)", "Templo de La Profesa", "Músicos callejeros"],
    tips: ["Mucha gente: mochila al frente.", "Cuidado con quienes ofrecen “tours gratis” o encuestas para distraer."],
    fuentes: [["Calle de Madero — Wikipedia", "https://es.wikipedia.org/wiki/Calle_Francisco_I._Madero"], ["Turismo CDMX", "https://mexicocity.cdmx.gob.mx/"]]
  },

  azulejos: {
    nombre: "Casa de los Azulejos (Sanborns)", cat: "imperdible", color: "azul",
    coords: [19.4342, -99.1403], maps: "Sanborns Casa de los Azulejos, Madero 4, Centro",
    direccion: "Francisco I. Madero 4, Centro",
    horas: "lu-do 07:00-01:00", horario: "Diario 7:00 a 1:00 (según Turismo CDMX; verificar).",
    costo: "Entrar es gratis; solo pagan lo que consuman.", estancia: "15 min (o 1 h si cenan)",
    dato: "La fachada está cubierta de azulejos de talavera poblana del siglo XVIII.",
    fotos: [["azulejos-1", "Fachada cubierta de azulejos azules y blancos de la Casa de los Azulejos"], ["azulejos-2", "Detalle de azulejo de talavera azul y amarillo"]],
    historia: [
      { h: "El palacio de los condes", p: ["El terreno perteneció desde el siglo XVI a la familia de los **condes del Valle de Orizaba**. En el siglo XVIII se reconstruyó el palacio y su fachada se recubrió de **azulejos de talavera** de Puebla en azul y blanco, algo excepcional en la ciudad. Es uno de los edificios civiles más bellos del virreinato."] },
      { h: "Jockey Club, Revolución y Sanborns", p: ["En el Porfiriato fue sede del elegante **Jockey Club**. Durante la Revolución lo ocupó la **Casa del Obrero Mundial**. A fines de la década de 1910 los hermanos estadounidenses **Walter y Frank Sanborn** instalaron aquí su farmacia y fuente de sodas, que se convirtió en restaurante y en la cadena **Sanborns**.", "En la escalera hay un mural de **José Clemente Orozco**, *Omnisciencia* (1925). La casa presume haber popularizado las **enchiladas suizas**, que según la tradición se crearon aquí hacia mediados del siglo XX."] }
    ],
    lineaTiempo: [["s. XVI", "Propiedad de los condes del Valle de Orizaba."], ["s. XVIII", "Se cubre la fachada de azulejos."], ["Porfiriato", "Sede del Jockey Club."], ["1910s", "Llegan los hermanos Sanborn."], ["1925", "Orozco pinta “Omnisciencia”."]],
    arquitectura: ["**Fachada** con azulejos de talavera azul y blanco y balcones de hierro.", "**Patio** techado con vitral, hoy salón del restaurante, con columnas y fuente.", "**Escalera** con el mural de Orozco."],
    leyendas: [{ h: "“Tú nunca harás casa de azulejos” (leyenda)", p: "Se cuenta que un conde le dijo a su hijo derrochador: “Hijo, tú nunca harás casa de azulejos”, frase que se usaba para quien no iba a llegar a nada. El joven se reformó y, como prueba, cubrió la casa de azulejos. Es una leyenda; no hay documento que la confirme." }],
    curiosos: ["La frase “no hará casa de azulejos” se decía de quien no iba a prosperar.", "Es la sucursal más antigua de Sanborns.", "Pueden entrar a ver el patio y el mural sin consumir.", "Está justo frente a la Torre Latinoamericana."],
    queVer: ["Fachada desde la esquina de Madero y 5 de Mayo", "Patio central", "Mural de Orozco en la escalera"],
    tips: ["Buen lugar para baño y descanso a mitad del recorrido.", "Las enchiladas suizas son el clásico de la casa."],
    fuentes: [["Turismo CDMX — La Casa de los Azulejos", "https://mexicocity.cdmx.gob.mx/venues/la-casa-de-los-azulejos/"], ["Casa de los Azulejos — Wikipedia", "https://es.wikipedia.org/wiki/Casa_de_los_Azulejos"]]
  },

  zocalo: {
    nombre: "Zócalo (Plaza de la Constitución)", cat: "imperdible", color: "rosa",
    coords: [19.4326, -99.1332], maps: "Zócalo, Plaza de la Constitución, Ciudad de México",
    direccion: "Centro Histórico",
    horas: "24h", horario: "Plaza abierta. Ceremonia de la bandera por la mañana y al atardecer (arriado ≈ 18:00, verificar).",
    costo: "Gratis", estancia: "20–30 min",
    dato: "Se llama “Zócalo” por un pedestal (zócalo) de un monumento que nunca se terminó, en 1843.",
    aviso: "Del 9 al 18 de octubre la plancha está ocupada por las carpas de la Feria Internacional del Libro (11:00–21:00, gratis). El sábado 17 a las 12:00 de aquí sale el Desfile de Alebrijes. Ver Eventos.",
    fotos: [["zocalo-1", "Vista aérea del Zócalo con la Catedral y Palacio Nacional"], ["zocalo-2", "Panorámica aérea de la Plaza de la Constitución y el Centro Histórico"]],
    historia: [
      { h: "El centro del mundo mexica", p: ["Sobre este espacio estaba parte del corazón de **México-Tenochtitlan**, junto al recinto sagrado del Templo Mayor y frente a los palacios de Moctezuma. Tras la Conquista, Hernán Cortés trazó aquí la **Plaza Mayor** de la nueva ciudad, rodeada por el palacio virreinal, la Catedral y el Ayuntamiento, distribución que se conserva hasta hoy."] },
      { h: "Constitución y “zócalo”", p: ["Su nombre oficial, **Plaza de la Constitución**, recuerda la Constitución de Cádiz de 1812. En **1790**, al nivelar y empedrar la plaza, aparecieron la **Piedra del Sol** y la escultura de la **Coatlicue**, hoy en el Museo Nacional de Antropología. En **1843**, Antonio López de Santa Anna mandó levantar un monumento a la Independencia, pero solo se construyó el basamento, el **zócalo**; la gente empezó a llamar así a toda la plaza, y el nombre se extendió a las plazas principales de muchas ciudades del país.", "Es el escenario de la vida política y festiva de México: el **Grito de Independencia** cada 15 de septiembre, conciertos masivos, marchas, ferias y la ofrenda monumental de Día de Muertos."] }
    ],
    lineaTiempo: [["1325", "Fundación de Tenochtitlan."], ["1521 →", "Se traza la Plaza Mayor."], ["1790", "Aparecen la Piedra del Sol y la Coatlicue."], ["1843", "El “zócalo” inconcluso de Santa Anna."]],
    arquitectura: ["Una de las plazas públicas más grandes del mundo (cerca de 46 000 m²).", "Rodeada por Catedral (norte), Palacio Nacional (oriente), edificios del Gobierno de la Ciudad (sur) y portales comerciales (poniente).", "Al centro, un asta con una bandera monumental."],
    leyendas: [{ h: "El águila y la serpiente (mito fundacional)", p: "Según el mito, los mexicas fundaron su ciudad donde vieron un águila sobre un nopal devorando una serpiente, señal de su dios Huitzilopochtli. Es la escena del escudo nacional; hay una escultura alusiva en la esquina de Pino Suárez y 20 de Noviembre." }],
    curiosos: ["El nombre “zócalo” se volvió sinónimo de plaza principal en todo México.", "El Grito de Independencia se da desde el balcón central de Palacio Nacional.", "En la plaza han aparecido monolitos mexicas muy importantes."],
    queVer: ["La bandera monumental", "Vista de Catedral y Palacio Nacional", "Terrazas con vista en los edificios del poniente"],
    tips: ["Puede haber eventos o vallas que cambian el acceso; sigan las indicaciones.", "Cuidado con las pertenencias entre la multitud."],
    fuentes: [["Zócalo — Wikipedia", "https://es.wikipedia.org/wiki/Z%C3%B3calo_de_la_Ciudad_de_M%C3%A9xico"], ["UNESCO — Centro Histórico", "https://whc.unesco.org/en/list/412"]]
  },

  catedral: {
    nombre: "Catedral Metropolitana", cat: "imperdible", color: "azul",
    coords: [19.4345, -99.1331], maps: "Catedral Metropolitana de la Ciudad de México",
    direccion: "Plaza de la Constitución s/n, Centro",
    horas: "lu-do 08:00-19:00", horario: "Abierta a diario; las fuentes no coinciden (aprox. 7:00/9:00 a 17:30/19:00). Verificar en el lugar.",
    costo: "Entrada libre. Recorridos especiales con costo.", estancia: "20–40 min",
    dato: "Tardó casi 250 años en terminarse (1573–1813), por eso mezcla renacimiento, barroco y neoclásico.",
    fotos: [["catedral-1", "Fachada de la Catedral Metropolitana con sus dos torres"], ["catedral-2", "Detalle dorado del Retablo de los Reyes"], ["catedral-3", "Órgano monumental de la Catedral"]],
    historia: [
      { h: "Casi 250 años de obra", p: ["La primera iglesia mayor se levantó pocos años después de la Conquista. La catedral actual se comenzó en **1573**, con trazo de **Claudio de Arciniega**, y se terminó hasta **1813**: casi **250 años** de construcción. Por eso en un mismo edificio conviven el **renacimiento** (interior), el **barroco** (portadas y retablos) y el **neoclásico** (cúpula y remates de las torres), obra final de **Manuel Tolsá**. Las torres, de unos 67 m, las diseñó José Damián Ortiz de Castro."] },
      { h: "Tesoros y hundimientos", p: ["Dentro destacan el **Altar de los Reyes** (1718–1737), de **Jerónimo de Balbás**, obra cumbre del barroco churrigueresco con sus columnas *estípite*; el **Altar del Perdón**; los dos grandes **órganos** del siglo XVIII y la cripta de los arzobispos. Junto a ella está el **Sagrario Metropolitano** (1749–1768), de Lorenzo Rodríguez, con fachada ultrabarroca.", "Construida sobre el suelo del antiguo lago, la catedral se ha hundido de manera desigual. En los años noventa se realizaron trabajos de **subexcavación** para estabilizarla; dentro cuelga una **plomada** que muestra la inclinación del edificio. En 1967 un incendio dañó el coro y el Altar del Perdón, que fueron restaurados."] }
    ],
    lineaTiempo: [["1573", "Inicia la construcción."], ["1718–1737", "Altar de los Reyes (Balbás)."], ["1749–1768", "Sagrario Metropolitano."], ["1787–1813", "Tolsá concluye cúpula y remates."], ["1967", "Incendio en el coro."], ["1990s", "Obras de estabilización."]],
    arquitectura: ["Planta de cinco naves con 16 capillas laterales.", "Altar de los Reyes: estípites dorados y pinturas de reyes santos.", "La plomada junto al altar mayor muestra cuánto se ha inclinado.", "Las campanas de las torres tienen nombres propios."],
    leyendas: [{ h: "El Señor del Veneno (leyenda)", p: "En una capilla hay un Cristo negro. Cuenta la leyenda que un hombre piadoso besaba los pies de un crucifijo cada día; un enemigo los untó con veneno y el Cristo absorbió el veneno y se volvió negro para salvarlo." }],
    curiosos: ["Es una de las catedrales más grandes de América.", "La plomada interior es un “medidor” visible del hundimiento.", "Tolsá también es autor del Palacio de Minería y de la estatua ecuestre de Carlos IV (“El Caballito”).", "El Sagrario, pegado a la catedral, es un templo distinto."],
    queVer: ["Altar de los Reyes", "Plomada", "Órganos y coro", "Capilla del Señor del Veneno", "Fachada del Sagrario"],
    tips: ["Es templo activo: respeten las misas.", "Actualmente no hay subida a los campanarios (según Chilango)."],
    fuentes: [["Catedral Metropolitana — Wikipedia", "https://es.wikipedia.org/wiki/Catedral_Metropolitana_de_la_Ciudad_de_M%C3%A9xico"], ["Chilango — Campanario de la Catedral", "https://www.chilango.com/que-hacer/arte-y-cultura/alturas-del-zocalo-campanario-de-la-catedral-metropolitana-de-la-cdmx/"]]
  },

  palacionacional: {
    nombre: "Palacio Nacional (exterior)", cat: "imperdible", color: "rosa",
    coords: [19.4323, -99.1314], maps: "Palacio Nacional, Ciudad de México",
    direccion: "Plaza de la Constitución, lado oriente",
    horas: null, horario: "Visitas al interior sujetas a disponibilidad y registro; en la tarde del sábado, verlo por fuera.",
    costo: "Gratis (exterior)", estancia: "10–15 min",
    dato: "Está sobre las “Casas Nuevas” de Moctezuma II, el palacio del último gran tlatoani.",
    fotos: [["palacionacional-1", "Fachada de tezontle del Palacio Nacional"], ["palacionacional-2", "Palacio Nacional iluminado de noche"]],
    historia: [
      { h: "De Moctezuma a la República", p: ["Aquí estuvieron las **Casas Nuevas de Moctezuma II**. Tras la Conquista, Hernán Cortés construyó su residencia sobre ellas; en 1562 la Corona la compró y se convirtió en **palacio virreinal**. En **1692**, durante un motín por escasez de maíz, el edificio fue incendiado y se reconstruyó con su característica fachada de **tezontle** rojo. Desde la Independencia ha sido sede del poder ejecutivo.", "En su escalera y corredores **Diego Rivera** pintó entre 1929 y 1951 la épica *Historia de México*. Sobre el balcón central cuelga la **Campana de Dolores**, que Miguel Hidalgo tocó en 1810, y desde ahí el presidente da el Grito cada 15 de septiembre."] }
    ],
    lineaTiempo: [["s. XVI", "Casas Nuevas de Moctezuma; luego casa de Cortés."], ["1562", "Palacio virreinal."], ["1692", "Incendio durante un motín; reconstrucción."], ["1896", "Llega la Campana de Dolores."], ["1929–1951", "Murales de Diego Rivera."]],
    arquitectura: ["Fachada de unos 200 m de largo, de tezontle y cantera.", "El tercer piso se añadió en el siglo XX.", "Balcón central con la Campana de Dolores."],
    leyendas: [{ h: "El tesoro de Moctezuma (leyenda)", p: "Durante siglos se dijo que bajo el palacio quedaba escondido parte del tesoro de Moctezuma que los españoles no encontraron." }],
    curiosos: ["La Campana de Dolores se trajo de Guanajuato en 1896.", "Es también residencia presidencial desde 2019.", "Su fachada mide casi dos cuadras."],
    queVer: ["Fachada y balcón central desde el Zócalo", "Calle de Moneda, a un costado"],
    tips: ["Suele haber vallas de seguridad alrededor."],
    fuentes: [["Palacio Nacional — Wikipedia", "https://es.wikipedia.org/wiki/Palacio_Nacional_(M%C3%A9xico)"]]
  },

  templomayor: {
    nombre: "Templo Mayor", cat: "imperdible", color: "amarillo",
    coords: [19.4351, -99.1316], maps: "Museo del Templo Mayor, Seminario 8, Centro",
    direccion: "Seminario 8, Centro (a un costado de Catedral)",
    horas: "ma-do 09:00-17:00", horario: "Museo y zona: martes a domingo 9:00 a 17:00 (último acceso antes). En la tarde libre, se ven las ruinas desde los andadores de la calle.",
    costo: "$105 (gratis domingo para nacionales; verificar).", estancia: "15 min (exterior) / 1.5 h (museo)",
    dato: "Se redescubrió por accidente en 1978, cuando trabajadores de la compañía de luz encontraron el monolito de la Coyolxauhqui.",
    fotos: [["templomayor-1", "Restos del Templo Mayor con muros de piedra superpuestos"], ["templomayor-2", "Cabeza de serpiente de piedra en el Templo Mayor"], ["templomayor-3", "Monolito circular de la Coyolxauhqui desmembrada"]],
    historia: [
      { h: "El gran templo de Tenochtitlan", p: ["El **Huei Teocalli** era el edificio más importante de México-Tenochtitlan: una pirámide con **dos templos** en la cima, uno a **Huitzilopochtli**, dios de la guerra y el sol, y otro a **Tláloc**, dios de la lluvia. Se amplió en **siete grandes etapas** constructivas desde el siglo XIV, cada una cubriendo a la anterior como capas de cebolla. Tras la Conquista, en 1521, fue destruido y sus piedras se usaron para construir la nueva ciudad."] },
      { h: "El hallazgo de 1978", p: ["Durante siglos se supo que estaba por aquí, pero no exactamente dónde. El **21 de febrero de 1978**, trabajadores de la Compañía de Luz que hacían una excavación encontraron un enorme disco de piedra: la **Coyolxauhqui**, la diosa lunar desmembrada por su hermano Huitzilopochtli. El hallazgo dio origen al **Proyecto Templo Mayor**, dirigido por el arqueólogo **Eduardo Matos Moctezuma**, que demolió varias manzanas para excavar los restos.", "En **1987** abrió el **Museo del Templo Mayor**, diseñado por Pedro Ramírez Vázquez. En 2006 se encontró el monolito de **Tlaltecuhtli**, el más grande de la cultura mexica, y en 2015 el **Huei Tzompantli**, un muro de cráneos."] }
    ],
    lineaTiempo: [["1325", "Fundación de Tenochtitlan y primer templo."], ["1487", "Gran consagración de una de sus ampliaciones."], ["1521", "Destrucción tras la Conquista."], ["1978", "Hallazgo de la Coyolxauhqui."], ["1987", "Abre el museo."], ["2006", "Hallazgo de Tlaltecuhtli."]],
    arquitectura: ["Se ven las etapas superpuestas: escalinatas de distintas épocas una dentro de otra.", "Cabezas de serpiente en las alfardas.", "Desde la calle se ve la maqueta y parte de las ruinas."],
    leyendas: [{ h: "Coyolxauhqui y Huitzilopochtli (mito)", p: "Coatlicue quedó embarazada de forma milagrosa en el cerro de Coatepec. Su hija Coyolxauhqui y sus 400 hermanos quisieron matarla, pero Huitzilopochtli nació armado, venció a Coyolxauhqui y la arrojó desde el cerro, despedazada. El templo representa ese cerro." }],
    curiosos: ["Lo encontraron trabajadores de la compañía de luz.", "Tlaltecuhtli es el monolito mexica más grande conocido.", "El museo lo diseñó el mismo arquitecto de la nueva Basílica.", "Hay una réplica de la Coyolxauhqui visible desde la calle."],
    queVer: ["Ruinas desde los andadores de Seminario y República de Argentina", "Si llegan antes de las 16:30: el museo"],
    tips: ["Cierra a las 17:00: si su tarde libre empieza tarde, véanlo por fuera."],
    fuentes: [["INAH — Museo del Templo Mayor", "https://www.templomayor.inah.gob.mx/"], ["Grupo Animal / INAH (2026) — horario y costo", "https://grupoanimal.mx/estilo-de-vida/inah-abre-acceso-templo-ehecatl-juego-de-pelota-tenochtitlan"], ["Templo Mayor — Wikipedia", "https://es.wikipedia.org/wiki/Templo_Mayor"]]
  },

  torrelatino: {
    nombre: "Torre Latinoamericana (mirador)", cat: "mirador", color: "azul",
    coords: [19.4339, -99.1407], maps: "Mirador Torre Latinoamericana, Ciudad de México",
    direccion: "Eje Central Lázaro Cárdenas 2, esq. Madero",
    horas: "lu-do 09:00-22:00", horario: "Diario 9:00 a 22:00.",
    costo: "Mirador + museo ≈ $220 adulto (precios 2025; verificar).", estancia: "45–60 min",
    dato: "Resistió los terremotos de 1957 y 1985 gracias a su cimentación de pilotes hasta capas firmes del subsuelo.",
    fotos: [["torrelatino-1", "Torre Latinoamericana vista desde la Alameda"], ["torrelatino-2", "Torre Latinoamericana desde abajo con nubes"]],
    historia: [
      { h: "Un rascacielos sobre un lago", p: ["Se construyó entre **1948 y 1956** para la aseguradora La Latinoamericana, con proyecto del arquitecto **Augusto H. Álvarez** y cálculo estructural del ingeniero **Leonardo Zeevaert**. Con 44 pisos y unos 180 m hasta la punta de su antena, fue durante años el edificio más alto de América Latina.", "El gran reto era el subsuelo blando del antiguo lago. La solución fue una cimentación con **pilotes** que llegan a capas firmes y una estructura de acero flexible. En **1957**, apenas un año después de inaugurada, un fuerte sismo derribó el Ángel de la Independencia, pero la torre quedó intacta; en **1985** volvió a resistir sin daños. Se convirtió en un símbolo de la ingeniería mexicana."] }
    ],
    lineaTiempo: [["1948", "Inicia la construcción."], ["1956", "Inauguración."], ["1957", "Resiste el sismo que derriba el Ángel."], ["1985", "Resiste el gran terremoto."]],
    arquitectura: ["Estructura de acero con fachada de vidrio y aluminio.", "Mirador en los pisos más altos, con terraza al aire libre.", "Museo con la historia de la torre y de la ciudad."],
    leyendas: [],
    curiosos: ["Se ve casi desde cualquier punto del Centro.", "Al atardecer (≈ 18:50 en octubre) se ven los volcanes si el cielo está despejado.", "Se considera un hito de la ingeniería sísmica."],
    queVer: ["Vista a Bellas Artes y la Alameda", "El Zócalo hacia el oriente", "La ciudad iluminada de noche"],
    tips: ["Vayan al atardecer o de noche, pero si llueve la visibilidad baja.", "Puede haber fila los sábados."],
    fuentes: [["Torre Latinoamericana — Wikipedia", "https://es.wikipedia.org/wiki/Torre_Latinoamericana"], ["ADN40 (2025) — horario y precios", "https://www.adn40.mx/tiempo-libre/2025-06-17/que-actividades-hay-en-la-torre-latinoamericana/"]]
  },

  artepopular: {
    nombre: "Museo de Arte Popular", cat: "museo", color: "rosa",
    coords: [19.4334, -99.1456], maps: "Museo de Arte Popular, Revillagigedo 11, Centro",
    direccion: "Revillagigedo 11 esq. Independencia, Centro (a ~150 m del hotel)",
    horas: "ma-do 10:00-18:00", horario: "Martes a domingo, 10:00 a 18:00.",
    costo: "$60 (domingo gratis; estudiantes, maestros y adultos mayores gratis con credencial).", estancia: "45–60 min",
    dato: "Ocupa un edificio art déco de 1928 que fue estación de policía y bomberos.",
    fotos: [["artepopular-1", "Vocho cubierto de chaquira huichola en el museo"], ["artepopular-2", "Huaraches artesanales tejidos en exhibición"]],
    historia: [
      { h: "Un museo para los artesanos", p: ["Abrió en **2006** para mostrar la riqueza del arte popular mexicano: textiles, cerámica, alebrijes, máscaras, juguetes, vidrio soplado, chaquira huichola y mucho más, de todas las regiones del país. Ocupa el antiguo edificio de la **Estación de Policía y Bomberos**, una construcción **art déco** de fines de los años veinte proyectada por Vicente Mendiola.", "El museo es conocido por impulsar el **Desfile de Alebrijes Monumentales**, que suele realizarse en octubre por las calles del Centro y Reforma (verifiquen si coincide con su visita). Su tienda es de las mejores para comprar artesanía auténtica."] }
    ],
    lineaTiempo: [["1928", "Se construye el edificio de bomberos."], ["2006", "Abre el museo."], ["2007 →", "Desfile anual de alebrijes monumentales."]],
    arquitectura: ["Edificio art déco con torre de reloj en la esquina.", "Patio central techado."],
    leyendas: [{ h: "Los alebrijes (tradición moderna)", p: "Pedro Linares, cartonero, contó que en un sueño febril vio criaturas fantásticas que gritaban “¡alebrijes!”. Al despertar empezó a hacerlas en cartón. Así nació, en el siglo XX, esta tradición." }],
    curiosos: ["Está a una cuadra y media del hotel.", "La tienda vende directamente piezas de artesanos.", "El vocho con chaquira huichola es una de las piezas más fotografiadas."],
    queVer: ["Vocho huichol", "Sala de alebrijes", "Tienda"],
    tips: ["Ideal si llueve en la tarde."],
    fuentes: [["Tus Buenas Noticias — horario y costo", "https://www.tusbuenasnoticias.com/amp/noticias/arte-y-cultura/2024/11/20/39053-museo-de-arte-popular-horario-costo-y-como-llegar"], ["Museo de Arte Popular — Wikipedia", "https://es.wikipedia.org/wiki/Museo_de_Arte_Popular_(Ciudad_de_M%C3%A9xico)"]]
  },

  memoria: {
    nombre: "Museo Memoria y Tolerancia", cat: "museo", color: "azul",
    coords: [19.4349, -99.1466], maps: "Museo Memoria y Tolerancia, Av. Juárez 8, Centro",
    direccion: "Av. Juárez 8, Plaza Juárez, frente a la Alameda",
    horas: "ma-vi 09:00-18:00; sa-do 10:00-19:00", horario: "Mar–vie 9:00–18:00; sáb y dom 10:00–19:00 (verificar).",
    costo: "≈ $95 adultos (reportado; verificar).", estancia: "1.5–2 h",
    dato: "Su recorrido sobre genocidios del siglo XX termina con una sala dedicada a la tolerancia y la diversidad.",
    fotos: [["memoria-1", "Edificio moderno del Museo Memoria y Tolerancia"], ["memoria-2", "Pieza en exhibición dentro del museo"]],
    historia: [
      { h: "Memoria para no repetir", p: ["Se inauguró en **2010** en la moderna Plaza Juárez, frente a la Alameda. Su primera parte, **Memoria**, recorre genocidios como el **Holocausto**, y los de Armenia, Ucrania, Camboya, Ruanda, la ex Yugoslavia, Guatemala y Darfur, con testimonios y objetos. La segunda, **Tolerancia**, invita a reflexionar sobre la discriminación, la diversidad y los derechos humanos en México. Es intenso pero muy recomendable."] }
    ],
    lineaTiempo: [["2010", "Apertura del museo."]],
    arquitectura: ["Edificio contemporáneo en la Plaza Juárez, junto a la torre de la Secretaría de Relaciones Exteriores."],
    leyendas: [],
    curiosos: ["Exhibe un vagón de tren como los usados en las deportaciones nazis.", "La Plaza Juárez se construyó donde había edificios destruidos por el sismo de 1985."],
    queVer: ["Sala del Holocausto", "Sala de Tolerancia"],
    tips: ["Requiere tiempo: no es para 20 minutos.", "Contenido fuerte; no recomendado para niños pequeños."],
    fuentes: [["Museo Memoria y Tolerancia", "https://www.myt.org.mx/"], ["Zona Turística — horarios", "https://www.zonaturistica.com/que-hacer-en/ciudad-de-mexico/ciudad-de-mexico/museo-memoria-y-tolerancia"]]
  },

  muraldiego: {
    nombre: "Museo Mural Diego Rivera", cat: "museo", color: "amarillo",
    coords: [19.4360, -99.1480], maps: "Museo Mural Diego Rivera, Balderas y Colón, Centro",
    direccion: "Balderas y Colón s/n, extremo poniente de la Alameda",
    horas: "ma-do 10:00-18:00", horario: "Martes a domingo, 10:00 a 18:00.",
    costo: "≈ $45 (domingo gratis; verificar).", estancia: "20–30 min",
    dato: "El mural pesa unas 35 toneladas y se trasladó entero, cruzando la calle, después del sismo de 1985.",
    fotos: [["muraldiego-1", "Fachada de concreto del Museo Mural Diego Rivera"]],
    historia: [
      { h: "Un museo para un solo mural", p: ["Alberga **Sueño de una tarde dominical en la Alameda Central** (1947), que Diego Rivera pintó para el restaurante del **Hotel del Prado**. Mide unos 15 m de largo y reúne a personajes de 400 años de historia de México paseando por la Alameda: Hernán Cortés, Sor Juana, Juárez, Porfirio Díaz, Madero… Al centro, la **Catrina** toma del brazo a su creador, José Guadalupe Posada, y a un Diego niño; detrás, **Frida Kahlo**.", "Rivera escribió en el mural la frase “**Dios no existe**”, que causó escándalo y hasta un ataque al mural; estuvo cubierto años hasta que el pintor la cambió en 1956. El hotel quedó dañado en el **sismo de 1985** y el mural se trasladó en una operación de ingeniería al museo construido para él, inaugurado en **1988**."] }
    ],
    lineaTiempo: [["1947", "Rivera pinta el mural."], ["1956", "Rivera modifica la frase polémica."], ["1985", "El sismo daña el Hotel del Prado."], ["1986", "Traslado del mural."], ["1988", "Abre el museo."]],
    arquitectura: ["Edificio sobrio diseñado alrededor del mural, que ocupa una sala de doble altura."],
    leyendas: [],
    curiosos: ["La Catrina con sombrero de plumas se popularizó gracias a este mural.", "Hay un mapa que identifica a cada personaje."],
    queVer: ["El mural y su cédula con los personajes"],
    tips: ["Visita corta e ideal para combinar con la Alameda."],
    fuentes: [["Time Out México — Museo Mural Diego Rivera", "https://www.timeoutmexico.mx/ciudad-de-mexico/arte/museo-mural-diego-rivera"], ["Museo Mural Diego Rivera — Wikipedia", "https://es.wikipedia.org/wiki/Museo_Mural_Diego_Rivera"]]
  },

  franzmayer: {
    nombre: "Museo Franz Mayer", cat: "museo", color: "verde",
    coords: [19.4377, -99.1440], maps: "Museo Franz Mayer, Av. Hidalgo 45, Centro",
    direccion: "Av. Hidalgo 45, Plaza de la Santa Veracruz, Centro",
    horas: "ma-vi 11:00-17:00; sa-do 11:00-18:00", horario: "Mar–vie ≈ 11:00–17:00; sáb y dom ≈ 11:00–18:00 (fuentes de 2022; verificar).",
    costo: "Verificar en boletos.franzmayer.org.mx", estancia: "1 h",
    dato: "Tiene la colección de artes decorativas más importante de México: platería, talavera, muebles y textiles.",
    fotos: [["franzmayer-1", "Sala con muebles virreinales y biombo"], ["franzmayer-2", "Vitrinas con colección de platería"]],
    historia: [
      { h: "El coleccionista y el hospital", p: ["**Franz Mayer** (1882–1975) fue un financiero nacido en Alemania que se naturalizó mexicano y dedicó su vida a coleccionar arte. Dejó su colección a México y el museo abrió en **1986** en el antiguo **Hospital de San Juan de Dios**, un edificio virreinal frente a la Plaza de la Santa Veracruz. Su claustro, con fuente y cafetería, es uno de los rincones más tranquilos del Centro."] }
    ],
    lineaTiempo: [["s. XVI–XVIII", "Hospital de San Juan de Dios."], ["1975", "Muere Franz Mayer y lega su colección."], ["1986", "Abre el museo."]],
    arquitectura: ["Claustro virreinal con arcos y fuente central."],
    leyendas: [],
    curiosos: ["Cada año presenta la exposición de fotoperiodismo World Press Photo.", "Su cafetería en el claustro es muy agradable."],
    queVer: ["Claustro", "Talavera", "Platería"],
    tips: ["Cierra relativamente temprano."],
    fuentes: [["Museo Franz Mayer", "https://franzmayer.org.mx/"], ["Pulse News Mexico (2022) — horario", "https://pulsenewsmexico.com/2022/03/01/franz-mayer-museum-opens-new-exhibition-hall/"]]
  },

  palaciopostal: {
    nombre: "Palacio Postal (edificio)", cat: "museo", color: "amarillo",
    coords: [19.4364, -99.1406], maps: "Palacio Postal, Tacuba 1, Centro",
    direccion: "Tacuba 1 esq. Eje Central, frente a Bellas Artes",
    horas: "lu-vi 08:00-16:00; sa 08:00-12:00", horario: "Según Turismo CDMX: lun–vie 8:00–16:00, sáb 8:00–12:00 (otras fuentes dan horarios más amplios; verificar).",
    costo: "Gratis", estancia: "10–15 min",
    dato: "Sigue funcionando como oficina de correos desde 1907.",
    fotos: [["palaciopostal-1", "Tragaluz y barandales dorados del Palacio Postal vistos desde abajo"], ["palaciopostal-2", "Escalera de herrería dorada del Palacio Postal"]],
    historia: [
      { h: "Un palacio para las cartas", p: ["Lo diseñó **Adamo Boari**, el mismo arquitecto de Bellas Artes, con el ingeniero Gonzalo Garita. Se construyó entre **1902 y 1907** en estilo ecléctico, con influencias del gótico isabelino español y del plateresco. Su interior es espectacular: escaleras y barandales de **herrería fundida en Florencia**, mármoles y un gran tragaluz. Aún funciona como oficina de correos."] }
    ],
    lineaTiempo: [["1902", "Inicia la obra."], ["1907", "Inauguración."]],
    arquitectura: ["Fachada de cantera labrada con detalles góticos.", "Escalera monumental de bronce dorado."],
    leyendas: [],
    curiosos: ["Boari diseñó los dos edificios que se miran en esa esquina: Bellas Artes y el Palacio Postal.", "En diciembre recibe cartas a Santa y a los Reyes Magos."],
    queVer: ["Escalera y tragaluz"],
    tips: ["En la tarde del sábado probablemente esté cerrado: disfruten la fachada."],
    fuentes: [["Turismo CDMX — Palacio Postal", "https://mexicocity.cdmx.gob.mx/venues/postal-palace/?lang=es"], ["Palacio Postal — Wikipedia", "https://es.wikipedia.org/wiki/Palacio_Postal_de_la_Ciudad_de_M%C3%A9xico"]]
  },

  garibaldi: {
    nombre: "Plaza Garibaldi", cat: "noche", color: "rosa",
    coords: [19.4406, -99.1393], maps: "Plaza Garibaldi, Ciudad de México",
    direccion: "Eje Central y República de Honduras, Centro (≈ 1 km del hotel)",
    horas: "24h", horario: "Plaza abierta; más ambiente de noche. Salón Tenampa aprox. 13:00–02:00 (verificar).",
    costo: "Plaza gratis. Canciones de mariachi con costo (pregunten antes; reseñas de 2026 mencionan precios altos).", estancia: "45–60 min",
    dato: "Desde 2011 el mariachi es Patrimonio Cultural Inmaterial de la Humanidad (UNESCO).",
    aviso: "Zona con reputación de inseguridad de noche. Vayan en grupo, temprano (antes de las 22:00), con poco efectivo a la vista, acuerden precio antes de cada canción y regresen en taxi de app.",
    fotos: [["garibaldi-1", "Mariachis tocando en la Plaza Garibaldi"], ["garibaldi-2", "Escultura de mariachi en la Plaza Garibaldi de noche"]],
    historia: [
      { h: "La casa del mariachi", p: ["La plaza lleva el nombre del héroe italiano **Giuseppe Garibaldi**. En los años **veinte** llegaron de Jalisco los primeros mariachis, como el de **Cirilo Marmolejo**, que tocaban en el **Salón Tenampa**, cantina fundada en **1925**. Desde entonces la plaza se llenó de grupos que esperan a ser contratados para una serenata. En 2010 se renovó y abrió el **Museo del Tequila y el Mezcal**. En **2011** la UNESCO declaró al mariachi Patrimonio Cultural Inmaterial."] }
    ],
    lineaTiempo: [["1925", "Abre el Salón Tenampa."], ["2010", "Renovación y Museo del Tequila y el Mezcal."], ["2011", "El mariachi, patrimonio de la UNESCO."]],
    arquitectura: ["Plaza con estatuas de grandes cantantes de la música mexicana."],
    leyendas: [],
    curiosos: ["El Salón Tenampa tiene murales de ídolos como Pedro Infante y José Alfredo Jiménez.", "Los mariachis cobran por canción."],
    queVer: ["Salón Tenampa", "Estatuas de cantantes", "Museo del Tequila y el Mezcal"],
    tips: ["Acuerden el precio antes de que empiecen a tocar.", "Regresen en taxi de app."],
    fuentes: [["UNESCO — El mariachi", "https://ich.unesco.org/es/RL/el-mariachi-musica-de-cuerdas-canto-y-trompeta-00575"], ["Chilango — 100 años del Salón Tenampa", "https://www.chilango.com/comida-y-tragos/restaurantes/100-anos-salon-tenampa-celebrar-15-de-septiembre/"]]
  },

  revolucion: {
    nombre: "Monumento a la Revolución", cat: "noche", color: "verde",
    coords: [19.4362, -99.1547], maps: "Monumento a la Revolución, Plaza de la República",
    direccion: "Plaza de la República s/n, Tabacalera (≈ 1 km del hotel)",
    horas: "do-ju 12:00-20:00; vi-sa 12:00-22:00", horario: "Mirador: dom–jue 12:00–20:00; vie y sáb hasta 22:00 (según Fever; verificar).",
    costo: "Mirador ≈ $150 adulto (verificar). La plaza y las fuentes son gratis.", estancia: "30–60 min",
    dato: "Iba a ser el Palacio Legislativo de Porfirio Díaz; la Revolución dejó solo el esqueleto de acero de la cúpula.",
    fotos: [["revolucion-1", "Monumento a la Revolución iluminado en color rosa de noche"], ["revolucion-2", "Fuentes de colores frente al Monumento a la Revolución"]],
    historia: [
      { h: "Del palacio que no fue al monumento", p: ["En **1910** comenzó la construcción del **Palacio Legislativo Federal**, diseñado por el francés Émile Bénard. La Revolución detuvo la obra y durante dos décadas solo quedó la estructura metálica. En los años treinta el arquitecto **Carlos Obregón Santacilia** propuso convertir la cúpula en un monumento; se inauguró en **1938**. En sus columnas descansan los restos de **Madero, Carranza, Villa, Calles y Cárdenas**. Hoy tiene un elevador panorámico de cristal, un mirador y, abajo, el Museo Nacional de la Revolución. De noche se ilumina y las fuentes de la plaza bailan con luces."] }
    ],
    lineaTiempo: [["1910", "Inicia el Palacio Legislativo."], ["1938", "Inauguración como monumento."]],
    arquitectura: ["Cúpula de acero recubierta de piedra, sostenida por cuatro grandes arcos.", "Linternilla y mirador en lo alto."],
    leyendas: [],
    curiosos: ["Se considera uno de los arcos triunfales más altos del mundo.", "El elevador es de cristal y sube por el centro."],
    queVer: ["Plaza y fuentes de noche", "Mirador 360°"],
    tips: ["Camino recomendado: por Av. Juárez y Plaza de la República, zonas iluminadas."],
    fuentes: [["Posta — Monumento a la Revolución", "https://www.posta.com.mx/mexico/conoce-el-palacio-legislativo-que-termino-siendo-un-gran-monumento-a-la-revolucion-mexicana/vl1634562"], ["Fever — horarios", "https://feverup.com/es/ciudad-de-mexico/venue/monumento-a-la-revolucion"]]
  }
};

/* Ruta a pie sugerida para la tarde libre (≈ 3–4 h).
   Cada parada puede referirse a un lugar cercano (id) o a un restaurante (comida). */
GUIA.ruta = {
  titulo: "Ruta a pie: del hotel al Zócalo",
  duracion: "3 a 4 horas · ≈ 4 km",
  paradas: [
    { hora: "16:00", txt: "Salida del hotel hacia la **Alameda** y el Hemiciclo a Juárez.", id: "alameda" },
    { hora: "16:20", txt: "**Palacio de Bellas Artes**: fachada, explanada y, si les da tiempo, el vestíbulo y murales.", id: "bellasartes" },
    { hora: "16:50", txt: "**Casa de los Azulejos**: patio y mural de Orozco (baño y descanso).", id: "azulejos" },
    { hora: "17:10", txt: "Opcional: **Torre Latinoamericana**. Mejor al atardecer (≈ 18:50) o déjenla para el regreso.", id: "torrelatino" },
    { hora: "17:30", txt: "Caminen la **Calle Madero**: Templo de San Francisco, Palacio de Iturbide, La Profesa.", id: "madero" },
    { hora: "18:10", txt: "**Zócalo**: plaza, bandera y Palacio Nacional por fuera.", id: "zocalo" },
    { hora: "18:30", txt: "**Catedral Metropolitana**: Altar de los Reyes y la plomada.", id: "catedral" },
    { hora: "19:00", txt: "**Templo Mayor** desde los andadores de la calle.", id: "templomayor" },
    { hora: "19:30", txt: "**Cena**: Café de Tacuba (tradicional), tacos en Los Cocuyos o churros en El Moro.", comida: "tacuba" },
    { hora: "21:00", txt: "Bellas Artes iluminado y regreso por Av. Juárez al hotel (≈ 10 min).", id: "bellasartes" }
  ],
  linea: [
    [19.4341, -99.1447], [19.4347, -99.1442], [19.4349, -99.1425], [19.4352, -99.1412],
    [19.4344, -99.1408], [19.4342, -99.1403], [19.4338, -99.1385], [19.4335, -99.1360],
    [19.4331, -99.1342], [19.4326, -99.1332], [19.4340, -99.1331], [19.4346, -99.1322],
    [19.4351, -99.1318], [19.4356, -99.1330], [19.4360, -99.1360], [19.4363, -99.1380],
    [19.4364, -99.1400], [19.4352, -99.1412], [19.4347, -99.1430], [19.4341, -99.1447]
  ]
};
