import express from "express"
import mysql from "mysql"
import cors from "cors"
import session from "express-session";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const frontend_path = path.join(__dirname, '..');

app.use(express.static(path.join(frontend_path, 'Login')));

app.use(cors({
  origin: 'http://localhost:5500',
  credentials: true
}));

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Jp2X0f00_`gB",
    database: "librarymanagement"
});

app.use(express.json());
app.use(cors())
app.use(express.json());             
app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded
app.use(session({
    secret: 'password123', // should be strong in real apps
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // false for HTTP, true for HTTPS
}))

app.get('/', (req, res) => {
    res.sendFile(path.join(frontend_path, 'Login', 'staffLogin.html'));
  });

app.post('/login', (req, res) => {
    const q = "SELECT * FROM client_accounts WHERE User = ? AND Password = ?"
    const { User, Password } = req.body;
    
    db.query(q, [User, Password], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length > 0) {
            req.session.user = {
                username: data[0].User,
                role: data[0].Role,
                alevel: data[0].Access_level
            }
            return res.status(200).json("Login successful!");
        } else {
            return res.status(401).json("Wrong username or password.");
        }
    });
  });

// Middleware to protect routes
function isAuthenticated(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.status(401).send('You must log in first.');
    }
  }

function isAuthenticatedStaff(req, res, next) {
    if (req.session.user && req.session.user.alevel >= 3) {
      next();
    } else {
      res.status(401).send('You must log in first.');
    }
}

  
  // Protected route
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(`Welcome to your dashboard, ${req.session.user.username}!`);
});

app.post("/signup", (req, res) => {
    const q = "INSERT INTO login(`User`, `Email`, `Password`, `Role`) VALUES (?)";

    const values = [
        req.body.User,
        req.body.Email,
        req.body.Password,
        1
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json("User created successfully!");
    });
});


app.post("/stafflogin", (req, res) => {
    const { Email, Password } = req.body;

    const q = "SELECT * FROM staff_accounts WHERE Email = ? AND Password = ?";

    db.query(q, [Email, Password], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length > 0) {
            req.session.user = {
                username: data[0].User,
                role: data[0].Role,
                alevel: data[0].Access_level
            }
            return res.status(200).json("Login successful!");
        } else {
            return res.status(401).json("Wrong Email or password.");
        }
    });
});

app.get('/staffDashboard', isAuthenticatedStaff, (req, res) => {
    res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'StaffDahsboard', 'staffDashboard.html'));
});


app.listen(8800, ()=> {
    console.log("Connected to backenda");
});