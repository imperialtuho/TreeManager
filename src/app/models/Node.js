const mongoose = require('mongoose')
const Schema = mongoose.Schema

const node = new Schema({
    Ten: {
        type: String,
        default: '#'
    },
    Mo_ta: {
        type: String,
        default: 'Đây là vị trí cây số #'
    },
    Toa_do:[],
    Pin: {
        String,
        default: 0
    },
    Do_am: {
        String,
        default: 0
    },
    Gio: {
        String,
        default: 0
    },
    ADXL345_1: {
        X: {
            type: String,
            default: 0
        },
        Y: {
            type: String,
            default: 0
        },
        Z: {
            type: String,
            default: 0
        },
    },
    ADXL345_2: {
        X: {
            type: String,
            default: 0
        },
        Y: {
            type: String,
            default: 0
        },
        Z: {
            type: String,
            default: 0
        },
    },
    Trang_thai: {
        type: String,
        default: 'Good'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('node', node, 'node')