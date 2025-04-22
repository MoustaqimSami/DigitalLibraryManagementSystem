// Sidebar toggle
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Mock reservation data
const reservations = [
  {
    reservation_no: "R001",
    member_email: "john.doe@example.com",
    itemId: "B102",
    status: "Pending",
  },
  {
    reservation_no: "R002",
    member_email: "jane.smith@example.com",
    itemId: "B205",
    status: "Confirmed",
  },
  {
    reservation_no: "R003",
    member_email: "emma.johnson@example.com",
    itemId: "B303",
    status: "Cancelled",
  },
];

// Render table
const tableBody = document.getElementById("reservationTableBody");

function renderTable() {
  tableBody.innerHTML = "";
  reservations.forEach((res, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${res.reservation_no}</td>
      <td>${res.member_email}</td>
      <td>${res.itemId}</td>
      <td>${res.status}</td>
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
  const res = reservations[index];
  document.getElementById("editReservationNo").value = res.reservation_no;
  document.getElementById("editMemberEmail").value = res.member_email;
  document.getElementById("editItemId").value = res.itemId;
  document.getElementById("editStatus").value = res.status;

  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  reservations[currentEditIndex] = {
    reservation_no: document.getElementById("editReservationNo").value,
    member_email: document.getElementById("editMemberEmail").value,
    itemId: document.getElementById("editItemId").value,
    status: document.getElementById("editStatus").value,
  };

  editModal.classList.add("hidden");
  editModal.style.display = "none";
  renderTable();

  // Example for backend PATCH
  /*
  fetch(`/api/reservations/${reservations[currentEditIndex].reservation_no}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservations[currentEditIndex]),
  }).then(res => res.json()).then(data => renderTable());
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
  const reservationNumber = reservations[index].reservation_no;
  deletePrompt.textContent = `Do you want to delete reservation: ${reservationNumber}?`;
  deleteModal.classList.remove("hidden");
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", () => {
  reservations.splice(currentDeleteIndex, 1);
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
  renderTable();

  // Example for backend DELETE
  /*
  fetch(`/api/reservations/${reservation_no}`, {
    method: "DELETE"
  }).then(res => {
    if (res.ok) {
      reservations.splice(currentDeleteIndex, 1);
      renderTable();
    }
  });
  */
});
