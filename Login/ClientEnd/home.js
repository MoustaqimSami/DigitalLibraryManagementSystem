window.addEventListener("DOMContentLoaded", () => {
  window.jsPDF = window.jspdf.jsPDF;
  console.log("jsPDF loaded:", typeof window.jspdf !== "undefined");

  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.querySelector(".sidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // Fake Book Database (Extended)
  const books = [
    {
      ItemID: "BK001",
      Title: "The Lost Library",
      Status: "Available",
      Genre: "Mystery",
      Rating: 4.5,
      Language: "English",
      Publication_Date: "2023-02-15",
      Cover_URL: "https://picsum.photos/id/1005/300/400",
    },
    {
      ItemID: "BK002",
      Title: "Echoes of Time",
      Status: "Unavailable",
      Genre: "Historical Fiction",
      Rating: 4.0,
      Language: "French",
      Publication_Date: "2022-11-01",
      Cover_URL: "https://picsum.photos/id/1018/300/400",
    },
    {
      ItemID: "BK003",
      Title: "Quantum Hearts",
      Status: "Available",
      Genre: "Sci-Fi",
      Rating: 3.8,
      Language: "English",
      Publication_Date: "2024-01-09",
      Cover_URL: "https://picsum.photos/id/1012/300/400",
    },
    {
      ItemID: "BK004",
      Title: "Secrets of the Silent Sea",
      Status: "Available",
      Genre: "Adventure",
      Rating: 4.2,
      Language: "German",
      Publication_Date: "2021-06-12",
      Cover_URL: "https://picsum.photos/id/1025/300/400",
    },
    {
      ItemID: "BK005",
      Title: "Digital Realms",
      Status: "Available",
      Genre: "Technology",
      Rating: 4.7,
      Language: "English",
      Publication_Date: "2024-03-01",
      Cover_URL: "https://picsum.photos/id/1032/300/400",
    },
    {
      ItemID: "BK006",
      Title: "Mindful Algorithms",
      Status: "Checked Out",
      Genre: "Self-Help",
      Rating: 4.3,
      Language: "English",
      Publication_Date: "2023-09-14",
      Cover_URL: "https://picsum.photos/id/1044/300/400",
    },
    {
      ItemID: "BK007",
      Title: "Journey to Mars",
      Status: "Available",
      Genre: "Sci-Fi",
      Rating: 4.1,
      Language: "Spanish",
      Publication_Date: "2022-01-10",
      Cover_URL: "https://picsum.photos/id/1047/300/400",
    },
    {
      ItemID: "BK008",
      Title: "The Binary Forest",
      Status: "Available",
      Genre: "Fantasy",
      Rating: 4.0,
      Language: "English",
      Publication_Date: "2021-12-05",
      Cover_URL: "https://picsum.photos/id/1056/300/400",
    },
  ];

  // DOM Elements
  const bookList = document.getElementById("bookList");
  const searchInput = document.getElementById("searchInput");
  const popularSection = document.getElementById("popularBooks");
  const latestSection = document.getElementById("latestBooks");

  // Create Modern Book Card
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
          <span class="genre">${book.Language}</span>
          <span class="rating"><i class='bx bxs-star'></i> ${Math.floor(Math.random() * 2) + 4}.0</span>
        </div>
      </div>
    `;
    card.addEventListener("click", () => openModal(book));
    return card;
  }

  // Render Books Based on Search
  function renderBooks(filteredBooks = books) {
    bookList.innerHTML = "";
    filteredBooks.forEach((book) => {
      const card = createCard(book);
      bookList.appendChild(card);
    });
  }

  // Render Popular and Latest Sections
  function renderBookSections() {
    const popular = books.slice(0, 4);
    const latest = books.slice(-4);

    popularSection.innerHTML = "";
    latestSection.innerHTML = "";

    popular.forEach((book) => popularSection.appendChild(createCard(book)));
    latest.forEach((book) => latestSection.appendChild(createCard(book)));
  }

  // Book Modal Functionality
  const modal = document.getElementById("bookModal");
  const modalContent = document.getElementById("modalContent");
  const borrowModal = document.getElementById("borrowReceiptModal");
  const closeReceiptModal = document.getElementById("closeReceiptModal");
  const downloadReceiptBtn = document.getElementById("downloadReceiptBtn");

  function openModal(book) {
    const isAvailable = book.Status === "Available";

    modalContent.innerHTML = `
      <button class="close-modal-btn" id="closeModal"><i class="bx bx-x"></i></button>
      <div class="modal-body">
        <div class="modal-left">
          <h1 class="book-title">${book.Title}</h1>
  
          <p class="modal-field"><strong>Author:</strong> Matt Haig</p>
          <p class="modal-field"><strong>Genre:</strong> ${book.Genre}</p>
          <p class="modal-field"><strong>Type:</strong> Book</p>
          <p class="modal-field"><strong>Publisher:</strong> ${book.Publisher_ID || "PUB001"}</p>
          <p class="modal-field"><strong>Publication Date:</strong> ${book.Publication_Date}</p>
          <p class="modal-field"><strong>Editor:</strong> ${book.Editor_ID || "ED001"}</p>
  
          <p class="modal-field synopsis">
            <strong>Synopsis:</strong> A dazzling novel about all the choices that go into a life well lived. 
            This story explores the infinite possibilities between life and death, identity, and purpose.
          </p>
  
          <p class="modal-field"><strong>Status:</strong> 
            <span class="${isAvailable ? "available" : "unavailable"}">${book.Status}</span>
          </p>
  
          <div class="modal-buttons wide">
            <button class="book-action-btn borrow" ${!isAvailable ? "disabled" : ""}>
              <i class='bx bx-book'></i> Borrow
            </button>
            <button class="book-action-btn reserve">
              <i class='bx bx-bookmark'></i> Reserve
            </button>
          </div>
        </div>
        <div class="modal-right">
          <img src="${book.Cover_URL}" alt="${book.Title} Cover" />
        </div>
      </div>
    `;

    modal.style.display = "flex";

    modal.querySelector("#closeModal").addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Add reserve button listener
    modal.querySelector(".reserve").addEventListener("click", () => {
      const userId = "client123"; // Replace with actual logged-in user ID

      // Simulated client reservation check
      const reservationKey = `${userId}_${book.ItemID}`;
      const existing = localStorage.getItem("reserved_" + reservationKey);

      // Check backend for existing
      if (existing) {
        showToast("You have already reserved this item.", "info");
        return;
      }

      // Simulate saving reservation
      localStorage.setItem("reserved_" + reservationKey, "true");

      // === Real API call would look like ===
      /*
        fetch("/api/reservations", {
          method: "POST",
          body: JSON.stringify({
            member_email: userId,
            itemId: book.ItemID,
            status: "holding"
          }),
          headers: { "Content-Type": "application/json" }
        }).then(res => {
          if (res.ok) {
            showToast("Book reserved successfully!");
          }
        });
        */

      showToast("Book reserved successfully!");
    });

    const borrowBtn = modalContent.querySelector(".borrow");
    borrowBtn.addEventListener("click", () => {
      if (book.Status === "Available") {
        openBorrowModal(book);
      }
    });
  }

  function openBorrowModal(book) {
    const memberName = "Mouin Noin"; // Replace with dynamic user data
    const memberEmail = "moni@example.com"; //  Replace dynamically if needed
    const borrowDate = new Date();
    const returnDate = new Date(borrowDate);
    returnDate.setMonth(borrowDate.getMonth() + 1); // 1 month later

    // BACKEND: PLEASE
    const loanId = 2001;
    document.getElementById("receiptLoanId").textContent = loanId;


    // Format dates
    const borrowDateStr = borrowDate.toLocaleDateString();
    const returnDateStr = returnDate.toLocaleDateString();

    document.getElementById("receiptMember").textContent = memberName;
    document.getElementById("receiptBookTitle").textContent = book.Title;
    document.getElementById("receiptItemId").textContent = book.ItemID;
    document.getElementById("receiptDate").textContent = borrowDateStr;

    // Inject email and return date into modal
    document.getElementById("receiptEmail").textContent = memberEmail;
    document.getElementById("receiptReturn").textContent = returnDateStr;

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
      doc.text(`Borrow Date: ${borrowDateStr}`, 20, 100);
      doc.text(`Return By: ${returnDateStr}`, 20, 110);
      doc.text(`Please present this receipt to the librarian.`, 20, 130);      
      doc.save(`BorrowReceipt_${book.ItemID}.pdf`);
    };
  }

  // Close modal
  closeReceiptModal.addEventListener("click", () => {
    borrowModal.classList.add("hidden");
  });

  // Search Logic
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = books.filter((b) =>
      b.Title.toLowerCase().includes(keyword)
    );
    renderBooks(filtered);
  });

  // Init
  renderBookSections();
  renderBooks();

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
});
