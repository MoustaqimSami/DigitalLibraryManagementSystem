import express from "express"
import mysql from "mysql"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Jp2X0f00_`gB",
    database: "users"
});

app.use(express.json());
app.use(cors())
app.use(express.json());             
app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded

app.get("/", (req,res)=>(
    res.json("backend")
));

app.get("/login", (req,res)=>{
    const q = "SELECT * FROM login";
    db.query(q,(err,data)=>{
        if(err) return res.json(err);
        return res.json(data);
    });
});

app.post("/login", (req, res) => {
    const { User, Password } = req.body;

    const q = "SELECT * FROM login WHERE User = ? AND Password = ?";
    
    db.query(q, [User, Password], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length > 0) {
            return res.status(200).json("Login successful!");
        } else {
            return res.status(401).json("Wrong username or password.");
        }
    });
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

    const q = "SELECT * FROM login WHERE Email = ? AND Password = ? AND Role = 3";

    db.query(q, [Email, Password], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length > 0) {
            return res.status(200).json("Staff login successful!");
        } else {
            return res.status(401).json("Unauthorized or insufficient permissions.");
        }
    });
});

app.listen(8800, ()=> {
    console.log("Connected to backend");
});