/**
 * TIPOS BÁSICOS EN TYPESCRIPT
 *
 * TypeScript extiende JavaScript con un sistema de tipos que permite
 * definir el tipo de datos que pueden contener las variables, parámetros
 * y valores de retorno de funciones.
 */
import { logSection } from "../../../utils";

console.log('Ejecutando demo de tipos básicos en TypeScript...\n');
console.log('TypeScript extiende JavaScript con un sistema de tipos estático que');
console.log('permite definir el tipo de datos que pueden contener las variables,');
console.log('parámetros y valores de retorno de funciones.');

// ============================================================================
// 1. Tipos primitivos
// ============================================================================

logSection('1. Tipos primitivos', 'Los tipos de datos fundamentales en TypeScript');

// String (cadena de texto)
let nombreUsuario: string = "Ana";
let apellidoUsuario: string = 'García';
let presentacionCompleta: string = `Hola, mi nombre es ${nombreUsuario} ${apellidoUsuario}`;

console.log('String (cadenas de texto):');
console.log(`- nombreUsuario: ${nombreUsuario} (tipo: ${typeof nombreUsuario})`);
console.log(`- apellidoUsuario: ${apellidoUsuario} (tipo: ${typeof apellidoUsuario})`);
console.log(`- presentacionCompleta: ${presentacionCompleta} (tipo: ${typeof presentacionCompleta})`);
console.log('');

// Number (números, tanto enteros como decimales)
let edadUsuario: number = 30;
let precioProducto: number = 19.99;
let valorNulo: number = NaN;
let valorInfinito: number = Infinity;

console.log('Number (numéricos):');
console.log(`- edadUsuario: ${edadUsuario} (tipo: ${typeof edadUsuario})`);
console.log(`- precioProducto: ${precioProducto} (tipo: ${typeof precioProducto})`);
console.log(`- valorNulo: ${valorNulo} (tipo: ${typeof valorNulo})`);
console.log(`- valorInfinito: ${valorInfinito} (tipo: ${typeof valorInfinito})`);
console.log('');

// Boolean (verdadero o falso)
let usuarioActivo: boolean = true;
let tareaCompletada: boolean = false;

console.log('Boolean (booleanos):');
console.log(`- usuarioActivo: ${usuarioActivo} (tipo: ${typeof usuarioActivo})`);
console.log(`- tareaCompletada: ${tareaCompletada} (tipo: ${typeof tareaCompletada})`);

// ============================================================================
// 2. Tipos especiales
// ============================================================================

// logSection('2. Tipos especiales', 'Tipos especiales para casos particulares');

// Any (cualquier tipo, evitar usar si es posible)
let valorDinamico: any = "Esto puede ser cualquier cosa";
valorDinamico = 100; // Válido
valorDinamico = false; // Válido

// console.log('Any (cualquier tipo):');
// console.log(`- valorDinamico: ${valorDinamico} (tipo: ${typeof valorDinamico})`);
// console.log('  ⚠️ Evitar el uso de "any" en la medida de lo posible');
// console.log('');

// Unknown (desconocido, más seguro que any)
let datoDinamico: unknown = 5;
// console.log('Unknown (desconocido):');
// console.log(`- datoDinamico: ${datoDinamico} (tipo: ${typeof datoDinamico})`);
// console.log('  Para manipular un valor "unknown", primero debemos verificar su tipo:');

// Es necesario verificar el tipo antes de realizar operaciones específicas
if (typeof datoDinamico === 'number') {
  const resultado = datoDinamico * 2;
  // console.log(`  Después de verificar → datoDinamico * 2 = ${resultado}`);
}
// console.log('');

// Void (ausencia de valor, típicamente en funciones sin retorno)
function saludarUsuario(): void {
  // console.log("Hola mundo");
  // No hay return
}

// console.log('Void (ausencia de valor):');
// console.log('- saludarUsuario() es una función que no retorna ningún valor');
// console.log('  Ejecutando saludarUsuario(): ');
saludarUsuario();
// console.log('');

// Null y Undefined
let valorNull: null = null;
let valorUndefined: undefined = undefined;

// console.log('Null y Undefined:');
// console.log(`- valorNull: ${valorNull} (tipo: ${typeof valorNull})`);
// console.log(`- valorUndefined: ${valorUndefined} (tipo: ${typeof valorUndefined})`);

// ============================================================================
// 3. Arrays y Colecciones
// ============================================================================

// logSection('3. Arrays y Colecciones', 'Estructuras para almacenar múltiples valores');

// Array (usando la sintaxis de corchetes)
let listaNumeros: number[] = [1, 2, 3, 4, 5];
let listaNombres: string[] = ["Ana", "Juan", "María"];

// console.log('Arrays (sintaxis de corchetes):');
// console.log(`- listaNumeros: [${listaNumeros}] (tipo: ${typeof listaNumeros})`);
// console.log(`- listaNombres: [${listaNombres}] (tipo: ${typeof listaNombres})`);
// console.log('');

// Array (usando la sintaxis genérica Array)
let listaColores: Array<string> = ["rojo", "verde", "azul"];

// console.log('Arrays (sintaxis genérica):');
// console.log(`- listaColores: [${listaColores}] (tipo: ${typeof listaColores})`);
// console.log('');

// Tupla (array con número fijo de elementos y tipos específicos)
let datosUsuario: [string, number, boolean] = ["admin", 123, true];
let coordenadaGPS: [number, number] = [10.5, 20.3];

// console.log('Tuplas (arrays con estructura fija):');
// console.log(`- datosUsuario: [${datosUsuario}]`);
// console.log(`  datosUsuario[0] (string): ${datosUsuario[0]}`);
// console.log(`  datosUsuario[1] (number): ${datosUsuario[1]}`);
// console.log(`  datosUsuario[2] (boolean): ${datosUsuario[2]}`);
// console.log(`- coordenadaGPS: [${coordenadaGPS}] (latitud, longitud)`);

// ============================================================================
// 4. Objetos y tipos personalizados
// ============================================================================

// logSection('4. Objetos y tipos personalizados', 'Definición de estructuras de datos complejas');

// Objeto con tipos definidos en línea
let perfilUsuario: { nombre: string; edad: number; activo?: boolean } = {
  nombre: "Carlos",
  edad: 28,
  // La propiedad activo es opcional gracias al signo '?'
};

// console.log('Objetos con tipos definidos:');
// console.log(`- perfilUsuario: ${JSON.stringify(perfilUsuario, null, 2)}`);
// console.log('  La propiedad "activo" es opcional (notación con "?")');

// ============================================================================
// 5. Enumeraciones
// ============================================================================

// logSection('5. Enumeraciones', 'Conjuntos de constantes con nombre');

// Enum (conjunto de constantes con nombre)
enum DiaSemana {
  Lunes,      // 0
  Martes,     // 1
  Miercoles,  // 2
  Jueves,     // 3
  Viernes,    // 4
  Sabado,     // 5
  Domingo     // 6
}

let diaActual: DiaSemana = DiaSemana.Martes;

// console.log('Enumeraciones numéricas:');
// console.log(`- diaActual: DiaSemana.Martes = ${diaActual}`);
// console.log(`  DiaSemana.Lunes = ${DiaSemana.Lunes}`);
// console.log(`  DiaSemana.Martes = ${DiaSemana.Martes}`);
// console.log(`  DiaSemana.Miercoles = ${DiaSemana.Miercoles}`);
// console.log('');

// Enum con valores específicos
enum RolUsuario {
  Usuario = "USER",
  Administrador = "ADMIN",
  Editor = "EDITOR"
}

let rolAsignado: RolUsuario = RolUsuario.Administrador;

// console.log('Enumeraciones de cadena:');
// console.log(`- rolAsignado: RolUsuario.Administrador = "${rolAsignado}"`);
// console.log(`  RolUsuario.Usuario = "${RolUsuario.Usuario}"`);
// console.log(`  RolUsuario.Administrador = "${RolUsuario.Administrador}"`);
// console.log(`  RolUsuario.Editor = "${RolUsuario.Editor}"`);

// ============================================================================
// 6. Unión e Intersección de tipos
// ============================================================================

// logSection('6. Unión e Intersección de tipos', 'Combinaciones de tipos');

// Union (puede ser uno u otro tipo)
let identificadorUsuario: string | number;
identificadorUsuario = "abc123";  // Válido
// console.log('Unión de tipos (string | number):');
// console.log(`- identificadorUsuario = "${identificadorUsuario}" (tipo: ${typeof identificadorUsuario})`);

identificadorUsuario = 12345;     // Válido
// console.log(`- identificadorUsuario = ${identificadorUsuario} (tipo: ${typeof identificadorUsuario})`);
// console.log('  ❌ identificadorUsuario = true; // Error: no puede ser boolean');
// console.log('');

// Intersection (debe tener todas las propiedades de ambos tipos)
type DatosEmpleado = { id: number; nombre: string };
type DatosContacto = { email: string; telefono: string };
type FichaEmpleado = DatosEmpleado & DatosContacto;

let empleadoCompleto: FichaEmpleado = {
  id: 1,
  nombre: "Laura",
  email: "laura@empresa.com",
  telefono: "555-1234"
};

// console.log('Intersección de tipos (DatosEmpleado & DatosContacto):');
// console.log(`- empleadoCompleto: ${JSON.stringify(empleadoCompleto, null, 2)}`);
// console.log('  Debe contener todas las propiedades de ambos tipos');

// ============================================================================
// 7. Aserciones de tipo
// ============================================================================

// logSection('7. Aserciones de tipo', 'Indicar al compilador que confíe en tu conocimiento del tipo');

// A veces necesitamos decirle al compilador que confíe en que sabemos
// lo que estamos haciendo al convertir entre tipos

let entradaTexto: unknown = "42";

// console.log('Aserciones de tipo:');
// console.log(`- entradaTexto: "${entradaTexto}" (tipo original: unknown)`);

// Usando 'as'
let longitudCadena = (entradaTexto as string).length;
// console.log(`  Usando 'as': (entradaTexto as string).length = ${longitudCadena}`);

// Usando la sintaxis de ángulo (menos común, evitar en JSX)
let otraLongitud = (<string>entradaTexto).length;
// console.log(`  Usando sintaxis ángulo: (<string>entradaTexto).length = ${otraLongitud}`);
// console.log('  ⚠️ La sintaxis de ángulo se debe evitar en archivos JSX');

// ============================================================================
// 8. Inferencia de tipos
// ============================================================================

// logSection('8. Inferencia de tipos', 'TypeScript puede determinar tipos automáticamente');

// TypeScript puede inferir tipos sin necesidad de declararlos explícitamente
let textoInferido = "Esto es una cadena"; // inferido como string
let numeroInferido = 42;                 // inferido como number
let booleanoInferido = true;             // inferido como boolean

// console.log('Inferencia de tipos primitivos:');
// console.log(`- textoInferido: "${textoInferido}" (tipo inferido: ${typeof textoInferido})`);
// console.log(`- numeroInferido: ${numeroInferido} (tipo inferido: ${typeof numeroInferido})`);
// console.log(`- booleanoInferido: ${booleanoInferido} (tipo inferido: ${typeof booleanoInferido})`);
// console.log('');

// También funciona con arrays
let arrayInferido = [1, 2, 3];   // inferido como number[]

// console.log('Inferencia de tipos en arrays:');
// console.log(`- arrayInferido: [${arrayInferido}] (tipo inferido: number[])`);

// ============================================================================
// logSection('Resumen', 'TypeScript proporciona un sistema de tipos estático que ayuda a prevenir errores comunes');
// console.log('✅ Archivo de tipos básicos ejecutado correctamente.');
// console.log('='.repeat(80) + '\n');

// Si necesitas exportar algo para TypeScript (para evitar error de archivo sin salida), usa:
// Opcional: esto ayuda a TypeScript a tratar el archivo como un módulo sin exportar nada realmente
// export {};
