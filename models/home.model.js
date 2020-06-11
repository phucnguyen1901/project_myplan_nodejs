

const mongoose = require('mongoose')

const myPlans = new mongoose.Schema({
    name: String,
    age: Number
})

const plans = mongoose.model('plans',myPlans)

module.exports = plans


// const mongoose = require('mongoose')

// const myPlans = new mongoose.Schema({
//     name: String,
//     age: Number
// })

// const plans = mongoose.model('plans',myPlans)

// module.exports = plans





