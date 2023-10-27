import app from './app'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()


const PORT = process.env.PORT || 8000
const serverURI = 'http://localhost:' + PORT
const mongoURI = process.env.MONGO_URI

app.listen(PORT, () => console.log('server running on: ' + serverURI))

mongoose.connect(mongoURI)
  .then(() => console.log('connected to DB'))
  .catch(err => console.log(err))