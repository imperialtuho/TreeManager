const Node = require('../models/Node');
const Geo = require('../models/Geo');
const {
    mongooseToObject,
    MultipleMongooseToObject,
    MongooseToObject
} = require('../../utils/mongoose');
const nodemailer = require('nodemailer');
// const hbs = require('nodemailer-express-handlebars');
const path = require('path');

class SiteController {

    //[GET] Home
    async index(req, res, next) {
        await res.render('home')
    }
    //[GET] API DATA SERVER TO CLIENT SIDE MAPPING
    async api(req, res, next) {
        await Node.find({})
            .then(nodes => {
                var Data = MultipleMongooseToObject(nodes)
                res.json(Data)
                return
            })
            .catch(next)

    }
    //[GET] GEO API DATA SERVER TO CLIENT SIDE MAPPING
    async geoapi(req, res, next) {
        await Geo.find({})
            .then(geos => {
                var Data = MultipleMongooseToObject(geos)
                res.json(Data)
                return
            })
            .catch(next)
    }
    //[POST] CLIENT-SERVER DATA PROCESSING AND RESPONDING
    async apidata(req, res, next) {
        var item, iD, stat, bat, wind
        function SendMail() {
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'Treemanagertempmail@gmail.com',
                    pass: '123456789tu'
                }
            });

            var mailOptions = {
                from: 'Treemanagertempmail@gmail.com',
                to: 'waffenss436@gmail.com, duyngo.4135@gmail.com, tub1709448@student.ctu.edu.vn',
                subject: 'Cảnh báo cây xanh ngã đổ',
                text: `Có góc nghiêng thay đổi đáng kể trong 3 lần đọc giá trị liên tiếp tại cây số ${iD}!`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        const data = req.body
        res.json(data)
        for (item of data) {
            iD = item.id
            stat = item.Trang_thai
            bat = item.Pin
            wind = item.wind
            var wsp = parseFloat(wind)
            var pwd = parseInt(bat)
            if ((stat != "0") || (wsp > 50) || (pwd <= 30)) {
                SendMail()
            } else {
                continue
            }
        }

    }

}


module.exports = new SiteController