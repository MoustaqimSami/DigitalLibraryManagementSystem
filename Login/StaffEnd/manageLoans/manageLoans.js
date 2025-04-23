// Sidebar toggle
const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

// Sample data for demonstration
const loans = [
  {
    loanId: "LN001",
    itemId: "BK102",
    email: "john.doe@example.com",
    status: "Overdue",
    loanDate: "2024-12-01",
    dueDate: "2024-12-10",
    fine: "$5.00"
  },
  {
    loanId: "LN002",
    itemId: "MG215",
    email: "jane.smith@example.com",
    status: "Returned",
    loanDate: "2025-01-15",
    dueDate: "2025-01-25",
    fine: "$0.00"
  }
];

// Render table
let members1 = []; // 🔥 We'll fetch real members into here

async function loadLoans() {
  try {
    const response = await fetch('http://localhost:8800/api/loans'); // adjust if different
    if (!response.ok) throw new Error('Failed to fetch loans');

    members1 = await response.json();
    renderTable();
  } catch (error) {
    console.error('Error loading loan:', error);
  }
}

// Render the table
const tableBody = document.getElementById("loanTableBody");
function renderTable() {
  tableBody.innerHTML = "";
  members1.forEach((member1, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${member1.LoanID}</td>
      <td>${member1.Library_Item_ID}</td>
      <td>${member1.Client_Email}</td>
      <td>${member1.LoanStatus}</td>
      <td>${member1.LoanDate}</td>
      <td>${member1.DueDate}</td>
      <td>${member1.CurrentFine}</td>

      <td>
        <div class="action-buttons">
          <button class="edit-btn" onclick="openEditModal(${index})"><i class='bx bx-pencil'></i></button>
          <button class="delete-btn" onclick="openDeleteModal(${index})"><i class='bx bx-trash'></i></button>
          <button class="edit-btn" onclick="openEmailModal('${members1.Client_Email}')"><i class='bx bx-envelope'></i></button>

        </div>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

loadLoans();


// Edit Modal Logic
const editModal = document.getElementById("editModal");
const editForm = document.getElementById("editForm");
let currentEditIndex = null;

function openEditModal(index) {
  currentEditIndex = index;
  const loans = members1[index]

  selectedLID = loans.LoanID
  document.getElementById("editLoanId").value = loans.LoanID;
  document.getElementById("editItemId").value = loans.Library_Item_ID;
  document.getElementById("editEmail").value = loans.Client_Email;
  document.getElementById("editStatus").value = loans.LoanStatus;
  document.getElementById("editLoanDate").value = loans.LoanDate;
  document.getElementById("editDueDate").value = loans.DueDate;
  document.getElementById("editFine").value = loans.CurrentFine;

  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loansSQL = {
    Library_Item_ID: document.getElementById("editItemId").value,
    Client_Email: document.getElementById("editEmail").value,
    LoanStatus: document.getElementById("editStatus").value,
    LoanDate: document.getElementById("editLoanDate").value,
    DueDate: document.getElementById("editDueDate").value,
    CurrentFine: document.getElementById("editFine").value
  };
  try {
    const response = await fetch(`http://localhost:8800/api/loans/${selectedLID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loansSQL)
    });

    if (!response.ok) throw new Error("Failed to update loan");

    console.log("loan updated successfully!");

    editModal.classList.add("hidden");
    editModal.style.display = "none";
    loadLoans();
  } catch (error) {
    console.error("Error updating loan:", error);
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
  deletePrompt.textContent = `Do you want to resolve loans: ${members1[index].LoanID}?`;
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", async () => {
  const loans = members1[currentDeleteIndex];
  const loanID = encodeURIComponent(loans.LoanID); // 🔥 encode email

  try {
    const response = await fetch(`http://localhost:8800/api/loans/${loanID}`, {
      method: 'DELETE'
    });

    if (!response.ok) throw new Error('Failed to delete loan');

    console.log('loan deleted successfully!');

    deleteModal.classList.add("hidden");
    deleteModal.style.display = "none";

    loadLoans(); // 🔥 refresh table
  } catch (error) {
    console.error('Error deleting loan:', error);
  }
});

// Email Modal Logic
const emailModal = document.getElementById("emailModal");
const sendEmailBtn = document.getElementById("sendEmail");
const cancelEmailBtn = document.getElementById("cancelEmail");

function openEmailModal(email) {
  emailModal.classList.remove("hidden");
  emailModal.style.display = "flex";
  sendEmailBtn.onclick = () => {
    alert(`This feature will be available soon for ${email}`);
    emailModal.classList.add("hidden");
    emailModal.style.display = "none";
  };
}

cancelEmailBtn.addEventListener("click", () => {
  emailModal.classList.add("hidden");
  emailModal.style.display = "none";
});