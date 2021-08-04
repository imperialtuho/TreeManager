const siteRouter = require('./site')
const errorRouter = require('./error')


function Route(app) {

    //Default will return to Site
    app.use('/', siteRouter)
    app.use('*', errorRouter)

}
module.exports = Route