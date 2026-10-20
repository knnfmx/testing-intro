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

function changeQuantity(cart, id, quantity) {
  const existing = cart.find(item => item.id === id)

  if (!existing) {
    return [...cart]
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом')
  }

  if (quantity > existing.stock) {
    throw new RangeError(
      `Недостаточно товара на складе: доступно ${existing.stock}`,
    )
  }

  return cart.map(item => (item.id === id ? { ...item, quantity } : item))
}

function removeFromCart(cart, id) {
  return cart.filter(item => item.id !== id)
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart)

  const isSave10 = promoCode === 'SAVE10' && subtotal >= 20000
  const discount = isSave10 ? Math.round(subtotal * 0.1) : 0

  const delivery = subtotal >= 50000 ? 0 : 30000

  const total = subtotal - discount + delivery

  return { subtotal, discount, delivery, total }
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
