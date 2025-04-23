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

let members1 = []; // 🔥 We'll fetch real members into here

async function loadAuthor() {
  try {
    const response = await fetch('http://localhost:8800/api/authors'); // adjust if different
    if (!response.ok) throw new Error('Failed to fetch authors');

    members1 = await response.json();
    renderTable();
  } catch (error) {
    console.error('Error loading publisher:', error);
  }
}

// Render the table
const tableBody = document.getElementById("authorTableBody");
function renderTable() {
  tableBody.innerHTML = "";
  members1.forEach((member1, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member1.Author_ID}</td>
      <td>${member1.Name}</td>
      <td>${member1.Nationaility}</td>
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

loadAuthor();

// Edit Modal Logic
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
let currentEditIndex = null;

function openEditModal(index) {
  currentEditIndex = index;
  const authors = members1[index]
  selectedAID = authors.Author_ID;
  document.getElementById("editAuthorId").value = authors.Author_ID;
  document.getElementById("editAuthorName").value = authors.Name;
  document.getElementById("editAuthorNationality").value = authors.Nationaility;
  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  authorsSQL = {
    Name: document.getElementById("editAuthorName").value,
    Nationaility: document.getElementById("editAuthorNationality").value
  };
  try {
    const response = await fetch(`http://localhost:8800/api/authors/${selectedAID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(authorsSQL)
    });

    if (!response.ok) throw new Error("Failed to update author");

    console.log("Author updated successfully!");

    editModal.classList.add("hidden");
    editModal.style.display = "none";
    loadAuthor();
  } catch (error) {
    console.error("Error updating author:", error);
  }
});

// Delete Modal Logic
const deleteModal = document.getElementById("deleteModal");
const deletePrompt = document.getElementById("deletePrompt");
const deleteConfirmBtn = document.getElementById("confirmDelete");
const deleteCancelBtn = document.getElementById("cancelDelete");
let currentDeleteIndex = null;

function openDeleteModal(index) {
  currentDeleteIndex = index;
  deletePrompt.textContent = `Do you want to delete author: ${members1[index].Name}?`;
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", async () => {
  const authors = members1[currentDeleteIndex];
  const authorsID = encodeURIComponent(authors.Author_ID); // 🔥 encode email

  try {
    const response = await fetch(`http://localhost:8800/api/authors/${authorsID}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete author');

    console.log('Author deleted successfully!');

    deleteModal.classList.add("hidden");
    deleteModal.style.display = "none";

    loadAuthor(); // 🔥 refresh table
  } catch (error) {
    console.error('Error deleting author:', error);
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