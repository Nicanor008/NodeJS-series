const express=require('express')

const analyticsController = require('./analytics_controller')

const router = express.Router()

router.route('/todo').get(analyticsController.getAnalytics)

module.exports = router
