window.addEventListener("DOMContentLoaded", () => {
    window.jsPDF = window.jspdf.jsPDF;
    console.log("jsPDF loaded:", typeof window.jspdf !== "undefined");
  
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.querySelector(".sidebar");
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  
    // BACKEND: Replace with actual book API fetch in production if needed
      const books = [
      // === Books ===
      {
        ItemID: "BK001",
        Title: "Chronicles of Stars 1",
        Status: "Available",
        Genre: "Sci-Fi",
        Rating: 4.1,
        Language: "Spanish",
        Cover_URL: "https://picsum.photos/id/1001/300/400",
        Publication_Date: "2022-12-14",
        Type: "Book"
      },
      {
        ItemID: "BK002",
        Title: "Deep Stars 2",
        Status: "Available",
        Genre: "Technology",
        Rating: 4.8,
        Language: "French",
        Cover_URL: "https://picsum.photos/id/1002/300/400",
        Publication_Date: "2023-08-15",
        Type: "Book"
      },
      {
        ItemID: "BK003",
        Title: "Echoes of Knowledge 3",
        Status: "Available",
        Genre: "Mystery",
        Rating: 3.6,
        Language: "French",
        Cover_URL: "https://picsum.photos/id/1003/300/400",
        Publication_Date: "2024-05-29",
        Type: "Book"
      },
      {
        ItemID: "BK004",
        Title: "Chronicles of Stars 4",
        Status: "Checked Out",
        Genre: "Mystery",
        Rating: 4.8,
        Language: "Spanish",
        Cover_URL: "https://picsum.photos/id/1004/300/400",
        Publication_Date: "2025-01-23",
        Type: "Book"
      },
      {
        ItemID: "BK005",
        Title: "Deep Knowledge 5",
        Status: "Checked Out",
        Genre: "Technology",
        Rating: 3.8,
        Language: "French",
        Cover_URL: "https://picsum.photos/id/1005/300/400",
        Publication_Date: "2023-06-24",
        Type: "Book"
      },
      {
        ItemID: "BK006",
        Title: "Hidden Innovation 6",
        Status: "Checked Out",
        Genre: "Sci-Fi",
        Rating: 3.6,
        Language: "Spanish",
        Cover_URL: "https://picsum.photos/id/1006/300/400",
        Publication_Date: "2023-02-02",
        Type: "Book"
      },
      {
        ItemID: "BK007",
        Title: "Chronicles of Innovation 7",
        Status: "Checked Out",
        Genre: "Sci-Fi",
        Rating: 4.9,
        Language: "French",
        Cover_URL: "https://picsum.photos/id/1007/300/400",
        Publication_Date: "2024-07-22",
        Type: "Book"
      },
      {
        ItemID: "BK008",
        Title: "Hidden Dreams 8",
        Status: "Available",
        Genre: "Romance",
        Rating: 4.0,
        Language: "English",
        Cover_URL: "https://picsum.photos/id/1008/300/400",
        Publication_Date: "2022-03-18",
        Type: "Book"
      },
      {
        ItemID: "BK009",
        Title: "Echoes of Knowledge 9",
        Status: "Available",
        Genre: "Mystery",
        Rating: 4.3,
        Language: "German",
        Cover_URL: "https://picsum.photos/id/1009/300/400",
        Publication_Date: "2023-09-27",
        Type: "Book"
      },
      {
        ItemID: "BK010",
        Title: "Chronicles of Dreams 10",
        Status: "Unavailable",
        Genre: "Fantasy",
        Rating: 4.0,
        Language: "English",
        Cover_URL: "https://picsum.photos/id/1010/300/400",
        Publication_Date: "2024-01-12",
        Type: "Book"
      },
      {
        ItemID: "BK011",
        Title: "Echoes of Stars 11",
        Status: "Available",
        Genre: "Sci-Fi",
        Rating: 4.2,
        Language: "French",
        Cover_URL: "https://picsum.photos/id/1011/300/400",
        Publication_Date: "2023-11-02",
        Type: "Book"
      },
      {
        ItemID: "BK012",
        Title: "Deep Innovation 12",
        Status: "Available",
        Genre: "Technology",
        Rating: 4.5,
        Language: "English",
        Cover_URL: "https://picsum.photos/id/1012/300/400",
        Publication_Date: "2023-04-14",
        Type: "Book"
      },
      {
        ItemID: "BK013",
        Title: "Hidden Knowledge 13",
        Status: "Checked Out",
        Genre: "Mystery",
        Rating: 3.7,
        Language: "Spanish",
        Cover_URL: "https://picsum.photos/id/1013/300/400",
        Publication_Date: "2022-06-30",
        Type: "Book"
      },
      {
        ItemID: "BK014",
        Title: "Chronicles of Dreams 14",
        Status: "Available",
        Genre: "Fantasy",
        Rating: 4.6,
        Language: "German",
        Cover_URL: "https://picsum.photos/id/1014/300/400",
        Publication_Date: "2024-10-01",
        Type: "Book"
      },
    
      // === Magazines ===
      {
        ItemID: "MG001",
        Title: "Tech Monthly",
        Type: "Magazine",
        Status: "Available",
        Genre: "Technology",
        Language: "English",
        Cover_URL: "https://picsum.photos/id/2001/300/400",
        Publication_Date: "2025-02-01"
      },
      {
        ItemID: "MG002",
        Title: "Culture Weekly",
        Type: "Magazine",
        Status: "Available",
        Genre: "Culture",
        Language: "German",
        Cover_URL: "https://picsum.photos/id/2002/300/400",
        Publication_Date: "2024-12-15"
      },
      {
        ItemID: "MG003",
        Title: "Science Times",
        Type: "Magazine",
        Status: "Available",
        Genre: "Science",
        Language: "French",
        Cover_URL: "https://picsum.photos/id/2003/300/400",
        Publication_Date: "2025-01-01"
      },
      {
        ItemID: "MG004",
        Title: "Modern Fashion",
        Type: "Magazine",
        Status: "Available",
        Genre: "Fashion",
        Language: "English",
        Cover_URL: "https://picsum.photos/id/2004/300/400",
        Publication_Date: "2023-07-30"
      },
      {
        ItemID: "MG005",
        Title: "Cyber Digest",
        Type: "Magazine",
        Status: "Available",
        Genre: "Tech",
        Language: "English",
        Cover_URL: "https://picsum.photos/id/2005/300/400",
        Publication_Date: "2023-11-20"
      },
      {
        ItemID: "MG006",
        Title: "Innovation Weekly",
        Type: "Magazine",
        Status: "Available",
        Genre: "Tech",
        Language: "French",
        Cover_URL: "https://picsum.photos/id/2006/300/400",
        Publication_Date: "2024-03-18"
      },
      {
        ItemID: "MG007",
        Title: "Lifestyle Pulse",
        Type: "Magazine",
        Status: "Available",
        Genre: "Culture",
        Language: "Spanish",
        Cover_URL: "https://picsum.photos/id/2007/300/400",
        Publication_Date: "2023-05-10"
      },
    
      // === Research Papers ===
      {
        ItemID: "RP001",
        Title: "AI Revolution",
        Type: "Research Paper",
        Status: "Available",
        Genre: "Artificial Intelligence",
        Language: "English",
        Cover_URL: "https://picsum.photos/id/3001/300/400",
        Publication_Date: "2025-01-15"
      },
      {
        ItemID: "RP002",
        Title: "Quantum Realms",
        Type: "Research Paper",
        Status: "Available",
        Genre: "Physics",
        Language: "French",
        Cover_URL: "https://picsum.photos/id/3002/300/400",
        Publication_Date: "2024-09-10"
      },
      {
        ItemID: "RP003",
        Title: "Genetic Frontiers",
        Type: "Research Paper",
        Status: "Available",
        Genre: "Biology",
        Language: "English",
        Cover_URL: "https://picsum.photos/id/3003/300/400",
        Publication_Date: "2023-11-08"
      },
      {
        ItemID: "RP004",
        Title: "Cyber Defenders",
        Type: "Research Paper",
        Status: "Available",
        Genre: "Cybersecurity",
        Language: "German",
        Cover_URL: "https://picsum.photos/id/3004/300/400",
        Publication_Date: "2022-08-25"
      },
      {
        ItemID: "RP005",
        Title: "Neural Insights",
        Type: "Research Paper",
        Status: "Available",
        Genre: "Artificial Intelligence",
        Language: "Spanish",
        Cover_URL: "https://picsum.photos/id/3005/300/400",
        Publication_Date: "2023-04-22"
      },
      {
        ItemID: "RP006",
        Title: "Molecular Mapping",
        Type: "Research Paper",
        Status: "Available",
        Genre: "Biology",
        Language: "French",
        Cover_URL: "https://picsum.photos/id/3006/300/400",
        Publication_Date: "2024-06-06"
      },
      {
        ItemID: "RP007",
        Title: "Future Intelligence",
        Type: "Research Paper",
        Status: "Available",
        Genre: "Artificial Intelligence",
        Language: "English",
        Cover_URL: "https://picsum.photos/id/3007/300/400",
        Publication_Date: "2024-02-18"
      }
    ];
  
    // === DOM References ===
    const bookList = document.getElementById("bookList");
    const searchInput = document.getElementById("searchInput");
    const modal = document.getElementById("bookModal");
    const modalContent = document.getElementById("modalContent");
    const borrowModal = document.getElementById("borrowReceiptModal");
    const closeReceiptModal = document.getElementById("closeReceiptModal");
    const downloadReceiptBtn = document.getElementById("downloadReceiptBtn");
  
    // === CARD CREATION ===
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
            <span class="genre">${book.Genre || book.Type}</span>
            <span class="rating"><i class='bx bxs-star'></i> ${Math.floor(Math.random() * 2) + 4}.0</span>
          </div>
        </div>
      `;
      card.addEventListener("click", () => openModal(book));
      return card;
    }
  
    // === MODAL POPULATION ===
    function openModal(book) {
      const isAvailable = book.Status === "Available";
      modalContent.innerHTML = `
        <button class="close-modal-btn" id="closeModal"><i class="bx bx-x"></i></button>
        <div class="modal-body">
          <div class="modal-left">
            <h1 class="book-title">${book.Title}</h1>
            <p class="modal-field"><strong>Author:</strong> Matt Haig</p>
            <p class="modal-field"><strong>Genre:</strong> ${book.Genre}</p>
            <p class="modal-field"><strong>Type:</strong> ${book.Type || "Book"}</p>
            <p class="modal-field"><strong>Publisher:</strong> ${book.Publisher_ID || "PUB001"}</p>
            <p class="modal-field"><strong>Publication Date:</strong> ${book.Publication_Date}</p>
            <p class="modal-field"><strong>Editor:</strong> ${book.Editor_ID || "ED001"}</p>
            <p class="modal-field synopsis"><strong>Synopsis:</strong> A dazzling novel about all the choices that go into a life well lived. This story explores the infinite possibilities between life and death, identity, and purpose.</p>
            <p class="modal-field"><strong>Status:</strong> <span class="${isAvailable ? "available" : "unavailable"}">${book.Status}</span></p>
            <div class="modal-buttons wide">
              <button class="book-action-btn borrow" ${!isAvailable ? "disabled" : ""}><i class='bx bx-book'></i> Borrow</button>
              <button class="book-action-btn reserve"><i class='bx bx-bookmark'></i> Reserve</button>
            </div>
          </div>
          <div class="modal-right"><img src="${book.Cover_URL}" alt="${book.Title} Cover" /></div>
        </div>
      `;
  
      modal.style.display = "flex";
      modal.querySelector("#closeModal").addEventListener("click", () => modal.style.display = "none");
  
      modal.querySelector(".reserve").addEventListener("click", () => {
        const userId = "client123"; // BACKEND: Replace with logged-in user ID
        const reservationKey = `${userId}_${book.ItemID}`;
        if (localStorage.getItem("reserved_" + reservationKey)) {
          showToast("You have already reserved this item.", "info");
          return;
        }
  
        // BACKEND: Add API call to create reservation
        localStorage.setItem("reserved_" + reservationKey, "true");
        showToast("Book reserved successfully!");
      });
  
      const borrowBtn = modalContent.querySelector(".borrow");
      borrowBtn.addEventListener("click", () => {
        if (book.Status === "Available") openBorrowModal(book);
      });
    }
  
    // === BORROW RECEIPT MODAL ===
    function openBorrowModal(book) {
      const memberName = "Mouin Noin"; // BACKEND: Replace with actual user name
      const memberEmail = "moni@example.com"; // BACKEND: Replace with actual user email
      const loanId = 2001; // BACKEND: Generate this dynamically
      const borrowDate = new Date();
      const returnDate = new Date(borrowDate);
      returnDate.setMonth(borrowDate.getMonth() + 1);
  
      document.getElementById("receiptLoanId").textContent = loanId;
      document.getElementById("receiptMember").textContent = memberName;
      document.getElementById("receiptEmail").textContent = memberEmail;
      document.getElementById("receiptBookTitle").textContent = book.Title;
      document.getElementById("receiptItemId").textContent = book.ItemID;
      document.getElementById("receiptDate").textContent = borrowDate.toLocaleDateString();
      document.getElementById("receiptReturn").textContent = returnDate.toLocaleDateString();
  
      borrowModal.classList.remove("hidden");
  
      downloadReceiptBtn.onclick = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("GAMDL Borrow Receipt", 20, 20);
        doc.setFontSize(12);
        doc.text(`Loan ID: ${loanId}`, 20, 50);
        doc.text(`Member Name: ${memberName}`, 20, 60);
        doc.text(`Member Email: ${memberEmail}`, 20, 70);
        doc.text(`Book Title: ${book.Title}`, 20, 80);
        doc.text(`Item ID: ${book.ItemID}`, 20, 90);
        doc.text(`Borrow Date: ${borrowDate.toLocaleDateString()}`, 20, 100);
        doc.text(`Return By: ${returnDate.toLocaleDateString()}`, 20, 110);
        doc.text(`Please present this receipt to the librarian.`, 20, 130);
        doc.save(`BorrowReceipt_${book.ItemID}.pdf`);
      };
    }
  
    closeReceiptModal.addEventListener("click", () => {
      borrowModal.classList.add("hidden");
    });
  
    function showToast(message, type = "success") {
      const toast = document.createElement("div");
      toast.className = `toast ${type}`;
      toast.innerText = message;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => document.body.removeChild(toast), 500);
      }, 3000);
    }
  
    // === Search Functionality ===
    searchInput.addEventListener("input", () => {
      const keyword = searchInput.value.toLowerCase();
      const filtered = books.filter(b => b.Title.toLowerCase().includes(keyword));
      renderBooks(filtered);
    });
  
    // === Render Books in Main Area ===
    function renderBooks(filteredBooks = books) {
      if (bookList) {
        bookList.innerHTML = "";
        filteredBooks.forEach(book => bookList.appendChild(createCard(book)));
      }
    }
  
    function renderBookSections() {
      const popular = books.filter(b => b.Type === "Book").slice(0, 10);
      const latestBooks = books.filter(b => b.Type === "Book").slice(-10);
      const latestMagazines = books.filter(b => b.Type === "Magazine");
      const latestPapers = books.filter(b => b.Type === "Research Paper");
  
      document.getElementById("popularBooks").innerHTML = "";
      document.getElementById("latestBooks").innerHTML = "";
      document.getElementById("latestMagazines").innerHTML = "";
      document.getElementById("latestPapers").innerHTML = "";
  
      popular.forEach(book => document.getElementById("popularBooks").appendChild(createCard(book)));
      latestBooks.forEach(book => document.getElementById("latestBooks").appendChild(createCard(book)));
      latestMagazines.forEach(book => document.getElementById("latestMagazines").appendChild(createCard(book)));
      latestPapers.forEach(book => document.getElementById("latestPapers").appendChild(createCard(book)));
    }
  
    // === Init ===
    renderBookSections();
    renderBooks();
  });
  