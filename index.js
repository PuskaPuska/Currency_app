const express = require('express')
const db = require('./db')
const config = require('./config')
const rateRoutes = require('./routes/rate')
const cronTask = require('./utils/cronTask')
const { populateDatabaseForPeriod } = require('./utils/cronTask')
const app = express()

db.connect()

app.use(express.json())
app.use('/api', rateRoutes)


// Replace the lines below with your desired start and end dates
const startDate = '2023-05-01'
const endDate = '2023-05-21'
populateDatabaseForPeriod(startDate, endDate)



cronTask.startCronTask()

app.listen(config.PORT, () => {
	console.log(`Server is running on port ${config.PORT}`)
})
