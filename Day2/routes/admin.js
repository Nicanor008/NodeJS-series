const Express = require('express');
const path = require('path')

const rootDir = require('../utils/path')

const router = Express.Router();

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'product.html'))
})

router.post('/product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/')
})

module.exports = router;
