// Sidebar toggle
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Mock genre data
const genres = [
  { authorId: "A001", genre: "Science Fiction" },
  { authorId: "A002", genre: "Mystery" },
  { authorId: "A003", genre: "Historical Fiction" }
];

let members1 = []; // 🔥 We'll fetch real members into here

async function loadGenre() {
  try {
    const response = await fetch('http://localhost:8800/api/authorsGenre'); // adjust if different
    if (!response.ok) throw new Error('Failed to fetch genres');

    members1 = await response.json();
    renderTable();
  } catch (error) {
    console.error('Error loading genres:', error);
  }
}

// Render the table
const tableBody = document.getElementById("genreTableBody");
function renderTable() {
  tableBody.innerHTML = "";
  members1.forEach((member1, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member1.Author_ID}</td>
      <td>${member1.Genre}</td>
      <td>
        <div class="action-buttons">
          <button class="edit-btn" onclick="openEditModal(${index})"><i class='bx bx-pencil'></i></button>
          <button class="delete-btn" onclick="openDeleteModal(${index})"><i class='bx bx-trash'></i></button>
        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

loadGenre();

// Edit Modal Logic
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
let currentEditIndex = null;

function openEditModal(index) {
  currentEditIndex = index;
  const genres = members1[index]
  genresEID = genres.Author_ID;
  document.getElementById("editAuthorId").value = genres.Author_ID;
  document.getElementById("editGenre").value = genres.Genre;
  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  genresSQL = {
    Genre: document.getElementById("editGenre").value,
  };
  try {
    const response = await fetch(`http://localhost:8800/api/authorsGenre/${genresEID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(genresSQL)
    });

    if (!response.ok) throw new Error("Failed to update genres");

    console.log("Genre updated successfully!");

    editModal.classList.add("hidden");
    editModal.style.display = "none";
    loadGenre();
  } catch (error) {
    console.error("Error updating genre:", error);
  }
});

const deleteModal = document.getElementById("deleteModal");
const deletePrompt = document.getElementById("deletePrompt");
const deleteConfirmBtn = document.getElementById("confirmDelete");
const deleteCancelBtn = document.getElementById("cancelDelete");
let currentDeleteIndex = null;

function openDeleteModal(index) {
  currentDeleteIndex = index;
  deletePrompt.textContent = `Do you want to delete genre: ${members1[index].Genre}?`;
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", async () => {
  const genres = members1[currentDeleteIndex];
  const genreID = encodeURIComponent(genres.Author_ID); // 🔥 encode email

  genresSQL = {
    Genre: genres.Genre,
  };


  try {
    const response = await fetch(`http://localhost:8800/api/authorGenres/${genreID}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(genresSQL)
    });

    if (!response.ok) throw new Error('Failed to delete genre');

    console.log('Genre deleted successfully!');

    deleteModal.classList.add("hidden");
    deleteModal.style.display = "none";

    loadGenre(); // 🔥 refresh table
  } catch (error) {
    console.error('Error deleting genre:', error);
  }
});

window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/session-info', {
      method: 'GET',
      credentials: 'include' 
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Session info:', data);

      const initials = data.username.slice(0, 2).toUpperCase();

      const initialsElement = document.getElementById('initials');
      const welcomeMessage = document.getElementById('welcomeMessage')
      if (initialsElement) {
        initialsElement.textContent = initials;
        welcomeMessage.textContent = "Welcome " + data.username + ", how are you doing today?"
      }

    } else {
      console.log('Not logged in');
      window.location.href = '/'; // Redirect to login if no session
    }
  } catch (err) {
    console.error('Error fetching session info:', err);
  }
});
