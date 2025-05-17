/**
 * Tests para los ejercicios de Conceptos Básicos ES6+
 */
const {
  calculateProductDiscount,
  filterAvailableProducts,
  formatProductCard,
  createProduct,
  createProductCampaign
} = require('./start.template');

// Intentar cargar los retos adicionales (challenges)
let challenges;
try {
  challenges = require('./challenges');
} catch (error) {
  challenges = {};
}

// Datos de prueba
const products = [
  { id: 1, name: 'Laptop', price: 999.99, stock: 5 },
  { id: 2, name: 'Teclado', price: 49.99, stock: 0 },
  { id: 3, name: 'Mouse', price: 29.99, stock: 3 },
  { id: 4, name: 'Monitor', price: 199.99, stock: 0 },
  { id: 5, name: 'Auriculares', price: 79.99, stock: 8 }
];

const orders = [
  { id: 'A001', userId: 'U1', total: 129.99, items: 2, date: '2023-01-15' },
  { id: 'A002', userId: 'U2', total: 899.50, items: 4, date: '2023-01-16' },
  { id: 'A003', userId: 'U1', total: 1299.99, items: 1, date: '2023-01-18' },
  { id: 'A004', userId: 'U3', total: 47.50, items: 1, date: '2023-01-20' },
  { id: 'A005', userId: 'U2', total: 329.95, items: 3, date: '2023-01-20' }
];

const sampleProduct = {
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

// Tests para los ejercicios básicos
describe('Ejercicios básicos ES6+', () => {
  test('Ejercicio 1: Variables - let y const', () => {
    const result = calculateProductDiscount(100, 20);
    expect(result).toBeCloseTo(105, 1); // 100 - 20 + 15.2 + 10 = 105.2

    const result2 = calculateProductDiscount(8, 10);
    expect(result2).toBeCloseTo(12.52, 1); // 8 - 0.8 + 1.37 + 5 = 12.52

    // Verificar que se utilizan let y const correctamente
    const fnStr = calculateProductDiscount.toString();
    expect(fnStr).not.toMatch(/\bvar\b/);
    expect(fnStr).toMatch(/\bconst\b/);
    expect(fnStr).toMatch(/\blet\b/);

    // Verificar que TAX_RATE está declarado como constante
    expect(fnStr).toMatch(/const\s+TAX_RATE/);
  });

  test('Ejercicio 2: Arrow Functions', () => {
    // Verificar funcionamiento correcto
    const available = filterAvailableProducts(products);
    expect(available).toHaveLength(3);
    expect(available).toEqual(expect.arrayContaining([
      products[0], products[2], products[4]
    ]));

    // Verificar que se utiliza arrow function
    const fnStr = filterAvailableProducts.toString();
    expect(fnStr).toMatch(/=>/);
    expect(fnStr).not.toMatch(/function\s*\(/);

    // Debe ser una implementación concisa
    expect(fnStr.length).toBeLessThan(100);
  });

  test('Ejercicio 3: Template Literals', () => {
    // Verificar funcionamiento correcto
    const product = { name: 'Laptop', price: 999.99, stock: 5 };
    const result = formatProductCard(product);

    // Verificar contenido del HTML
    expect(result).toContain('<h2>Laptop</h2>');
    expect(result).toContain('<p class="price">$999.99</p>');
    expect(result).toContain('<p class="stock">Stock: 5 unidades</p>');
    expect(result).toContain('<div class="product">');

    // Verificar que se utilizan template literals
    const fnStr = formatProductCard.toString();
    expect(fnStr).toMatch(/`/);
    expect(fnStr).toMatch(/\${/);
    expect(fnStr).not.toMatch(/\+/);
  });

  test('Ejercicio 4: Parámetros por Defecto', () => {
    // Verificar con parámetros por defecto
    const product1 = createProduct('Laptop', 999.99);
    expect(product1).toEqual({
      name: 'Laptop',
      price: 999.99,
      category: 'general',  // valor por defecto
      stock: 0,             // valor por defecto
      available: false
    });

    // Verificar con parámetros completos
    const product2 = createProduct('Mouse', 29.99, 'peripherals', 10);
    expect(product2).toEqual({
      name: 'Mouse',
      price: 29.99,
      category: 'peripherals',
      stock: 10,
      available: true
    });

    // Verificar que se utilizan parámetros por defecto
    const fnStr = createProduct.toString();
    expect(fnStr).toMatch(/category\s*=\s*['"]general['"]/);
    expect(fnStr).toMatch(/stock\s*=\s*0/);
    expect(fnStr).not.toMatch(/if\s*\(.+===\s*undefined/);
  });

  test('Ejercicio 5: Enhanced Object Literals', () => {
    // Verificar funcionamiento correcto
    const product = { name: 'Laptop', price: 999.99 };
    const campaign = createProductCampaign('Black Friday', product, 'seasonal', 20);

    expect(campaign.name).toBe('Black Friday');
    expect(campaign.product).toBe(product);
    expect(campaign.active).toBe(true);
    expect(campaign).toHaveProperty('discountSeasonal', 20);

    // Probar métodos
    expect(campaign.applyDiscount(100)).toBe(80);
    expect(campaign.getInfo()).toBe('Black Friday - 20% off');

    // Verificar que se utilizan enhanced object literals
    const fnStr = createProductCampaign.toString();

    // Verifica shorthand properties
    expect(fnStr).toMatch(/{(\s|\n)*name(,|\s|\n)/);
    expect(fnStr).toMatch(/{(\s|\n)*product(,|\s|\n)/);

    // Verifica métodos concisos
    expect(fnStr).toMatch(/applyDiscount\s*\(/);
    expect(fnStr).toMatch(/getInfo\s*\(/);
    expect(fnStr).not.toMatch(/:\s*function/);

    // Verifica computed property
    expect(fnStr).toMatch(/\[\s*[`'"]*discount/);
  });
});

// Tests para los desafíos avanzados (si están implementados)
describe('Desafíos avanzados ES6+', () => {
  const hasChallenges =
    typeof challenges.calculateOrderStatistics === 'function' &&
    typeof challenges.generateProductHTML === 'function' &&
    typeof challenges.searchProducts === 'function' &&
    typeof challenges.createAppConfig === 'function';

  beforeEach(() => {
    if (!hasChallenges) {
      console.log('⚠️ Los desafíos avanzados aún no han sido implementados');
    }
  });

  test('Desafío 1: Funciones Anidadas con Arrow Functions + Scope', () => {
    if (!hasChallenges) return;

    // Verificar resultado correcto
    const stats = challenges.calculateOrderStatistics(orders);
    expect(stats).toEqual({
      total: '$2,707.93',
      average: '$541.59',
      min: '$47.50',
      max: '$1,299.99',
      count: 5
    });

    // Verificar uso de características ES6+
    const fnStr = challenges.calculateOrderStatistics.toString();

    // Debe usar let/const (no var)
    expect(fnStr).not.toMatch(/\bvar\b/);
    expect(fnStr).toMatch(/\bconst\b|\blet\b/);

    // Debe usar arrow functions
    expect(fnStr).toMatch(/=>/);

    // Debe usar métodos de array (no bucles for tradicionales)
    expect(fnStr).not.toMatch(/for\s*\(\s*let\s+i/);
    expect(fnStr).toMatch(/\.map|\.forEach|\.reduce|\.filter/);
  });

  test('Desafío 2: Template Literals Avanzados', () => {
    if (!hasChallenges) return;

    const html = challenges.generateProductHTML(sampleProduct);

    // Verificar estructura del HTML
    expect(html).toContain('<h1>Smartphone XYZ</h1>');
    expect(html).toContain(sampleProduct.description);

    // Verificar lista de características
    sampleProduct.features.forEach(feature => {
      expect(html).toContain(feature);
    });

    // Verificar variantes
    sampleProduct.variants.forEach(variant => {
      expect(html).toContain(variant.name);
      expect(html).toContain(variant.price.toString());
    });

    // Verificar clase de oferta
    expect(html).toContain('class="sale"');

    // Verificar uso de template literals
    const fnStr = challenges.generateProductHTML.toString();
    expect(fnStr).toMatch(/`/);
    expect(fnStr).toMatch(/\${/);

    // Verificar uso de template literals anidados o .map con template literals
    expect(fnStr).toMatch(/\${.*`.*`.*}/s);
  });

  test('Desafío 3: Funciones Avanzadas con Parámetros por Defecto', () => {
    if (!hasChallenges) return;

    // Probar con opciones mínimas
    const result1 = challenges.searchProducts(products, {});
    expect(Array.isArray(result1)).toBe(true);

    // Probar con opciones personalizadas
    const result2 = challenges.searchProducts(products, {
      minPrice: 50,
      maxPrice: 200,
      sortBy: 'price',
      sortOrder: 'desc'
    });

    // Debería devolver teclado y monitor en orden de precio descendente
    expect(result2).toHaveLength(2);
    expect(result2[0].name).toBe('Monitor');
    expect(result2[1].name).toBe('Teclado');

    // Verificar uso de parámetros por defecto en objetos de opciones
    const fnStr = challenges.searchProducts.toString();
    expect(fnStr).toMatch(/{.*}.*=.*{/s);
    expect(fnStr).toMatch(/minPrice.*=|maxPrice.*=|sortBy.*=|sortOrder.*=/s);
  });

  test('Desafío 4: Técnicas Avanzadas de Object Literals', () => {
    if (!hasChallenges) return;

    // Verificar configuración básica
    const config1 = challenges.createAppConfig({ theme: 'dark' });
    expect(config1.theme).toBe('dark');

    // Verificar valores por defecto
    expect(config1.language).toBeDefined();

    // Verificar métodos
    expect(typeof config1.validate).toBe('function');
    expect(typeof config1.getVersion).toBe('function');

    // Verificar combinar configuraciones
    const config2 = challenges.createAppConfig({
      theme: 'light',
      extendFrom: config1
    });

    expect(config2.theme).toBe('light');

    // Verificar uso de enhanced object literals
    const fnStr = challenges.createAppConfig.toString();

    // Verificar uso de shorthand properties
    expect(fnStr).toMatch(/{[^}]*\b\w+(?!\s*:)[^}]*}/s);

    // Verificar uso de computed properties
    expect(fnStr).toMatch(/\[\s*[`'"]*\w+/);

    // Verificar uso de spread operator
    expect(fnStr).toMatch(/\.\.\.[\w_$]+/);
  });
});
