const _products = [
    { id: 1, title: 'ipad 4 mini', price: 500.01, inventory: 2 },
    { id: 2, title: 'T-shirt', price: 10.99, inventory: 10 },
    { id: 3, title: 'CD', price: 19.99, inventory: 5 },
]

export const getAllProducts = (callback) => {
    setTimeout(() => {
        callback(_products)
    }, 100)
}
export const buyProducts = (products, callback, errorCallback) => {
    setTimeout(() => {
        Math.random() > 0.5 ? callback(products) : errorCallback();
    }, 100)
}