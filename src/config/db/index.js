const mongoose = require('mongoose')


async function connect() {

    //MongoDB
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('Connected to Mongoose!')
    } catch (error) {
        console.log('Connect to Mongoose failed!')
    }
}

module.exports = {
    connect
}