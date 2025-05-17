/**
 * 1.1 Conceptos Básicos - Retos Adicionales
 * =========================================
 *
 * Estos desafíos te permitirán practicar más a fondo los conceptos
 * básicos de ES6+ en escenarios más complejos.
 */

/**
 * RETO 1: Funciones Anidadas con Arrow Functions + Scope
 *
 * Refactoriza la siguiente función para usar arrow functions y
 * aprovechar el scope de bloque con let/const.
 */
// ❌ Código legacy ES5
function calculateOrderStatistics(orders) {
  var total = 0;
  var min = orders.length > 0 ? orders[0].total : 0;
  var max = 0;

  for (var i = 0; i < orders.length; i++) {
    var order = orders[i];
    total += order.total;

    if (order.total < min) {
      min = order.total;
    }
    if (order.total > max) {
      max = order.total;
    }
  }

  var average = orders.length > 0 ? total / orders.length : 0;

  function formatCurrency(value) {
    return '$' + value.toFixed(2);
  }

  return {
    total: formatCurrency(total),
    average: formatCurrency(average),
    min: formatCurrency(min),
    max: formatCurrency(max),
    count: orders.length
  };
}

// ✅ Tu código modernizado aquí (reescribe la función completa)
// const calculateOrderStatistics = ...


/**
 * RETO 2: Template Literals Avanzados
 *
 * Usa template literals para crear una función que genere HTML
 * basado en datos complejos. Incluye:
 * - Template literals anidados
 * - Expresiones en template literals
 * - Multilínea
 */
function generateProductHTML(product) {
  // Implementa una función que genere HTML para un producto
  // Debe incluir:
  // - Nombre y descripción
  // - Lista de características (array product.features)
  // - Sección de variantes con diferentes precios (array product.variants)
  // - Una clase 'sale' si product.onSale es true

  // El HTML generado debe ser válido y bien formateado

  // Ejemplo de estructura de datos de un producto:
  /*
  const product = {
    name: 'Smartphone XYZ',
    description: 'El último modelo con características avanzadas',
    price: 599.99,
    onSale: true,
    discount: 15,
    features: ['5G', 'Cámara 48MP', 'Batería 4500mAh', 'Resistente al agua'],
    variants: [
      { name: '128GB', price: 599.99 },
      { name: '256GB', price: 749.99 }
    ]
  };
  */
}


/**
 * RETO 3: Funciones Avanzadas con Parámetros por Defecto
 *
 * Implementa una función de búsqueda de productos con múltiples
 * parámetros opcionales que usen valores por defecto inteligentes.
 */
function searchProducts(products, {
  // Implementa parámetros por defecto para estas opciones
  // - minPrice
  // - maxPrice
  // - category
  // - sortBy ('price', 'name', 'popularity')
  // - sortOrder ('asc', 'desc')
  // - limit (número de resultados)
  // - includeOutOfStock (booleano)
}) {
  // Implementa la lógica de búsqueda y filtrado usando los parámetros
  // con valores por defecto apropiados
}


/**
 * RETO 4: Técnicas Avanzadas de Object Literals
 *
 * Crea una función que genere un objeto de configuración para
 * una aplicación usando todas las características modernas de
 * object literals.
 */
function createAppConfig(options) {
  // Implementa una función que genere un objeto de configuración
  // usando:
  // - Property shorthand
  // - Computed property names
  // - Method shorthand
  // - Object spread para valores por defecto

  // El objeto debe incluir:
  // - Propiedades básicas (theme, language, etc)
  // - Métodos para validar configuración
  // - Computed properties basadas en las opciones
  // - Funcionalidad para combinar configuraciones
}


module.exports = {
  calculateOrderStatistics,
  generateProductHTML,
  searchProducts,
  createAppConfig
};
