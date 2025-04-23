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

let members1 = []; // 🔥 We'll fetch real members into here

async function loadEditor() {
  try {
    const response = await fetch('http://localhost:8800/api/editors'); // adjust if different
    if (!response.ok) throw new Error('Failed to fetch editors');

    members1 = await response.json();
    renderTable();
  } catch (error) {
    console.error('Error loading publisher:', error);
  }
}

// Render the table
const tableBody = document.getElementById("editorTableBody");
function renderTable() {
  tableBody.innerHTML = "";
  members1.forEach((member1, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member1.Editor_ID}</td>
      <td>${member1.Name}</td>
      <td>${member1.Specialization}</td>
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

loadEditor();

// Edit Modal Logic
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
let currentEditIndex = null;

function openEditModal(index) {
  currentEditIndex = index;
  const editors = members1[index]
  selectedEID = editors.Editor_ID;
  document.getElementById("editEditorId").value = editors.Editor_ID;
  document.getElementById("editEditorName").value = editors.Name;
  document.getElementById("editEditorSpec").value = editors.Specialization;
  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  editorsSQL = {
    Name: document.getElementById("editEditorName").value,
    Specialization: document.getElementById("editEditorSpec").value
  };
  try {
    const response = await fetch(`http://localhost:8800/api/editors/${selectedEID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editorsSQL)
    });

    if (!response.ok) throw new Error("Failed to update editor");

    console.log("Editor updated successfully!");

    editModal.classList.add("hidden");
    editModal.style.display = "none";
    loadEditor();
  } catch (error) {
    console.error("Error updating editor:", error);
  }
});

const deleteModal = document.getElementById("deleteModal");
const deletePrompt = document.getElementById("deletePrompt");
const deleteConfirmBtn = document.getElementById("confirmDelete");
const deleteCancelBtn = document.getElementById("cancelDelete");
let currentDeleteIndex = null;

function openDeleteModal(index) {
  currentDeleteIndex = index;
  deletePrompt.textContent = `Do you want to delete editor: ${members1[index].Name}?`;
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", async () => {
  const editors = members1[currentDeleteIndex];
  const editorID = encodeURIComponent(editors.Editor_ID); // 🔥 encode email

  try {
    const response = await fetch(`http://localhost:8800/api/editors/${editorID}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete editor');

    console.log('editor deleted successfully!');

    deleteModal.classList.add("hidden");
    deleteModal.style.display = "none";

    loadEditor(); // 🔥 refresh table
  } catch (error) {
    console.error('Error deleting editor:', error);
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