const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('peducation-details');
});

router.get('/:row_id', function(req, res) {
    const row_id = req.params.row_id;
    // Logic to fetch profile details based on ID from the database
    // Render the edit-profile view with the profile details
    res.render('peducation-details', { row_id: row_id });
});

module.exports = router;
