const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://meli:poop000@ds263590.mlab.com:63590/bosjob');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

app.use(bodyParser.urlencoded({extended:true}))




app.set('view engine', 'ejs'); // assum all files ending in ejs - can omit ejs
app.use('/css', express.static('css'));

//create schema
var companySchema = new mongoose.Schema({
  name:String,
  image:String,
  description:String
});
//sace schema into model 
var Company= mongoose.model('Company', companySchema);

// Company.create(
//   {name: "SmartBear Software",
//      image: "https://smartbear.com/SmartBear/media/images/smartbear-color-logo-s.png",
//    description:"At SmartBear, we know that for every application, there is a software team working hard behind the scenes to keep users happy." 
       
//    }, (err,Company)=>{
//      if(err){
//        console.log(err);
//      }else{
//        console.log('it works!'); 
//        console.log(Company);
//      }
//    });

// Company.create(
//   {name: "Wayfair", 
//      image: "https://d2xsegqaa8s978.cloudfront.net/wayfair_0.0.4_staging/assets/logo.png" ,
//    description:"Wayfair offers a zillion things home. With one of the world's largest online selections of furniture, home furnishings, décor and goods, including more than ten million products from over 10,000 suppliers"
//     }, (err,Company)=>{
//      if(err){
//        console.log(err);
//      }else{
//        console.log('it works!'); 
//        console.log(Company);
//      }
//    });

// Company.create(
//    {name:"Lovepop",
//      image:"https://cdn.shopify.com/s/files/1/0367/6021/t/7/assets/logo.png?6446336489268578380"
//     }, (err,Company)=>{
//      if(err){
//        console.log(err);
//      }else{
//        console.log('it works!'); 
//        console.log(Company);
//      }
//    });
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
    }
    ,
    {name:"Lovepop",
     image:"https://cdn.shopify.com/s/files/1/0367/6021/t/7/assets/logo.png?6446336489268578380"
    }
   ] 


  
  
  
//   .exec((err, docs) =>{
//    if(err){
//      console.log(err);
//    }else{
//     // return docs;
//      console.log(docs);
//    }
//   });





app.get('/', (req,res)=>{
  res.render('landing')
})

//I want explaination on this - 
app.get('/companies',(req, res)=> {
  let queries = [
    Company.find({},{_id: 0, __v: 0})
  ];
  
  Promise.all(queries).then(results =>{
    res.render('companies',{companies:results[0]})
  }).catch(err =>{
  console.error('Fetching:',err)
});
})

app.get('/companies/new',(req,res)=>{
  res.render('newCompany')
})

app.post('/companies', (req, res)=>{
  var name = req.body.name;
  var image = req.body.logo;
  var description = req.body.description;
  Company.create({name:name,image:image, description:description},(err,Company)=>{
    if(err){
      console.error('Fetching error:', err)
    }else{
      console.log(Company);
    }
  });
  res.redirect('companies');
})

app.get('/companies/:id', (req,res)=>{
  //find the campground with the provided ID 
 // render a page for that company
 let queries = [
    Company.findById(req.params.id)
  ];

  Promise.all(queries).then(results =>{
    console.log(results[0]);
    
    res.render('show',{comp:results[0]})
   
  }).catch(err =>{
  console.error('Fetching:',err)
});
})





















app.listen(3000, console.log('the app is on'))