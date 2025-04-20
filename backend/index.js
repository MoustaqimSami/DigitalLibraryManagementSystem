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

app.listen(8800, ()=> {
    console.log("Connected to backend");
});