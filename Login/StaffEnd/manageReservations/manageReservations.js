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
let members1 = []; // 🔥 We'll fetch real members into here

async function loadReservations() {
  try {
    const response = await fetch('http://localhost:8800/api/reservations'); // adjust if different
    if (!response.ok) throw new Error('Failed to fetch reservation');

    members1 = await response.json();
    renderTable();
  } catch (error) {
    console.error('Error loading reservation:', error);
  }
}

// Render the table
const tableBody = document.getElementById("reservationTableBody");
function renderTable() {
  tableBody.innerHTML = "";
  members1.forEach((member1, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member1.Reservation_no}</td>
      <td>${member1.Member_Email}</td>
      <td>${member1.ItemID}</td>
      <td>${member1.Status}</td>
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

loadReservations();


// Edit Modal Logic
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
let currentEditIndex = null;

function openEditModal(index) {
  currentEditIndex = index;
  const reservations = members1[index]

  selectedRID = reservations.Reservation_no
  document.getElementById("editReservationNo").value = reservations.Reservation_no;
  document.getElementById("editMemberEmail").value = reservations.Member_Email;
  document.getElementById("editItemId").value = reservations.ItemID;
  document.getElementById("editStatus").value = reservations.Status;

  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  reservationsSQL = {
    Member_Email: document.getElementById("editMemberEmail").value,
    ItemID: document.getElementById("editItemId").value,
    Status: document.getElementById("editStatus").value
  };
  try {
    const response = await fetch(`http://localhost:8800/api/reservations/${selectedRID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(reservationsSQL)
    });

    if (!response.ok) throw new Error("Failed to update reservation");

    console.log("reservation updated successfully!");

    editModal.classList.add("hidden");
    editModal.style.display = "none";
    loadReservations();
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
  deletePrompt.textContent = `Do you want to resolve reservation: ${members1[index].Reservation_no}?`;
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", async () => {
  const reservation = members1[currentDeleteIndex];
  const reservationID = encodeURIComponent(reservation.Reservation_no); // 🔥 encode email

  try {
    const response = await fetch(`http://localhost:8800/api/reservations/${reservationID}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete reservation');

    console.log('reservation deleted successfully!');

    deleteModal.classList.add("hidden");
    deleteModal.style.display = "none";

    loadReservations(); // 🔥 refresh table
  } catch (error) {
    console.error('Error deleting reservation:', error);
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