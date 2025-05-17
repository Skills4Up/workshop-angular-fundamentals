/**
 * CONCEPTOS BÁSICOS ES6+
 *
 * Este archivo contiene ejercicios para practicar los conceptos
 * fundamentales de ES6+:
 * - let y const
 * - arrow functions
 * - template literals
 * - parámetros por defecto
 * - enhanced object literals
 */

import { logSection } from "../../../utils";

console.log('Ejecutando demo de conceptos básicos ES6+...\n');
console.log('ES6+ (ECMAScript 2015 y versiones posteriores) introduce');
console.log('nuevas características que mejoran JavaScript y facilitan');
console.log('la escritura de código más limpio, conciso y mantenible.');

// Contexto: Estás trabajando en un sistema de e-commerce y necesitas
// modernizar algunas funciones de gestión de productos.

// ============================================================================
// 1. Variables - let y const
// ============================================================================

logSection('1. Variables - let y const', 'Nuevas formas de declarar variables con scope de bloque');

/**
 * EJERCICIO 1: Variables - let y const
 *
 * Refactoriza este código usando let/const apropiadamente.
 * - Usa const para valores que no cambian
 * - Usa let para valores que necesitan ser reasignados
 */

// ❌ Código legacy ES5
function calculateProductDiscount(price, discountPercent) {
  var TAX_RATE = 0.19;
  var discount = price * (discountPercent / 100);
  var priceWithDiscount = price - discount;
  var taxes = priceWithDiscount * TAX_RATE;

  if (priceWithDiscount < 10) {
    var shippingCost = 5;
  } else {
    var shippingCost = 10;
  }

  var total = priceWithDiscount + taxes + shippingCost;
  return total;
}

console.log('Variables - let y const:');
console.log('- const: para valores que nunca cambian (constantes)');
console.log('- let: para variables con ámbito de bloque');
console.log('- Ambos solucionan problemas del "hoisting" de var');
console.log('- Ejemplo: calculateProductDiscount(100, 20) = ', calculateProductDiscount(100, 20));
console.log('');

// ✅ Tu código modernizado aquí (reemplaza el código anterior)
// function calculateProductDiscount(price, discountPercent) {
//   ...
// }

// ============================================================================
// 2. Arrow Functions
// ============================================================================

logSection('2. Arrow Functions', 'Sintaxis más concisa para definir funciones');

/**
 * EJERCICIO 2: Arrow Functions
 *
 * Refactoriza la siguiente función usando arrow functions.
 */

// ❌ Código legacy ES5
function filterAvailableProducts(products) {
  return products.filter(function (product) {
    return product.stock > 0;
  });
}

// Datos para probar la función
const productsSample = [
  { id: 1, name: 'Laptop', price: 999.99, stock: 5 },
  { id: 2, name: 'Teclado', price: 49.99, stock: 0 },
  { id: 3, name: 'Mouse', price: 29.99, stock: 3 }
];

console.log('Arrow Functions:');
console.log('- Sintaxis más corta para funciones anónimas');
console.log('- No tienen su propio "this" (hereda del contexto)');
console.log('- Ideal para callbacks y funciones cortas');
console.log('- Ejemplo: filterAvailableProducts(productsSample) = ');
console.log(filterAvailableProducts(productsSample));
console.log('');

// ✅ Tu código modernizado aquí (reescribe la función completa)
// const filterAvailableProducts = products => { ... };

// ============================================================================
// 3. Template Literals
// ============================================================================

logSection('3. Template Literals', 'Cadenas de texto mejoradas con interpolación');

/**
 * EJERCICIO 3: Template Literals
 *
 * Refactoriza esta función para usar template literals.
 */

// ❌ Código legacy ES5
function formatProductCard(product) {
  return '<div class="product">' +
    '<h2>' + product.name + '</h2>' +
    '<p class="price">$' + product.price.toFixed(2) + '</p>' +
    '<p class="stock">Stock: ' + product.stock + ' unidades</p>' +
    '</div>';
}

// Datos para probar la función
const productExample = { name: 'Monitor HD', price: 149.99, stock: 4 };

console.log('Template Literals:');
console.log('- Permiten crear strings multilínea');
console.log('- Soportan interpolación con ${expresión}');
console.log('- Facilitan la creación de HTML templating');
console.log('- Ejemplo: formatProductCard(productExample) = ');
console.log(formatProductCard(productExample));
console.log('');

// ✅ Tu código modernizado aquí (reescribe la función completa)
// const formatProductCard = product => { ... };

// ============================================================================
// 4. Parámetros por Defecto
// ============================================================================

logSection('4. Parámetros por Defecto', 'Valores predeterminados para parámetros de funciones');

/**
 * EJERCICIO 4: Parámetros por Defecto
 *
 * Refactoriza esta función para usar parámetros por defecto.
 */

// ❌ Código legacy ES5
function createProduct(name, price, category, stock) {
  if (category === undefined) {
    category = 'general';
  }
  if (stock === undefined) {
    stock = 0;
  }

  return {
    name: name,
    price: price,
    category: category,
    stock: stock,
    available: stock > 0
  };
}

console.log('Parámetros por Defecto:');
console.log('- Asignan valores automáticamente a parámetros no proporcionados');
console.log('- Simplifican la lógica de validación');
console.log('- Hacen el código más legible y conciso');
console.log('- Ejemplo: createProduct("Auriculares", 59.99) = ');
console.log(createProduct("Auriculares", 59.99));
console.log('');

// ✅ Tu código modernizado aquí (reescribe la función completa)
// const createProduct = (name, price, category = 'general', stock = 0) => { ... };

// ============================================================================
// 5. Enhanced Object Literals
// ============================================================================

logSection('5. Enhanced Object Literals', 'Sintaxis mejorada para definir objetos');

/**
 * EJERCICIO 5: Enhanced Object Literals
 *
 * Refactoriza esta función para usar enhanced object literals:
 * - Shorthand syntax para propiedades
 * - Métodos concisos
 * - Propiedades computadas para 'discount' + type
 */

// ❌ Código legacy ES5
function createProductCampaign(name, product, type, discount) {
  var discountProperty = 'discount' + type.charAt(0).toUpperCase() + type.slice(1);

  return {
    name: name,
    product: product,
    active: true,
    applyDiscount: function (price) {
      return price * (1 - discount / 100);
    },
    getInfo: function () {
      return this.name + ' - ' + discount + '% off';
    }
  };
}

console.log('Enhanced Object Literals:');
console.log('- Property shorthand: {x} en vez de {x: x}');
console.log('- Métodos concisos: method() en vez de method: function()');
console.log('- Propiedades computadas: {[expr]: value}');
console.log('- Ejemplo: createProductCampaign("Black Friday", productExample, "seasonal", 25) = ');
console.log(createProductCampaign("Black Friday", productExample, "seasonal", 25));
console.log('');

// ✅ Tu código modernizado aquí (reescribe la función completa)
// const createProductCampaign = (name, product, type, discount) => { ... };

// ============================================================================
logSection('Resumen', 'ES6+ proporciona características que mejoran significativamente JavaScript');
console.log('✅ Archivo de conceptos básicos ES6+ preparado correctamente.');
console.log('='.repeat(80) + '\n');

// No modifiques estas exportaciones
module.exports = {
  calculateProductDiscount,
  filterAvailableProducts,
  formatProductCard,
  createProduct,
  createProductCampaign
};
