const mongoose=require("mongoose")
const Schema=mongoose.Schema

const rateSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    average: {
        type: Number,
        required: false,
        default: 0
    },
    userRate: {
        type: Number,
        required: true
    },
    reviews: [{}],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }
})

module.exports = mongoose.model("Rate", rateSchema)
