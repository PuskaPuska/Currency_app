const cron = require('node-cron')
const moment = require('moment')
const config = require('../config')
const Rate = require('../models/rate')
const { getCNBData, parseCNBData } = require('./cnbApi')

async function populateDatabase(date, rates) {
	for (const rate of rates) {
		try {
			await Rate.findOneAndUpdate(
				{ date, code: rate.code },
				{ ...rate, date },
				{ upsert: true }
			)
		} catch (error) {
			console.error('Error populating database:', error)
		}
	}
}

async function populateDatabaseForPeriod(startDate, endDate) {
	// Convert the dates to Date objects
	const start = new Date(startDate)
	const end = new Date(endDate)

	// Iterate through the dates, adding one day at a time
	for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
		// Get the data from CNB and populate the database
		try {
			const data = await getCNBData(date)
			const rates = await parseCNBData(data)
			console.log(date)
			await populateDatabase(date, rates)
		} catch (error) {
			console.error('Error populating database for date', date, ':', error)
		}
	}
}

async function fetchExchangeRatesForToday() {
	const today = new Date()
	try {
		const data = await getCNBData(today)
		const rates = await parseCNBData(data)
		return rates
	} catch (error) {
		console.error('Error fetching exchange rates:', error)
		return []
	}
}

function startCronTask() {
	cron.schedule(config.CRON_SCHEDULE, async () => {
		const rates = await fetchExchangeRatesForToday()
		const today = new Date()
		populateDatabase(today, rates)
		console.log("cron")
	})
}

module.exports = {
	startCronTask,
	populateDatabaseForPeriod,
}
