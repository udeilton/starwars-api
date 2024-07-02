const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3000
mongoose.connect('mongodb+srv://jhodblack:14xVWsp8l48qjyJn@starwors-api.cgeaxzz.mongodb.net/?retryWrites=true&w=majority&appName=starwors-api')

const Film = mongoose.model('Film', { 
    title: String,
    description: String,
    image_url: String,
    trailer_url: String
 })

app.get("/", async (req, res) =>{
    const film = await Film.find()
    res.send(film)
})

app.delete("/id:", async(req, res) => {
    const film = await Film.findByIdAnRemove(req.params.id)
    res.send(film)
})

app.put("/id", async (req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })

    return res.send(film)
})
app.post("/", async (req, res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        trailer_url: req.body.trailer_url
    })

    await film.save()
    return res.send(film)

})

app.listen(port, () => {
    console.log('App running')
})