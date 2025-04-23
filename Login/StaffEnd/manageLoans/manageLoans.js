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

const tableBody = document.getElementById("loanTableBody");

// Render table rows
function renderTable() {
  tableBody.innerHTML = "";
  loans.forEach((loan, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${loan.loanId}</td>
      <td>${loan.itemId}</td>
      <td>${loan.email}</td>
      <td>${loan.status}</td>
      <td>${loan.loanDate}</td>
      <td>${loan.dueDate}</td>
      <td>${loan.fine}</td>
      <td>
        <div class="action-buttons">
          <button class="edit-btn" onclick="openEditModal(${index})"><i class='bx bx-pencil'></i></button>
          <button class="delete-btn" onclick="openDeleteModal(${index})"><i class='bx bx-trash'></i></button>
          <button class="edit-btn" onclick="openEmailModal('${loan.email}')"><i class='bx bx-envelope'></i></button>
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
  const loan = loans[index];

  document.getElementById("editLoanId").value = loan.loanId;
  document.getElementById("editItemId").value = loan.itemId;
  document.getElementById("editEmail").value = loan.email;
  document.getElementById("editStatus").value = loan.status;
  document.getElementById("editLoanDate").value = loan.loanDate;
  document.getElementById("editDueDate").value = loan.dueDate;
  document.getElementById("editFine").value = loan.fine;

  editModal.classList.remove("hidden");
  editModal.style.display = "flex";
}

document.getElementById("cancelEdit").addEventListener("click", () => {
  editModal.classList.add("hidden");
  editModal.style.display = "none";
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  loans[currentEditIndex] = {
    loanId: document.getElementById("editLoanId").value,
    itemId: document.getElementById("editItemId").value,
    email: document.getElementById("editEmail").value,
    status: document.getElementById("editStatus").value,
    loanDate: document.getElementById("editLoanDate").value,
    dueDate: document.getElementById("editDueDate").value,
    fine: document.getElementById("editFine").value
  };

  editModal.classList.add("hidden");
  editModal.style.display = "none";
  renderTable();
});

// Delete Modal Logic
const deleteModal = document.getElementById("deleteModal");
const deletePrompt = document.getElementById("deletePrompt");
const deleteConfirmBtn = document.getElementById("confirmDelete");
const deleteCancelBtn = document.getElementById("cancelDelete");
let currentDeleteIndex = null;

function openDeleteModal(index) {
  currentDeleteIndex = index;
  deletePrompt.textContent = `Do you want to delete Loan ID: ${loans[index].loanId}?`;
  deleteModal.classList.remove("hidden");
  deleteModal.style.display = "flex";
}

deleteCancelBtn.addEventListener("click", () => {
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
});

deleteConfirmBtn.addEventListener("click", () => {
  loans.splice(currentDeleteIndex, 1);
  deleteModal.classList.add("hidden");
  deleteModal.style.display = "none";
  renderTable();
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
