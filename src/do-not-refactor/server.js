// DO NOT MODIFY

const express = require('express')
const cors = require('cors')
const path = require('path')

const config = require('./config.js')
const { get: getImages } = require('./image-db.js')

const app = express()
const port = config.port

app.use(cors())

// Serve image files
app.use('/static', express.static(path.join(__dirname, 'public')))

/**
 * Retrieve a list of images with response limit of 3 items only
 * @param  {('nature'|'architecture'|'fashion')}  category  Image category
 * @param  {Number}                               page      Page number
 */
app.get('/images', (req, res) => {
  const category = req.query.category
  const page = req.query.page || 1

  const images = getImages(category, page)

  // Simulate latency
  setTimeout(() => {
    res.send(images)
  }, 3000)
})

app.listen(port, () => {
  console.log(`Photo Sharing App API listening at http://localhost:${port}`)
})
