const mongoose = require('mongoose')
const mongoDB = 'mongodb+srv://Leopard:Waffenss1999@cluster0.gl4r0.mongodb.net/treemanager?retryWrites=true&w=majority'

async function connect() {

    //MongoDB
    try {
        await mongoose.connect(mongoDB, {
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