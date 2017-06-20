
var express = require('express');
var app = express();
var bodyparser=require('body-parser');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/services';
app.use(bodyparser());
var multer=require('multer');
app.use(express.static('public'));
/*app.get('/',function(req,res){
   res.sendFile(__dirname+"/public/"+"index.html"); 
});*/

MongoClient.connect(url, function (err, db) {
	if (err) {
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} 
	else 
	{
    console.log('Connection established to', url); 
	

	
	var registration= db.collection("customerdetails");
	var registration1= db.collection("servicedetails");
	console.log('collections created')
   // Customer login
   app.post('/culogin',function(req,res){
		
		//console.log("api hitted");
		
		var user = req.body.user;
		var pass =req.body.pass;
	
		
		console.log( user+" "+ pass);
		
		registration.find({"mail":user,"pass":pass}).toArray(function(err,data){
					if(data.length!=0)
					{
						console.log("success");
						//res.json({"output":data});
						//res.redirect("bdetails");
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
   
   
   //customer registration Form data insertion


app.post('/regcust',function(req,res){
	   
	   console.log("api hitted");
	   var fname=req.body.fname;
	   var lname=req.body.lname;
	   var email=req.body.email;
	   var password=req.body.password;
	   var phone=req.body.phone;
	   
	   var json={
		   "fname":fname,
		   "lname":lname,
		   "email":email,
		   "password":password,
		   "phone":phone
		   
	   }
	   
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
	 
	   
   })
 /*  
   //Service man login
   app.post('/selogin',function(req,res){
		
		//console.log("api hitted");
		
		var user = req.body.user;
		var pass =req.body.pass;
	
		
		console.log( user+" "+ pass);
		
		registration1.find({"mail":user,"pass":pass}).toArray(function(err,data){
					if(data.length!=0)
					{
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
    
//Serviceman Registration form insertion
app.post('/regserv',function(req,res){
	   
	   console.log("api hitted");
	   var fname=req.body.fname;
	   var lname=req.body.lname;
	   var email=req.body.email;
	   var password=req.body.password;
	   var phone=req.body.phone;
	   var occupation=req.body.occupation;
	   
	   var json={
		   "fname":fname,
		   "lname":lname,
		   "email":email,
		   "password":password,
		   "phone":phone,
		   "occupation":occupation
	   }
	   
	 registration1.insert(json,function(err,data ){
		
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
	 
	   
   })
   
   
   
	}
});

*/

app.listen(8080, function () {

console.log("app listening on 8080")
});

