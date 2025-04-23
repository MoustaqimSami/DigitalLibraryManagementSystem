// manageMembers.js

// Sidebar toggle
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Mock member data
const members = [
  {
    email: "alexander.bryant@example.com",
    fname: "Alexander",
    minit: "B",
    lname: "Bryant",
    phone: "2025551020",
    start: "2025-03-10",
    expiration: "2026-03-10",
  },
  {
    email: "amelia.jenkins@example.com",
    fname: "Amelia",
    minit: "N",
    lname: "Jenkins",
    phone: "2025551013",
    start: "2024-10-30",
    expiration: "2025-10-30",
  },
  {
    email: "ashley.hall@example.com",
    fname: "Ashley",
    minit: "E",
    lname: "Hall",
    phone: "1553546578",
    start: "2025-04-10",
    expiration: "2026-04-10",
  },
  {
    email: "alexander.bryant@example.com",
    fname: "Alexander",
    minit: "B",
    lname: "Bryant",
    phone: "2025551020",
    start: "2025-03-10",
    expiration: "2026-03-10",
  },
  {
    email: "amelia.jenkins@example.com",
    fname: "Amelia",
    minit: "N",
    lname: "Jenkins",
    phone: "2025551013",
    start: "2024-10-30",
    expiration: "2025-10-30",
  },
  {
    email: "ashley.hall@example.com",
    fname: "Ashley",
    minit: "E",
    lname: "Hall",
    phone: "1553546578",
    start: "2025-04-10",
    expiration: "2026-04-10",
  },
  {
    email: "alexander.bryant@example.com",
    fname: "Alexander",
    minit: "B",
    lname: "Bryant",
    phone: "2025551020",
    start: "2025-03-10",
    expiration: "2026-03-10",
  },
  {
    email: "amelia.jenkins@example.com",
    fname: "Amelia",
    minit: "N",
    lname: "Jenkins",
    phone: "2025551013",
    start: "2024-10-30",
    expiration: "2025-10-30",
  },
  {
    email: "ashley.hall@example.com",
    fname: "Ashley",
    minit: "E",
    lname: "Hall",
    phone: "1553546578",
    start: "2025-04-10",
    expiration: "2026-04-10",
  },
  {
    email: "alexander.bryant@example.com",
    fname: "Alexander",
    minit: "B",
    lname: "Bryant",
    phone: "2025551020",
    start: "2025-03-10",
    expiration: "2026-03-10",
  },
  {
    email: "amelia.jenkins@example.com",
    fname: "Amelia",
    minit: "N",
    lname: "Jenkins",
    phone: "2025551013",
    start: "2024-10-30",
    expiration: "2025-10-30",
  },
  {
    email: "ashley.hall@example.com",
    fname: "Ashley",
    minit: "E",
    lname: "Hall",
    phone: "1553546578",
    start: "2025-04-10",
    expiration: "2026-04-10",
  },
  {
    email: "alexander.bryant@example.com",
    fname: "Alexander",
    minit: "B",
    lname: "Bryant",
    phone: "2025551020",
    start: "2025-03-10",
    expiration: "2026-03-10",
  },
  {
    email: "amelia.jenkins@example.com",
    fname: "Amelia",
    minit: "N",
    lname: "Jenkins",
    phone: "2025551013",
    start: "2024-10-30",
    expiration: "2025-10-30",
  },
  {
    email: "ashley.hall@example.com",
    fname: "Ashley",
    minit: "E",
    lname: "Hall",
    phone: "1553546578",
    start: "2025-04-10",
    expiration: "2026-04-10",
  },
  {
    email: "alexander.bryant@example.com",
    fname: "Alexander",
    minit: "B",
    lname: "Bryant",
    phone: "2025551020",
    start: "2025-03-10",
    expiration: "2026-03-10",
  },
  {
    email: "amelia.jenkins@example.com",
    fname: "Amelia",
    minit: "N",
    lname: "Jenkins",
    phone: "2025551013",
    start: "2024-10-30",
    expiration: "2025-10-30",
  },
  {
    email: "ashley.hall@example.com",
    fname: "Ashley",
    minit: "E",
    lname: "Hall",
    phone: "1553546578",
    start: "2025-04-10",
    expiration: "2026-04-10",
  },
  {
    email: "alexander.bryant@example.com",
    fname: "Alexander",
    minit: "B",
    lname: "Bryant",
    phone: "2025551020",
    start: "2025-03-10",
    expiration: "2026-03-10",
  },
  {
    email: "amelia.jenkins@example.com",
    fname: "Amelia",
    minit: "N",
    lname: "Jenkins",
    phone: "2025551013",
    start: "2024-10-30",
    expiration: "2025-10-30",
  },
  {
    email: "ashley.hall@example.com",
    fname: "Ashley",
    minit: "E",
    lname: "Hall",
    phone: "1553546578",
    start: "2025-04-10",
    expiration: "2026-04-10",
  },
];

let members1 = []; // 🔥 We'll fetch real members into here

async function loadMembers() {
  try {
    const response = await fetch('http://localhost:8800/api/members'); // adjust if different
    if (!response.ok) throw new Error('Failed to fetch members');

    members1 = await response.json();
    renderTable();
  } catch (error) {
    console.error('Error loading members:', error);
  }
}

// Render the table
const tableBody = document.getElementById("memberTableBody");
function renderTable() {
  tableBody.innerHTML = "";
  members1.forEach((member1, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member1.Email}</td>
      <td>${member1.Fname}</td>
      <td>${member1.Minit}</td>
      <td>${member1.Lname}</td>
      <td>${member1.Phone}</td>
      <td>${member1.Start_Date}</td>
      <td>${member1.Expiration_Date}</td>
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

loadMembers();

// Edit modal logic
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");

let currentEditIndex = null;
let selectedEmail = null; // 🔥 Save separately

function openEditModal(index) {
  currentEditIndex = index;
  const member = members1[index];

  selectedEmail = member.Email; // 🔥 Save the email to know who we are patching

  document.getElementById("editEmail").value = member.Email;
  document.getElementById("editFname").value = member.Fname || "";
  document.getElementById("editMinit").value = member.Minit || "";
  document.getElementById("editLname").value = member.Lname || "";
  document.getElementById("editPhone").value = member.Phone || "";
  document.getElementById("editStart").value = member.StartDate ? member.StartDate.substring(0, 10) : "";
  document.getElementById("editExpiration").value = member.ExpirationDate ? member.ExpirationDate.substring(0, 10) : "";

  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedMember = {
    Fname: document.getElementById("editFname").value,
    Minit: document.getElementById("editMinit").value,
    Lname: document.getElementById("editLname").value,
    Phone: document.getElementById("editPhone").value,
    StartDate: document.getElementById("editStart").value,
    ExpirationDate: document.getElementById("editExpiration").value,
  };

  try {
    const response = await fetch(`http://localhost:8800/api/members/${selectedEmail}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedMember)
    });

    if (!response.ok) throw new Error("Failed to update member");

    console.log("Member updated successfully!");

    editModal.classList.add("hidden");
    editModal.style.display = "none";

    loadMembers(); // 🔥 reload fresh data
  } catch (error) {
    console.error("Error updating member:", error);
  }
});

const deleteModal = document.getElementById("deleteModal");
const deletePrompt = document.getElementById("deletePrompt");
const deleteConfirmBtn = document.getElementById("confirmDelete");
const deleteCancelBtn = document.getElementById("cancelDelete");
let currentDeleteIndex = null;

function openDeleteModal(index) {
  currentDeleteIndex = index;
  const fullName = members1[index].Fname + " " + members1[index].Lname; // 🔥 fixed capitalization
  deletePrompt.textContent = `Do you want to delete member: ${fullName}?`;
  deleteModal.style.display = "flex";
}

// Cancel delete
deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

// Confirm delete
deleteConfirmBtn.addEventListener("click", async () => {
  const member = members1[currentDeleteIndex];
  const encodedEmail = encodeURIComponent(member.Email); // 🔥 encode email

  try {
    const response = await fetch(`http://localhost:8800/api/members/${encodedEmail}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete member');

    console.log('Member deleted successfully!');

    deleteModal.classList.add("hidden");
    deleteModal.style.display = "none";

    loadMembers(); // 🔥 refresh table
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