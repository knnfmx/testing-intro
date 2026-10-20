function assertValidQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом')
  }
}

function assertStockAvailable(requested, stock) {
  if (requested > stock) {
    throw new RangeError(`Недостаточно товара на складе: доступно ${stock}`)
  }
}

function addToCart(cart, product, quantity) {
  assertValidQuantity(quantity)

  const existing = cart.find(item => item.id === product.id)
  const newQuantity = (existing ? existing.quantity : 0) + quantity

  assertStockAvailable(newQuantity, product.stock)

  if (!existing) {
    return [...cart, { ...product, quantity }]
  }

  return cart.map(item =>
    item.id === product.id ? { ...item, quantity: newQuantity } : item,
  )
}

function changeQuantity(cart, id, quantity) {
  const existing = cart.find(item => item.id === id)

  if (!existing) {
    return [...cart]
  }

  assertValidQuantity(quantity)
  assertStockAvailable(quantity, existing.stock)

  return cart.map(item => (item.id === id ? { ...item, quantity } : item))
}

function removeFromCart(cart, id) {
  return cart.filter(item => item.id !== id)
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

const DEFAULT_ORDER_RULES = {
  freeDeliveryThreshold: 50000,
  deliveryCost: 30000,
  promoCodes: {
    SAVE10: { minSubtotal: 20000, percent: 10 },
  },
}

function calculateOrderTotal(cart, promoCode, rules = DEFAULT_ORDER_RULES) {
  const subtotal = calculateCartSubtotal(cart)

  const promo = rules.promoCodes[promoCode]
  const discount =
    promo && subtotal >= promo.minSubtotal
      ? Math.round((subtotal * promo.percent) / 100)
      : 0

  const delivery =
    subtotal >= rules.freeDeliveryThreshold ? 0 : rules.deliveryCost

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  }
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
}

if (typeof module !== 'undefined') module.exports = cartApi
if (typeof window !== 'undefined') window.cartApi = cartApi
