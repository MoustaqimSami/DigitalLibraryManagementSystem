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


app.get('/api/members', (req, res) => {
    const q = `SELECT c.Email AS Email, c.Fname AS Fname, c.MInit AS Minit, c.Lname AS Lname, c.Phone_no as Phone, m.Start_Date as Start_Date, m.Expiration_Date as Expiration_Date
    FROM client c
    JOIN member m ON m.Member_Email=c.Email
    `
    ;
  
    db.query(q, (err, data) => {
      if (err) {
        console.error('Error fetching members:', err);
        return res.status(500).json(err);
      }
      res.status(200).json(data);
    });
});

app.patch('/api/members/:email', (req, res) => {
    const email = req.params.email;
    const { Fname, Minit, Lname, Phone, StartDate, ExpirationDate } = req.body;
  
    const q = `
      UPDATE client c
      JOIN member m ON c.Email = m.Member_Email
      SET 
        c.Fname = ?,
        c.MInit = ?,
        c.Lname = ?,
        c.Phone_no = ?,
        m.Start_Date = ?,
        m.Expiration_Date = ?
      WHERE c.Email = ?
    `;
  
    const values = [
      Fname,
      Minit,
      Lname,
      Phone,
      StartDate,
      ExpirationDate,
      email
    ];
  
    db.query(q, values, (err, data) => {
      if (err) {
        console.error('Error updating member:', err);
        return res.status(500).json(err);
      }
      res.status(200).json('Member updated successfully');
    });
  });

  app.delete('/api/members/:email', (req, res) => {
    const email = req.params.email;
  
    // Step 1: Delete from client_accounts
    const deleteAccounts = `DELETE FROM client_accounts WHERE Email = ?`;
  
    db.query(deleteAccounts, [email], (err1, result1) => {
      if (err1) {
        console.error('Error deleting from client_accounts:', err1);
        return res.status(500).json(err1);
      }
  
        // Step 2: Delete from member
        const deleteMember = `DELETE FROM member WHERE Member_Email = ?`;
        db.query(deleteMember, [email], (err2, result2) => {
        if (err2) {
          console.error('Error deleting from member:', err2);
          return res.status(500).json(err2);
        }

        // Step 3: Delete from loan
        const deleteMember = `DELETE FROM loan WHERE Client_Email = ?`;
        db.query(deleteMember, [email], (err2, result2) => {
        if (err2) {
          console.error('Error deleting from member:', err2);
          return res.status(500).json(err2);
        }

        // Step 4: Delete from reservation
        const deleteMember = `DELETE FROM reservation WHERE Member_Email = ?`;
        db.query(deleteMember, [email], (err2, result2) => {
        if (err2) {
          console.error('Error deleting from member:', err2);
          return res.status(500).json(err2);
        }
  
        // Step 5: Delete from client
        const deleteClient = `DELETE FROM client WHERE Email = ?`;
        db.query(deleteClient, [email], (err3, result3) => {
          if (err3) {
            console.error('Error deleting from client:', err3);
            return res.status(500).json(err3);
          }
  
          res.status(200).json('Member deleted successfully');
          
        });
      });
    });
    });
    });
  });

app.get('/api/publishers', (req, res) => {
    const q = `SELECT Publisher_ID, Name
    FROM publisher 
    `
    ;

    db.query(q, (err, data) => {
      if (err) {
        console.error('Error fetching members:', err);
        return res.status(500).json(err);
      }
      res.status(200).json(data);
    });
});

app.patch('/api/publishers/:Publisher_ID', (req, res) => {
  const Publisher_ID = req.params.Publisher_ID;

  const q = `
    UPDATE publisher
    SET 
      Name = ?
    WHERE Publisher_ID = ?
  `;

  const values = [
    req.body.Name,
    Publisher_ID
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error updating member:', err);
      return res.status(500).json(err);
    }
    res.status(200).json('Member updated successfully');
  });
});

app.delete('/api/publishers/:Publisher_ID', (req, res) => {
  const Publisher_ID = req.params.Publisher_ID;

  const deleteAccounts = `DELETE FROM publisher WHERE Publisher_ID = ?`;

  db.query(deleteAccounts, [Publisher_ID], (err1, result1) => {
    if (err1) {
      console.error('Error deleting from publishers:', err1);
      return res.status(500).json(err1);
    }
  });
  res.status(200).json('Publisher deleted successfully');
});

app.listen(8800, ()=> {
    console.log("Connected to backend");
});