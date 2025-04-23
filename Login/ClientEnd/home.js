window.addEventListener("DOMContentLoaded", async () => {
  window.jsPDF = window.jspdf.jsPDF;
  console.log("jsPDF loaded:", typeof window.jspdf !== "undefined");


  books = await getLibraryItems();    
  
  user = await getSessionInfo();

  console.log(user)

  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.querySelector(".sidebar");
  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });

  // BACKEND: Replace with actual book API fetch in production if needed
  const books1 = [
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
      Type: "Book",
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
      Type: "Book",
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
      Type: "Book",
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
      Type: "Book",
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
      Type: "Book",
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
      Type: "Book",
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
      Type: "Book",
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
      Type: "Book",
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
      Type: "Book",
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
      Type: "Book",
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
      Type: "Book",
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
      Type: "Book",
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
      Type: "Book",
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
      Type: "Book",
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
      Publication_Date: "2025-02-01",
    },
    {
      ItemID: "MG002",
      Title: "Culture Weekly",
      Type: "Magazine",
      Status: "Available",
      Genre: "Culture",
      Language: "German",
      Cover_URL: "https://picsum.photos/id/2002/300/400",
      Publication_Date: "2024-12-15",
    },
    {
      ItemID: "MG003",
      Title: "Science Times",
      Type: "Magazine",
      Status: "Available",
      Genre: "Science",
      Language: "French",
      Cover_URL: "https://picsum.photos/id/2003/300/400",
      Publication_Date: "2025-01-01",
    },
    {
      ItemID: "MG004",
      Title: "Modern Fashion",
      Type: "Magazine",
      Status: "Available",
      Genre: "Fashion",
      Language: "English",
      Cover_URL: "https://picsum.photos/id/2004/300/400",
      Publication_Date: "2023-07-30",
    },
    {
      ItemID: "MG005",
      Title: "Cyber Digest",
      Type: "Magazine",
      Status: "Available",
      Genre: "Tech",
      Language: "English",
      Cover_URL: "https://picsum.photos/id/2005/300/400",
      Publication_Date: "2023-11-20",
    },
    {
      ItemID: "MG006",
      Title: "Innovation Weekly",
      Type: "Magazine",
      Status: "Available",
      Genre: "Tech",
      Language: "French",
      Cover_URL: "https://picsum.photos/id/2006/300/400",
      Publication_Date: "2024-03-18",
    },
    {
      ItemID: "MG007",
      Title: "Lifestyle Pulse",
      Type: "Magazine",
      Status: "Available",
      Genre: "Culture",
      Language: "Spanish",
      Cover_URL: "https://picsum.photos/id/2007/300/400",
      Publication_Date: "2023-05-10",
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
      Publication_Date: "2025-01-15",
    },
    {
      ItemID: "RP002",
      Title: "Quantum Realms",
      Type: "Research Paper",
      Status: "Available",
      Genre: "Physics",
      Language: "French",
      Cover_URL: "https://picsum.photos/id/3002/300/400",
      Publication_Date: "2024-09-10",
    },
    {
      ItemID: "RP003",
      Title: "Genetic Frontiers",
      Type: "Research Paper",
      Status: "Available",
      Genre: "Biology",
      Language: "English",
      Cover_URL: "https://picsum.photos/id/3003/300/400",
      Publication_Date: "2023-11-08",
    },
    {
      ItemID: "RP004",
      Title: "Cyber Defenders",
      Type: "Research Paper",
      Status: "Available",
      Genre: "Cybersecurity",
      Language: "German",
      Cover_URL: "https://picsum.photos/id/3004/300/400",
      Publication_Date: "2022-08-25",
    },
    {
      ItemID: "RP005",
      Title: "Neural Insights",
      Type: "Research Paper",
      Status: "Available",
      Genre: "Artificial Intelligence",
      Language: "Spanish",
      Cover_URL: "https://picsum.photos/id/3005/300/400",
      Publication_Date: "2023-04-22",
    },
    {
      ItemID: "RP006",
      Title: "Molecular Mapping",
      Type: "Research Paper",
      Status: "Available",
      Genre: "Biology",
      Language: "French",
      Cover_URL: "https://picsum.photos/id/3006/300/400",
      Publication_Date: "2024-06-06",
    },
    {
      ItemID: "RP007",
      Title: "Future Intelligence",
      Type: "Research Paper",
      Status: "Available",
      Genre: "Artificial Intelligence",
      Language: "English",
      Cover_URL: "https://picsum.photos/id/3007/300/400",
      Publication_Date: "2024-02-18",
    },
  ];

  async function getLibraryItems() {
    try {
      const response = await fetch('/api/libraryItems'); // Replace with your actual API route
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
          Publisher_Name: item.Publisher_Name
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
  
      return user;
    } catch (err) {
      console.error('Error fetching session info:', err);
      return null;
    }
  }
  // === DOM References ===
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
            <span class="rating"><i class='bx bxs-star'></i> ${book.Rating}.0</span>
          </div>
        </div>
      `;
    card.addEventListener("click", () => openModal(book));
    return card;
  }

  function createSearchCard(book) {
    const card = document.createElement("div");
    card.className = "search-result-card";
    card.innerHTML = `
          <div class="search-card-image">
            <img src="${book.Cover_URL}" alt="${book.Title} Cover" />
          </div>
          <div class="search-card-details">
            <h3 class="search-card-title">${book.Title}</h3>
            <p><strong>Rating:</strong> ${book.Rating}</p>
            <p><strong>Type:</strong> ${book.Type}</p>
            <p><strong>Genre:</strong> ${book.Genre}</p>
            <p><strong>Author:</strong> ${book.Author_Name}</p>
            <div class="search-card-synopsis">
              A dazzling novel about all the choices that go into a life well lived. This story explores the infinite possibilities between life and death, identity, and purpose.
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
            <h1 class="book-title"> ${book.Title}</h1>
            <p class="modal-field"><strong>Author: </strong>${book.Author_Name}</p>
            <p class="modal-field"><strong>Genre:</strong> ${book.Genre}</p>
            <p class="modal-field"><strong>Type:</strong> ${book.Type}</p>
            <p class="modal-field"><strong>Publisher:</strong> ${book.Publisher_Name}</p>
            <p class="modal-field"><strong>Publication Date:</strong> ${book.Publication_Date}</p>
            <p class="modal-field"><strong>Editor:</strong> ${book.Editor_Name}</p>
            <p class="modal-field synopsis"><strong>Synopsis:</strong> ${book.Synopsys || "Refer to our staff for more info!"} </p>
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
    modal
      .querySelector("#closeModal")
      .addEventListener("click", () => (modal.style.display = "none"));

    modal.querySelector(".reserve").addEventListener("click", async () => {
      const userId = user.email; // BACKEND: Replace with logged-in user ID
      const reservationKey = `${userId}_${book.ItemID}`;
      if (localStorage.getItem("reserved_" + reservationKey)) {
        showToast("You have already reserved this item.", "info");
        return;
      }

      // BACKEND: Add API call to create reservation
      localStorage.setItem("reserved_" + reservationKey, "true");

      try {
        const res = await fetch('http://localhost:8800/home/addReservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Member_Email: user.email,
                ItemID: book.ItemID,
                Status: book.Status
            })
        });

        console.log("Got response", res);

        if (res.ok) {
            console.log("worked");
        } 
    } catch (err) {
        console.error("Fetch error:", err);
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
      showToast("Book reserved successfully!");
    });

    const borrowBtn = modalContent.querySelector(".borrow");
    borrowBtn.addEventListener("click", () => {
      if (book.Status === "Available") openBorrowModal(book);
    });
  }

  // === BORROW RECEIPT MODAL ===
  async function openBorrowModal(book) {

    try {
      const res = await fetch('http://localhost:8800/home/addLoan', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              Library_Item_ID: book.ItemID,
              Client_Email: user.email,
          })
      });


      if (res.ok) {
          data = await res.json();
          console.log("worked");
      } 
  } catch (err) {
      console.error("Fetch error:", err);
      errorMessage.textContent = 'An error occurred. Please try again.';
  }

    const memberName = user.username; // BACKEND: Replace with actual user name
    const memberEmail = user.email; // BACKEND: Replace with actual user email
    const loanId = data.loanId; // BACKEND: Generate this dynamically
    const borrowDate = new Date();
    const returnDate = new Date(borrowDate);
    returnDate.setMonth(borrowDate.getMonth() + 1);

    document.getElementById("receiptLoanId").textContent = loanId;
    document.getElementById("receiptMember").textContent = memberName;
    document.getElementById("receiptEmail").textContent = memberEmail;
    document.getElementById("receiptBookTitle").textContent = book.Title;
    document.getElementById("receiptItemId").textContent = book.ItemID;
    document.getElementById("receiptDate").textContent =
      borrowDate.toLocaleDateString();
    document.getElementById("receiptReturn").textContent =
      returnDate.toLocaleDateString();

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

  const filterBtn = document.querySelector(".filter-btn");
  const filterModal = document.getElementById("filterModal");
  const closeFilterModal = document.getElementById("closeFilterModal");

  filterBtn.addEventListener("click", () => {
    filterModal.classList.remove("hidden");
  });

  closeFilterModal.addEventListener("click", () => {
    filterModal.classList.add("hidden");
  });

  filterModal.addEventListener("click", (e) => {
    if (e.target === filterModal) {
      filterModal.classList.add("hidden");
    }
  });

  const filterForm = document.getElementById("filterForm");

  filterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const typeValue = document.getElementById("filterType").value.toLowerCase();
    const genreValue = document
      .getElementById("filterGenre")
      .value.toLowerCase();
    const langValue = document
      .getElementById("filterLanguage")
      .value.toLowerCase();
    const authorValue = document
      .getElementById("filterAuthor")
      .value.toLowerCase();

    const filtered = books.filter((book) => {
      const typeMatch =
        !typeValue ||
        (book.Type && book.Type.toLowerCase().includes(typeValue));
      const genreMatch =
        !genreValue ||
        (book.Genre && book.Genre.toLowerCase().includes(genreValue));
      const langMatch =
        !langValue ||
        (book.Language && book.Language.toLowerCase().includes(langValue));
      const authorMatch =
        !authorValue ||
        (book.Author && book.Author.toLowerCase().includes(authorValue));

      return typeMatch && genreMatch && langMatch && authorMatch;
    });

    document
      .querySelectorAll(".horizontal-section")
      .forEach((section) => (section.style.display = "none"));
    document
      .getElementById("searchResultsContainer")
      .classList.remove("hidden");
    const searchTitle = document.querySelector(
      "#searchResultsContainer .section-title"
    );
    searchTitle.style.display = "block";

    const noResults = document.getElementById("noResults");
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";

    if (filtered.length === 0) {
      noResults.style.display = "flex";
    } else {
      noResults.style.display = "none";
      filtered.forEach((book) =>
        searchResults.appendChild(createSearchCard(book))
      );
    }

    document.getElementById("filterModal").classList.add("hidden");
  });

  document.getElementById("resetFilters").addEventListener("click", () => {
    document.getElementById("filterType").value = "";
    document.getElementById("filterGenre").value = "";
    document.getElementById("filterLanguage").value = "";
    document.getElementById("filterAuthor").value = "";

    document
      .querySelectorAll(".horizontal-section")
      .forEach((section) => (section.style.display = "block"));
    document.getElementById("searchResultsContainer").classList.add("hidden");
    document.getElementById("searchResults").innerHTML = "";
    document.getElementById("noResults").style.display = "none";

    document.getElementById("filterModal").classList.add("hidden");
  });

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();

    const searchSection = document.getElementById("searchResultsContainer");
    const noResults = document.getElementById("noResults");
    const searchTitle = searchSection.querySelector(".section-title");
    const searchResults = document.getElementById("searchResults");

    // If search is empty, reset to homepage and hide everything
    if (keyword === "") {
      document
        .querySelectorAll(".horizontal-section")
        .forEach((section) => (section.style.display = "block"));
      searchSection.classList.add("hidden");
      searchResults.innerHTML = "";
      searchTitle.style.display = "none";
      noResults.style.display = "none";
      return;
    }

    // Otherwise show the search section and filter results
    document
      .querySelectorAll(".horizontal-section")
      .forEach((section) => (section.style.display = "none"));
    searchSection.classList.remove("hidden");
    searchResults.innerHTML = "";

    const filtered = books.filter((b) => {
      return (
        b.Title.toLowerCase().includes(keyword) ||
        (b.Genre && b.Genre.toLowerCase().includes(keyword)) ||
        (b.Type && b.Type.toLowerCase().includes(keyword)) ||
        (b.Language && b.Language.toLowerCase().includes(keyword)) ||
        (b.Author && b.Author.toLowerCase().includes(keyword))
      );
    });

    if (filtered.length === 0) {
      searchTitle.style.display = "none";
      noResults.classList.add("show");
      noResults.style.display = "flex";
    } else {
      searchTitle.style.display = "block";
      noResults.classList.remove("show");
      noResults.style.display = "none";
      filtered.forEach((book) =>
        searchResults.appendChild(createSearchCard(book))
      );
    }
  });

  function renderBookSections() {
    console.log("Rendering books:", books)
    const popular = books.filter((b) => b.Type === "Book").slice(0, 10);
    const latestBooks = books.filter((b) => b.Type === "Book").slice(-10);
    const latestMagazines = books.filter((b) => b.Type === "Magazine");
    const latestPapers = books.filter((b) => b.Type === "Research Paper");

    document.getElementById("popularBooks").innerHTML = "";
    document.getElementById("latestBooks").innerHTML = "";
    document.getElementById("latestMagazines").innerHTML = "";
    document.getElementById("latestPapers").innerHTML = "";

    popular.forEach((book) =>
      document.getElementById("popularBooks").appendChild(createCard(book))
    );
    latestBooks.forEach((book) =>
      document.getElementById("latestBooks").appendChild(createCard(book))
    );
    latestMagazines.forEach((book) =>
      document.getElementById("latestMagazines").appendChild(createCard(book))
    );
    latestPapers.forEach((book) =>
      document.getElementById("latestPapers").appendChild(createCard(book))
    );
  }
  renderBookSections();             
});
