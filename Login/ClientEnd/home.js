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
  {
    ItemID: "BK005",
    Title: "Digital Realms",
    Status: "Available",
    Publisher_ID: "PUB010",
    Publication_Date: "2024-03-01",
    Language: "English",
    Editor_ID: "ED008",
    Author_ID: "AU018",
    Cover_Color: "#ffb703",
    Cover_URL: "https://picsum.photos/id/1032/300/400",
  },
  {
    ItemID: "BK006",
    Title: "Mindful Algorithms",
    Status: "Checked Out",
    Publisher_ID: "PUB005",
    Publication_Date: "2023-09-14",
    Language: "English",
    Editor_ID: "ED011",
    Author_ID: "AU026",
    Cover_Color: "#219ebc",
    Cover_URL: "https://picsum.photos/id/1044/300/400",
  },
  {
    ItemID: "BK007",
    Title: "Journey to Mars",
    Status: "Available",
    Publisher_ID: "PUB009",
    Publication_Date: "2022-01-10",
    Language: "Spanish",
    Editor_ID: "ED001",
    Author_ID: "AU009",
    Cover_Color: "#f72585",
    Cover_URL: "https://picsum.photos/id/1047/300/400",
  },
  {
    ItemID: "BK008",
    Title: "The Binary Forest",
    Status: "Available",
    Publisher_ID: "PUB011",
    Publication_Date: "2021-12-05",
    Language: "English",
    Editor_ID: "ED004",
    Author_ID: "AU023",
    Cover_Color: "#6a994e",
    Cover_URL: "https://picsum.photos/id/1056/300/400",
  },
];

// DOM Elements
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const popularSection = document.getElementById("popularBooks");
const latestSection = document.getElementById("latestBooks");

// Render General Search Results
function renderBooks(filteredBooks = books) {
  bookList.innerHTML = "";
  filteredBooks.forEach((book) => {
    const card = createCard(book);
    bookList.appendChild(card);
  });
}

// Create Card HTML
function createCard(book) {
  const card = document.createElement("div");
  card.className = "book-card";
  card.innerHTML = `
    <img src="${book.Cover_URL}" alt="Book Cover" />
    <h3>${book.Title}</h3>
    <p>${book.Language} • ${book.Status}</p>
  `;
  card.addEventListener("click", () => openModal(book));
  return card;
}

// Render Popular and Latest Sections
function renderBookSections() {
  // Simulate selection logic
  const popular = books.slice(0, 4);
  const latest = books.slice(-4);

  popularSection.innerHTML = "";
  latestSection.innerHTML = "";

  popular.forEach((book) => {
    const card = createCard(book);
    popularSection.appendChild(card);
  });

  latest.forEach((book) => {
    const card = createCard(book);
    latestSection.appendChild(card);
  });
}

// Book Detail Modal
const modal = document.getElementById("bookModal");
const modalContent = document.getElementById("modalContent");

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

  modal.querySelector("#closeModal").addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// Search
searchInput.addEventListener("input", () => {
  const keyword = searchInput.value.toLowerCase();
  const filtered = books.filter((b) =>
    b.Title.toLowerCase().includes(keyword)
  );
  renderBooks(filtered);
});

// Init
renderBookSections();
renderBooks(); // Initial full view
