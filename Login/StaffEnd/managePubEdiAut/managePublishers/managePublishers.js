// editPublishers.js

// Sidebar toggle
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

let members1 = []; // 🔥 We'll fetch real members into here

async function loadPublisher() {
  try {
    const response = await fetch('http://localhost:8800/api/publishers'); // adjust if different
    if (!response.ok) throw new Error('Failed to fetch publishers');

    members1 = await response.json();
    renderTable();
  } catch (error) {
    console.error('Error loading publisher:', error);
  }
}

// Render the table
const tableBody = document.getElementById("publisherTableBody");
function renderTable() {
  tableBody.innerHTML = "";
  members1.forEach((member1, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member1.Publisher_ID}</td>
      <td>${member1.Name}</td>
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

loadPublisher();

// Edit Modal Logic
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
let currentEditIndex = null;

function openEditModal(index) {
  currentEditIndex = index;
  const publishers = members1[index]

  selectedPID = publishers.Publisher_ID
  document.getElementById("editPublisherId").value = publishers.Publisher_ID;
  document.getElementById("editPublisherName").value = publishers.Name;
  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  publishers = {
    Name: document.getElementById("editPublisherName").value
  };
  try {
    const response = await fetch(`http://localhost:8800/api/publishers/${selectedPID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(publishers)
    });

    if (!response.ok) throw new Error("Failed to update member");

    console.log("Member updated successfully!");

    editModal.classList.add("hidden");
    editModal.style.display = "none";
    loadPublisher();
  } catch (error) {
    console.error("Error updating member:", error);
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
  deletePrompt.textContent = `Do you want to delete publisher: ${members1[index].Name}?`;
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", async () => {
  const publisher = members1[currentDeleteIndex];
  const publisherId = encodeURIComponent(publisher.Publisher_ID); // 🔥 encode email

  try {
    const response = await fetch(`http://localhost:8800/api/publishers/${publisherId}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete publisher');

    console.log('publisher deleted successfully!');

    deleteModal.classList.add("hidden");
    deleteModal.style.display = "none";

    loadPublisher(); // 🔥 refresh table
  } catch (error) {
    console.error('Error deleting member:', error);
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