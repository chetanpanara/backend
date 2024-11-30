const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

const userModel = require('./model/Users')

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.CONNECTION)

// mongoose.connect('mongodb://localhost:27017/mywebsite')

app.post('/createuser', (req, res) => { 
  userModel.create(req.body)
    .then(users =>res.json(users))
  .catch(err=>res.json(err))
})

app.get('/data', (req, res) => { 
  userModel.find({})
  .then(users =>res.json(users))
  .catch(err=>res.json(err))
})

app.delete('/deleteuser/:id', (req, res) => { 
  const id = req.params.id;
  
  userModel.findByIdAndDelete({ _id: id })
  .then(res=>res.json(res))
  .catch(err=>res.json(err))
})

app.get('/getuser/:id', (req, res) => { 
  const id = req.params.id;
  userModel.findById({ _id:id })
   .then(users =>res.json(users))
  .catch(err=>res.json(err))
})
app.put('/updateuser/:id', (req, res) => { 
  const id = req.params.id;
  
  userModel.findByIdAndUpdate({ _id: id }, {name:req.body.name,email:req.body.email})
   .then(users =>res.json(users))
  .catch(err=>res.json(err))
})


app.listen(5001, () => { 
  console.log("server is running in 5001");
})