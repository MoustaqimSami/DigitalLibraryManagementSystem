// Sidebar toggle
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Sample editor data
const editors = [
  { id: "ED001", name: "Harper Collins", specialization: "Legal Publishing" },
  { id: "ED002", name: "Pearson Press", specialization: "Academic Research" },
  { id: "ED003", name: "TechEdits", specialization: "Technology Journals" }
];

// Render the table
const tableBody = document.getElementById("editorTableBody");

function renderEditorTable() {
  tableBody.innerHTML = "";
  editors.forEach((editor, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${editor.id}</td>
      <td>${editor.name}</td>
      <td>${editor.specialization}</td>
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

renderEditorTable();

// ==================== Edit Modal ====================
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
let currentEditIndex = null;

function openEditModal(index) {
  currentEditIndex = index;
  const editor = editors[index];
  document.getElementById("editEditorId").value = editor.id;
  document.getElementById("editEditorName").value = editor.name;
  document.getElementById("editEditorSpec").value = editor.specialization;

  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  editors[currentEditIndex] = {
    id: document.getElementById("editEditorId").value,
    name: document.getElementById("editEditorName").value,
    specialization: document.getElementById("editEditorSpec").value
  };

  editModal.classList.add("hidden");
  editModal.style.display = "none";
  renderEditorTable();

  // === BACKEND PATCH Example ===
  /*
  fetch(`/api/editors/${editors[currentEditIndex].id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(editors[currentEditIndex])
  }).then(res => res.json()).then(data => renderEditorTable());
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
  const editorName = editors[index].name;
  deletePrompt.textContent = `Do you want to delete editor: ${editorName}?`;

  deleteModal.classList.remove("hidden");
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", () => {
  editors.splice(currentDeleteIndex, 1);
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
  renderEditorTable();

  // === BACKEND DELETE Example ===
  /*
  fetch(`/api/editors/${editorId}`, {
    method: "DELETE"
  }).then(res => {
    if (res.ok) {
      editors.splice(currentDeleteIndex, 1);
      renderEditorTable();
    }
  });
  */
});
