const http = require("http")
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    console.log(req.url)
    res.end('<h2>Nickie</h2>')
})

const PORT = 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
