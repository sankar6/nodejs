var app = angular.module("app",['ngRoute']);
app.config(function($routeProvider)
 {
    $routeProvider
      
      .when('/',{
        url:'login',
        templateUrl:'home.html',
        controller:'login'
      })
	  
	 
	.when('/register',{
		  url:'register',
		  templateUrl:'register.html',
		  controller:'cregctrl'
	  })
	  .when('/forgot',{
		  url:'forgot',
		  templateUrl:'cforgot.html',
		  controller:'forgot'
	  })
	  
	  .when('/cprof',{
		  url:'cprof',
		  templateUrl:'custhome.html',
		  controller:'cprofctrl'
	  })
	  
	  .when('/serprof',{
		  url:'cprof',
		  templateUrl:'serhome.html',
		  controller:'serprofctrl'
	  })
	  .when('/logout',{
		  templateUrl:'login.html',
		  controller:'logoutctrl'
	  })
	  
	  .when('/profile',{
		  url:'profile',
		  templateUrl:'profile1.html',
		  controller:'leadProfileCtrl'
	  })
	  
	  .when('/serprofile',{
		  url:'serprofile',
		  templateUrl:'serprof.html',
		  controller:'serProfileCtrl'
	  })
	 
	   .when('/re',{
		  url:'re',
		  templateUrl:'re1.html',
		  controller:'rctrl'
	  })
	
      .otherwise({
        redirectTo:'/'
      });
})

//login controller

app.controller('login',function($scope,$http,$location,$window){
	
	$scope.login = function(){
		var loginData = {
			"user":$scope.user,
			"pass":$scope.pass
		}
		$http.post('http://localhost:8080/culogin',loginData).then(function(response){  
		//redirecting to customer profile
		alert('checking for validation');
			if(response.data.output == "success")
			{
				alert("login successfully"+response.data.designation);
				alert("login successfully"+JSON.stringify(response.data.store));
				
			
				if(response.data.designation == 'customer')
				{
					$window.localStorage.setItem('customer',JSON.stringify(response.data.store));
					$location.path('/cprof');						// redirecting to customer profile page
					//console.log(customer);
				}
				else{
					$window.localStorage.setItem('service',JSON.stringify(response.data.store));
					$location.path('/serprof');
			}
			}
			else{
				alert("invalid user have to register");
			}
				
		})
		
		
	};1
		$scope.register = function(){
		alert('before');
		$location.path('/register'); 					//redirecting to selection html page
		alert('after');
		}
	$scope.forpass=function(){
		$location.path('/forgot');					//redirecting to forget password page
	}
})


// Register Controller
app.controller('cregctrl',function($scope,$http,$location){
  $scope.register = function(){
	  var des = $scope.designation;
	  alert(des);
    var regData = {
      "fname":$scope.fname,
	  "lname":$scope.lname,
      "email":$scope.email,
	  "designation":$scope.designation,
	  "location":$scope.location,
	   "occupation":$scope.occupation,
      "password":$scope.password,
      "phone":$scope.phone
      
    }
    
    $http.post('http://localhost:8080/regcust',regData).then(function(response){
      if (response.data.output.length != 0) {
        alert("Registered Successfully");
        $location.path('/clogin');
      } else {
        alert("Not Registered");
      }
    })
	$scope.login=function(){
		alert('before');
		$location.path('/'); 					//redirecting to selection html page
		alert('after');
	}
	
  }
})


app.controller('forgot',function($scope,$http,$location){
  $scope.forpass = function(){
	  var email= $scope.email;
	  var d={
		  "email" : email
	  }
	  alert(email);
    
   
    $http.post('http://localhost:8080/forgot1',d).then(function(response){
      if (response.data.output.length !=0) {
        alert("Email not sent");
      } else {
        alert("email sent Successfully");
        $location.path('/');
      }
    })
	
  }
})

app.controller('cprofctrl',function($scope,$http,$location,$window){
	
	// Reset Password
  $scope.sub = function(){
	 
	 // alert('hi');
	$location.path('/re');
	alert('hello');
	
  }
  
  //logout controller
  
	$scope.logout = function()
  {
		 $window.localStorage.clear();
		$location.path('/');
  }
    
      $scope.search = function()
	 {
		var occupation = $scope.occupation;
		console.log(occupation);
		var location=$scope.location;
		console.log(location);
		var data = {
			"occupation":occupation,
			"location":location
					}
		$http.post('http://localhost:8080/search',data).then(function(response){  
		//redirecting to customer profile
		var resp = response.data.output;
		console.log(JSON.stringify(resp));
		$scope.searchData = resp;
			
			
		});
	}
  
  $scope.click = function(x)
  {
	  
	  var email= x.email;
	  var d={
		  "email" : email
		}
	  alert(email);
    
   
    $http.post('http://localhost:8080/mail',d).then(function(response){
      if (response.data.output.length !=0) {
        alert("email sent Successfully");
      } else {
        alert("email not sent");
        
      }
    }) 
  }
  
  
  
  //Profile Controller
  $scope.profile = function(){
	  
	  $location.path('/profile');
	 
	
  }
  
  $scope.home = function(){
	  
	  $location.path('/cprof');
  }
 
  
    
 });
 
 
 app.controller('serprofctrl',function($scope,$http,$location,$window){
	
	
	alert('welcome to service man');
// Reset Password
  $scope.sub = function(){
	 
	 // alert('hi');
	$location.path('/re');
	alert('hello');
	
	  
  }
  
  //logout controller
  
	$scope.logout = function()
  {
	  $window.localStorage.clear();
	  $location.path('/');
  }
    

		$scope.showme = false;
		$scope.aacust = function() {
		alert('Acting as acustomer');
        $scope.showme = !$scope.showme;
    }
	
	
     $scope.search = function()
	 {
		var occupation = $scope.occupation;
		console.log(occupation);
		var location=$scope.location;
		console.log(location);
		var data = {
			"occupation":occupation,
			"location":location
					}
		$http.post('http://localhost:8080/search',data).then(function(response){  
		//redirecting to customer profile
		var resp = response.data.output;
		console.log(JSON.stringify(resp));
		$scope.searchData = resp;
			
			
		});
	}
  
  $scope.click = function(x)
  {
	  
	  var email= x.email;
	  var d={
		  "email" : email
		}
	  alert(email);
    
   
    $http.post('http://localhost:8080/mail',d).then(function(response){
      if (response.data.output.length !=0) {
        alert("email sent Successfully");
      } else {
        alert("email not sent");
        
      }
    }) 
  }
 
  $scope.profile = function(){
	  
	  $location.path('/serprofile');
	 
  }
 
 $scope.home = function(){
	  
	  $location.path('/serprof');
	 
  }
  
    
 });
 
 app.controller('rctrl',function($scope,$http,$location){

		$scope.reset = function(){
			var email= $scope.email;
			var newpass= $scope.newpass;
			var repass= $scope.repass;
	  var d={
		  "email" : email,
		  "newpass":newpass,
		  "repass":repass
	  }
	  alert(email);
			
			alert('hi')
		$http.post('http://localhost:8080/reset',d).then(function(response){
		if (response.data.output.length !=0) {
			alert("password resetted successfully");
			$location.path('/');
		} else {
			alert("not reset");		
		
		}
		})
	}
  
    })
 
 
 app.controller('leadProfileCtrl',function($scope,$http,$filter,$window){
  $http.get("http://localhost:8080/customerProfile").then(function(response) {
	  alert('profile display');
    var resp = response.data.output;
    var user = $window.localStorage.getItem('customer');
    var u = JSON.parse(user);
    var profile = $filter('filter')(resp,{email:u.email})[0];
	console.log(profile.email);
    $scope.leadProfile = profile;
  });
  
})


app.controller('serProfileCtrl',function($scope,$http,$filter,$window){
  
  var user = $window.localStorage.getItem('service');
    var u = JSON.parse(user);
	
   $scope.serProfile = u;
})

  /*
app.controller('logoutctrl',function($scope,$http,$location){

	  $location.path('/');
  
    })*/