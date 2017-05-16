var express = require('express');
var bodyParser = require('body-parser')
var router = express.Router();
var app = express();

var convertStringToOrder = function(orderString) {
  return {
    creatorname: orderString.creatorname,
    location: orderString.location,
    date: orderString.date,
	severity: orderString.severity,
    description: orderString.description
  };
}

var ordersAreDifferent = function(order1, order2) {
  return order1.creatorname !== order2.creatorname || order1.location !== task2.location ||
         order1.date !== order2.date || order1.severity !== order2.severity||order1.description!== order2.description;
}

var update = function(orderString){

orderString.creatorname="hello";
}


var orders = [{creatorname: "duc nguyen",location:"12 13",date:"08/08/1988",severity:"minor",description:"leaking"}];

router.get('/', function(req, res, next) {
  res.send(orders);
});

router.post('/add', function(req, res, next) {
  console.log(req.body);
  orders.push(convertStringToOrder(req.body));
  res.send("Your order is submitted successfully");
});


router.post("/delete", function(req, res, next) {
  var orderToDelete = convertStringToOrder(req.body);
  
  orders = orders.filter(function(order) { return ordersAreDifferent(order, orderToDelete); });
  res.send("order deleted");  
});



module.exports = router;
