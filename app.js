const express = require('express');
const bodyParser = require('body-parser');
const Image = require('./model').Image;
const dbConnect = require('./model').connectToDb;
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const util = require('util')
const app = express();
dbConnect();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.get('/', (req,res)=>{
	Image.find({})
		.then(images =>{
			res.render('index', {
				images
			});
		})
})
app.post('/',(req,res)=>{
	let form = new formidable.IncomingForm();
 	form.encoding = 'utf-8';
 	form.uploadDir = __dirname+"/public/temp";

    form.parse(req, function(err, fields, files) {
    	let newPath = files.data.path + path.extname(files.data.name)
    	fs.rename(files.data.path,newPath , (err)=>{
    		if(!err){
    			let image = new Image({
    				name: fields.name || files.name,
    				data: path.basename(newPath)
    			})		
    			image.save()
    				.then(()=>{
    					console.log('image saved');
    					res.redirect('/');
    			});
    		}
    	})
    	
    });
})
app.listen(3000,()=>{
	console.log('listening on port 3000');
})
