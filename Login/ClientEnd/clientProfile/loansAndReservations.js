// Dummy data
const loans1 = [
    {
      ItemID: "BK101",
      Title: "The Midnight Library",
      Type: "Book",
      Genre: "Fiction",
      Language: "English",
      Cover_URL: "https://picsum.photos/id/1001/300/400",
      Publication_Date: "2021-08-10",
      Author_Name: "Matt Haig",
      Publisher_Name: "Canongate Books",
      Editor_Name: "Emily West",
      Synopsys: "A story about all the choices that go into a life well lived.",
      Status: "Borrowed"
    },
    {
      ItemID: "RP204",
      Title: "AI and Future Ethics",
      Type: "Research Paper",
      Genre: "Artificial Intelligence",
      Language: "French",
      Cover_URL: "https://picsum.photos/id/1002/300/400",
      Publication_Date: "2023-01-15",
      Author_Name: "Dr. Clara Bisson",
      Publisher_Name: "Université de Paris",
      Editor_Name: "Pierre Moreau",
      Synopsys: "Explores the ethical implications of artificial intelligence.",
      Status: "Borrowed"
    },
    {
      ItemID: "MG305",
      Title: "Tech Weekly Digest",
      Type: "Magazine",
      Genre: "Technology",
      Language: "English",
      Cover_URL: "https://picsum.photos/id/1003/300/400",
      Publication_Date: "2024-03-05",
      Author_Name: "Various Contributors",
      Publisher_Name: "Tech Media House",
      Editor_Name: "Samantha Grey",
      Synopsys: "Latest trends in consumer technology and startups.",
      Status: "Borrowed"
    },
    {
      ItemID: "BK202",
      Title: "The Silent Patient",
      Type: "Book",
      Genre: "Thriller",
      Language: "German",
      Cover_URL: "https://picsum.photos/id/1004/300/400",
      Publication_Date: "2019-02-05",
      Author_Name: "Alex Michaelides",
      Publisher_Name: "Celadon Books",
      Editor_Name: "Mark Keller",
      Synopsys: "A psychological thriller about a woman’s act of violence.",
      Status: "Borrowed"
    },
    {
        ItemID: "BK101",
        Title: "The Midnight Library",
        Type: "Book",
        Genre: "Fiction",
        Language: "English",
        Cover_URL: "https://picsum.photos/id/1001/300/400",
        Publication_Date: "2021-08-10",
        Author_Name: "Matt Haig",
        Publisher_Name: "Canongate Books",
        Editor_Name: "Emily West",
        Synopsys: "A story about all the choices that go into a life well lived.",
        Status: "Borrowed"
      },
      {
        ItemID: "RP204",
        Title: "AI and Future Ethics",
        Type: "Research Paper",
        Genre: "Artificial Intelligence",
        Language: "French",
        Cover_URL: "https://picsum.photos/id/1002/300/400",
        Publication_Date: "2023-01-15",
        Author_Name: "Dr. Clara Bisson",
        Publisher_Name: "Université de Paris",
        Editor_Name: "Pierre Moreau",
        Synopsys: "Explores the ethical implications of artificial intelligence.",
        Status: "Borrowed"
      },
      {
        ItemID: "MG305",
        Title: "Tech Weekly Digest",
        Type: "Magazine",
        Genre: "Technology",
        Language: "English",
        Cover_URL: "https://picsum.photos/id/1003/300/400",
        Publication_Date: "2024-03-05",
        Author_Name: "Various Contributors",
        Publisher_Name: "Tech Media House",
        Editor_Name: "Samantha Grey",
        Synopsys: "Latest trends in consumer technology and startups.",
        Status: "Borrowed"
      },
      {
        ItemID: "BK202",
        Title: "The Silent Patient",
        Type: "Book",
        Genre: "Thriller",
        Language: "German",
        Cover_URL: "https://picsum.photos/id/1004/300/400",
        Publication_Date: "2019-02-05",
        Author_Name: "Alex Michaelides",
        Publisher_Name: "Celadon Books",
        Editor_Name: "Mark Keller",
        Synopsys: "A psychological thriller about a woman’s act of violence.",
        Status: "Borrowed"
      }
  ];
  

const reservations1 = [
  {
    ItemID: "RP007",
    Title: "Future Intelligence",
    Type: "Research Paper",
    Genre: "Artificial Intelligence",
    Language: "English",
    Cover_URL: "https://picsum.photos/id/3007/300/400",
    Publication_Date: "2024-02-18",
    Author_Name: "Dr. Mark Li",
    Publisher_Name: "FutureTech Publishers",
    Editor_Name: "Sarah Connors",
    Synopsys: "Forecasting AI capabilities in the next decade.",
    Status: "Reserved",
  },
];

const modal = document.getElementById("bookModal");
const modalContent = document.getElementById("modalContent");

let session1 = null;
let loans = [];

window.addEventListener("DOMContentLoaded", async () => {
  try {
    session1 = await getSessionInfo();
    loans = await getLoanItems();
    reservations = await getReservationItems();
    renderLoanCards();
    renderReservationCards();
  } catch (error) {
    console.error("Initialization error:", error);
  }
});

function openBookModal(book) {
  const image =
      book.Type === "Magazine"
        ? "MAGIcon.png"
        : book.Type === "Research Paper"
          ? "RPIcon.png"
          : book.Cover_URL;
  const modal = document.getElementById("bookModal");
  const modalContent = document.getElementById("modalContent");

  // Clear previous content to prevent residual buttons
  modalContent.innerHTML = `
      <button class="close-modal-btn"><i class="bx bx-x"></i></button>
      <div class="book-modal-body">
        <div class="book-modal-left">
          <h2 class="book-modal-title" id="modalTitle">${book.Title}</h2>
          <p class="modal-field"><strong>Author:</strong> ${book.Author_Name}</p>
          <p class="modal-field"><strong>Genre:</strong> ${book.Genre}</p>
          <p class="modal-field"><strong>Type:</strong> ${book.Type}</p>
          <p class="modal-field"><strong>Language:</strong> ${book.Language}</p>
          <p class="modal-field synopsis" id="modalSummary">${book.Synopsys}</p>
          <p class="modal-field">
            <strong>Status:</strong> 
            <span id="modalStatus" class="${book.Status.toLowerCase() === "available" ? "available" : "unavailable"}">
              ${book.Status}
            </span>
          </p>
          <div class="book-modal-buttons" id="modalButtons">
          </div>
        </div>
        <div class="book-modal-right">
          <img id="modalImage" src="${image}" alt="${book.ItemID}" />
        </div>
      </div>
    `;

  modal.classList.remove("hidden");

  modal.querySelector(".close-modal-btn").onclick = () => {
    modal.classList.add("hidden");
  };

  // Inject the download button only for non-reserved items
  if (book.Type.toLowerCase() !== "reservation") {
    const buttonContainer = modal.querySelector("#modalButtons");
    const downloadBtn = document.createElement("button");
    downloadBtn.className = "book-action-btn return";
    downloadBtn.id = "modalDownloadReceiptBtn";
    downloadBtn.innerHTML = `<i class="bx bx-download"></i> Download Receipt`;

    downloadBtn.onclick = () => {
      const doc = new jsPDF();
      const loanId = "RET-" + new Date().getTime();
      const memberName = session1.username;
      const memberEmail = session1.email;

      const borrowDate = new Date(book.LoanDate).toLocaleDateString('en-US');
      const returnDate = new Date(book.DueDate).toLocaleDateString('en-US');

      doc.setFontSize(16);
      doc.text("GAMDL Return Receipt", 20, 20);
      doc.setFontSize(12);
      doc.text(`Return ID: ${loanId}`, 20, 50);
      doc.text(`Member Name: ${memberName}`, 20, 60);
      doc.text(`Member Email: ${memberEmail}`, 20, 70);
      doc.text(`Book Title: ${book.Title}`, 20, 80);
      doc.text(`Item ID: ${book.ItemID}`, 20, 90);
      doc.text(`Return Date: ${borrowDate}`, 20, 100);
      doc.text(`Return Due: ${returnDate}`, 20, 110);
      doc.text("Please present this return receipt to the librarian.", 20, 130);

      doc.save(`ReturnReceipt_${book.ItemID}.pdf`);
    };

    buttonContainer.appendChild(downloadBtn);
  }
}
function createCard(book) {
  const image =
      book.Type === "Magazine"
        ? "MAGIcon.png"
        : book.Type === "Research Paper"
          ? "RPIcon.png"
          : book.Cover_URL;
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <div class="book-image-wrapper">
        <img src="${image}" alt="Book Cover" />
      </div>
      <div class="book-details">
        <h3>${book.Title}</h3>
        <div class="book-meta">
          <span class="genre">${book.Genre || "Unknown Genre"}</span>
          <span class="rating"><i class='bx bxs-star'></i> ${book.Type === "Book" ? (book.Rating || "NA") : "NA"}</span>
        </div>
      </div>
    `;
    card.onclick = () => openBookModal(book);
    return card;
  }
  
  async function getLoanItems() {
    const selectedEmail = session1.email
    try {
      const response = await fetch(`/home/libraryItems/loans/${selectedEmail}`); // Replace with your actual API route
      const data = await response.json();
  
      const transformed = data.map(item => {
        let type = null;
        let genre = null;
  
        if (item.ISBN) {
          type = 'Book';
          genre = item.Book_Genre;
        } else if (item.ISSN) {
          type = 'Magazine';
          genre = item.Category;
        } else if (item.Institution) {
          type = 'Research Paper';
          genre = item.Field_of_Study;
        }
  
        return {
          ItemID: item.ItemID, // or generate custom ID like "MG004" if needed
          Title: item.Title,
          Type: type,
          Status: item.Status,
          Genre: genre,
          Language: item.Language,
          Cover_URL: item.Cover_URL,
          Publication_Date: item.Publication_Date?.split('T')[0], // Format as 'YYYY-MM-DD'
          Rating: item.Rating,
          Synopsys: item.Synopsys,
          Author_ID: item.Author_ID,
          Author_Name: item.Author_Name,
          Author_Nationality: item.Author_Nationality,
          Editor_ID: item.Editor_ID,
          Editor_Name: item.Editor_Name,
          Editor_Specialization: item.Editor_Specialization,
          Publisher_ID: item.Publisher_ID,
          Publisher_Name: item.Publisher_Name,
          LoanStatus: item.LoanStatus,
          LoanDate: item.LoanDate,
          DueDate: item.DueDate,
          Type: "Loan"
        };
      });
  
      console.log('Transformed Data:', transformed);
      return transformed;
  
    } catch (err) {
      console.error('Error fetching or transforming data:', err);
      return [];
    }
  }


  async function getReservationItems() {
    const selectedEmail = session1.email
    try {
      const response = await fetch(`/home/libraryItems/reservations/${selectedEmail}`); // Replace with your actual API route
      const data = await response.json();
  
      const transformed = data.map(item => {
        let type = null;
        let genre = null;
  
        if (item.ISBN) {
          type = 'Book';
          genre = item.Book_Genre;
        } else if (item.ISSN) {
          type = 'Magazine';
          genre = item.Category;
        } else if (item.Institution) {
          type = 'Research Paper';
          genre = item.Field_of_Study;
        }
  
        return {
          ItemID: item.ItemID, // or generate custom ID like "MG004" if needed
          Title: item.Title,
          Type: type,
          Status: item.Status,
          Genre: genre,
          Language: item.Language,
          Cover_URL: item.Cover_URL,
          Publication_Date: item.Publication_Date?.split('T')[0], // Format as 'YYYY-MM-DD'
          Rating: item.Rating,
          Synopsys: item.Synopsys,
          Author_ID: item.Author_ID,
          Author_Name: item.Author_Name,
          Author_Nationality: item.Author_Nationality,
          Editor_ID: item.Editor_ID,
          Editor_Name: item.Editor_Name,
          Editor_Specialization: item.Editor_Specialization,
          Publisher_ID: item.Publisher_ID,
          Publisher_Name: item.Publisher_Name,
          Type: "Reservation"
        };
      });
  
      console.log('Transformed Data:', transformed);
      return transformed;
  
    } catch (err) {
      console.error('Error fetching or transforming data:', err);
      return [];
    }
  }
  async function getSessionInfo() {
    try {
      const res = await fetch('/session-info', {
        method: 'GET',
        credentials: 'include' // important to include cookies
      });
  
      if (!res.ok) {
        throw new Error('Not logged in');
      }
  
      const user = await res.json();

      const initials = user.username.slice(0, 2).toUpperCase();

      const initialsElement = document.getElementById('initials');
      if (initialsElement) {
        initialsElement.textContent = initials;
      }
      const initialsProfile = document.getElementById('initialsProfile');
      const pageGreets = document.getElementById('pageGreets');
      if (initialsProfile) {
        initialsProfile.textContent = initials;
        pageGreets.textContent = "Hello " + user.username + ", how are you doing today?";
      }
  
      return user;
    } catch (err) {
      console.error('Error fetching session info:', err);
      return null;
    }
  }

function renderLoanCards() {
  const container = document.getElementById("userLoans");
  container.innerHTML = "";
  loans.forEach((book) => container.appendChild(createCard(book)));
}

function renderReservationCards() {
  const container = document.getElementById("userReservations");
  container.innerHTML = "";
  reservations.forEach((book) => container.appendChild(createCard(book)));
}
