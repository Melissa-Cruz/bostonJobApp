const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs'); // assum all files ending in ejs - can omit ejs
app.use('/css', express.static('css'));

companiesArray = 
   [ {name: "SmartBear Software",
     image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" 
     },
    { name: "Wayfair", 
     image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" 
    },
    { name: "Akamai Technologies", 
     image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png"
    },
    {name:"Lovepop",
     image:"https://cdn.shopify.com/s/files/1/0367/6021/t/7/assets/logo.png?6446336489268578380"
    },
     {name: "SmartBear Software",
     image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png" 
     },
    { name: "Wayfair", 
     image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" 
    },
    { name: "Akamai Technologies", 
     image: "https://www.akamai.com/us/en/multimedia/images/logo/akamai-logo.png" 
    },
    {name:"Lovepop",
     image:"https://cdn.shopify.com/s/files/1/0367/6021/t/7/assets/logo.png?6446336489268578380"
    }
   ]

app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req,res)=>{
  res.render('landing')
})

app.get('/companies',(req, res)=>{
    res.render('companies',{companies:companiesArray})
})

app.get('/companies/new',(req,res)=>{
  res.render('newCompany')
})

app.post('/companies', (req, res)=>{
  var name = req.body.name;
  var image = req.body.logo;
  companiesArray.push({name:name,image:image});
  res.redirect('companies');
})





app.listen(3000, console.log('the app is on'))