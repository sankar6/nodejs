var express = require('express');

var app = express();
var bodyparser=require('body-parser');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/test';
app.use(bodyparser());
var multer=require('multer');
app.use(express.static('public'));

var nodemailer = require('nodemailer');

//Function to generate random code

function getRandomCode() {
	var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789";
	var rand;
	var charec = '';
	for (var i = 0; i < 8; i++) {
		rand = Math.floor(Math.random() * str.length);
		charec += str.charAt(rand);
	}
	console.log(charec);
	return charec;
	
}


app.post('/f',function(req,res){
   res.sendFile(__dirname+"/public/"+"login.html"); 
});

//Mongo db function
MongoClient.connect(url, function (err, db) {
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} 
	else 
	{
    console.log('Connection established to', url); 
	// Collection creation in databases
	var registration= db.collection("details");
	console.log('collections created')
   //  login
   
app.post('/forgot1',function(req,res){
	
	
	var email=req.body.email;
	
	registration.find({"email":email}).toArray(function(err,data){
					if(data.length!=0)
					{
						var randomPassword = getRandomCode();
						var mail={"mail":email}
						console.log(mail);
						var transporter = nodemailer.createTransport({
						service: 'gmail',
						auth: {
							user: 'aakiradrithi2326@gmail.com',
							pass: 'elsaanna2326'
						}
						});

						var mailOptions = {
							from: 'aakiradrithi2326@gmail.com',
							to: email,
							subject: 'forgot password request from global services',
							text: "Your new Password is : " + randomPassword
						};

						transporter.sendMail(mailOptions, function(error, info){
						if (error) {
							console.log(error);
						} else {
							console.log('Email sent: ' + info.response);
							res.send(info.response);
						}
						
						console.log("success");
						
						response={
							"output":data
							
						}
						res.json(response);
						});
						
						
					}	
					
					else
					{
						console.log("failed");
						//res.send("failed to send");
						response={
							"output":data
						}
						res.json(response);
						
					}
					
					
					
				})

}); 

	}
});