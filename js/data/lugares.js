/* Fichas completas de los lugares del itinerario.
   Para editar textos no hace falta tocar app.js.
   Texto: se permite **negritas**. Las fotos se refieren por nombre (assets/img/NOMBRE.webp). */
window.GUIA = window.GUIA || {};

GUIA.lugares = {

  /* ─────────────────────────── BASÍLICA ─────────────────────────── */
  basilica: {
    nombre: "Basílica de Guadalupe",
    subtitulo: "El santuario mariano más visitado de América",
    color: "rosa",
    coords: [19.4846, -99.1172],
    direccion: "Fray Juan de Zumárraga 2, Villa Gustavo A. Madero, CDMX",
    maps: "Basílica de Santa María de Guadalupe, Ciudad de México",
    resumen: "Llegamos aquí directo del autobús. Es el corazón de la fe guadalupana: la imagen original de la Virgen, la antigua Basílica barroca, la Capilla del Pocito y el Cerrito del Tepeyac, todo a pocos pasos.",
    esencial: [
      ["Horario", "El santuario abre desde muy temprano (aprox. 6:00) hasta la noche. Verificar en el lugar."],
      ["Misas (sábado)", "Normalmente hay misas a lo largo del día, casi cada hora. El sitio oficial anuncia a diario Laudes a las 8:30 y la Misa Coral del Cabildo a las 9:00. Confirmar horarios en el módulo de informes."],
      ["Costo", "Entrada libre. Museo de la Basílica: aprox. $10 (mar–dom 10:00–17:00, verificar)."],
      ["Tiempo aquí", "3:30 a 4:00 h libres (≈ 07:30 – 11:15): desayuno, misa y recuerdos."],
      ["Teléfono", "55 5118 0500"]
    ],
    fotos: [
      ["basilica-1", "Fachada moderna de la nueva Basílica de Guadalupe con su techo inclinado"],
      ["basilica-2", "Antigua Basílica de Guadalupe, templo barroco con torres y cúpula de azulejos"],
      ["basilica-3", "Interior de la nueva Basílica con la imagen de la Virgen al fondo"],
      ["basilica-4", "Capilla del Pocito, de planta circular y cúpula de talavera azul y blanca"],
      ["basilica-5", "Capilla del Cerrito en la cima del Tepeyac con su fachada de cantera"],
      ["basilica-6", "Vista aérea del conjunto de la Basílica y el cerro del Tepeyac"],
      ["basilica-7", "Capilla de Indios, sencilla iglesia de piedra rodeada de árboles"]
    ],
    historia: [
      { h: "Antes de 1531: el cerro del Tepeyac",
        p: ["El Tepeyac es un pequeño cerro en el extremo norte de lo que fue el lago de Texcoco. En tiempos mexicas, una calzada lo unía con Tenochtitlan atravesando el agua. Cronistas del siglo XVI, como fray Bernardino de Sahagún, escribieron que en este lugar se veneraba a una deidad femenina llamada **Tonantzin**, “nuestra madre”, y que los pueblos acudían de lejos en peregrinación. Esa continuidad entre el culto antiguo y el guadalupano ha sido muy discutida por historiadores, pero ayuda a entender por qué el Tepeyac fue, desde muy temprano, un lugar de devoción popular."] },
      { h: "Las apariciones a Juan Diego",
        p: ["Según la tradición, en diciembre de **1531**, diez años después de la caída de Tenochtitlan, la Virgen María se apareció varias veces a **Juan Diego Cuauhtlatoatzin**, un indígena recién bautizado que caminaba por el Tepeyac. Ella le pidió que el obispo, **fray Juan de Zumárraga**, construyera un templo en ese lugar. El obispo pidió una señal. El **12 de diciembre**, la Virgen indicó a Juan Diego que subiera a la cima del cerro, donde encontró rosas en pleno invierno; las llevó en su ayate (una tilma o manta de fibra vegetal) y, al desplegarlo ante Zumárraga, apareció estampada la imagen que hoy se venera.",
            "El relato más conocido es el **Nican Mopohua** (“Aquí se narra”), escrito en náhuatl y atribuido a Antonio Valeriano; se publicó en 1649 por Luis Lasso de la Vega. Un año antes, en 1648, el sacerdote Miguel Sánchez había publicado la primera narración impresa en español. La historicidad de las apariciones es un tema de fe y también de debate académico; lo indiscutible es que el culto creció de forma extraordinaria en los siglos siguientes."] },
      { h: "De la ermita a la Basílica antigua",
        p: ["La primera ermita se levantó al pie del cerro poco después de 1531 y fue sustituida por templos cada vez mayores. El edificio que hoy llamamos **Basílica antigua** se construyó entre **1695 y 1709**, con proyecto del arquitecto Pedro de Arrieta: un templo barroco de planta rectangular con cuatro torres en las esquinas y una cúpula central. En 1737, tras una terrible epidemia de matlazáhuatl, la ciudad juró a la Virgen de Guadalupe como su patrona; en 1754 el papa Benedicto XIV confirmó el patronato sobre la Nueva España y fijó su fiesta el 12 de diciembre.",
            "La imagen se volvió símbolo nacional: en 1810 **Miguel Hidalgo** tomó un estandarte guadalupano al iniciar la lucha por la Independencia, y en 1895 la imagen fue coronada solemnemente. En 1904 el templo recibió el título de basílica. El 14 de noviembre de 1921, en plena tensión entre Iglesia y Estado, estalló una bomba escondida en un arreglo floral junto al altar; la imagen no sufrió daños y el **crucifijo de bronce que quedó doblado** por la explosión se conserva como recuerdo."] },
      { h: "El hundimiento y la nueva Basílica",
        p: ["El suelo de esta zona es de antiguo lecho lacustre, blando y compresible. Con los siglos y la extracción de agua del subsuelo, la Basílica antigua se fue hundiendo de forma desigual, con grietas e inclinaciones visibles (todavía hoy se nota al caminar por dentro). Ante el riesgo y la falta de espacio para los peregrinos, se encargó un nuevo santuario al arquitecto **Pedro Ramírez Vázquez** —autor también del Museo Nacional de Antropología y del Estadio Azteca—, con un equipo que incluyó a José Luis Benlliure, fray Gabriel Chávez de la Mora y otros.",
            "La **nueva Basílica** se inauguró el **12 de octubre de 1976**. Es de planta circular para que toda la asamblea pueda ver la imagen, que se colocó en el muro detrás del altar. Bajo ella corren unas **bandas móviles** que permiten a miles de personas pasar a verla de cerca sin detenerse. Su cimentación se diseñó para resistir el suelo blando. La Basílica antigua fue restaurada y hoy funciona como **Templo Expiatorio a Cristo Rey**."] },
      { h: "Juan Diego, santo, y el 12 de diciembre hoy",
        p: ["Juan Diego fue beatificado en 1990 y canonizado el **31 de julio de 2002** por el papa Juan Pablo II, en esta misma Basílica: fue el primer santo indígena de América. La Virgen de Guadalupe es patrona de México y de América, y el santuario es uno de los recintos católicos más visitados del mundo. Cada **12 de diciembre** llegan millones de peregrinos —a pie, en bicicleta, de rodillas—; desde la noche del 11 se cantan **Las Mañanitas** a la Virgen. Aunque nosotros vamos en octubre, en cualquier día del año verán grupos de peregrinos llegando con estandartes y flores."] }
    ],
    lineaTiempo: [
      ["1531", "Apariciones a Juan Diego en el Tepeyac (según la tradición)."],
      ["1648–1649", "Se publican los primeros relatos impresos: Miguel Sánchez y el Nican Mopohua."],
      ["1695–1709", "Se construye la Basílica antigua (Pedro de Arrieta)."],
      ["1737", "La Ciudad de México jura a la Virgen como patrona tras una epidemia."],
      ["1777–1791", "Se levanta la Capilla del Pocito (Francisco Guerrero y Torres)."],
      ["1810", "Hidalgo enarbola un estandarte guadalupano."],
      ["1921", "Atentado con bomba: la imagen sale ilesa."],
      ["1976", "Se inaugura la nueva Basílica (12 de octubre)."],
      ["2002", "Canonización de san Juan Diego."]
    ],
    arquitectura: [
      "**Nueva Basílica (1976):** concreto, acero y cobre. Planta circular de unos 100 m de diámetro, sin columnas interiores que estorben la vista. El gran techo inclinado se ha comparado con una tienda o un manto. Capacidad aproximada de 10 000 personas dentro.",
      "**La imagen:** está detrás del altar mayor, protegida con vidrio. Para verla de cerca, entren por los pasillos laterales que bajan a las **bandas móviles** debajo del presbiterio. Fíjense en el manto con estrellas, el ángel bajo sus pies y la luna.",
      "**Basílica antigua (1709):** barroca, de cantera gris y tezontle, con cuatro torres octagonales. Dentro se nota la inclinación del piso por el hundimiento.",
      "**Capilla del Pocito (1777–1791):** considerada una joya del barroco novohispano tardío. Planta circular y cúpulas cubiertas de **azulejo de talavera** azul y blanco. Se construyó sobre un manantial asociado a la tradición guadalupana.",
      "**Capilla del Cerrito:** en la cima del Tepeyac, donde según la tradición Juan Diego cortó las rosas. Se sube por escalinatas entre jardines; arriba hay vista de toda la zona.",
      "**Capilla de Indios:** pequeña iglesia que, según la tradición, se levantó junto a la ermita donde Juan Diego pasó sus últimos años."
    ],
    leyendas: [
      { h: "Las rosas de Castilla (tradición)", p: "La tradición cuenta que en la cima árida del Tepeyac, en pleno diciembre, Juan Diego encontró rosas de Castilla, flores que no crecían ahí. Por eso las rosas son el símbolo guadalupano por excelencia y verán ofrendas de flores por todas partes." },
      { h: "Los ojos de la imagen (creencia popular)", p: "Circula la creencia de que en los ojos de la Virgen se reflejan figuras humanas. Es una afirmación popular sin consenso científico; tómenla como parte del folclor que rodea a la imagen." },
      { h: "El agua del Pocito (tradición)", p: "Se dice que el manantial del Pocito brotó donde se posó la Virgen y que su agua tenía propiedades curativas. Durante siglos los peregrinos se llevaban agua de ahí." }
    ],
    curiosos: [
      "La imagen original mide cerca de 1.7 m de alto y lleva casi cinco siglos expuesta.",
      "El crucifijo de bronce doblado por la bomba de 1921 se exhibe dentro de la Basílica antigua (Templo Expiatorio).",
      "La nueva Basílica fue diseñada por el mismo arquitecto del Estadio Azteca y del Museo Nacional de Antropología.",
      "El hundimiento de la Basílica antigua es visible a simple vista: comparen las líneas de la fachada con el horizonte.",
      "Juan Diego fue el primer santo indígena del continente americano (2002).",
      "Cada 12 de diciembre llegan millones de personas; es una de las mayores peregrinaciones del mundo.",
      "Las bandas móviles bajo la imagen existen para que la fila nunca se detenga.",
      "Pedro Ramírez Vázquez también diseñó el logotipo y gran parte de la imagen de los Juegos Olímpicos de México 68.",
      "El nombre de la colonia, “La Villa”, viene de la antigua Villa de Guadalupe, que fue un pueblo independiente de la ciudad."
    ],
    recorrido: [
      ["07:30 – 08:30", "Desayuno tranquilo (ver opciones en Gastronomía › Basílica). Si quieren misa temprano, desayunen después."],
      ["08:30 – 09:30", "Nueva Basílica: misa (la Misa Coral es a las 9:00) o pasen a las **bandas móviles** para ver la imagen."],
      ["09:30 – 10:00", "Basílica antigua (Templo Expiatorio): noten la inclinación y busquen el crucifijo de 1921."],
      ["10:00 – 10:40", "Suban al **Cerrito del Tepeyac** por los jardines; bajen por el otro lado hacia la **Capilla del Pocito**."],
      ["10:40 – 11:05", "Recuerdos y gorditas de La Villa para el camino. Si les sobra tiempo: Museo de la Basílica (abre 10:00)."],
      ["11:05", "Regresen al punto de reunión del autobús con margen (salida ≈ 11:15)."]
    ],
    tips: [
      "Acuerden con el grupo un punto de reunión fijo y la hora exacta de salida; la plaza es enorme.",
      "Zona muy concurrida: mochila al frente, celular guardado y cuidado con la cartera.",
      "Es un templo activo: vestimenta respetuosa, sin gorra dentro y silencio durante las misas.",
      "Hay baños públicos con cuota (lleven monedas).",
      "La subida al Cerrito tiene escalones: calzado cómodo.",
      "Para recuerdos religiosos hay locales alrededor del atrio; compárenlos antes de comprar."
    ],
    comer: [
      "**Gorditas de La Villa:** el antojo tradicional del lugar, dulces de maíz envueltas en papel de china de colores.",
      "Tamales y atole de los puestos de la zona; fondas sobre la calle Montiel y la Calzada de Guadalupe.",
      "Ver la lista completa en **Gastronomía › Cerca de la Basílica**."
    ],
    fuentes: [
      ["Sitio oficial de la Basílica de Guadalupe", "https://virgendeguadalupe.org.mx/"],
      ["Basílica de Guadalupe — Wikipedia", "https://es.wikipedia.org/wiki/Bas%C3%ADlica_de_Santa_Mar%C3%ADa_de_Guadalupe"],
      ["México Desconocido — Gorditas de la Villa", "https://www.mexicodesconocido.com.mx/gorditas-de-la-villa.html"],
      ["Turismo CDMX — Gustavo A. Madero", "https://mexicocity.cdmx.gob.mx/e/delicias-chilangas/gustavo-a-madero-delicias-sacras-sazon-de-barrio-y-un-tianguis-colosal/"]
    ]
  },

  /* ─────────────────────────── XOCHIMILCO ─────────────────────────── */
  xochimilco: {
    nombre: "Xochimilco",
    subtitulo: "Canales, chinampas y trajineras: lo que queda de la ciudad lacustre",
    color: "verde",
    coords: [19.2573, -99.0966],
    direccion: "Embarcaderos de Xochimilco (el tour elige el embarcadero; el más grande es Nuevo Nativitas)",
    maps: "Embarcadero Nuevo Nativitas, Xochimilco",
    resumen: "Paseo de unas 2 horas en trajinera por los canales. Es Patrimonio de la Humanidad desde 1987 y uno de los últimos restos vivos del sistema de lagos sobre el que se fundó la ciudad.",
    esencial: [
      ["Horario", "Los embarcaderos operan de día, aprox. 8:00 a 18:00 (verificar)."],
      ["Costo", "Tarifa oficial ≈ $750 por hora por trajinera (hasta 18 personas). Probablemente incluida en el tour."],
      ["Tiempo aquí", "≈ 2 h de recorrido (≈ 12:15 – 14:15, según el tráfico)."],
      ["Reglas", "Máximo 3 cervezas por persona o una botella de 1 litro. Prohibido pasarse de una trajinera a otra."]
    ],
    fotos: [
      ["xochimilco-1", "Trajineras de colores alineadas en un embarcadero de Xochimilco"],
      ["xochimilco-2", "Trajinera con arco pintado de colores brillantes navegando"],
      ["xochimilco-3", "Canal tranquilo bordeado de ahuejotes y chinampas"],
      ["xochimilco-4", "Ajolote rosado, anfibio endémico de Xochimilco"],
      ["xochimilco-5", "Muñecas colgadas de los árboles en la Isla de las Muñecas"],
      ["xochimilco-6", "Mariachis tocando junto a una trajinera en los canales"]
    ],
    historia: [
      { h: "El lugar de las flores",
        p: ["El nombre viene del náhuatl **xōchitl** (flor), **mīlli** (campo de cultivo) y **-co** (lugar): “el lugar de la sementera de flores”. Las crónicas indígenas cuentan que los **xochimilcas** fueron el primero de los siete pueblos nahuas que, según la tradición, salieron de Chicomóztoc y llegaron al valle de México. Se asentaron en la orilla sur, junto al lago de agua dulce que lleva su nombre, siglos antes de que existiera Tenochtitlan."] },
      { h: "Una ciudad sobre el agua",
        p: ["El valle de México era una cuenca cerrada con cinco lagos conectados: Zumpango, Xaltocan, Texcoco (salado), Xochimilco y Chalco (estos dos de agua dulce). Para cultivar en ese ambiente, los pueblos del valle perfeccionaron las **chinampas**: parcelas artificiales construidas con capas alternadas de lodo del fondo del lago y vegetación, sujetas con estacas y con árboles de **ahuejote** plantados en las orillas, cuyas raíces las amarran. El resultado es un suelo fértil y siempre húmedo que permite varias cosechas al año de maíz, frijol, chile, calabaza, flores y hortalizas.",
            "Hacia **1430**, los mexicas, ya aliados con Texcoco y Tlacopan, sometieron a Xochimilco. Desde entonces sus chinampas abastecieron a **México-Tenochtitlan**: canoas cargadas de alimentos y flores cruzaban el lago hasta los mercados de la gran ciudad. Los xochimilcas eran célebres también como hábiles constructores y labradores de piedra."] },
      { h: "Del virreinato al siglo XX",
        p: ["Tras la Conquista, los españoles fueron desecando los lagos para evitar inundaciones, un proceso que duró siglos. Xochimilco conservó sus canales y siguió siendo la huerta de la ciudad: por el **Canal de la Viga** llegaban trajineras con verduras y flores hasta muy cerca del Centro, tradición que se mantuvo hasta principios del siglo XX. La palabra **trajinera** viene precisamente de “trajinar”, acarrear mercancía.",
            "Con el crecimiento urbano, los manantiales de Xochimilco se canalizaron para dar agua potable a la capital (a inicios del siglo XX), y los canales empezaron a secarse y contaminarse. Desde entonces se han hecho rescates con aguas tratadas. En 1968 se construyó en Cuemanco la **pista de canotaje Virgilio Uribe** para los Juegos Olímpicos."] },
      { h: "Patrimonio de la Humanidad",
        p: ["En **1987** la UNESCO inscribió el “Centro Histórico de México y **Xochimilco**” en la Lista del Patrimonio Mundial, reconociendo el paisaje de canales y chinampas como testimonio único de la ocupación lacustre prehispánica. En 2004 parte de sus humedales fue declarada sitio Ramsar, y en 2017 la FAO reconoció el sistema de chinampas de la Ciudad de México como **Sistema Importante del Patrimonio Agrícola Mundial**. Hoy conviven el paseo turístico de fin de semana —mariachis, comida, música— con familias que siguen cultivando chinampas de forma tradicional."] },
      { h: "El ajolote, símbolo en peligro",
        p: ["El **ajolote** (*Ambystoma mexicanum*) es un anfibio que solo vive de forma natural en los canales de Xochimilco. Conserva toda su vida rasgos de larva, como sus branquias en forma de plumas, y es famoso por **regenerar** patas, cola e incluso partes de órganos. Para los mexicas estaba ligado al dios Xólotl. Hoy está **en peligro crítico** por la contaminación, la urbanización y las especies introducidas (carpas y tilapias). Existen chinampas-refugio donde se protege su hábitat."] }
    ],
    lineaTiempo: [
      ["s. XII–XIII", "Los xochimilcas se asientan en la orilla sur del valle (según las crónicas)."],
      ["≈ 1430", "Los mexicas someten a Xochimilco; sus chinampas abastecen a Tenochtitlan."],
      ["1521 →", "Comienza la desecación paulatina de los lagos."],
      ["s. XIX", "Trajineras llevan flores y verduras al Centro por el Canal de la Viga."],
      ["1968", "Pista olímpica de canotaje en Cuemanco."],
      ["1987", "Patrimonio de la Humanidad (UNESCO)."],
      ["2017", "La FAO reconoce el sistema de chinampas."]
    ],
    arquitectura: [
      "**Las trajineras:** lanchas de fondo plano movidas con una pértiga larga (el remero empuja contra el fondo). Llevan una mesa larga al centro y un **arco frontal pintado** con un nombre, casi siempre de mujer.",
      "**Las chinampas:** islas rectangulares separadas por canales. Fíjense en las orillas: los **ahuejotes** son esos árboles altos y delgados plantados en fila.",
      "**Los embarcaderos:** muelles con decenas de trajineras de colores; Nuevo Nativitas es el más grande y tiene mercado de artesanías y comida.",
      "**Las lanchas de servicio:** mariachis, marimbas, vendedores de elotes, micheladas, flores y artesanías se acercan en sus propias canoas."
    ],
    leyendas: [
      { h: "La Isla de las Muñecas (leyenda)", p: "Don Julián Santana Barrera vivió décadas en una chinampa aislada. Según la historia que se cuenta, encontró a una niña ahogada en el canal y empezó a colgar muñecas para ahuyentar a su espíritu. Llenó la isla de cientos de muñecas, muchas ya deterioradas. Don Julián murió en 2001 y, según la leyenda, en el mismo canal. La isla está lejos de los recorridos cortos; normalmente no se llega en un paseo de 2 horas." },
      { h: "La Llorona (leyenda)", p: "La mujer que llora por sus hijos junto al agua es una de las leyendas más antiguas de México y se asocia mucho a los canales. En temporada de Día de Muertos suele haber una representación nocturna en Cuemanco." },
      { h: "Los nombres de las trajineras (tradición)", p: "Se dice que los remeros bautizaban sus trajineras con el nombre de su novia, esposa o madre. Lean los arcos: “Lupita”, “Rosita”, “Mi Lupe”… cada uno tiene su historia." }
    ],
    curiosos: [
      "Xochimilco tiene alrededor de 170 km de canales.",
      "Las chinampas se han usado de forma continua por más de mil años.",
      "Antes los arcos de las trajineras se adornaban con flores naturales; hoy casi todos son pintados.",
      "El ajolote puede regenerar una pata completa en semanas.",
      "La palabra “trajinera” viene de “trajinar”: acarrear mercancía.",
      "Las alegrías de amaranto se producen en Santiago Tulyehualco, pueblo de Xochimilco, que celebra cada año la Feria de la Alegría y el Olivo.",
      "La pista de canotaje de Cuemanco se construyó para los Juegos Olímpicos de 1968.",
      "Xochimilco es uno de los principales productores de plantas y flores de la ciudad; en Cuemanco hay un mercado enorme de plantas."
    ],
    recorrido: [
      ["Al llegar", "Elijan lugar en la mesa de la trajinera; compren agua o refresco en el embarcadero si no llevan."],
      ["0:00 – 0:40", "Canal principal: la parte más animada, con mariachis y lanchas de comida. Buen momento para fotos de las trajineras de colores."],
      ["0:40 – 1:20", "Si el remero entra a canales laterales, verán chinampas cultivadas y ahuejotes."],
      ["1:20 – 2:00", "Antojitos de las lanchas (elotes, quesadillas, esquites) y, si quieren, una canción de mariachi. Regreso al embarcadero."]
    ],
    tips: [
      "Pregunten el **precio antes** de pedir canciones o comida a las lanchas; se paga a cada vendedor.",
      "Lleven **efectivo** en billetes chicos.",
      "Bloqueador y gorra: el sol pega fuerte en el agua. Y algo para lluvia por si la tarde se nubla.",
      "No se pongan de pie ni se pasen de una trajinera a otra (está prohibido y es peligroso).",
      "Guarden el celular en bolsa impermeable o con cuidado en los bordes.",
      "Hay baños en el embarcadero (con cuota)."
    ],
    comer: [
      "**En la trajinera:** elotes y esquites, quesadillas y tlacoyos hechos al momento en lanchas con comal, micheladas, aguas frescas.",
      "**En el embarcadero:** puestos de antojitos y mercado. En Xochimilco son típicas las **alegrías de amaranto** y los dulces de Tulyehualco.",
      "Ver **Gastronomía › Xochimilco**."
    ],
    fuentes: [
      ["UNESCO — Historic Centre of Mexico City and Xochimilco", "https://whc.unesco.org/en/list/412"],
      ["FAO — Chinampas de la Ciudad de México (SIPAM)", "https://www.fao.org/giahs/giahs-around-the-world/mexico-chinampa-system/es"],
      ["Xochimilco — Wikipedia", "https://es.wikipedia.org/wiki/Xochimilco"],
      ["Ambystoma mexicanum — Wikipedia", "https://es.wikipedia.org/wiki/Ambystoma_mexicanum"]
    ]
  },

  /* ─────────────────────────── CHAPULTEPEC ─────────────────────────── */
  chapultepec: {
    nombre: "Castillo de Chapultepec",
    subtitulo: "Museo Nacional de Historia: cerro sagrado, palacio virreinal, colegio militar y residencia imperial",
    color: "azul",
    coords: [19.4204, -99.1819],
    direccion: "Primera Sección del Bosque de Chapultepec, Miguel Hidalgo, CDMX",
    maps: "Castillo de Chapultepec, Ciudad de México",
    resumen: "El único castillo de América que fue residencia de monarcas. Desde su terraza se ve el Paseo de la Reforma. El domingo la entrada es libre para mexicanos y residentes con identificación.",
    esencial: [
      ["Horario", "Martes a domingo, 9:00 a 17:00."],
      ["Costo", "**Domingo: entrada libre** para mexicanos y extranjeros residentes (llevar INE/identificación). Gratis siempre: estudiantes y maestros con credencial vigente, menores de 13 y mayores de 60."],
      ["Tiempo aquí", "≈ 3 h con desayuno (≈ 08:30 – 11:30)."],
      ["Subida", "A pie ≈ 15 min por una rampa empinada. Hay un trenecito con costo."],
      ["Cafetería", "“La Emperatriz”, dentro del castillo (abrió en marzo de 2026), mar–dom 9:00–17:00; requiere entrada al museo."]
    ],
    fotos: [
      ["chapultepec-1", "Vista aérea del Castillo de Chapultepec en lo alto del cerro rodeado de bosque"],
      ["chapultepec-2", "Galería de vitrales con figuras de diosas en el castillo"],
      ["chapultepec-3", "Jardín del Alcázar con setos y fuente, en la parte alta del castillo"],
      ["chapultepec-4", "Patio central del castillo con arcos y visitantes"],
      ["chapultepec-5", "Obelisco a los Niños Héroes entre los árboles del bosque"],
      ["chapultepec-6", "Salón de música del Alcázar con piano, candelabro y retratos"]
    ],
    historia: [
      { h: "El cerro del chapulín",
        p: ["**Chapultepec** significa en náhuatl “en el cerro del chapulín” (*chapolin*, chapulín; *tepetl*, cerro). Fue habitado desde hace muchos siglos por sus **manantiales** de agua dulce. Los mexicas se establecieron aquí en su larga migración, a fines del siglo XIII, pero fueron expulsados por los pueblos vecinos; años después fundarían Tenochtitlan en un islote del lago.",
            "Ya como potencia, los gobernantes mexicas convirtieron el cerro en lugar sagrado y de recreo: hicieron estanques, jardines y tallaron sus **retratos en la roca** (aún queda, muy erosionado, el de Moctezuma II). A mediados del siglo XV, durante el gobierno de Moctezuma Ilhuicamina y con la intervención de **Nezahualcóyotl** de Texcoco, se construyó un **acueducto** que llevaba el agua de estos manantiales hasta Tenochtitlan."] },
      { h: "El palacio virreinal (1785)",
        p: ["En el virreinato el acueducto se reconstruyó con arcos (su remate fue la fuente del Salto del Agua). En **1785**, el virrey **Bernardo de Gálvez** —héroe de la guerra de independencia de Estados Unidos contra los británicos— ordenó levantar en la cima una casa de descanso con aspecto de fortaleza. Gálvez murió en 1786 y la obra quedó inconclusa; la Corona llegó a sospechar que pretendía hacerse fuerte ahí. El edificio pasó años abandonado hasta que lo compró el Ayuntamiento."] },
      { h: "El Colegio Militar y los Niños Héroes (1847)",
        p: ["Desde la década de 1840 el edificio alojó al **Colegio Militar**. Durante la guerra con Estados Unidos, el **13 de septiembre de 1847**, el ejército estadounidense atacó el cerro, última defensa antes de la capital. Lo defendían tropas al mando del general Nicolás Bravo, el **Batallón de San Blas** —cuyo comandante, Felipe Santiago Xicoténcatl, murió en la ladera— y un grupo de cadetes.",
            "Seis de ellos murieron y la memoria nacional los recuerda como los **Niños Héroes**: Juan de la Barrera, Juan Escutia, Francisco Márquez, Agustín Melgar, Fernando Montes de Oca y Vicente Suárez. La imagen de Juan Escutia envolviéndose en la bandera y lanzándose al vacío es una **versión popular** cuya exactitud discuten los historiadores. Al pie del cerro está el **Altar a la Patria** (1952), con seis columnas en su honor."] },
      { h: "Maximiliano y Carlota (1864–1867)",
        p: ["Con el Segundo Imperio, **Maximiliano de Habsburgo** y su esposa **Carlota de Bélgica** eligieron el castillo como residencia y lo remodelaron con arquitectos europeos: terrazas, jardines en la parte alta y habitaciones decoradas al gusto de la época. Lo llamaron Castillo de **Miravalle**. Para unirlo con el Centro trazaron un gran paseo arbolado, el **Paseo de la Emperatriz**, que después de la caída del Imperio y del fusilamiento de Maximiliano en 1867 se rebautizó como **Paseo de la Reforma**."] },
      { h: "Porfirio Díaz, los presidentes y el museo",
        p: ["Tras la República Restaurada, el castillo fue sede de un **observatorio astronómico** y, sobre todo, residencia presidencial. **Porfirio Díaz** lo usó largas temporadas y le añadió lujos como los célebres **vitrales** de la galería, fabricados en París, con figuras de diosas clásicas. Siguieron viviendo aquí varios presidentes posrevolucionarios hasta que **Lázaro Cárdenas** trasladó la residencia oficial a Los Pinos en los años treinta y decretó convertir el castillo en museo.",
            "El **Museo Nacional de Historia** abrió el **27 de septiembre de 1944**. Recorre la historia de México desde la Conquista hasta el siglo XX y conserva los aposentos del Alcázar tal como los usaron Maximiliano, Carlota y Díaz. Tiene murales de **Juan O'Gorman** (Retablo de la Independencia), **David Alfaro Siqueiros** (Del porfirismo a la Revolución), **José Clemente Orozco**, **Jorge González Camarena** y, en el techo de la escalera, el de **Gabriel Flores** dedicado a los Niños Héroes."] }
    ],
    lineaTiempo: [
      ["s. XIII", "Los mexicas se asientan brevemente en el cerro y son expulsados."],
      ["s. XV", "Acueducto de Chapultepec a Tenochtitlan (Nezahualcóyotl)."],
      ["1785", "Bernardo de Gálvez inicia el palacio."],
      ["1840s", "Se instala el Colegio Militar."],
      ["1847", "Batalla de Chapultepec y los Niños Héroes (13 de septiembre)."],
      ["1864–1867", "Residencia de Maximiliano y Carlota."],
      ["1884–1911", "Residencia de Porfirio Díaz (vitrales, remodelaciones)."],
      ["1944", "Se inaugura el Museo Nacional de Historia."],
      ["2026", "Abre la cafetería La Emperatriz (marzo)."]
    ],
    arquitectura: [
      "**Dos partes:** abajo y al frente, las salas del museo (antiguo colegio y palacio); arriba, el **Alcázar**, con las habitaciones imperiales y presidenciales alrededor de un jardín.",
      "**Galería de vitrales:** cinco grandes vitrales con diosas grecorromanas (Pomona, Flora, Hebe, Ceres y Diana), de época porfiriana. Con sol de mañana brillan especialmente.",
      "**Terrazas:** desde el Alcázar hay vista al bosque y al Paseo de la Reforma, que corre en línea recta hacia el Centro.",
      "**Torre del Caballero Alto:** la torre más alta del conjunto, antiguo observatorio.",
      "**Interiores:** mobiliario original del siglo XIX, el comedor, la sala de música y el baño de Carlota. En la sala de carruajes se exhibe la carroza de Maximiliano.",
      "**El cerro:** la subida a pie pasa junto a rocas, ahuehuetes centenarios y monumentos."
    ],
    leyendas: [
      { h: "Juan Escutia y la bandera (versión popular)", p: "La escena del cadete que se arroja envuelto en la bandera para que no cayera en manos enemigas es parte de la memoria nacional y aparece en el mural del techo de la escalera. Los historiadores señalan que no hay testimonios de la época que la confirmen." },
      { h: "Carlota y el castillo", p: "Se cuenta que Carlota pasaba horas en la terraza mirando hacia la ciudad por el paseo que lleva su nombre. Tras la caída del Imperio vivió casi 60 años más en Europa, recluida y enferma; murió en 1927." },
      { h: "El ahuehuete “El Sargento”", p: "En el bosque hay ahuehuetes de cientos de años; la tradición dice que algunos ya estaban aquí en tiempos de Moctezuma. El ahuehuete es el árbol nacional de México." }
    ],
    curiosos: [
      "Es el único castillo de América que fue residencia de soberanos (Maximiliano y Carlota).",
      "Bernardo de Gálvez, quien lo inició, tiene una ciudad con su nombre en Texas: Galveston.",
      "El Paseo de la Reforma nació como un camino para que la emperatriz llegara al Centro.",
      "El Bosque de Chapultepec tiene más de 800 hectáreas divididas en cuatro secciones.",
      "En el castillo funcionó un observatorio astronómico en el siglo XIX.",
      "El castillo ha aparecido en varias películas, como “Romeo + Julieta” (1996).",
      "Los vitrales se fabricaron en París a inicios del siglo XX.",
      "El museo guarda la carroza de Maximiliano y el carruaje austero de Benito Juárez.",
      "Dentro del bosque está el Museo del Axolote, por si se quedaron con ganas de ver ajolotes."
    ],
    recorrido: [
      ["08:00 – 08:30", "Traslado del hotel al bosque."],
      ["08:30 – 09:15", "**Desayuno** antes de que abra el castillo (ver Gastronomía › Chapultepec) o subida tranquila a pie."],
      ["09:00", "Abre el museo: entren de los primeros para evitar filas (el domingo es el día más concurrido)."],
      ["09:15 – 10:00", "**Alcázar** primero (parte alta): habitaciones, terraza con vista a Reforma y galería de vitrales."],
      ["10:00 – 10:45", "Salas del museo y murales (O'Gorman, Siqueiros) y el techo de la escalera de los Niños Héroes. Si no desayunaron, **La Emperatriz** está dentro."],
      ["10:45 – 11:30", "Bajada a pie, foto en el **Altar a la Patria** y regreso al autobús."]
    ],
    tips: [
      "**Lleven INE o identificación**: es lo que permite la entrada libre del domingo.",
      "Revisión de mochilas a la entrada; no se permiten alimentos dentro de las salas.",
      "La rampa de subida es empinada: calzado cómodo.",
      "El domingo hay mucha gente: lleguen a la apertura (9:00).",
      "El castillo abre a las 9:00 y el grupo sale a las 8:00: desayunen primero o planeen hacerlo en La Emperatriz.",
      "Fotos permitidas sin flash; no se permiten tripiés."
    ],
    comer: [
      "**La Emperatriz** (dentro del castillo): desayunos y café con vista al bosque; precio aprox. $250 por persona. Requiere entrada al museo.",
      "Puestos y cafés alrededor de la entrada del bosque (metro Chapultepec) y en la calzada.",
      "Ver **Gastronomía › Chapultepec**."
    ],
    fuentes: [
      ["Museo Nacional de Historia (INAH)", "https://mnh.inah.gob.mx/"],
      ["Castillo de Chapultepec — Wikipedia", "https://es.wikipedia.org/wiki/Castillo_de_Chapultepec"],
      ["México Desconocido — La Emperatriz", "https://www.mexicodesconocido.com.mx/la-emperatriz.html"],
      ["CDMX Secreta — Cafetería La Emperatriz", "https://cdmxsecreta.com/cafeteria-castillo-de-chapultepec-la-emperatriz/"]
    ]
  },

  /* ─────────────────────────── TEOTIHUACÁN ─────────────────────────── */
  teotihuacan: {
    nombre: "Zona Arqueológica de Teotihuacán",
    subtitulo: "“El lugar donde se hacen los dioses”: la gran metrópoli del México antiguo",
    color: "amarillo",
    coords: [19.6925, -98.8438],
    direccion: "San Juan Teotihuacán, Estado de México (≈ 50 km al noreste de la CDMX)",
    maps: "Zona Arqueológica de Teotihuacán",
    resumen: "Una de las ciudades más grandes del mundo en su época. Caminaremos por la Calzada de los Muertos entre la Pirámide del Sol y la de la Luna. Mucho sol y mucha caminata.",
    aviso: "No se permite subir a la Pirámide del Sol ni a otras estructuras. Desde abril de 2026 el acceso a la Pirámide de la Luna se mantiene cerrado “hasta nuevo aviso” (verificar estado al llegar).",
    esencial: [
      ["Horario", "Todos los días, 8:00 a 17:00 (último acceso 30 min antes del cierre)."],
      ["Costo", "General $210. Mexicanos y residentes con identificación: 50 % de descuento. **Domingo: gratis para público nacional** (llevar INE)."],
      ["Tiempo aquí", "≈ 2 h de visita + comida afuera."],
      ["Prohibido", "Subir a las pirámides, volar drones, introducir alimentos a las estructuras."]
    ],
    fotos: [
      ["teotihuacan-1", "Pirámide del Sol vista desde la Calzada de los Muertos con montañas detrás"],
      ["teotihuacan-2", "Pirámide de la Luna con su escalinata central"],
      ["teotihuacan-3", "Calzada de los Muertos con plataformas escalonadas a los lados"],
      ["teotihuacan-4", "Cabeza de serpiente emplumada en el Templo de Quetzalcóatl"],
      ["teotihuacan-5", "Patio porticado del Palacio de Quetzalpapálotl con pilares labrados"],
      ["teotihuacan-6", "Detalle de mural teotihuacano en tonos rojos con figuras humanas"]
    ],
    historia: [
      { h: "Una metrópoli de hace 2 000 años",
        p: ["Teotihuacán comenzó a crecer como ciudad poco antes de nuestra era y alcanzó su máximo esplendor entre los **siglos III y VI d. C.** Llegó a ocupar unos **20 km²** y se estima que tuvo entre **100 000 y 125 000 habitantes** (algunos cálculos dan más), lo que la convirtió en una de las ciudades más grandes del mundo en su tiempo, comparable con las grandes urbes de Asia y el Mediterráneo.",
            "No sabemos cómo se llamaba la ciudad ni qué lengua hablaban sus habitantes. El nombre **Teotihuacan** se lo dieron los mexicas siglos después, cuando ya estaba en ruinas: suele traducirse como “**el lugar donde se hacen los dioses**” o “donde los hombres se convierten en dioses”. También los nombres de las pirámides y de la calzada son mexicas."] },
      { h: "Una ciudad planeada",
        p: ["Teotihuacán se trazó con un plan urbano notable, orientado unos 15.5° al este del norte. Su eje es la **Calzada de los Muertos**, de más de 2 km visibles hoy (originalmente más larga), que va desde la Pirámide de la Luna hasta más allá de la Ciudadela. Los mexicas creyeron que las plataformas que la bordean eran tumbas; de ahí su nombre.",
            "La **Pirámide del Sol** se construyó hacia el **año 200 d. C.**; mide unos **64 m de alto** y unos 225 m por lado en la base, una de las mayores de Mesoamérica. En 1971 se descubrió debajo de ella una cueva y un túnel que debieron tener gran significado ritual. La **Pirámide de la Luna**, al norte, se construyó en **siete etapas** superpuestas; las excavaciones encontraron en su interior ofrendas y entierros de sacrificio.",
            "En la **Ciudadela** está el **Templo de la Serpiente Emplumada** (Quetzalcóatl), con sus cabezas de serpiente rodeadas de plumas alternando con tocados. Bajo él se hallaron más de un centenar de entierros de sacrificio, y en 2003 el arqueólogo Sergio Gómez descubrió un **túnel** sellado con miles de ofrendas e incluso mercurio líquido."] },
      { h: "Vida cotidiana y alcance",
        p: ["Más allá de los templos, la mayoría de la gente vivía en **conjuntos departamentales** de piedra con patios, pintados con murales. Había **barrios de extranjeros**, como uno de origen zapoteca (de Oaxaca) y otro de comerciantes con vínculos con la costa del Golfo y el área maya. La ciudad controlaba el comercio de **obsidiana**, el “vidrio volcánico” con que se hacían navajas y herramientas, y su influencia llegó hasta Guatemala: en ciudades mayas como Tikal hay evidencias de contacto teotihuacano hacia el año 378.",
            "Los **murales** son una joya: en Tepantitla, el llamado **Tlalocan** muestra figuras jugando, nadando y cantando en un paraíso acuático; en Tetitla y Atetelco hay jaguares, coyotes y guerreros. El estilo arquitectónico de **talud-tablero** (muro inclinado coronado por un panel vertical) se volvió marca de Teotihuacán en toda Mesoamérica."] },
      { h: "El abandono y la memoria mexica",
        p: ["Hacia el **siglo VI**, el centro ceremonial sufrió un gran incendio y la ciudad empezó a despoblarse; las causas se discuten (conflictos internos, crisis política, sequías). Para el siglo VII ya había perdido su papel de gran capital, aunque nunca quedó del todo vacía.",
            "Cuando los mexicas llegaron, siglos después, la vieron como una ciudad de gigantes y dioses. Según el relato recogido por fray Bernardino de Sahagún, aquí se reunieron los dioses para crear el **Quinto Sol**: el humilde **Nanahuatzin** se arrojó a una hoguera y se convirtió en el Sol, y **Tecuciztécatl**, que dudó, se volvió la Luna."] },
      { h: "Arqueología moderna y Patrimonio Mundial",
        p: ["Entre **1905 y 1910**, Leopoldo Batres reconstruyó la Pirámide del Sol para las fiestas del Centenario de la Independencia, con métodos hoy muy criticados porque retiró varios metros del revestimiento original. Entre 1917 y 1922 **Manuel Gamio** dirigió un estudio pionero de la región, y en los años sesenta el **Proyecto Teotihuacán** reconstruyó gran parte de la Calzada y el Palacio de Quetzalpapálotl. En **1987** la UNESCO la declaró **Patrimonio de la Humanidad**. Hoy es la zona arqueológica más visitada de México."] }
    ],
    lineaTiempo: [
      ["≈ 100 a. C.", "Comienza a formarse la ciudad."],
      ["≈ 200 d. C.", "Se construyen la Pirámide del Sol y el Templo de la Serpiente Emplumada."],
      ["200–550", "Época de esplendor; 100 000+ habitantes."],
      ["378", "Contacto teotihuacano registrado en Tikal (área maya)."],
      ["≈ 550", "Incendio del centro ceremonial; inicia el declive."],
      ["s. XIV–XV", "Los mexicas la veneran y le dan su nombre."],
      ["1905–1910", "Batres reconstruye la Pirámide del Sol."],
      ["1962–1964", "Proyecto Teotihuacán."],
      ["1987", "Patrimonio de la Humanidad (UNESCO)."],
      ["2026", "Pirámide de la Luna cerrada al acceso desde abril."]
    ],
    arquitectura: [
      "**Talud-tablero:** busquen en las plataformas el muro inclinado (talud) con el panel recto (tablero) encima. Es la “firma” teotihuacana.",
      "**Piedritas incrustadas:** en algunos muros verán pequeñas piedras en las juntas; las colocaron los restauradores del siglo XX para marcar qué partes son reconstruidas.",
      "**Pirámide del Sol:** de piedra y relleno de tierra y adobe, originalmente recubierta de estuco pintado de rojo. Se ve mejor desde la Calzada y de lado.",
      "**Templo de la Serpiente Emplumada:** el edificio más decorado; las cabezas conservan restos de pintura.",
      "**Palacio de Quetzalpapálotl:** patio con pilares labrados con aves-mariposa de ojos de obsidiana (cerca de la Pirámide de la Luna).",
      "**Murales:** colores rojos, verdes y ocres hechos con pigmentos minerales; hay murales en varios conjuntos y en el Museo de los Murales Teotihuacanos."
    ],
    leyendas: [
      { h: "El nacimiento del Quinto Sol (mito mexica)", p: "Los dioses se reunieron en Teotihuacán en la oscuridad. El rico Tecuciztécatl se ofreció para convertirse en Sol, pero cuatro veces dudó ante el fuego; el pobre y enfermo Nanahuatzin se lanzó sin miedo y renació como Sol. Avergonzado, Tecuciztécatl lo siguió y se convirtió en la Luna. Para que se movieran, los dioses se sacrificaron." },
      { h: "La “energía” del equinoccio (creencia popular)", p: "Cada 21 de marzo miles de personas vestidas de blanco acuden a “cargarse de energía”. Es una costumbre moderna; no hay evidencia de que los teotihuacanos tuvieran ese ritual." },
      { h: "Los gigantes (creencia antigua)", p: "Cronistas coloniales recogieron la creencia de que la ciudad la habían construido gigantes, por el tamaño de las pirámides y los huesos fósiles de animales grandes que aparecían en la región." }
    ],
    curiosos: [
      "Nadie sabe cómo llamaban sus habitantes a la ciudad ni qué idioma hablaban.",
      "Los nombres “Sol”, “Luna” y “Calzada de los Muertos” son de los mexicas, que llegaron siglos después.",
      "En el túnel bajo el Templo de la Serpiente Emplumada se encontró mercurio líquido.",
      "La ciudad entera sigue una orientación de unos 15.5° al este del norte.",
      "La Pirámide del Sol estuvo pintada de rojo brillante.",
      "En 1971 se descubrió una cueva debajo de la Pirámide del Sol.",
      "Hubo barrios de oaxaqueños y de comerciantes de otras regiones: era una ciudad multiétnica.",
      "La obsidiana verde-dorada de la región (de la Sierra de las Navajas) se intercambiaba por toda Mesoamérica.",
      "Es la zona arqueológica más visitada del país."
    ],
    recorrido: [
      ["0:00 – 0:20", "Entrada y foto panorámica. Si entran por la Ciudadela (Puerta 1), vean primero el **Templo de la Serpiente Emplumada**."],
      ["0:20 – 1:00", "Caminen por la **Calzada de los Muertos** hacia el norte; deténganse frente a la **Pirámide del Sol** (no se sube)."],
      ["1:00 – 1:30", "Sigan hasta la plaza de la **Pirámide de la Luna** (acceso a la estructura cerrado) y entren al **Palacio de Quetzalpapálotl**."],
      ["1:30 – 2:00", "Regreso al punto de reunión; si hay tiempo, el museo de sitio cerca de la Pirámide del Sol."]
    ],
    tips: [
      "**INE**: el domingo la entrada es gratis para nacionales con identificación.",
      "Gorra, bloqueador, lentes de sol y **agua**: casi no hay sombra y estamos a ~2 300 m de altitud.",
      "Calzado cómodo: se caminan fácilmente 3–5 km.",
      "Si se nubla, lleven impermeable: las tormentas de la tarde llegan rápido y no hay dónde cubrirse.",
      "Los vendedores ofrecen silbatos de jaguar, obsidiana y artesanías; regateo amable.",
      "Prohibido volar drones y subir a las estructuras."
    ],
    comer: [
      "La comida es en los restaurantes de afuera (el tour elige). Típico de la región: **barbacoa de borrego** con consomé, **pulque**, **xoconostle** en salsas y, según temporada, **escamoles** o **chinicuiles**.",
      "**La Gruta**, restaurante dentro de una cueva natural a ~200 m de la Puerta 5, funciona desde 1926 (verificar horario).",
      "Ver **Gastronomía › Teotihuacán**."
    ],
    fuentes: [
      ["INAH — Zona Arqueológica de Teotihuacan", "https://www.inah.gob.mx/zonas/146-zona-arqueologica-de-teotihuacan"],
      ["UNESCO — Pre-Hispanic City of Teotihuacan", "https://whc.unesco.org/en/list/414"],
      ["La Jornada (abr. 2026) — Reapertura; Pirámide de la Luna cerrada", "https://www.jornada.com.mx/noticia/2026/04/21/estados/reabren-manana-teotihuacan-acceso-a-piramide-de-la-luna-permanecera-cerrado"],
      ["Teotihuacán — Wikipedia", "https://es.wikipedia.org/wiki/Teotihuacan"]
    ]
  }
};
