import express from 'express'
import router from './routers/users.routes.js'
import mongoose, { mongo } from 'mongoose'

const app = express()
app.use(express.json())
app.listen(8080, () => console.log('Listening...'))

mongoose.set('strictQuery', false)

mongoose.connect('mongodb+srv://nicolas:JQ06zRLxcaq0cVa0@cluster0.y1vt4dq.mongodb.net/?retryWrites=true&w=majority', error => {
    if(error) {
        console.error('Cannot connect to database ', error);
        process.exit()
    }
})


app.use('/api/users', router)
app.get('/', (req, res) => {
    res.send('ok')
})