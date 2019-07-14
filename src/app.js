const path = require('path') 
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

//Express server
const app = express()
const port = process.env.PORT || 3000

// Express: Set-up root and template directory paths
const publicDir = path.join(__dirname, `../public`)     //public assets
const viewsDir = path.join(__dirname, `../templates/views`)   //handlebars templates 
const partialsDir = path.join(__dirname, `../templates/partials`) //template partials

//Handlebars view engine and templates directory
app.set('view engine', 'hbs')
app.set('views', viewsDir)
hbs.registerPartials(partialsDir)

//Set-up static root directory for server
app.use(express.static(publicDir)) 

/** Page Routes */

// home (index)
app.get('', (req, res) => {
    res.render('index', {
        title: `Weather App`,
        content: `Get the weather forecast! Enter the target location below:`,
        footer_content: `Home page footer`
    })
})

// about
app.get('/about', (req, res) => {
    res.render('about', {
        title: `About Us`,
        content: `This page is about Weather site.`,
        footer_content: `About page footer`
    })
})

// help 
app.get('/help', (req, res) => {
    res.render('help', {
        title: `How To Use Weather`,
        content: `Enter the target location and submit your selection.  This should return weather results for you.`,
        footer_content: `Help page footer`
    })
})



// weather forecast
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: `An address must be provided.`
        })
    }

    //don't forget the default object value = {}
    geocode(req.query.address, (error, {location, latitude, longitude} = {}) => {
        if(error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecast) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                address: req.query.address,
                location, //object shorthand from callback object
                forecast  //object shorthand from forecast callback
            })
        })
    })
})







/** 404 Pages */
// help wildcard page
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: `404 HELP ARTICLE NOT FOUND`,
        error_message: `Help article not found.`,
        footer_content: `404 page footer`
    })
})

// wildcard page
app.get('*', (req, res) => {
    res.render('404', {
        title: `404 PAGE NOT FOUND`,
        error_message: `Page not found`,
        footer_content: `404 page footer`
    })
})

//start express server on port 3000 if not heroku
app.listen(port, () => {
    console.log('Server running on port 3000')
})
