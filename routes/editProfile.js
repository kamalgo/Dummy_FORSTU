// routes/editProfile.js
const express = require('express');
const router = express.Router();

// GET route for displaying the edit profile form
router.get('/', function(req, res) {
    res.render('edit-profile');
});

router.get('/:user_id', function(req, res) {
    const user_id = req.params.user_id;
    // Logic to fetch profile details based on ID from the database
    // Render the edit-profile view with the profile details
    res.render('edit-profile', { user_id: user_id });
});



module.exports = router;
