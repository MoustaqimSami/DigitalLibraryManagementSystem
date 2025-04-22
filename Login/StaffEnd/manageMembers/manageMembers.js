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

// Render the table
const tableBody = document.getElementById("memberTableBody");
function renderTable() {
  tableBody.innerHTML = "";
  members.forEach((member, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member.email}</td>
      <td>${member.fname}</td>
      <td>${member.minit}</td>
      <td>${member.lname}</td>
      <td>${member.phone}</td>
      <td>${member.start}</td>
      <td>${member.expiration}</td>
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

// Edit modal logic
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
let currentEditIndex = null;

function openEditModal(index) {
  currentEditIndex = index;
  const member = members[index];
  document.getElementById("editEmail").value = member.email;
  document.getElementById("editFname").value = member.fname;
  document.getElementById("editMinit").value = member.minit;
  document.getElementById("editLname").value = member.lname;
  document.getElementById("editPhone").value = member.phone;
  document.getElementById("editStart").value = member.start;
  document.getElementById("editExpiration").value = member.expiration;
  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  members[currentEditIndex] = {
    email: document.getElementById("editEmail").value,
    fname: document.getElementById("editFname").value,
    minit: document.getElementById("editMinit").value,
    lname: document.getElementById("editLname").value,
    phone: document.getElementById("editPhone").value,
    start: document.getElementById("editStart").value,
    expiration: document.getElementById("editExpiration").value,
  };

  editModal.classList.add("hidden");
  editModal.style.display = "none";
  renderTable();

  // === BACKEND PATCH EXAMPLE ===
  /*
  fetch(`/api/members/${members[currentEditIndex].email}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(members[currentEditIndex])
  }).then(res => res.json())
    .then(data => {
      renderTable();
    });
  */
});

// Delete modal logic
const deleteModal = document.getElementById("deleteModal");
const deletePrompt = document.getElementById("deletePrompt");
const deleteConfirmBtn = document.getElementById("confirmDelete");
const deleteCancelBtn = document.getElementById("cancelDelete");
let currentDeleteIndex = null;

function openDeleteModal(index) {
  currentDeleteIndex = index;
  const fullName = members[index].fname + " " + members[index].lname;
  deletePrompt.textContent = `Do you want to delete member: ${fullName}?`;
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", () => {
  members.splice(currentDeleteIndex, 1);
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
  renderTable();

  // === BACKEND DELETE EXAMPLE ===
  /*
  fetch(`/api/members/${memberId}`, {
    method: 'DELETE'
  }).then(res => {
    if (res.ok) {
      members.splice(index, 1);
      renderTable();
    }
  });
  */
});
