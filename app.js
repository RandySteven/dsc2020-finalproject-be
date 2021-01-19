const express = require('express')

const app = express();
app.use(express.urlencoded({extended:true}))

app.use((req, res, next)=>{
    const apiKey = req.headers['x-api-key'];
    if(apiKey === undefined){
        return res.send({message:'Api Key not found'});
    }else if(apiKey !== 's3cr37'){
        return res.send({message:'Api key invalid'})
    }
    next();
});

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
})

app.get('/testing', (req, res)=>{
    res.send({message:'route testing'});
});


app.use('/province/', require('./src/router/province'));

app.listen(3000, console.log('Success to connect'));