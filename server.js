const express = require('express');
const path = require('path');
const voca = require('voca');
const dotenv = require('dotenv');

const app = express();
dotenv.config({ path: './config.env' });

var fs = require('fs');

var families = fs.readFileSync('./families.dat').toString().replace("\r","").split("\n");

var allFamilies = new Array();

var allPaintings = new Array();

families.map( (line) => {
  var tmp = line.split(":");
  let dir=tmp[0];

  let label = voca.replaceAll(tmp[1],/"/,'');

  var folder = './images/'+ dir +'/';
  allFamilies.push(new Object({'family': dir , 'label': label }));

  let list = fs.readdirSync(folder);
  let list2 = list.filter(function (e) { return (e != 'Thumbs.db') });

  // example  let bigCities = cities.filter(function (e) { return e.population > 3000000; });
  return(list2.map( (filename) => {

      allPaintings.push(new Object({'dir': "images/"+dir , 'label': label, 'image': filename }));
    }
));


  });

// console.log(allPaintings);
app.use(express.json());

// app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/api/getAllPaintings', (req, res) => {
  res.json(allPaintings);
  });

app.get('/api/getPaintingsByFamily/:family', (req, res) => {
    res.json(allPaintings.filter( (folder) => { 
      // console.log(req.params.family);
      return( folder.dir == "images/" + req.params.family );
      }));
    });
  
app.get('/api/getFamilies', (req, res) => {
    res.json(allFamilies);
    });

// Set static folder
//console.log(__dirname);
//app.use(express.static(path.join(__dirname, '/images')));
app.use('/images',express.static(path.join(__dirname, '/images')));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

console.log("Le serveur tourne en mode ", process.env.NODE_ENV);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));