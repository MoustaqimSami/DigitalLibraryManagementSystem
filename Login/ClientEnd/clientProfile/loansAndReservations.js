// Dummy data
const loans = [
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
  

const reservations = [
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

function openBookModal(book) {
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
          <img id="modalImage" src="${book.Cover_URL}" alt="${book.ItemID}" />
        </div>
      </div>
    `;

  modal.classList.remove("hidden");

  modal.querySelector(".close-modal-btn").onclick = () => {
    modal.classList.add("hidden");
  };

  // Inject the download button only for non-reserved items
  if (book.Status.toLowerCase() !== "reserved") {
    const buttonContainer = modal.querySelector("#modalButtons");
    const downloadBtn = document.createElement("button");
    downloadBtn.className = "book-action-btn return";
    downloadBtn.id = "modalDownloadReceiptBtn";
    downloadBtn.innerHTML = `<i class="bx bx-download"></i> Download Receipt`;

    downloadBtn.onclick = () => {
      const doc = new jsPDF();
      const loanId = "RET-" + new Date().getTime();
      const memberName = "Tasnim Hossain";
      const memberEmail = "tasnimhp9@gmail.com";

      const borrowDate = new Date();
      const returnDate = new Date(borrowDate);
      returnDate.setMonth(borrowDate.getMonth() + 1);

      doc.setFontSize(16);
      doc.text("GAMDL Return Receipt", 20, 20);
      doc.setFontSize(12);
      doc.text(`Return ID: ${loanId}`, 20, 50);
      doc.text(`Member Name: ${memberName}`, 20, 60);
      doc.text(`Member Email: ${memberEmail}`, 20, 70);
      doc.text(`Book Title: ${book.Title}`, 20, 80);
      doc.text(`Item ID: ${book.ItemID}`, 20, 90);
      doc.text(`Return Date: ${borrowDate.toLocaleDateString()}`, 20, 100);
      doc.text(`Return Due: ${returnDate.toLocaleDateString()}`, 20, 110);
      doc.text("Please present this return receipt to the librarian.", 20, 130);

      doc.save(`ReturnReceipt_${book.ItemID}.pdf`);
    };

    buttonContainer.appendChild(downloadBtn);
  }
}
function createCard(book) {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <div class="book-image-wrapper">
        <img src="${book.Cover_URL}" alt="Book Cover" />
      </div>
      <div class="book-details">
        <h3>${book.Title}</h3>
        <div class="book-meta">
          <span class="genre">${book.Genre || "Unknown Genre"}</span>
          <span class="rating">
            <i class='bx bxs-star'></i> ${book.Rating ? book.Rating.toFixed(1) : "4.5"}
          </span>
        </div>
      </div>
    `;
    card.onclick = () => openBookModal(book);
    return card;
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

renderLoanCards();
renderReservationCards();
