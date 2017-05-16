var  limitWords = function(words) {
    	var maxWords=300;
		var d=document.getElementById(words);
		wLength=d.value.split(' ').length-1;
		document.getElementById("wCount").innerHTML= "Words:"+wLength;
		if ( wLength > maxWords ) {
            t=d.value.substring(0,d.value.lastIndexOf(' '));
    		d.value=t.substring(0,t.lastIndexOf(' ')+1);
			document.getElementById("wLimit").innerHTML = "You have reached the maximum of  words in this text box";
    	}
		else
			{document.getElementById("wLimit").innerHTML = " ";}
    }
	
var s;
 setInterval(function(){
 s = $.ajax({url:"http://localhost:3000",type:"OPTIONS",async: false}).status;
 return s;},3000)
 
var mystatus = function(){
	if(s==0)
		document.getElementById("status").innerHTML="Status: offline";
	else
		document.getElementById("status").innerHTML="Status: online";
}

setInterval('mystatus()',3000);
 

var fadeOut = function(){
	document.getElementById("status").innerHTML= " ";
}  



angular.module('createorderApp', [])
  .controller('OrdersController', function($http,$scope) {
    var ordersController = this;
	ordersController.order={creatorname:"",date:"",location:""};
	
    
    ordersController.getOrders = function() {
      $http.get('orders')
           .success(function(data) {
             ordersController.orders = [];
             ordersController.orders = data;
			 console.table(data);
           });      
    }
         
    ordersController.addOrder = function() {
	if (s===0)
	{	document.getElementById("status").innerHTML="Your order is stored at local storage successfully";
		setTimeout(fadeOut,3000);
		localAdding();}
	else
		{
		$http.post('orders/add', ordersController.order)
           .success(function(data) {
             ordersController.order = {};
             ordersController.getOrders();
			 console.log(data);
			 document.getElementById("status").innerHTML=data;
			 setTimeout(fadeOut,3000);
			 document.getElementById("locationButton").disabled= false;
			 document.getElementById("locationButton").innerHTML="getGeoLocation";
			 document.getElementById("locationlabel").innerHTML="Please press the button to get geolocation";
			 document.getElementById("wCount").innerHTML="Words :0"
			 if (localStorage.length!==0){localLoading();}
			 
			 setTimeCurrent();
           })};
      
    };
    
	

	setTimeCurrent= function()
{
			var date = new Date();
			var day = date.getDate();
			var month = date.getMonth() + 1;
			var year = date.getFullYear();

	if (month < 10) month = "0" + month;
	if (day < 10) day = "0" + day;
			var today = year + "-" + month + "-" + day;

	document.getElementById('date').value = today
	ordersController.order.date= today;
	};
	
	 setTimeCurrent();
	
	ordersController.getGeoLocation = function () 
{

    var locationInfo = function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        ordersController.order.location = latitude + "   " + longitude;
		document.getElementById("locationlabel").innerHTML = latitude + "   " + longitude;
    }

    var locationInfoError = function (error) {
        var errorMessage = ['',
         'Permission denied',
         'Position unavailable',
         'timeout'];

        alert("error receiving location info: " +
          errorMessage[error.code]);
    }

		document.getElementById("locationButton").innerHTML="Please wait..."
		document.getElementById("locationButton").disabled= true
        navigator.geolocation.getCurrentPosition(locationInfo, locationInfoError)
    
}
	var localAdding = function()
	{
		localStorage.creatorname=ordersController.order.creatorname
		localStorage.location=ordersController.order.location
		localStorage.date=ordersController.order.date
		localStorage.severity=ordersController.order.severity
		localStorage.description=ordersController.order.description
	}
	
	
	var localLoading= function(){
	ordersController.order.creatorname = localStorage.creatorname;
	ordersController.order.location = localStorage.location;
	ordersController.order.date = localStorage.date;
	ordersController.order.severity = localStorage.severity;
	ordersController.order.description = localStorage.description;
	ordersController.addOrder();
	localStorage.clear();
	
	
	}
	

	
	
	
	
    ordersController.orders = [];
    ordersController.getOrders();
    
  });