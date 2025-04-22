// editPublishers.js

// Sidebar toggle
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Mock publisher data
const publishers = [
  { id: "PUB001", name: "Pearson Education" },
  { id: "PUB002", name: "Penguin Random House" },
  { id: "PUB003", name: "Oxford University Press" }
];

const tableBody = document.getElementById("publisherTableBody");

function renderTable() {
  tableBody.innerHTML = "";
  publishers.forEach((publisher, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${publisher.id}</td>
      <td>${publisher.name}</td>
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

renderTable();

// Edit Modal Logic
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
let currentEditIndex = null;

function openEditModal(index) {
  currentEditIndex = index;
  document.getElementById("editPublisherId").value = publishers[index].id;
  document.getElementById("editPublisherName").value = publishers[index].name;
  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  publishers[currentEditIndex] = {
    id: document.getElementById("editPublisherId").value,
    name: document.getElementById("editPublisherName").value
  };
  editModal.classList.add("hidden");
  editModal.style.display = "none";
  renderTable();

  // === BACKEND PATCH EXAMPLE ===
  /*
  fetch(`/api/publishers/${publishers[currentEditIndex].id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(publishers[currentEditIndex])
  }).then(res => res.json())
    .then(data => {
      renderTable();
    });
  */
});

// Delete Modal Logic
const deleteModal = document.getElementById("deleteModal");
const deletePrompt = document.getElementById("deletePrompt");
const deleteConfirmBtn = document.getElementById("confirmDelete");
const deleteCancelBtn = document.getElementById("cancelDelete");
let currentDeleteIndex = null;

function openDeleteModal(index) {
  currentDeleteIndex = index;
  deletePrompt.textContent = `Do you want to delete publisher: ${publishers[index].name}?`;
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", () => {
  publishers.splice(currentDeleteIndex, 1);
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
  renderTable();

  // === BACKEND DELETE EXAMPLE ===
  /*
  fetch(`/api/publishers/${publisherId}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.ok) {
      publishers.splice(index, 1);
      renderTable();
    }
  });
  */
});