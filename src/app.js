const path = require('path')
const express = require('express')
const hbs = require('hbs')
// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// Define Path for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')

const viewPath = path.join(__dirname, '../templates/views')

const partialsPath = path.join(__dirname, '../templates/partials')


// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)


// Setup Static Directory to Server
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Tega Iv'
    })
})

app.get('/about', (req, res) => {
  res.render('about',{
    title: 'About me',
    name: 'Tega Iv'
  })

  })
  app.get('/help', (req, res) => {
    res.render('help',{
      helpText: 'This is some helpful text.',
      title: 'Help',
      name: 'Tega Iv'
    })
  
    })

  app.get('/products', (req, res) => {
    if (!req.query.search) {
      return  res.send({
          error: 'You must provide a search term.'
        })
    }

    console.log(req.query.search)
    res.send({
      products: []
    })
  })


  app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
          error: 'You must provide an address!'
          
        })
    }
      // geocode(req.query.address, (error, { latitude, longitude, location }) => {
      //    if (error) {
      //    return res.send( {error })

      //    }
      //    forecast(latitude, longitude, (error, forecastData) => {
      //     if (error) {
      //       return res.send({error})
   
      //       }
      //       res.send({
      //         forecast: forecastData,
      //         location,
      //         address: req.query.address
      //       })
      //    })
      // })

    res.send({
        forcast: 'It is sunny',
        Location: 'Abuja',
        address: req.query.address
    })
  })

// app.com
// app.com/help
// app.com/about

app.get('/help/*',(req, res) => {
  res.render('404',{
    title: '404',
    name: 'Tega Iv',
    errorMessage: 'Help article not found.'

  })
})

app.get('*',(req, res) => {
  res.render('404',{
    title: '404',
    name: 'Tega Iv',
    errorMessage: 'Page not found.'

  })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
