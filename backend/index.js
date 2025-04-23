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
                email: data[0].Email,
                role: data[0].Role,
                alevel: data[0].Access_level
            }
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

app.use('/home', isAuthenticated, express.static(path.join(frontend_path, 'Login', 'ClientEnd')));
app.use('/staffDashboard', isAuthenticatedStaff, express.static(path.join(frontend_path, 'Login', 'StaffEnd')));

app.get('/session-info', (req, res) => {
  if (req.session.user) {
    res.json({
      username: req.session.user.username,
      email: req.session.user.email,
      role: req.session.user.role
    });
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});



// Client Protected Routes
app.get('/home', (req, res) => {
    res.sendFile(path.join(frontend_path, 'Login', 'ClientEnd', 'home.html'));
});

app.get('/home/clientProfile', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'ClientEnd', 'clientProfile', 'clientProfile.html'));
});

// Staff Protected Routes
app.get('/staffDashboard', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'StaffDashboard', 'staffDashboard.html'));
});

app.get('/staffDashboard/addDocuments', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'addEdit', 'addEditScreen.html'));
});

app.get('/staffDashboard/adminView', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'adminView', 'adminView.html'));
});

app.get('/staffDashboard/adminView', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'adminView', 'adminView.html'));
});

app.get('/staffDashboard/manageLoans', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'manageLoans', 'manageLoans.html'));
});

app.get('/staffDashboard/manageMembers', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'manageMembers', 'manageMembers.html'));
});

app.get('/staffDashboard/managePubEdiAut', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'managePubEdiAut', 'managePBE.html'));
});

app.get('/staffDashboard/managePubEdiAut/manageAuthors', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'managePubEdiAut','manageAuthors' ,'manageAuthors.html'));
});

app.get('/staffDashboard/managePubEdiAut/manageEditors', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'managePubEdiAut','manageEditors' ,'manageEditors.html'));
});

app.get('/staffDashboard/managePubEdiAut/manageGenre', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'managePubEdiAut','manageGenre' ,'manageGenre.html'));
});

app.get('/staffDashboard/managePubEdiAut/managePublishers', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'managePubEdiAut','managePublishers' ,'managePublishers.html'));
});

app.get('/staffDashboard/manageReservations', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'manageReservations', 'manageReservations.html'));
});

app.get('/staffDashboard/manageLoans', (req, res) => {
  res.sendFile(path.join(frontend_path, 'Login', 'StaffEnd', 'manageLoans', 'manageLoans.html'));
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

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Error logging out');
    }

    res.clearCookie('connect.sid'); 
    res.redirect('/'); 
  });
});

app.post("/staffDashboard/addBook", (req, res) => {
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

app.get('/api/authors', (req, res) => {
  const q = `SELECT Author_ID, Name, Nationaility
  FROM author 
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

app.patch('/api/authors/:Author_ID', (req, res) => {
  const Author_ID = req.params.Author_ID;

  const q = `
    UPDATE author
    SET 
      Name = ?,
      Nationaility = ?
    WHERE Author_ID = ?
  `;

  const values = [
    req.body.Name,
    req.body.Nationaility,
    Author_ID
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error updating author:', err);
      return res.status(500).json(err);
    }
    res.status(200).json('Author updated successfully');
  });
});

app.delete('/api/authors/:Author_ID', (req, res) => {
  const Author_ID = req.params.Author_ID;

  const deleteAccounts = `DELETE FROM author WHERE Author_ID = ?`;

  db.query(deleteAccounts, [Author_ID], (err1, result1) => {
    if (err1) {
      console.error('Error deleting from publishers:', err1);
      return res.status(500).json(err1);
    }
  });
  res.status(200).json('Author deleted successfully');
});

app.get('/api/editors', (req, res) => {
  const q = `SELECT Editor_ID, Name, Specialization
  FROM editor 
  `
  ;

  db.query(q, (err, data) => {
    if (err) {
      console.error('Error fetching editor:', err);
      return res.status(500).json(err);
    }
    res.status(200).json(data);
  });
});

app.patch('/api/editors/:Editor_ID', (req, res) => {
  const Editor_ID = req.params.Editor_ID;

  const q = `
    UPDATE editor
    SET 
      Name = ?,
      Specialization = ?
    WHERE Editor_ID = ?
  `;

  const values = [
    req.body.Name,
    req.body.Specialization,
    Editor_ID
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error updating editor:', err);
      return res.status(500).json(err);
    }
    res.status(200).json('Editor updated successfully');
  });
});

app.delete('/api/editors/:Editor_ID', (req, res) => {
  const Editor_ID = req.params.Editor_ID;

  const deleteAccounts = `DELETE FROM editor WHERE Editor_ID = ?`;

  db.query(deleteAccounts, [Editor_ID], (err1, result1) => {
    if (err1) {
      console.error('Error deleting from publishers:', err1);
      return res.status(500).json(err1);
    }
  });
  res.status(200).json('Editor deleted successfully');
});

app.get('/api/authorsGenre', (req, res) => {
  const q = `SELECT Author_ID, Genre
  FROM author_genres
  `
  ;
  db.query(q, (err, data) => {
    if (err) {
      console.error('Error fetching genre:', err);
      return res.status(500).json(err);
    }
    res.status(200).json(data);
  });
});

app.patch('/api/authorsGenre/:Author_ID', (req, res) => {
  const Author_ID = req.params.Author_ID;

  const q = `
    UPDATE author_genres
    SET 
      Genre = ?
    WHERE Author_ID = ?
  `;

  const values = [
    req.body.Genre,
    Author_ID
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error updating genres:', err);
      return res.status(500).json(err);
    }
    res.status(200).json('Genre updated successfully');
  });
});

app.delete('/api/authorGenres/:Author_ID', (req, res) => {
  const Author_ID = req.params.Author_ID;
  
  const values = [
    req.body.Genre,
    Author_ID
  ];

  const deleteAccounts = `DELETE FROM author_genres WHERE Genre = ? AND Author_ID = ?`;

  db.query(deleteAccounts, values, (err1, result1) => {
    if (err1) {
      console.error('Error deleting from genres:', err1);
      return res.status(500).json(err1);
    }
    res.status(200).json({ message: 'Genre deleted successfully' });
  });
});

app.get('/api/reservations', (req, res) => {
  const q = `SELECT *
  FROM reservation
  `
  ;
  db.query(q, (err, data) => {
    if (err) {
      console.error('Error fetching reservations:', err);
      return res.status(500).json(err);
    }
    res.status(200).json(data);
  });
});

app.patch('/api/reservations/:Reservation_no', (req, res) => {
  const Reservation_no = req.params.Reservation_no;

  const q = `
    UPDATE reservation
    SET 
      Member_Email = ?,
      ItemID = ?,
      Status = ?
    WHERE Reservation_no = ?
  `;

  const values = [
    req.body.Member_Email,
    req.body.ItemID,
    req.body.Status,
    Reservation_no
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error updating reservation:', err);
      return res.status(500).json(err);
    }
    res.status(200).json('reservation updated successfully');
  });
});


app.delete('/api/reservations/:Reservation_no', (req, res) => {
  const Reservation_no = req.params.Reservation_no;

  const deleteAccounts = `DELETE FROM reservation WHERE Reservation_no = ?`;

  db.query(deleteAccounts, [Reservation_no], (err1, result1) => {
    if (err1) {
      console.error('Error deleting from reservation:', err1);
      return res.status(500).json(err1);
    }
  });
  res.status(200).json('reservation deleted successfully');
});


app.get('/api/loans', (req, res) => {
  const q = `SELECT *
  FROM loan
  `
  ;
  db.query(q, (err, data) => {
    if (err) {
      console.error('Error fetching loan:', err);
      return res.status(500).json(err);
    }
    res.status(200).json(data);
  });
});

app.patch('/api/loans/:LoanID', (req, res) => {
  const LoanID = req.params.LoanID;

  const q = `
    UPDATE loan
    SET 
      Library_Item_ID = ?,
      Client_Email = ?,
      LoanStatus = ?,
      LoanDate = ?,
      DueDate = ?,
      CurrentFine = ?
    WHERE LoanID = ?
  `;

  const values = [
    req.body.Library_Item_ID,
    req.body.Client_Email,
    req.body.LoanStatus,
    req.body.LoanDate,
    req.body.DueDate,
    req.body.CurrentFine,
    LoanID
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error updating loan:', err);
      return res.status(500).json(err);
    }
    res.status(200).json('Loan updated successfully');
  });
});


app.delete('/api/loans/:LoanID', (req, res) => {
  const LoanID = req.params.LoanID;

  const deleteAccounts = `DELETE FROM loan WHERE LoanID = ?`;

  db.query(deleteAccounts, [LoanID], (err1, result1) => {
    if (err1) {
      console.error('Error deleting from loan:', err1);
      return res.status(500).json(err1);
    }
  });
  res.status(200).json('Loan deleted successfully');
});


// CLIENT SIDE

app.get('/api/libraryItems', (req, res) => {
  const q = `SELECT 
    li.ItemID,
    li.Title,
    li.Status,
    li.Publisher_ID,
    li.Publication_Date,
    li.Language,
    li.Editor_ID,
    li.Author_ID,
    li.Cover_Color,
    li.Cover_URL,

    -- Book-specific fields
    b.ISBN,
    b.Page_Count,
    b.Genre AS Book_Genre,
    b.Format,
    b.Edition AS Book_Edition,
    b.Rating,
    b.Synopsys,

    -- Magazine-specific fields
    m.ISSN,
    m.Category,
    m.Edition AS Magazine_Edition,

    -- Research paper-specific fields
    r.Institution,
    r.Field_of_Study,

    -- Author Fields
    a.Name AS Author_Name,
    a.Nationaility AS Author_Nationality,

    -- Publisher Fields
    p.Name AS Publisher_Name,

    -- Editor Fields
    e.Name AS Editor_Name,
    e.Specialization AS Editor_Specialization

    FROM library_item li
    LEFT JOIN book b ON li.ItemID = b.Item_ID
    LEFT JOIN magazine m ON li.ItemID = m.Item_ID
    LEFT JOIN research_paper r ON li.ItemID = r.Item_ID
    LEFT JOIN author a on li.Author_ID = a.Author_ID
    LEFT JOIN publisher p on li.Publisher_ID = p.Publisher_ID
    LEFT JOIN editor e on li.Editor_ID = e.Editor_ID;
  `
  ;
  db.query(q, (err, data) => {
    if (err) {
      console.error('Error fetching library items:', err);
      return res.status(500).json(err);
    }
    res.status(200).json(data);
  });
});

app.post("/home/addReservation", (req, res) => {
  const q = "INSERT INTO reservation(`Member_Email`, `ItemID`, `Status`) VALUES (?)";

  const values = [
      req.body.Member_Email,
      req.body.ItemID,
      "Holding"
  ];

  db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json("Reservation created successfully!");
  });
});

app.post("/home/addLoan", (req, res) => {
  const q = `
    INSERT INTO loan (
      Library_Item_ID, 
      Client_Email, 
      LoanStatus, 
      LoanDate, 
      DueDate, 
      CurrentFine
    ) VALUES (?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 MONTH), ?)
  `;

  const values = [
    req.body.Library_Item_ID,
    req.body.Client_Email,
    "In Progress",
    0
  ];

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    const newLoanId = data.insertId;
    console.log("New Loan ID:", newLoanId);

    return res.status(201).json({
      message: "Loan created successfully!",
      loanId: newLoanId
  });
})
});

app.get('/api/getUserInfo/:userEmail', (req, res) => {
  const userEmail = req.params.userEmail;

  const q = `
    SELECT 
      c.Fname,
      c.MInit,
      c.Lname,
      c.Email,  -- comes from session too
      c.Phone_no AS Phone_No,
      DATE_FORMAT(m.Start_Date, '%M %e, %Y') AS Start_Date,
      DATE_FORMAT(m.Expiration_Date, '%M %e, %Y') AS Expiration_Date,
      ca.Password
    FROM client c
    JOIN member m ON c.Email = m.Member_Email
    JOIN client_accounts ca ON c.Email = ca.Email
    WHERE c.Email = ?
  `;

  db.query(q, [userEmail], (err, data) => {
    if (err) {
      console.error('Error fetching user info:', err);
      return res.status(500).json({ error: err.sqlMessage });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(data[0]);
  });
});

app.patch('/api/profile/:email', (req, res) => {
  const userEmail = req.params.email;

  const q = `
    UPDATE client
    SET 
      Fname = ?, 
      MInit = ?, 
      Lname = ?, 
      Phone_no = ?
    WHERE Email = ?
  `;

  const values = [
    req.body.Fname,
    req.body.MInit,
    req.body.Lname,
    req.body.Phone_No,
    userEmail
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ message: 'Failed to update profile', error: err });
    }
    res.status(200).json({ message: 'Profile updated successfully' });
  });
});

app.patch('/api/profile/password/:email', (req, res) => {
  const email = req.params.email;
  const { newPassword } = req.body;

  const q = `UPDATE client_accounts SET Password = ? WHERE Email = ?`;

  db.query(q, [newPassword, email], (err, data) => {
    if (err) {
      console.error('Error updating password:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.status(200).json({ message: 'Password updated successfully' });
  });
});

app.delete('/api/profile/:email', (req, res) => {
  const email = req.params.email;

  const q = `DELETE FROM client WHERE Email = ?`;

  db.query(q, [email], (err, data) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ error: "Failed to delete account." });
    }
    res.status(200).json({ message: "Account deleted successfully." });
  });
});

app.listen(8800, ()=> {
    console.log("Connected to backend");
});