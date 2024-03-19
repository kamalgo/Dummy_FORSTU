// routes/familyDetails.js
const express = require('express');
const router = express.Router();

// GET route for displaying the family details form
router.get('/', function(req, res) {
    // Check if user is authenticated
    if (!req.isAuthenticated()) {
        // Redirect to login page if user is not authenticated
        return res.redirect('family-details');
    }

    
    // Assuming you have access to the user's ID in the session
    const Id  = req.user.id; // Modify this line based on how you get the user's ID
    res.render('family-details', { Id: Id });
});

router.get('/:row_id',function(req, res){
    const row_id = req.params.row_id;
    res.render('family-details', { row_id: row_id });

});




module.exports = router;
