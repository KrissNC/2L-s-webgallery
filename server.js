const express = require('express');
const path = require('path');
const voca = require('voca');

const app = express();

var fs = require('fs');
var families = fs.readFileSync('./families.dat').toString().split("\r\n");

var allFamilies = new Array();

var allPaintings = new Array();

families.map( (line) => {
  var tmp = line.split(":");
  var dir=tmp[0];

  var label = voca.replaceAll(tmp[1],/"/,'');

  var folder = './images/'+ dir +'/';
  allFamilies.push(new Object({'family': dir , 'label': label }));

  var list = fs.readdirSync(folder);
  return(list.map( (filename) => {
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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));