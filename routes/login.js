var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/",function(req, res){
  res.render("login")
});

router.get("/registration",function(req, res){
    res.render("registration")
  });



module.exports = router;
