const fs = require('fs');
const path = require('path');
const urljoin = require('url-join');

const basename = path.basename(module.filename);

const loadRoutes = (app, appPath) => {
    fs.readdirSync(__dirname).filter(file => {
        return (file.indexOf('.') != 0) && (file != basename) && (file.slice(-3) == '.js')
    }).forEach(file => {
        const routeFile = path.join(__dirname, file) // Get the path for each file
        const route = require(routeFile) // require the router element
        const routePath = urljoin(appPath, route.path)
        console.log("loading... route: ", routePath)
        app.use(routePath, route.router)
    })
}

module.exports = {
    loadRoutes
}