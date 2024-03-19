const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('com-details');
});


router.get('/:row_id', function(req, res) {
    const row_id = req.params.row_id;
    // Logic to fetch profile details based on ID from the database
    // Render the edit-profile view with the profile details
    res.render('com-details', { row_id: row_id });
});

// router.post('/submit-family-details', function(req, res) {
//     // Handle the submission of the family details form here
    
//     // Redirect the user to a relevant page
//     res.redirect('/');
// });

module.exports = router;
