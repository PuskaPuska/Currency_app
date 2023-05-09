const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	code: {
		type: String,
		required: true,
	},
	rate: {
		type: Number,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
})

module.exports = mongoose.model('Rate', rateSchema)
