const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
const bcrypt = require('bcrypt');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const editProfileRouter = require('./routes/editProfile');
const familyDetailsRouter = require('./routes/familyDetails');
const comDetailsRouter = require('./routes/comdetails');
const bankDetailsRouter = require('./routes/bankDetails');
const ccourseDetailsRouter = require('./routes/ccourseDetails');
const peducationDetailsRouter = require('./routes/peducationDetails');
const loginRouter = require('./routes/login');
const registrationRouter = require('./routes/registration');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'om',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const connection = mysql.createConnection({
  host: 'mydb.c9f1qnynocki.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Maha1234',
  database: 'regis'
});



app.use('/', loginRouter);
app.use('/index',indexRouter)
app.use('/users', usersRouter);
app.use('/edit-profile', editProfileRouter);
app.use('/family-details', familyDetailsRouter);
app.use('/com-details', comDetailsRouter);
app.use('/bank-details',bankDetailsRouter);
app.use('/ccourse-details',ccourseDetailsRouter);
app.use('/peducation-details',peducationDetailsRouter);
app.use('/registration',registrationRouter);

// // Define the generateUniqueId function
// function generateUniqueId() {
//   // Generate a unique ID using a timestamp and a random number
//   return Date.now().toString(36) + Math.random().toString(36).substr(2);
// }

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1); // Exit the process if connection fails 
  }
  console.log('Connected to MySQL database');
});

//Submit login///////////////////////////////////////////////////////////////////////////////////////////////////
// Route to handle login requests
// Route to handle user login
// const bcrypt = require('bcrypt');


// Login endpoint
app.post('/login', async (req, res) => {
  try {
      console.log('POST request received for login');

      const { email, password } = req.body;
      console.log('Email:', email);
      console.log('Password:', password);

      // Query database to find user by email
      connection.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
          if (err) {
              console.error('Error querying database:', err);
              return res.status(500).send('Internal server error');
          }

          console.log('Query results:', results);

          // Check if user exists
          if (results.length === 0) {
              console.log('User not found');
              return res.send('User not found');
          }

          // User found, check password
          const user = results[0];
          console.log('User found:', user);

          const passwordMatch = await bcrypt.compare(password, user.password);
          console.log('Password match:', passwordMatch);

          if (passwordMatch) {
              console.log('Login successful');
              res.send('Login successful');
          } else {
              console.log('Incorrect password');
              res.send('Incorrect password');
          }
      });
  } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Error logging in');
  }
});



// app.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log('Email:', email);
//     console.log('Password:', password);

//     // Define the SQL query string
//     const query = 'SELECT id, password FROM user WHERE email = ?';
    
//     // Fetch user details (including hashed password) from the database
//     const [rows, fields] = await connection.query(query, [email]);
//     //console.log(rows, fields);
//     console.log(rows);
//     console.log(fields);

//    /* // Check if user exists
//     if (rows && rows.length > 0) { // Check if 'rows' is truthy and has a length property
//       const hashedPassword = rows[0].password;
//       const userId = rows[0].id;

//       // Compare hashed password with provided password
//       const passwordMatch = await bcrypt.compare(password, hashedPassword);
//       if (passwordMatch) {
//         // Passwords match, retrieve user profile details
//         const userProfile = await connection.query('SELECT * FROM profiles WHERE user_id = ?', [userId]);
//         res.render('dashboard', { userProfile: userProfile });
//       } else {
//         // Passwords do not match
//         res.status(401).send('Invalid email or password');
//       }
//     } else {
//       // User not found
//       res.status(401).send('Invalid email or password');
//     }*/
//   } catch (error) {
//     console.error("Error retrieving user:", error);
//     res.status(500).send("Error logging in");
//   }
// });



// app.post('/login', async (req, res) => {         
//   //iska error Connected to MySQL database
// // GET / 304 16.607 ms - -
// // Email: kamal3@gmail.com
// // Password: zindu
// // Error retrieving user: TypeError: (intermediate value) is not iterable
// //     at D:\KAMAL\coding\FORSTU_dash_NJS\app.js:96:28
// //     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
// // POST /login 500 21.560 ms - 16

//   try {
//     const { email, password } = req.body;
//     console.log('Email:', email);
//     console.log('Password:', password);

//     // Define the SQL query string
//     const query = 'SELECT id, password FROM user WHERE email = ?';

//     // Fetch user details (including hashed password) from the database
//     const [rows, fields] = await connection.query(query, [email]);
//     console.log(rows, fields);

//     // Check if user exists
//     if (rows.length > 0) {
//       const hashedPassword = rows[0].password;
//       const userId = rows[0].id;

//       // Compare hashed password with provided password
//       const passwordMatch = await bcrypt.compare(password, hashedPassword);
//       if (passwordMatch) {
//         // Passwords match, retrieve user profile details
//         const userProfile = await connection.query('SELECT * FROM profiles WHERE user_id = ?', [userId]);
//         res.render('dashboard', { userProfile: userProfile });
//       } else {
//         // Passwords do not match
//         res.status(401).send('Invalid email or password');
//       }
//     } else {
//       // User not found
//       res.status(401).send('Invalid email or password');
//     }
//   } catch (error) {
//     console.error("Error retrieving user:", error);
//     res.status(500).send("Error logging in");
//   }
// });





// app.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log('Email:', email);
//     console.log('Password:', password);

//     const [rows, fields] = await connection.query(query, [email]);
//     console.log(rows,fields);

//     const query = 'SELECT id, password FROM user WHERE email = ?';

// // Fetch user details (including hashed password) from the database
// const user = await connection.query(query, [email]);

//     // Fetch user details (including hashed password) from the database
//     // const query = 'SELECT id, password FROM user WHERE email = ?';
//     // console.log('Query:', query);
//     // const user = await connection.query(query, [email]);
//     // console.log('User:', user);

//     if (user.length > 0) {
//       const hashedPassword = user[0].password;
//       const userId = user[0].id;

//       // Compare hashed password with provided password
//       const passwordMatch = await bcrypt.compare(password, hashedPassword);
//       if (passwordMatch) {
//         // Passwords match, retrieve user profile details
//         const userProfile = await connection.query('SELECT * FROM profiles WHERE user_id = ?', [userId]);
//         res.render('dashboard', { userProfile: userProfile });
//       } else {
//         // Passwords do not match
//         res.status(401).send('Invalid email or password');
//       }
//     } else {
//       // User not found
//       res.status(401).send('Invalid email or password');
//     }
//   } catch (error) {
//     console.error("Error retrieving user:", error);
//     res.status(500).send("Error logging in");
//   }
// });





// app.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     console.log('asdf',email,password);

//     // Fetch user details (including hashed password) from the database
//     console.log('Query:', 'SELECT id, password FROM user WHERE email = ?', [email]);

//     const user = await connection.query('SELECT id, password FROM user WHERE email = ?', [email]);
//     console.log('User:', user);
//     console.log('User Length:', user.length);


//     // Check if user exists
//     if (user.length > 0) {
//       const hashedPassword = user[0].password;
//       const userId = user[0].id;

//       // Compare hashed password with provided password
//       const passwordMatch = await bcrypt.compare(password, hashedPassword);
//       if (passwordMatch) {
//         // Passwords match, retrieve user profile details
//         const userProfile = await connection.query('SELECT * FROM profiles WHERE user_id = ?', [userId]);
        
//         // Render dashboard with user profile details
//         res.render('dashboard', { userProfile: userProfile });
//       } else {
//         // Passwords do not match
//         res.status(401).send('Invalid email or password');
//       }
//     } else {
//       // User not found
//       res.status(401).send('Invalid email or password1');
//     }
//   } catch (error) {
//     console.error("Error retrieving user:", error);
//     res.status(500).send("Error logging in");
//   }
// });


// app.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Fetch user details (including hashed password) from the database
//     const user = await connection.query('SELECT id,email,password FROM user WHERE email = ?', [email]);
//     console.log(user);
//     res.send(user);

    // Check if user exists
    // if (user.length > 0) {
    //   const hashedPassword = user[0].password;
    //   const userId = user[0].id;

    //   // Compare hashed password with provided password
    //   const passwordMatch = await bcrypt.compare(password, hashedPassword);
    //   if (passwordMatch) {
    //     // Passwords match, retrieve user profile details
    //     const userProfile = await connection.query('SELECT * FROM profiles WHERE user_id = ?', [userId]);

    //     // Render dashboard with user profile details
    //     res.render('dashboard', { userProfile: userProfile });
    //   } else {
    //     // Passwords do not match
    //     res.status(401).send('Invalid email or password');
    //   }
    // } else {
    //   // User not found
    //   res.status(401).send('Invalid email or password');
    // }
//   } catch (error) {
   
//     console.error("Error retrieving user:", error);

//     res.status(500).send("Error logging in");
//   }
// });

// const { v1: uuidv1 } = require('uuid');


//registration
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
    
    // Store the user's email and hashed password in the users table
    connection.query('INSERT INTO user (email, password) VALUES (?, ?)', [email, hashedPassword]);
    
    // Fetch the id of the inserted user
    connection.query('SELECT LAST_INSERT_ID() as user_id', (error, results, fields) => {
      if (error) {
        console.error('Error fetching data:', error);
        res.status(500).send("Error registering user");
        return;
      }
      // Process the results
      const user_id = results[0].user_id; // Get the user_id from the results
      console.log('User ID:', user_id);
      // Respond with the user_id
      res.redirect(`/index/${user_id}`);
      
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send("Error registering user");
  }
});

//edit-profile route
// Route to handle the form submission
app.post('/edit-profile', (req, res) => {
  // Retrieve the user_id from the form data
  const user_id = req.body.user_id;

  // Now you can use the userId to perform actions such as fetching user data from the database, updating the user profile, etc.

  // For demonstration purposes, let's just log the user_id
  console.log('user_id:', user_id);

  // Send a response back to the client
  res.redirect(`/edit-profile/${user_id}`);
});




//SUBMITTING PROFILE
//SUBMITTING PROFILE
app.post('/submit-profile', (req, res) => {
  const { name, email, mobile, gender, dob, caste, physicallyHandicapped, singleParent, aadhar,user_id } = req.body;

  const sql = 'INSERT INTO profiles (name, email, mobile, gender, dob, caste, physically_handicapped, single_parent, aadhar,user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
  const values = [name, email, mobile, gender, dob, caste, physicallyHandicapped, singleParent, aadhar,user_id];
  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL:', err);
      req.flash('error', 'Failed to submit profile. Please try again.');
      res.redirect('/edit-profile');
    } else {
      const row_id = result.insertId; // Get the ID of the inserted row
      console.log('Inserted row ID:', row_id); // Log the ID to the console
      req.flash('success', 'Profile submitted successfully!');
      res.redirect(`/family-details/${row_id}`); // Redirect to edit-profile page with the inserted ID
    }
  });
});


//SUBMITTING FAMILY DETAILS
app.post('/submit-family-details', (req, res) => {
  
  const { row_id, fatherName, fatherEducation, fatherOccupation, motherName, motherEducation, motherOccupation, parentsMobile, parentsIncome } = req.body;
  // console.log('Inserted ID:', user_id); 
  const sql = `
    UPDATE profiles 
    SET 
        father_name = ?,
        father_education = ?,
        father_occupation = ?,
        mother_name = ?,
        mother_education = ?,
        mother_occupation = ?,
        parents_mobile = ?,
        parents_income = ?
    WHERE 
    row_id = ?`;
  const values = [fatherName, fatherEducation, fatherOccupation, motherName, motherEducation, motherOccupation, parentsMobile, parentsIncome, row_id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating family details in MySQL:', err);
      req.flash('error', 'Failed to submit family details. Please try again.');
      res.redirect('/family-details');
    } else {
      // const user_id = user_id; // Get the ID 
      // console.log('Inserted ID:', user_id);
      req.flash('success', 'Family details submitted successfully!');
      res.redirect(`/com-details/${row_id}`);// Redirect to communication details page
    }
  });
});

//SUBMITTING COMMUNICATION DETAILS
app.post('/submit-com-details',(req,res)=>{
  const {row_id, currentAddress, currentState, currentDistrict, currentPincode, permanentAddress, permanentState, permanentDistrict, permanentPincode } = req.body;
  const sql = `
  UPDATE profiles
  SET
  Current_Address = ?,
  State = ?,
  Current_District = ?,
  Pincode = ?,
  Permanent_Address = ?,
  Permanent_State = ?,
  Permanent_District = ?,
  Permanent_Pincode = ?

  WHERE 
  row_id = ?`;

  const values = [currentAddress, currentState, currentDistrict, currentPincode, permanentAddress, permanentState, permanentDistrict, permanentPincode,row_id]

 connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating family details in MySQL:', err);
      req.flash('error', 'Failed to submit family details. Please try again.');
      res.redirect('/family-details');
    } else {
      // const user_id = user_id; // Get the ID 
      // console.log('Inserted ID:', user_id);
      req.flash('success', 'Communication details submitted successfully!');
      res.redirect(`/bank-details/${row_id}`);// Redirect to communication details page
    }
  });
});

//SUBMITTING BANK DETAILS
app.post('/submit-bank-details',(req,res)=>{
  const {row_id, accountNumber, ifscCode } = req.body;
  const sql = `
  UPDATE profiles
  SET
  Bank_Account_Number = ?,
  Bank_IFSC_Code = ?
  
  WHERE 
  row_id = ?`;

  const values = [accountNumber,ifscCode,row_id]

 connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating family details in MySQL:', err);
      req.flash('error', 'Failed to submit family details. Please try again.');
      res.redirect('/bank-details');
    } else {
      // const user_id = user_id; // Get the ID 
      // console.log('Inserted ID:', user_id);
      req.flash('success', 'Communication details submitted successfully!');
      res.redirect(`/ccourse-details/${row_id}`);// Redirect to communication details page
    }
  });
});

//-----------------------------------------------------------------------------------------------------------
//SUBMITTING CURRENT COURSE DETAILS
app.post('/submit-course-details',(req,res)=>{
  const {row_id, courseType, courseName, specialization, currentYear, instituteName, instituteAddress, startingYear, tutionFees, nonTutionFees } = req.body;
  const sql = `
  UPDATE profiles
  SET
    courseType = ?,           
    courseName = ?,           
    specialization = ?,       
    currentYear = ?,          
    instituteName = ?,        
    instituteAddress = ?,     
    startingYear = ?,         
    tutionFees = ?,           
    nonTutionFees = ?         
WHERE 
row_id = ?`;

  const values = [courseType, courseName, specialization, currentYear, instituteName, instituteAddress, startingYear, tutionFees, nonTutionFees, row_id]

 connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating family details in MySQL:', err);
      req.flash('error', 'Failed to submit family details. Please try again.');
      res.redirect('/bank-details');
    } else {
      // const user_id = id; // Get the ID 
      // console.log('Inserted ID:', user_id);
      req.flash('success', 'Communication details submitted successfully!');
      res.redirect(`/peducation-details/${row_id}`); // Redirect to communication details page
    }
  });
});

//PAST EDUCATION DETAILS

app.post('/submit-past-education',(req,res)=>{
  const {row_id, schoolName, state, passingYear, totalMarksObtained, outOfTotalMarks, percentage  } = req.body;
  const sql = `
  UPDATE profiles
  SET
    school_Name = ?,                   
    school_state = ?,                      
    passingYear = ?,              
    totalMarksObtained = ?,       
    outOfTotalMarks = ?,          
    percentage = ?                
WHERE 
row_id = ?`;  

  const values = [schoolName, state, passingYear, totalMarksObtained, outOfTotalMarks, percentage,row_id]

 connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating family details in MySQL:', err);
      req.flash('error', 'Failed to submit family details. Please try again.');
      res.redirect('/edit-profile');
    } else {
      // const user_id = id; // Get the ID 
      // console.log('Inserted ID:', user_id);
      req.flash('success', 'Communication details submitted successfully!');
      res.redirect(`/`);// Redirect to communication details page
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', function(req, res) {
  res.render('index', { successMsg: req.flash('success'), errorMsg: req.flash('error') });
});

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;