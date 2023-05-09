const Rate = require('../models/rate')
const config = require('../config')

const saveRate = async (data) => {
	const lines = data.split('\n')
	for (const line of lines) {
		const fields = line.split('|')
		if (config.CURRENCIES.includes(fields[3])) {
			await Rate.create({
				date: fields[0],
				currency: fields[3],
				rate: parseFloat(fields[4]),
			})
		}
	}
}

const getReport = async (req, res) => {
	const { startDate, endDate } = req.query
	const result = {}

	for (const code of config.CURRENCIES) {
		const rates = await Rate.find({
			code,
			date: { $gte: new Date(startDate), $lte: new Date(endDate) },
		})

		const sum = rates.reduce(
			(accumulator, current) => accumulator + current.rate,
			0
		)
		const average = sum / rates.length
		const min = Math.min(...rates.map((rate) => rate.rate))
		const max = Math.max(...rates.map((rate) => rate.rate))

		result[code] = {
			average: parseFloat(average.toFixed(4)),
			min,
			max,
		}
	}

	res.json(result)
}

module.exports = {
	saveRate,
	getReport,
}
