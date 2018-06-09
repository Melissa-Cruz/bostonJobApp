const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs'); // assum all files ending in ejs - can omit ejs


companiesArray = 
   [ {name: "SmartBear Software",
     image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" },
    { name: "Wayfair", 
     image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" },
    { name: "Akamai Technologies", image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" }
   ]

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res)=>{
  res.render('landing')
})

app.get('/companies',(req, res)=>{
    res.render('companies',{companies:companiesArray})
})

app.get('/companies/new',(req,res)=>{
  res.render('newCompany.ejs')
})

app.post('/companies', (req, res)=>{
  var name = req.body.name;
  var image = req.body.logo;
  companiesArray.push({name:name,image:image});
  res.redirect('companies');
})


























app.listen(3000, console.log('the app is on'))