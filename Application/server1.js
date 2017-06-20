
var express = require('express');
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
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


/*app.post('/',function(req,res){
   res.sendFile(__dirname+"/public/"+"login.html"); 
});
*/
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
   
   
   
   // registration Form data insertion


app.post('/regcust',function(req,res){
	   
	   console.log("api hitted");
	   var fname=req.body.fname;
	   var lname=req.body.lname;
	   var email=req.body.email;
	   var designation=req.body.designation;
	   var occupation=req.body.occupation;
	   var location=req.body.location;
	   var password=req.body.password;
	   var phone=req.body.phone;
	   
	   var json={
		   "fname":fname,
		   "lname":lname,
		   "email":email,
		   "designation":designation,
		   "occupation":occupation,
		   "location":location,
		   "password":password,
		   "phone":phone
		   
	   }
	   //Insertion of data into database
	 registration.insert(json,function(err,data ){
		
		if(err){
         console.log("failed");			 
		 response={"output":data}
		 res.json(response)
		 
		}
		else{
			response={"output":data}
			res.json(response)
			
		}
		
		 
		 
	 })
	 
	   
   });
   
   // Login of customer checking
   app.post('/culogin',function(req,res){
		
		//console.log("api hitted");
		
		var user = req.body.user;
		var pass =req.body.pass;
	
		
		console.log( user+" "+ pass);
		// Getting the data present in the database for validation and verification
		registration.find({"email":user,"password":pass}).toArray(function(err,data){
					if(data.length!=0)
					{
						var fname=data[0].fname;
						var lname=data[0].lname;
						var occupation=data[0].occupation;
						var location=data[0].location;
						var phone=data[0].phone;
						var designation=data[0].designation;
						console.log(designation);
						var user = {
							"fname":data[0].fname,
							"lname":data[0].lname,
							"email":data[0].email,
							"designation":data[0].designation,
							"occupation":data[0].occupation,
							"location":data[0].location,
							"phone":data[0].phone,
							
						}
						
						console.log("success");
						//res.json({"output":data});
						//res.redirect("bdetails");
						response={
							"output":"success",
							"designation":data[0].designation,
							"store":user
						}
						res.json(response);
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
   })
   
   
   
 //API for forgot password  
 
app.post('/forgot1',function(req,res){
	
	
	var email=req.body.email;
	
	registration.find({"email":email}).toArray(function(err,data){
					if(data.length!=0)
					{
						var randomPassword = getRandomCode();
						var mail={"mail":email};
						console.log(mail);
						var transporter = nodemailer.createTransport({
						service: 'gmail',
						auth: {
							user: 'globalserviceprovider2017@gmail.com',
							pass: 'globalservices2017'
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
							
							var myvalue = {email:email};
							var newvalues = { $set: { password: randomPassword}};
						
						registration.update(myvalue, newvalues, function(err, res) {
						if (err) throw err;
						else
						console.log(res.result.nModified + " record updated");
    
						});
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
					
					
					
				});

}); 


app.post('/reset',function(req,res){
	
						console.log('reset password');
						var email = req.body.email;
						var newpass = req.body.newpass;
						var repass = req.body.repass;
						
						console.log(newpass);
						
						registration.find({"email":email}).toArray(function(err,data){
					if(data.length!=0)
					{
						if(newpass == repass){
							var myvalue = {email:email};
						
						var newvalues = { $set: { password:newpass }};
						console.log(newpass);
						registration.update(myvalue, newvalues, function(err, res) {
						if (err) throw err;
						else{
							console.log(newpass  + ""+repass+"" + email);
							
							console.log(res.result.nModified + " password updated" + newpass);
							console.log("success");
						}
						
						})
						}
						
						console.log("success");
						
						response={
							"output":data
							
						}
						res.json(response);
						
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
						
		})


app.post('/search',function(req,res){
		
		console.log("api hitted");
	
		var occupation = req.body.occupation;
		var location= req.body.location;
	
		
		console.log( occupation+" "+ location);
		
		registration.find({"occupation":occupation,"location":location}).toArray(function(err,data){
					if(data.length!=0)
					{
					
						console.log("data");
						response={
							"output":data
						}
						console.log('success done'+JSON.stringify(data));
						res.json(response);
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
   })
   
   app.post('/mail',function(req,res){
	
	
	var email=req.body.email;
	
	
	registration.find({"email":email}).toArray(function(err,data){
					if(data.length!=0)
					{
						
						var mail={"mail":email}
						console.log(mail);
						var transporter = nodemailer.createTransport({
						service: 'gmail',
						auth: {
							user: 'globalserviceprovider2017@gmail.com',
							pass: 'globalservices2017'
						}
						});

						var mailOptions = {
							from: 'aakiradrithi2326@gmail.com',
							to: email,
							subject: 'from global services',
							text: "You have allocated for this job"
						};

						transporter.sendMail(mailOptions, function(error, info){
						if (error) {
							console.log(error);
						} else {
							console.log('Email sent');
							
						}
						
						console.log("success");
						
						response={
							"output":data
							
						}
						 //var user = $window.localStorage.getItem('service');
						//var u = JSON.parse(user);
						//console.log(localStorage.getItem('service'))
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


// Retrive Customer Profile Details
        app.get('/customerProfile', function (req, res) {
            registration.find({
                "designation": "customer"
            }).toArray(function (err, data) {
                if (err) {
                    res.json({
                        "output": data
                    });
					res.json(response);
					console.log(response);
                } else {
                    //console.log('Success');
                    res.json({
                        "output": data
                    });
                }
            })
        }) //  get api end
		
		
		

	}
});



app.listen(8080, function () {
console.log("app listening on 8080")
});

