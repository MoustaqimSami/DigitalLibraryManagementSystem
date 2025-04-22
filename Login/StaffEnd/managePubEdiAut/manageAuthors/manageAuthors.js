// Sidebar toggle
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Sample author data
const authors = [
  { id: "AU001", name: "George Orwell", nationality: "British" },
  { id: "AU002", name: "Haruki Murakami", nationality: "Japanese" },
  { id: "AU003", name: "Chimamanda Ngozi Adichie", nationality: "Nigerian" },
];

const tableBody = document.getElementById("authorTableBody");

// Render the table
function renderAuthorTable() {
  tableBody.innerHTML = "";
  authors.forEach((author, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${author.id}</td>
      <td>${author.name}</td>
      <td>${author.nationality}</td>
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

renderAuthorTable();

// ==================== Edit Modal ====================
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
let currentEditIndex = null;

function openEditModal(index) {
  currentEditIndex = index;
  const author = authors[index];
  document.getElementById("editAuthorId").value = author.id;
  document.getElementById("editAuthorName").value = author.name;
  document.getElementById("editAuthorNationality").value = author.nationality;

  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  authors[currentEditIndex] = {
    id: document.getElementById("editAuthorId").value,
    name: document.getElementById("editAuthorName").value,
    nationality: document.getElementById("editAuthorNationality").value,
  };

  editModal.classList.add("hidden");
  editModal.style.display = "none";
  renderAuthorTable();

  // === BACKEND PATCH EXAMPLE ===
  /*
  fetch(`/api/authors/${authors[currentEditIndex].id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authors[currentEditIndex])
  }).then(res => res.json()).then(data => renderAuthorTable());
  */
});

// ==================== Delete Modal ====================
const deleteModal = document.getElementById("deleteModal");
const deletePrompt = document.getElementById("deletePrompt");
const deleteConfirmBtn = document.getElementById("confirmDelete");
const deleteCancelBtn = document.getElementById("cancelDelete");
let currentDeleteIndex = null;

function openDeleteModal(index) {
  currentDeleteIndex = index;
  const authorName = authors[index].name;
  deletePrompt.textContent = `Do you want to delete author: ${authorName}?`;
  deleteModal.classList.remove("hidden");
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", () => {
  authors.splice(currentDeleteIndex, 1);
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
  renderAuthorTable();

  // === BACKEND DELETE Example ===
  /*
  fetch(`/api/authors/${authorId}`, {
    method: "DELETE"
  }).then(res => {
    if (res.ok) {
      authors.splice(currentDeleteIndex, 1);
      renderAuthorTable();
    }
  });
  */
});
