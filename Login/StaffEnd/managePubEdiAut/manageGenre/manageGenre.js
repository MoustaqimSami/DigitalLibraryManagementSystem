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

// Render the genre table
const genreTableBody = document.getElementById("genreTableBody");

function renderGenreTable() {
  genreTableBody.innerHTML = "";
  genres.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.authorId}</td>
      <td>${item.genre}</td>
      <td>
        <div class="action-buttons">
          <button class="edit-btn" onclick="openEditModal(${index})"><i class='bx bx-pencil'></i></button>
          <button class="delete-btn" onclick="openDeleteModal(${index})"><i class='bx bx-trash'></i></button>
        </div>
      </td>
    `;
    genreTableBody.appendChild(row);
  });
}

renderGenreTable();

// Edit modal logic
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
let currentEditIndex = null;

function openEditModal(index) {
  currentEditIndex = index;
  const genre = genres[index];
  document.getElementById("editAuthorId").value = genre.authorId;
  document.getElementById("editGenre").value = genre.genre;

  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  genres[currentEditIndex] = {
    authorId: document.getElementById("editAuthorId").value,
    genre: document.getElementById("editGenre").value
  };

  editModal.classList.add("hidden");
  editModal.style.display = "none";
  renderGenreTable();
});

// Delete modal logic
const deleteModal = document.getElementById("deleteModal");
const deletePrompt = document.getElementById("deletePrompt");
const deleteConfirmBtn = document.getElementById("confirmDelete");
const deleteCancelBtn = document.getElementById("cancelDelete");
let currentDeleteIndex = null;

function openDeleteModal(index) {
  currentDeleteIndex = index;
  deletePrompt.textContent = `Do you want to delete genre entry for Author ID: ${genres[index].authorId}?`;
  deleteModal.classList.remove("hidden");
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", () => {
  genres.splice(currentDeleteIndex, 1);
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
  renderGenreTable();
});
