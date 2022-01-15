function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart')
        },
        update(req, res) {
            return res.json({ data: 'Cart Item Received!' })
        }
    }
}

module.exports = cartController