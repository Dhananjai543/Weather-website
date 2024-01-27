const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(__filename)
const publicDirectoryPath = path.join(__dirname, '..', '/public')
const viewsDirectoryPath = path.join(__dirname, '..', '/templates/views')
const partialDirectoryPath = path.join(__dirname, '..', '/templates/partials')

const app = express()
const port = process.env.port || 3000

app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialDirectoryPath)

app.get('/', (req, res) => {
    //name of template
    res.render('index', {
        title: 'Shinchan',
        name: 'Nohara',
        partial_title: 'Hii There',
        parents: 'Misae and Harry'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        variableName: 'Need Help',
        name: 'Nohara',
        partial_title: 'Help page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        about: 'Express App',
        name: 'Nohara',
        partial_title: 'About page',
        parents: 'Misae and Harry'
    })
})

app.get('/help/*', (req,res) => {
    res.send("Help article not found :)")
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if(error) {
            return res.send({
                error: error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }

            res.send({
                location: location,
                forecastData: forecastData
            })
    
        })
    })

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'India',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    req.query.search
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.send("OOPS. Page does not exists :)")
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})