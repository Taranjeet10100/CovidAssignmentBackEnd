const covid_route = require('./app/modules/routes/covidData.route');

module.exports = [
    {
        path: '/api/v1/covid',
        handler: covid_route
    },

]