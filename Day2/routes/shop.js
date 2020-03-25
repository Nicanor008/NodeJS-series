const Express = require('express');
const rootDir = require('../utils/path')

const router = Express.Router()

// router.use('/users', (req, res, next) => {
//     const users = {
//         name: "Nickie",
//         age: 22,
//         nationality: "Kenyan"
//     }
//     res.send(users)
//     console.log('Single User Object')
// })

// router.use('/', (req, res, next) => {
//     res.send('<h1>Express Learning Homepage</h1>')
//     console.log("This is the homepage")
// })
router.get('/', (req, res, next) => {
    res.sendFile(rootDir, 'views', 'shop.html')
})

module.exports = router;

