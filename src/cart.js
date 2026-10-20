function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.')
}

function addToCart(cart, product, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом')
  }

  const existing = cart.find(item => item.id === product.id)
  const currentQuantity = existing ? existing.quantity : 0
  const newQuantity = currentQuantity + quantity

  if (newQuantity > product.stock) {
    throw new RangeError(
      `Недостаточно товара на складе: доступно ${product.stock}`,
    )
  }

  if (existing) {
    return cart.map(item =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item,
    )
  }

  return [...cart, { ...product, quantity }]
}

function changeQuantity() {
  return notImplemented()
}
function removeFromCart() {
  return notImplemented()
}
function calculateCartSubtotal() {
  return notImplemented()
}
function calculateOrderTotal() {
  return notImplemented()
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
