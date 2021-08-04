const Node = require('../models/Node');
const {
    mongooseToObject,
    MultipleMongooseToObject,
    MongooseToObject
} = require('../../utils/mongoose');
const {
    multipleMongooseToObject
} = require('../../utils/mongoose');
// const nodemailer = require('nodemailer');
// const hbs = require('nodemailer-express-handlebars');
const path = require('path');

class SiteController {

    //[GET] Home
    index(req, res, next) {

        Node.find({})
            .then(nodes => {
                res.render('home', {
                    nodes: MultipleMongooseToObject(nodes)
                })
            })
            .catch(next)

    }
    //[GET] API DATA SERVER TO CLIENT SIDE MAPPING
    api(req, res, next) {

        Node.find({})
            .then(nodes => {
                var Data = MultipleMongooseToObject(nodes)
                res.json(Data)
                return
            })
            .catch(next)

    }
}
module.exports = new SiteController