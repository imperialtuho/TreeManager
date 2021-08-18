const mongoose = require('mongoose')
const Schema = mongoose.Schema

const node = new Schema({
    Name: {
        type: String,
        default: '#'
    },
    Description: {
        type: String,
        default: 'This is description'
    },
    Coordinate: {
        Longitude: {
            type: String,
            default: 0
        },
        Latitude: {
            type: String,
            default: 0
        },
    },
    Temp: {
        String,
        default: 0
    },
    Hud: {
        String,
        default: 0
    },
    Wind: {
        String,
        default: 0
    },
    ADXL345: {
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
    Status: {
        type: String,
        default: 'Good'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('node', node, 'node')