module.exports = {
    MultipleMongooseToObject: function (mongooses) {
        return mongooses.map(mongoose => mongoose.toObject())
    },
    MongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose
    }
}