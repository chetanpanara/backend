const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const userModel=require('./model/Users')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://chetanpanara88:bB2FnofHFMwGfwFP@test-pro-db.uplux.mongodb.net/?retryWrites=true&w=majority&appName=test-pro-db')

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

const port=process.env.PORT || 5001
app.listen(port, () => { 
  console.log("server is running in 5001");
})