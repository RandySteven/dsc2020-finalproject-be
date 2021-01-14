const express = require('express')

const app = express();
app.use(express.urlencoded({extended:true}))
app.use('/province/', require('./src/router/province'));

app.listen(3000, console.log('Success to connect'));