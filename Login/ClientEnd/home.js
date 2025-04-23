const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Fake Book Database
const books = [
    {
      ItemID: "BK001",
      Title: "The Lost Library",
      Status: "Available",
      Publisher_ID: "PUB001",
      Publication_Date: "2023-02-15",
      Language: "English",
      Editor_ID: "ED003",
      Author_ID: "AU021",
      Cover_Color: "#8a4fff",
      Cover_URL: "https://picsum.photos/id/1005/300/400",
    },
    {
      ItemID: "BK002",
      Title: "Echoes of Time",
      Status: "Checked Out",
      Publisher_ID: "PUB004",
      Publication_Date: "2022-11-01",
      Language: "French",
      Editor_ID: "ED010",
      Author_ID: "AU014",
      Cover_Color: "#2a9d8f",
      Cover_URL: "https://picsum.photos/id/1018/300/400",
    },
    {
      ItemID: "BK003",
      Title: "Quantum Hearts",
      Status: "Available",
      Publisher_ID: "PUB007",
      Publication_Date: "2024-01-09",
      Language: "English",
      Editor_ID: "ED007",
      Author_ID: "AU031",
      Cover_Color: "#e63946",
      Cover_URL: "https://picsum.photos/id/1012/300/400",
    },
    {
      ItemID: "BK004",
      Title: "Secrets of the Silent Sea",
      Status: "Available",
      Publisher_ID: "PUB002",
      Publication_Date: "2021-06-12",
      Language: "German",
      Editor_ID: "ED002",
      Author_ID: "AU005",
      Cover_Color: "#264653",
      Cover_URL: "https://picsum.photos/id/1025/300/400",
    },
  ];
  
  // DOM Elements
  const bookList = document.getElementById("bookList");
  const searchInput = document.getElementById("searchInput");
  
  // Populate Book List
  function renderBooks(filteredBooks = books) {
    bookList.innerHTML = "";
    filteredBooks.forEach((book, index) => {
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
        <img src="${book.Cover_URL}" alt="Book Cover" />
        <h3>${book.Title}</h3>
        <p>${book.Language} • ${book.Status}</p>
      `;
      card.addEventListener("click", () => openModal(book));
      bookList.appendChild(card);
    });
  }
  
  // Search Filter
  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = books.filter((b) =>
      b.Title.toLowerCase().includes(keyword)
    );
    renderBooks(filtered);
  });
  
  // Book Detail Modal
  const modal = document.getElementById("bookModal");
  const modalContent = document.getElementById("modalContent");
  const closeBtn = document.getElementById("closeModal");
  
  function openModal(book) {
    modalContent.innerHTML = `
      <button class="close-modal-btn" id="closeModal">&times;</button>
      <img src="${book.Cover_URL}" alt="Cover" />
      <h2>${book.Title}</h2>
      <p><strong>Language:</strong> ${book.Language}</p>
      <p><strong>Status:</strong> ${book.Status}</p>
      <p><strong>Published:</strong> ${book.Publication_Date}</p>
      <p><strong>Item ID:</strong> ${book.ItemID}</p>
      <div class="modal-buttons">
        <button class="book-action-btn borrow"><i class="bx bx-book"></i> Borrow</button>
        <button class="book-action-btn reserve"><i class="bx bx-bookmark"></i> Reserve</button>
      </div>
    `;
    modal.style.display = "flex";
  
    // Close modal listener
    modal.querySelector("#closeModal").addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
  
  // Initialize
  renderBooks();
  