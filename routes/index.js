var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/",function(req, res){
  res.render("index")
});

router.get('/:user_id', function(req, res) {
  const user_id = req.params.user_id;
  // Logic to fetch profile details based on ID from the database
  // Render the edit-profile view with the profile details
  res.render('index', { user_id: user_id });
});

module.exports = router;
