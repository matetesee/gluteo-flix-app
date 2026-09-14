// ==========================================================================
// GLÚTEO FLIX — datos de la app (ejercicios, entrenos, bonos, recetas, etc.)
// Contenido elaborado a partir del guion del VSL "Bumbum na Nuca" (adaptado
// y traducido al castellano).
// ==========================================================================

const BF_PROGRAM_DAYS = 21;

// ---- Pre-activación (siempre antes de cualquier entreno de glúteo) ----
const BF_PREATIVACAO = [
  { id:'pa1', name:'Almeja (Clamshell)', sets:'3 x 15-20', dica:'Acostada de lado, tronco levemente flexionado hacia adelante, cadera y rodillas flexionadas, pies juntos. Abre la rodilla de arriba como una "almeja", sostén 1-2s arriba y baja controlada.' },
  { id:'pa2', name:'Extensión de Cadera en la Pared', sets:'3 x 15-20 cada lado', dica:'Apoya las manos en la pared, un pie adelante y otro atrás. Extiende la cadera hacia atrás, sostén 2s en la contracción máxima y regresa. Después cambia de lado.' },
  { id:'pa3', name:'Paso Lateral con Mini Band', sets:'3 x 15 cada lado', dica:'Con la banda arriba de las rodillas (o en los tobillos), agáchate levemente, tronco algo inclinado hacia adelante, y da pasos hacia el costado sin perder la tensión de la banda.' },
];

// ---- Banco de ejercicios por categoría ----
const BF_EX = {
  frontal: [ // plano frontal — glúteo medio y mínimo (hip dips / lateral)
    { id:'f1', name:'Abducción de Cadera (máquina o mini band)', sets:'4 x 15-20', dica:'En el gym: máquina abductora, tronco levemente inclinado hacia adelante para enfocar la parte de arriba del glúteo. En casa: acostada de lado con mini band arriba de las rodillas.' },
    { id:'f2', name:'Abducción de Cadera Acostada', sets:'3 x 15-20 cada lado', dica:'Acostada de lado, pierna de abajo flexionada de apoyo, pierna de arriba estirada. Sube la pierna sin girar la cadera hacia atrás.' },
    { id:'f3', name:'Hip Thrust con Mini Band en la Rodilla', sets:'3 x 15', dica:'En el hip thrust tradicional, agrega la banda arriba de las rodillas y fuerza abrir la rodilla durante toda la subida — activa mucho más el lateral del glúteo.' },
    { id:'f4', name:'Monster Walk con Mini Band', sets:'3 x 12 pasos cada dirección', dica:'Banda en los tobillos, semi-agachada, da pasos amplios hacia adelante y hacia atrás manteniendo la tensión constante.' },
  ],
  sagital: [ // plano sagital — glúteo máximo (empinar)
    { id:'s1', name:'Elevación de Cadera (Hip Thrust)', sets:'4 x 12-15', dica:'Espalda apoyada en el banco, sube la cadera hasta la extensión total, aprieta el glúteo con fuerza arriba por 1-2s y baja controlada.' },
    { id:'s2', name:'Glúteo en Polea (rodilla flexionada)', sets:'3 x 15 cada lado', dica:'De pie, tobillo sujeto a la polea, rodilla flexionada, empuja la pierna hacia atrás y arriba enfocando el glúteo, no la zona lumbar.' },
    { id:'s3', name:'Patada de Glúteo en el Piso (Donkey Kick)', sets:'3 x 15-20 cada lado', dica:'Apoyada en cuatro puntos, rodilla flexionada a 90°, empuja el pie hacia el techo sin arquear la zona lumbar.' },
    { id:'s4', name:'Peso Muerto Rumano (Stiff)', sets:'3 x 12', dica:'Piernas semi-extendidas, baja el peso deslizando cerca de las piernas, sintiendo estirar el isquiotibial y el glúteo, y sube contrayendo el glúteo.' },
  ],
  unilateral: [ // isométrico / unilateral — simetría
    { id:'u1', name:'Glúteo de Pie en Polea (unilateral)', sets:'3 x 15 cada lado', dica:'Empieza siempre por el lado más débil. Sostén 2s en la contracción máxima antes de volver.' },
    { id:'u2', name:'Glúteo con Tobillera (unilateral)', sets:'3 x 15 cada lado', dica:'Boca abajo, rodilla flexionada a 90°, sube la pierna enfocando el glúteo. Empieza por el lado más débil.' },
    { id:'u3', name:'Peso Muerto Unilateral', sets:'3 x 10 cada lado', dica:'Apoyo en una pierna, baja el tronco estirando el isquiotibial mientras la pierna libre sube atrás. Ideal para corregir asimetrías.' },
    { id:'u4', name:'Zancada Búlgara', sets:'3 x 12 cada lado', dica:'Pie de atrás apoyado en un banco, baja la rodilla de adelante hasta 90°, con el tronco levemente inclinado hacia adelante para enfocar el glúteo.' },
  ],
  avancado: [ // tiempo bajo tensión — técnicas avanzadas
    { id:'a1', name:'Pico de Contracción (en el Hip Thrust)', sets:'3 x 12', dica:'Arriba del hip thrust, sostén la contracción máxima por 3-5 segundos antes de bajar. Enfoca las fibras más profundas del glúteo.' },
    { id:'a2', name:'Repeticiones Parciales (en Glúteo Polea)', sets:'3 x 15', dica:'Hacé el movimiento solo en los últimos grados de amplitud (la parte de arriba), donde el glúteo trabaja más y la cadera compensa menos.' },
    { id:'a3', name:'Super Slow (Sentadilla Sumo)', sets:'3 x 10', dica:'4 segundos en la bajada y 4 segundos en la subida. Aumenta mucho el tiempo bajo tensión y recluta más fibras del glúteo.' },
  ],
  quadriceps: [ // bono — Protocolo Cuádriceps Proporcional
    { id:'q1', name:'Sentadilla Libre (o Goblet Squat)', sets:'4 x 12', dica:'Técnica de sobrecarga progresiva: aumentá la carga o las repeticiones semana a semana, siempre con buena amplitud.' },
    { id:'q2', name:'Prensa (o Zancada Frontal en Casa)', sets:'3 x 15', dica:'Pies más abajo en la plataforma para enfocar cuádriceps sin sobrecargar demasiado el glúteo.' },
    { id:'q3', name:'Extensión de Cuádriceps (o Zancada Búlgara Frontal)', sets:'3 x 15', dica:'El ejercicio que el 90% de las mujeres hace mal: no traves la rodilla arriba, controlá la bajada.' },
    { id:'q4', name:'Elevación de Talones de Pie', sets:'4 x 20', dica:'Amplitud completa, subiendo bien en la punta del pie y bajando hasta estirar totalmente.' },
  ],
  posterior: [ // bono — Protocolo Anti-Celulitis
    { id:'p1', name:'Curl Femoral (o Peso Muerto Unilateral en Casa)', sets:'4 x 15', dica:'Enfoque en las fibras más profundas del isquiotibial — bajá bien despacio (tiempo bajo tensión) para estimular la zona.' },
    { id:'p2', name:'Elevación de Cadera con Piernas Extendidas', sets:'3 x 15', dica:'Pies más alejados del cuerpo, lo que aumenta la exigencia del isquiotibial junto al glúteo.' },
    { id:'p3', name:'Puente Unilateral Isométrico', sets:'3 x 30-40s cada lado', dica:'Una pierna extendida en el aire, sostené la cadera elevada. Trabaja resistencia muscular y firmeza de la zona.' },
    { id:'p4', name:'Flexión de Rodilla de Pie (con tobillera o banda)', sets:'3 x 15 cada lado', dica:'Truco del tiempo bajo tensión: sostené 2s en la contracción máxima antes de bajar — estimula colágeno en la zona.' },
  ],
  superiores1: [ // bono — entreno de superiores 1 (espalda/hombro)
    { id:'sup1', name:'Remo (mancuernas o banda elástica)', sets:'3 x 15', dica:'Codos cerca del cuerpo, apretá las escápulas al final del movimiento.' },
    { id:'sup2', name:'Jalón (en máquina o banda anclada arriba)', sets:'3 x 15', dica:'Tirá hasta la altura del pecho, sin tirar el cuerpo hacia atrás.' },
    { id:'sup3', name:'Elevación Lateral', sets:'3 x 15', dica:'Subí los brazos hasta la altura de los hombros, sin encoger el cuello.' },
    { id:'sup4', name:'Face Pull (banda o polea)', sets:'3 x 15', dica:'Tirá hacia la cara abriendo los codos — crea el efecto de cintura fina entrenando hombro y espalda en la proporción correcta.' },
  ],
  superiores2: [ // bono — entreno de superiores 2 (brazos)
    { id:'sup5', name:'Curl de Bíceps (mancuernas o banda)', sets:'3 x 15', dica:'Sin balancear el cuerpo, codos fijos al costado del tronco.' },
    { id:'sup6', name:'Tríceps en Polea (o Fondos en Banco)', sets:'3 x 15', dica:'Codos fijos, extendé totalmente el brazo sin trabar la articulación.' },
    { id:'sup7', name:'Elevación Frontal', sets:'3 x 12', dica:'Subí los brazos al frente hasta la altura de los hombros, controlando la bajada.' },
    { id:'sup8', name:'Plancha Abdominal', sets:'3 x 30-45s', dica:'Cuerpo alineado de la cabeza a los talones, abdomen contraído — sin dejar caer la cadera.' },
  ],
  express: [ // bono — entreno express 20 minutos
    { id:'ex1', name:'Hip Thrust', sets:'4 x 15', dica:'Ritmo constante, sin descanso largo entre series — es un circuito.' },
    { id:'ex2', name:'Sentadilla Sumo', sets:'4 x 15', dica:'Pies separados, puntas levemente hacia afuera, bajá contrayendo el glúteo en la subida.' },
    { id:'ex3', name:'Glúteo Polea (o Donkey Kick en casa)', sets:'4 x 15 cada lado', dica:'Movimiento rápido y controlado, sin perder la forma.' },
    { id:'ex4', name:'Plancha Abdominal', sets:'4 x 30s', dica:'Cerrá el circuito con el core, descansá 60s y repetí la secuencia completa 3 veces.' },
  ],
};

// ---- Entrenos (armados a partir del banco de ejercicios) ----
const BF_WORKOUTS = {
  A: { title:'Entreno A · Glúteo Lateral', subtitle:'Glúteo medio y mínimo — termina con el hip dip', focus:'frontal', exercises:['f1','f2','f3','f4'], mins:28 },
  B: { title:'Entreno B · Glúteo Empinado', subtitle:'Glúteo máximo — lo que da la forma redondeada', focus:'sagital', exercises:['s1','s2','s3','s4'], mins:30 },
  C: { title:'Entreno C · Simetría & Definición', subtitle:'Unilaterales + tiempo bajo tensión', focus:'unilateral', exercises:['u1','u2','u3','u4','a1'], mins:32 },
  D: { title:'Bono · Cuádriceps Proporcional', subtitle:'Pierna en la proporción justa con el glúteo', focus:'quadriceps', exercises:['q1','q2','q3','q4'], mins:26 },
  E: { title:'Bono · Superiores', subtitle:'Espalda, hombro y brazos — cuerpo en armonía', focus:'superiores1', exercises:['sup1','sup2','sup3','sup4','sup5','sup6','sup7','sup8'], mins:25 },
};

// ---- Ciclos semanales según la frecuencia elegida en el onboarding (7 días, se repite 3x = 21 días) ----
const BF_CYCLES = {
  2: ['A','rest','B','rest','rest','rest','rest'],
  3: ['A','rest','B','rest','C','rest','rest'],
  5: ['A','B','C','rest','D','E','rest'],
};

// ---- Bonos (contenido extra, siempre desbloqueado) ----
const BF_BONUSES = [
  { id:'quadriceps', emoji:'🦵', title:'Protocolo Cuádriceps Proporcional', desc:'Definí y aumentá la pierna en la proporción exacta en la que el glúteo se desarrolla, sin perder la feminidad.', workoutKey:'D' },
  { id:'posterior', emoji:'✨', title:'Protocolo Anti-Celulitis', desc:'Secuencia para firmar y definir el isquiotibial, atacando la zona donde se esconde la celulitis.', exercises:['p1','p2','p3','p4'] },
  { id:'superiores', emoji:'💪', title:'2 Entrenos de Superiores', desc:'Definí brazos y hombros, eliminá la grasita de la espalda y creá el efecto cintura fina.', double:true },
  { id:'receitas', emoji:'🍽️', title:'51 Recetas Proteicas', desc:'Recetas rápidas y ricas en proteína para que tu músculo crezca de verdad.', link:'recipes' },
  { id:'express', emoji:'⏱️', title:'Protocolo de Entreno Express (20min)', desc:'Para los días con poco tiempo: un circuito que activa el glúteo como si fuera una hora de entreno pesado.', exercises:['ex1','ex2','ex3','ex4'] },
];

const BF_SURPRISE = {
  title:'Guía de Postura & Diario de Evolución',
  desc:'El regalo sorpresa que solo se revela en tu primer ingreso: una guía rápida de postura para sacarte fotos que resalten tu figura, más un diario de evolución para seguir cada semana del reto.',
  items: [
    'Postura de pie: peso levemente hacia el talón, cadera levemente proyectada, hombros relajados hacia atrás — resalta la forma del glúteo en cualquier foto.',
    'El ángulo de 3/4 de costado suele resaltar más la curva lumbar-glúteo que la foto de frente o totalmente de espaldas.',
    'La luz natural lateral (de ventana) marca mejor el contorno que la luz de arriba.',
    'Diario de evolución: anotá cada 7 días — peso, medidas (cintura, cadera, pierna) y una nota del 0 al 10 de cómo te sentiste en el entreno. Usá la pestaña Progreso del app para esto.',
  ],
};

// ---- Recetas proteicas (51) ----
const BF_RECIPES = [
  // Desayuno (10)
  { cat:'manha', name:'Panqueque Proteico de Banana', kcal:220, prot:18, prep:'Batí 1 banana, 2 huevos y 1 scoop de proteína en polvo. Cociná a fuego bajo de los dos lados hasta dorar. Lista en 5 minutos.' },
  { cat:'manha', name:'Omelette de Claras con Espinaca', kcal:180, prot:22, prep:'Batí 4 claras + 1 huevo entero con una pizca de sal. Salteá espinaca, agregá la mezcla y cociná a fuego bajo hasta que cuaje.' },
  { cat:'manha', name:'Tapioca con Pollo Desmenuzado', kcal:260, prot:20, prep:'Hidratá la fécula de tapioca, dorala en la sartén y rellená con pollo desmenuzado condimentado.' },
  { cat:'manha', name:'Yogur Griego con Proteína y Frutos Rojos', kcal:210, prot:24, prep:'Mezclá yogur griego natural con medio scoop de proteína en polvo y terminá con frutillas o moras picadas.' },
  { cat:'manha', name:'Avena Overnight Proteica', kcal:290, prot:20, prep:'Mezclá avena, leche (o bebida vegetal), 1 scoop de proteína y canela. Dejá en la heladera de un día para el otro.' },
  { cat:'manha', name:'Huevos Revueltos con Avena y Queso Cottage', kcal:230, prot:19, prep:'Mezclá 2 huevos con 1 cucharada de avena en copos, cociná revolviendo y terminá con una cucharada de cottage.' },
  { cat:'manha', name:'Licuado Proteico Verde', kcal:190, prot:22, prep:'Batí 1 scoop de proteína, hojas verdes, media banana y agua o leche hasta que quede cremoso.' },
  { cat:'manha', name:'Pan Proteico con Mantequilla de Maní y Banana', kcal:270, prot:16, prep:'Tostá una rebanada de pan integral, untá mantequilla de maní y cubrí con rodajas de banana.' },
  { cat:'manha', name:'Crepioca de Pollo', kcal:240, prot:23, prep:'Mezclá 1 huevo, 2 cucharadas de fécula de tapioca y una pizca de sal. Cociná fino y rellená con pollo.' },
  { cat:'manha', name:'Papilla de Avena Proteica', kcal:250, prot:20, prep:'Cociná avena con leche, agregá 1 scoop de proteína fuera del fuego y terminá con canela.' },

  // Pre-entreno (8)
  { cat:'pre', name:'Banana con Mantequilla de Maní', kcal:210, prot:7, prep:'Cortá la banana al medio y untá una cucharada de mantequilla de maní. Simple y rápido, 30-40 min antes del entreno.' },
  { cat:'pre', name:'Tostada Integral con Huevo Duro', kcal:180, prot:12, prep:'Una rebanada de pan integral con una rodaja de huevo duro y una pizca de sal.' },
  { cat:'pre', name:'Licuado de Banana y Avena', kcal:230, prot:10, prep:'Batí banana, avena, leche y una pizca de canela.' },
  { cat:'pre', name:'Tapioca Simple con Miel', kcal:150, prot:2, prep:'Tapioca fina, un chorrito de miel — energía rápida para el entreno.' },
  { cat:'pre', name:'Mix de Frutos Secos', kcal:200, prot:6, prep:'Una porción chica de frutos secos y frutas deshidratadas — práctico para llevar en el bolso.' },
  { cat:'pre', name:'Yogur Natural con Granola', kcal:190, prot:9, prep:'Mezclá yogur natural con una cucharada de granola sin azúcar.' },
  { cat:'pre', name:'Batata Asada en Cubos', kcal:160, prot:2, prep:'Horneá cubos de batata condimentados con un chorrito de aceite de oliva y canela.' },
  { cat:'pre', name:'Agua de Coco con Banana', kcal:140, prot:2, prep:'Batí agua de coco con media banana para una hidratación con energía extra.' },

  // Post-entreno (8)
  { cat:'pos', name:'Proteína en Polvo con Agua y Banana', kcal:200, prot:25, prep:'Batí 1 scoop de proteína, agua y media banana — absorción rápida justo después del entreno.' },
  { cat:'pos', name:'Pollo a la Plancha con Batata', kcal:340, prot:34, prep:'Cociná a la plancha la pechuga de pollo condimentada y serví con batata hervida o al horno.' },
  { cat:'pos', name:'Omelette con Arroz Integral', kcal:310, prot:26, prep:'Preparás una omelette de 2 huevos y servís con una porción de arroz integral.' },
  { cat:'pos', name:'Batido de Proteína con Avena', kcal:260, prot:28, prep:'Batí proteína en polvo, avena, agua o leche y hielo hasta que quede cremoso.' },
  { cat:'pos', name:'Atún con Papa', kcal:280, prot:30, prep:'Mezclá atún al agua con papa hervida pisada y condimentos a gusto.' },
  { cat:'pos', name:'Yogur Griego con Miel y Proteína', kcal:230, prot:26, prep:'Mezclá yogur griego, medio scoop de proteína y un chorrito de miel.' },
  { cat:'pos', name:'Wrap de Pollo Desmenuzado', kcal:320, prot:29, prep:'Rellená una tortilla integral con pollo desmenuzado, lechuga y tomate.' },
  { cat:'pos', name:'Huevos Duros con Arroz y Verduras', kcal:290, prot:22, prep:'Serví 2 huevos duros con arroz integral y verduras al vapor.' },

  // Platos principales — almuerzo/cena (15)
  { cat:'principal', name:'Pollo al Curry con Arroz Integral', kcal:380, prot:34, prep:'Salteá pollo en cubos con curry, leche de coco light y serví con arroz integral.' },
  { cat:'principal', name:'Salmón a la Plancha con Espárragos', kcal:350, prot:32, prep:'Condimentá el salmón con limón y hierbas, cociná a la plancha y serví con espárragos salteados en aceite de oliva.' },
  { cat:'principal', name:'Carne Picada con Zapallo', kcal:360, prot:30, prep:'Salteá carne picada magra con cebolla y ajo, serví con puré de zapallo.' },
  { cat:'principal', name:'Pechuga de Pollo Rellena de Ricota', kcal:340, prot:36, prep:'Abrí la pechuga de pollo, rellená con ricota condimentada y horneá hasta dorar.' },
  { cat:'principal', name:'Merluza al Horno con Batata', kcal:310, prot:31, prep:'Condimentá la merluza con limón y pimentón, horneá con batata en rodajas.' },
  { cat:'principal', name:'Albóndigas de Pollo con Salsa de Tomate', kcal:330, prot:30, prep:'Mezclá pollo molido con condimentos, formá bolitas y cociná en salsa de tomate casera.' },
  { cat:'principal', name:'Pastel de Papa Fit con Pollo', kcal:350, prot:32, prep:'Capa de pollo desmenuzado, cubrí con puré de batata o papa y gratiná al horno.' },
  { cat:'principal', name:'Carne Guisada con Verduras', kcal:370, prot:33, prep:'Cociná la carne en cubos con zanahoria, papa y cebolla hasta que quede tierna.' },
  { cat:'principal', name:'Pollo Salteado Estilo Chino Fit', kcal:340, prot:31, prep:'Salteá pollo en cubos con pimiento, cebolla y salsa de soja light, terminá con almendras.' },
  { cat:'principal', name:'Kibbeh al Horno', kcal:300, prot:26, prep:'Mezclá carne picada con trigo bulgur hidratado y condimentos, horneá en molde hasta dorar.' },
  { cat:'principal', name:'Ensalada Completa con Pollo y Garbanzos', kcal:320, prot:28, prep:'Armá la ensalada con hojas variadas, pollo a la plancha, garbanzos y aceite de oliva.' },
  { cat:'principal', name:'Pescado al Horno con Verduras en Papillote', kcal:290, prot:29, prep:'Envolvé el pescado con verduras y condimentos en papel manteca y horneá hasta que se cocine al vapor.' },
  { cat:'principal', name:'Stroganoff Fit de Pollo', kcal:360, prot:32, prep:'Salteá pollo, agregá tomate, mostaza y yogur natural en lugar de la crema tradicional.' },
  { cat:'principal', name:'Bife a la Plancha con Arroz y Lentejas', kcal:400, prot:34, prep:'Cociná el bife a la plancha, terminá con cebolla caramelizada y serví con arroz integral y lentejas.' },
  { cat:'principal', name:'Berenjena Rellena de Carne Picada', kcal:310, prot:27, prep:'Cortá la berenjena al medio, vaciá el centro, rellená con carne picada condimentada y horneá.' },

  // Snacks y postres fit (10)
  { cat:'doce', name:'Trufa Proteica de Chocolate', kcal:90, prot:8, prep:'Mezclá proteína en polvo de chocolate, leche y un poco de cacao hasta formar una pasta. Armá bolitas.' },
  { cat:'doce', name:'Mousse de Chocolate Proteico', kcal:150, prot:14, prep:'Batí banana congelada con cacao en polvo y proteína de chocolate hasta que quede cremoso.' },
  { cat:'doce', name:'Galletita Proteica de Avena', kcal:120, prot:9, prep:'Mezclá avena, proteína en polvo, banana pisada y un poco de canela. Horneá en moldecitos por 12 minutos.' },
  { cat:'doce', name:'Gelatina Proteica', kcal:80, prot:10, prep:'Preparás la gelatina normal y agregás medio scoop de proteína aún tibia, mezclando bien.' },
  { cat:'doce', name:'Bizcocho de Taza Proteico', kcal:180, prot:16, prep:'Mezclá proteína, huevo, avena y polvo de hornear en una taza, llevá al microondas por 90 segundos.' },
  { cat:'doce', name:'Helado de Yogur con Frutos Rojos', kcal:100, prot:8, prep:'Batí yogur griego con frutos rojos y llevá al freezer en moldecitos de helado.' },
  { cat:'doce', name:'Barrita Proteica Casera', kcal:160, prot:12, prep:'Mezclá avena, mantequilla de maní, proteína y miel, presioná en un molde y llevá a la heladera hasta que endurezca.' },
  { cat:'doce', name:'Pudín de Chía Proteico', kcal:170, prot:11, prep:'Mezclá chía, leche y proteína, dejá en la heladera por 4 horas hasta que tome la textura de pudín.' },
  { cat:'doce', name:'Tarta de Pollo en Taza (snack salado)', kcal:220, prot:20, prep:'Mezclá pollo desmenuzado, huevo, avena y condimentos, llevá al microondas por 3 minutos.' },
  { cat:'doce', name:'Batido Proteico de Frutilla', kcal:180, prot:22, prep:'Batí proteína de vainilla con frutillas congeladas y un poco de leche.' },
];

// ---- Testimonios ----
const BF_TESTIMONIALS = [
  { name:'Bruna', text:'Pasé de un glúteo sin vida, chato en los laterales, a uno redondito tal como siempre quise.', tag:'Hip dips resuelto' },
  { name:'Juliana', text:'En menos de un mes mi glúteo se puso mucho más grande, más redondeado y firme.', tag:'Resultado en 4 semanas' },
  { name:'Andressa', text:'Más de 40 años y nada se desarrollaba. Seguí la secuencia activadora y llegó el resultado.', tag:'+40 años' },
  { name:'Márcia', text:'El dolor de rodilla que me molestaba hace años desapareció — el glúteo volvió a sostener.', tag:'Sin dolor de rodilla' },
  { name:'Jéssica', text:'Pasaba el día sentada con dolor lumbar. Mejoró muchísimo y encima gané volumen en el glúteo.', tag:'Sin dolor lumbar' },
];

// ---- Preguntas frecuentes ----
const BF_FAQ = [
  { q:'Tengo más de 40 años, ¿todavía tengo tiempo?', a:'Sí — las alumnas de 40 años para arriba suelen tener los resultados más rápidos, porque el glúteo generalmente está más tiempo inhibido y responde fuerte apenas se reactiva correctamente.' },
  { q:'Solo tengo 20-30 minutos, ¿funciona?', a:'Sí. El problema nunca fue el tiempo, es la eficiencia del entreno. Usá el Protocolo de Entreno Express (bono) los días con poco tiempo.' },
  { q:'Tengo dolor de rodilla, ¿puedo entrenar?', a:'En la mayoría de los casos el dolor de rodilla en la sentadilla pasa porque el glúteo no se activa y el cuádriceps compensa demasiado. Activando el glúteo correctamente, esa sobrecarga tiende a bajar.' },
  { q:'Mi glúteo está muy caído y flácido, ¿se puede resolver sin cirugía?', a:'Sí. Glúteo caído casi siempre es glúteo atrofiado — músculo que no sostiene la piel. Activando y desarrollando el músculo, vuelve a "pegarse" y a elevarse.' },
  { q:'¿Necesito gimnasio o puedo entrenar en casa?', a:'Los dos. Cada ejercicio tiene una variante en casa (con mini band, por ejemplo) y otra en el gimnasio (con máquinas), sin perder el efecto.' },
];
