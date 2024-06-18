const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcrypt');


const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());

// database connection
const db = mysql.createConnection({
    host: "localhost",  // Corrected hostname
    user: "root",
    password: "",
    database: "login"
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database');
    }
});

// Fetch employees route
app.get('/register', (req, res) => {
    const sql = "SELECT * FROM register";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching employees:', err);
            return res.status(500).json({ error: "Error fetching employees" });
        }
        return res.json(data);
    });
});

// register route
app.post('/register', (req, res) => {
    const checkEmailSql = "SELECT * FROM register WHERE email = ?";
    const insertUserSql = "INSERT INTO register (name, email, password, cpassword) VALUES (?, ?, ?, ?)";

    const email = req.body.email;
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.cpassword
    ];

    // Step 1: Check if the email already exists
    db.query(checkEmailSql, [email], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json("Error executing query");
        }
        
        if (result.length > 0) {
            // Email already exists
            return res.status(400).json("Email is already registered");
        } else {
            // Step 2: Insert new user
            db.query(insertUserSql, values, (err, data) => {
                if (err) {
                    console.error('Error executing query:', err);
                    return res.status(500).json("Error executing query");
                }
                return res.json(data);
            });
        }
    });
});

// app.post('/register', (req, res) => {
//     const sql = "INSERT INTO register (name, email, password, cpassword) VALUES (?, ?, ?, ?)";
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password,
//         req.body.cpassword
//     ];
//     db.query(sql, values, (err, data) => {
//         if (err) { 
//             console.error('Error executing query:', err);
//             return res.status(500).json("Error executing query");
//         }
//         return res.json(data);
//     });
// });


// login route
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ?";
    const values = [
                req.body.email,
                req.body.password
            ];
            db.query(sql, values, (err, data) => {
                if (err) { 
                    console.error('Error executing query:', err);
                    return res.status(500).json("Error executing query");
                }
                return res.json(data);
            });
    });

    // contact route
app.post('/contact', (req, res) => {
    const sql = "INSERT INTO contact (name, email, number, message) VALUES (?, ?, ?, ?)";
    const values = [
                req.body.name,
                req.body.email,
                req.body.number,
                req,body,message
            ];
            db.query(sql, values, (err, data) => {
                if (err) { 
                    console.error('Error executing query:', err);
                    return res.status(500).json("Error executing query");
                }
                return res.json(data);
            });
    });

// employee login route
app.post('/emplogin', (req, res) => {
    const sql = "SELECT * FROM register WHERE email = ? AND password = ?";
    const values = [
        req.body.email,
        req.body.password
    ];
    db.query(sql, values, (err, data) => {
        if (err) { 
            console.error('Error executing query:', err);
            return res.status(500).json("Error executing query");
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.status(401).json("Invalid credentials");
        }
    });
});

// admin login

// app.post('/login', (req, res) => {
//   const sql = "SELECT * FROM login WHERE email = ?";
//   const values = [req.body.email];

//   db.query(sql, values, (err, data) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return res.status(500).json({ error: "Error executing query" });
//     }

//     if (data.length === 0) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     const user = data[0];
//     bcrypt.compare(req.body.password, user.password, (err, result) => {
//       if (err) {
//         console.error('Error comparing passwords:', err);
//         return res.status(500).json({ error: "Error comparing passwords" });
//       }
//       if (!result) {
//         return res.status(401).json({ error: "Invalid credentials" });
//       }
//       // Passwords match, you can return user data here
//       res.json({ message: "Login successful", user: { id: user.id, name: user.name, email: user.email } });
//     });
//   });
// });


// // logout route
// app.post('/adminlogout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return res.status(500).send('Logout failed');
//         }
//         res.clearCookie('connect.id'); // clear the cookie
//         res.status(200).send('/login');
//     });
// });

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ message: "Success" });
});

// employees
app.post('/employees', (req, res) => {
    const sql = "INSERT INTO employees (name,email) VALUES (?, ?)";
    const values = [
                req.body.name,
                req.body.email
            ];
            db.query(sql, values, (err, data) => {
                if (err) { 
                    console.error('Error executing query:', err);
                    return res.status(500).json("Error executing query");
                }
                return res.json(data);
            });
    });

    // get employees
app.get('/employees', (req, res) => {
    const sql = "SELECT * FROM employees";
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching employees:', err);
            return res.status(500).json({ error: "Error fetching employees" });
        }
        return res.json(data);
    });
});

// Get approved employees
app.get('/employees', (req, res) => {
    const sql = "SELECT * FROM employees WHERE approved = TRUE";
    
    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching employees:", err);
            return res.status(500).json({ error: "Error fetching employees" });
        }
        return res.json(data);
    });
});

// Approve employee route
app.put('/employees/approve/:id', (req, res) => {
    const employeeId = req.params.id;
    const sql = "UPDATE employees SET approved = TRUE WHERE id = ?";
    
    db.query(sql, [employeeId], (err, result) => {
        if (err) {
            console.error("Error updating employee status:", err);
            return res.status(500).json({ error: "Error updating employee status" });
        }
        return res.json({ message: "Employee approved successfully" });
    });
});

// Insert admin (setup initial admin)
app.post('/admin', (req, res) => {
    const { name, email, password } = req.body;
    const sql = "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)";
    const values = [name, email, password];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting admin:", err);
            return res.status(500).json({ error: "Error inserting admin" });
        }
        return res.json({ message: "Admin inserted successfully" });
    });
});

// Get admin profile
app.get('/admin/profile', (req, res) => {
    const sql = "SELECT id, name, email FROM admin WHERE id = 1"; // Assuming single admin with ID 1

    db.query(sql, (err, data) => {
        if (err) {
            console.error("Error fetching admin profile:", err);
            return res.status(500).json({ error: "Error fetching admin profile" });
        }
        return res.json(data[0]);
    });
});

// Update admin profile
app.put('/admin/profile', (req, res) => {
    const { name, email, password } = req.body;
    let sql = "UPDATE admin SET name = ?, email = ?";

    const values = [name, email];

    if (password) {
        sql += ", password = ?";
        values.push(password);
    }

    sql += " WHERE id = 1"; // Assuming single admin with ID 1

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating admin profile:", err);
            return res.status(500).json({ error: "Error updating admin profile" });
        }
        return res.json({ message: "Admin profile updated successfully" });
    });
});


app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
