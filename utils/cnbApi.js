const axios = require('axios')

const BASE_URL =
	'https://www.cnb.cz/en/financial_markets/foreign_exchange_market/exchange_rate_fixing/'

async function getCNBData(date) {
	const dateString = date.toISOString().slice(0, 10)
	const response = await axios.get(`${BASE_URL}daily.txt?date=${dateString}`)
	return response.data
}

function parseCNBData(data) {
	const lines = data.split('\n')
	const rates = []

	// Skip the first two lines (header and date), start from the third line
	for (let i = 2; i < lines.length; i++) {
		const line = lines[i].trim()

		if (!line) {
			continue
		}

		const [country, currency, amount, code, rate] = line.split('|')
		rates.push({
			country: country.trim(),
			currency: currency.trim(),
			amount: parseInt(amount.trim()),
			code: code.trim(),
			rate: parseFloat(rate.trim()),
		})
	}

	return rates
}

module.exports = {
	getCNBData,
	parseCNBData,
}
