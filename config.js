//MONGODB_URI: 'mongodb+srv://konovia:2kn7kNXcIP7a8bZy@cluster0.uliaihf.mongodb.net/?retryWrites=true&w=majority'
module.exports = {
	dbUrl:
		'mongodb+srv://konovia:2kn7kNXcIP7a8bZy@cluster0.uliaihf.mongodb.net/?retryWrites=true&w=majority',
	CNB_API_URL:
		'https://www.cnb.cz/en/financial_markets/foreign_exchange_market/exchange_rate_fixing/year.txt',
	CRON_SCHEDULE: '*/2 * * * *',
	CURRENCIES: ['USD', 'EUR', 'GBP'],
	PORT: 3000,
}
