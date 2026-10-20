const products = require('../../src/data/products')
const { sortProductsByPrice } = require('../../src/catalog')

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(
      sortProductsByPrice(products, 'asc').map(product => product.id),
    ).toEqual([3, 6, 5, 4, 2, 1])
  })

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    expect(sortProductsByPrice(products).map(product => product.id)).toEqual([
      3, 6, 5, 4, 2, 1,
    ])
  })

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const catalog = [
      products.find(product => product.id === 1),
      products.find(product => product.id === 3),
      products.find(product => product.id === 4),
    ]
    expect(
      sortProductsByPrice(catalog, 'asc').map(product => product.id),
    ).toEqual([3, 4, 1])
  })

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(
      sortProductsByPrice(products, 'desc').map(product => product.id),
    ).toEqual([1, 2, 4, 5, 6, 3])
  })

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const catalog = [
      products.find(product => product.id === 3),
      products.find(product => product.id === 1),
      products.find(product => product.id === 4),
    ]
    expect(
      sortProductsByPrice(catalog, 'desc').map(product => product.id),
    ).toEqual([1, 4, 3])
  })

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const catalog = [
      products.find(product => product.id === 5),
      products.find(product => product.id === 2),
      products.find(product => product.id === 6),
    ]
    expect(
      sortProductsByPrice(catalog, 'desc').map(product => product.id),
    ).toEqual([2, 5, 6])
  })

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const catalog = [
      products.find(product => product.id === 1),
      products.find(product => product.id === 3),
      products.find(product => product.id === 4),
    ]
    const snapshot = catalog.map(product => product.id)
    sortProductsByPrice(catalog, 'asc')
    expect(catalog.map(product => product.id)).toEqual(snapshot)
  })

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const catalog = [
      products.find(product => product.id === 1),
      products.find(product => product.id === 3),
      products.find(product => product.id === 4),
    ]
    const snapshot = catalog.map(product => product.id)
    sortProductsByPrice(catalog, 'desc')
    expect(catalog.map(product => product.id)).toEqual(snapshot)
  })

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    const snapshot = products.map(product => product.id)
    sortProductsByPrice(products)
    expect(products.map(product => product.id)).toEqual(snapshot)
  })
})
