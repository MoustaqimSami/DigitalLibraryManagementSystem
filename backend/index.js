import express from "express"
import mysql from "mysql"
import cors from "cors"
import session from "express-session";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: 'http://localhost:8800',
    credentials: true
  }));

const frontend_path = path.join(__dirname, '..');
app.use(express.static(path.join(frontend_path, 'Login')));

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "Jp2X0f00_`gB",
    database: "librarymanagement"
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
    res.sendFile(path.join(frontend_path, 'Login', 'loginSignup.html'));
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

app.post("/addBook", (req, res) => {
    const qGetIDs = `
    SELECT
      p.Publisher_ID AS publisherId,
      e.Editor_ID AS editorId,
      a.Author_ID AS authorId
    FROM publisher p
    JOIN editor e ON e.Name = ?
    JOIN author a ON a.Name = ?
    WHERE p.Name = ?
  `;
  
  const lookupValues = [
    req.body.EditorName,
    req.body.AuthorName,
    req.body.PublisherName
  ];
  
  db.query(qGetIDs, lookupValues, (err, data) => {
    if (err) {
      console.error('Error getting IDs:', err);
      return res.status(500).json(err);
    }
  
    if (data.length === 0) {
      console.error('No matching IDs found');
      return res.status(400).json({ message: 'Invalid Publisher, Editor, or Author name' });
    }
  
    const ids = data[0];
  
    const qInsertLI = `
      INSERT INTO library_item (Title, Status, Publisher_ID, Publication_Date, Language, Editor_ID, Author_ID, Cover_Color, Cover_URL)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const LIValues = [
      req.body.Title,
      req.body.Status,
      ids.publisherId,
      req.body.Publication_Date,
      req.body.Language,
      ids.editorId,
      ids.authorId,
      req.body.Cover_Color,
      req.body.Cover_URL
    ];
  
    // Step 1: Insert into library_item
    db.query(qInsertLI, LIValues, (err2, result) => {
      if (err2) {
        console.error('Error inserting library item:', err2);
        return res.status(500).json(err2);
      }
      console.log('Library item inserted successfully:', result);
  
      const newItemID = result.insertId;
  
      // Step 2: Insert into book
      const qInsertBook = `
        INSERT INTO book(Item_ID, ISBN, Page_Count, Genre, Format, Edition, Rating, Synopsys)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
  
      const bookValues = [
        newItemID,
        req.body.ISBN,
        req.body.Page_Count,
        req.body.Genre,
        req.body.Format,
        req.body.Edition,
        req.body.Rating,
        req.body.Synopsys
      ];
  
      db.query(qInsertBook, bookValues, (err3, result2) => {
        if (err3) {
          console.error('Error inserting book:', err3);
          return res.status(500).json(err3);
        }
        console.log('Book inserted successfully!');
  
        // Step 3: Insert into written_by
        const qInsertWB = `
          INSERT INTO written_by(Item_ID, Author_ID)
          VALUES (?, ?)
        `;
  
        const WBValues = [
          newItemID,
          ids.authorId
        ];
  
        db.query(qInsertWB, WBValues, (err4, result3) => {
          if (err4) {
            console.error('Error inserting into written_by:', err4);
            return res.status(500).json(err4);
          }
          console.log('Written_by inserted successfully!');
  
          // Step 4: Send final response
          res.status(200).json('Library item, Book, and Author relationship added successfully!');
        });
      });
    });
  });
});

app.post("/addMagazine", (req, res) => {
    const qGetIDs = `
    SELECT
      p.Publisher_ID AS publisherId,
      e.Editor_ID AS editorId,
      a.Author_ID AS authorId
    FROM publisher p
    JOIN editor e ON e.Name = ?
    JOIN author a ON a.Name = ?
    WHERE p.Name = ?
  `;
  
  const lookupValues = [
    req.body.EditorName,
    req.body.AuthorName,
    req.body.PublisherName
  ];
  
  db.query(qGetIDs, lookupValues, (err, data) => {
    if (err) {
      console.error('Error getting IDs:', err);
      return res.status(500).json(err);
    }
  
    if (data.length === 0) {
      console.error('No matching IDs found');
      return res.status(400).json({ message: 'Invalid Publisher, Editor, or Author name' });
    }
  
    const ids = data[0];
  
    const qInsertLI = `
      INSERT INTO library_item (Title, Status, Publisher_ID, Publication_Date, Language, Editor_ID, Author_ID, Cover_Color, Cover_URL)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const LIValues = [
      req.body.Title,
      req.body.Status,
      ids.publisherId,
      req.body.Publication_Date,
      req.body.Language,
      ids.editorId,
      ids.authorId,
      req.body.Cover_Color,
      req.body.Cover_URL
    ];
  
    // Step 1: Insert into library_item
    db.query(qInsertLI, LIValues, (err2, result) => {
      if (err2) {
        console.error('Error inserting library item:', err2);
        return res.status(500).json(err2);
      }
      console.log('Library item inserted successfully:', result);
  
      const newItemID = result.insertId;
  
      // Step 2: Insert into book
      const qInsertMagazine = `
        INSERT INTO magazine(Item_ID, ISSN, Category, Edition)
        VALUES (?, ?, ?, ?)
      `;
  
      const magazineValues = [
        newItemID,
        req.body.ISSN,
        req.body.Category,
        req.body.Edition
      ];
  
      db.query(qInsertMagazine, magazineValues, (err3, result2) => {
        if (err3) {
          console.error('Error inserting book:', err3);
          return res.status(500).json(err3);
        }
        console.log('Book inserted successfully!');
  
          // Step 4: Send final response
        res.status(200).json('Library Item and Magazine added successfully!');
    });
    });
});
});

app.post("/addRP", (req, res) => {
    const qGetIDs = `
    SELECT
      p.Publisher_ID AS publisherId,
      e.Editor_ID AS editorId,
      a.Author_ID AS authorId
    FROM publisher p
    JOIN editor e ON e.Name = ?
    JOIN author a ON a.Name = ?
    WHERE p.Name = ?
  `;
  
  const lookupValues = [
    req.body.EditorName,
    req.body.AuthorName,
    req.body.PublisherName
  ];
  
  db.query(qGetIDs, lookupValues, (err, data) => {
    if (err) {
      console.error('Error getting IDs:', err);
      return res.status(500).json(err);
    }
  
    if (data.length === 0) {
      console.error('No matching IDs found');
      return res.status(400).json({ message: 'Invalid Publisher, Editor, or Author name' });
    }
  
    const ids = data[0];
  
    const qInsertLI = `
      INSERT INTO library_item (Title, Status, Publisher_ID, Publication_Date, Language, Editor_ID, Author_ID, Cover_Color, Cover_URL)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const LIValues = [
      req.body.Title,
      req.body.Status,
      ids.publisherId,
      req.body.Publication_Date,
      req.body.Language,
      ids.editorId,
      ids.authorId,
      req.body.Cover_Color,
      req.body.Cover_URL
    ];
  
    // Step 1: Insert into library_item
    db.query(qInsertLI, LIValues, (err2, result) => {
      if (err2) {
        console.error('Error inserting library item:', err2);
        return res.status(500).json(err2);
      }
      console.log('Library item inserted successfully:', result);
  
      const newItemID = result.insertId;
  
      // Step 2: Insert into book
      const qInsertRP = `
        INSERT INTO research_paper(Item_ID, Institution, Field_of_Study)
        VALUES (?, ?, ?)
      `;
  
      const rpValues = [
        newItemID,
        req.body.Institution,
        req.body.Field_of_Study,
      ];
  
      db.query(qInsertRP, rpValues, (err3, result2) => {
        if (err3) {
          console.error('Error inserting magazine:', err3);
          return res.status(500).json(err3);
        }
        console.log('Magazine inserted successfully!');
  
          // Step 4: Send final response
        res.status(200).json('Library Item and Magazine added successfully!');
    });
    });
});
});



app.get('/staffDashboard', isAuthenticatedStaff, (req, res) => {
    res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'StaffDashboard', 'staffDashboard.html'));
});

app.get('/session-info', (req, res) => {
    if (req.session.user) {
      res.json({
        username: req.session.user.username,
        role: req.session.user.role
      });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });


app.listen(8800, ()=> {
    console.log("Connected to backend");
});