const mongoose = require('mongoose');

exports.connectToDb = ()=>{
	mongoose.connect('mongodb://localhost/photo_sharing', { useNewUrlParser: true });
	mongoose.connection
		.on('error',(err)=>{
			console.warn('warninggg', err);
		})
}