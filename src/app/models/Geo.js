const mongoose = require('mongoose')
const Schema = mongoose.Schema

const geo = new Schema({
    id: { type: String, default: "#"},
    
    Toa_do:[],

    Trang_thai: { type: String, default: 'Không còn hoạt động'},
}, {
    timestamps: true
})

module.exports = mongoose.model('geo', geo, 'geo')