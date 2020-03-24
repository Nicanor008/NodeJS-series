const express = require('express')

const app = express()

app.use('/users', (req, res, next) => {
    const users = {
        name: "Nickie",
        age: 22,
        nationality: "Kenyan"
    }
    res.send(users)
    console.log('Single User Object')
})

app.use('/', (req, res, next) => {
    res.send('Express Learning Homepage')
    console.log("This is the homepage")
})

app.listen(5000, () => {
    console.log("Server started")
})