const mongoose = require('mongoose')
const config = require('./config')

const connect = () => {
	mongoose
		.connect(config.dbUrl, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		})
		.then(() => console.log('Connected to the database'))
		.catch((error) => console.error('Error connecting to the database', error))
}

module.exports = {
	connect,
}
