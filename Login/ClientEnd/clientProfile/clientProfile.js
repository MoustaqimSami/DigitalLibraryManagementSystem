// === Fake Member Database ===
const member = {
    Fname: "Tasnim",
    MInit: "H.",
    Lname: "Hossain",
    Email: "tasnimhp9@gmail.com",
    Phone_No: "+1 234 567 8901",
    Start_Date: "March 1, 2023",
    Expiration_Date: "March 1, 2026"
  };
  
  window.addEventListener("DOMContentLoaded", () => {
    // === Populate Profile Info ===
    document.getElementById("memberName").textContent = `${member.Fname} ${member.MInit} ${member.Lname}`;
    document.getElementById("memberEmail").textContent = member.Email;
    document.getElementById("memberPhone").textContent = member.Phone_No;
    document.getElementById("memberStartDate").textContent = member.Start_Date;
    document.getElementById("memberEndDate").textContent = member.Expiration_Date;
  
    // === Sidebar Toggle ===
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.querySelector(".sidebar");
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  
    // === Modal Open Buttons
    document.getElementById("editBtn").addEventListener("click", () => {
      document.getElementById("editModal").classList.remove("hidden");
    });
    document.getElementById("passwordBtn").addEventListener("click", () => {
      document.getElementById("passwordModal").classList.remove("hidden");
    });
    document.getElementById("deleteBtn").addEventListener("click", () => {
      document.getElementById("deleteModal").classList.remove("hidden");
    });
  
    // === Close Buttons
    document.querySelectorAll(".close-modal-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest(".modal").classList.add("hidden");
      });
    });
  
    // === Form Submissions
    document.getElementById("editProfileForm").addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Profile updated successfully!");
      closeModal("editModal");
    });
  
    document.getElementById("changePasswordForm").addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Password changed successfully!");
      closeModal("passwordModal");
    });
  
    document.getElementById("closeReceiptModal").addEventListener("click", () => {
      document.getElementById("borrowReceiptModal").classList.add("hidden");
    });
  });
  
  // === Global Functions for Inline Onclicks ===
  window.closeModal = function (id) {
    document.getElementById(id).classList.add("hidden");
  };
  
  window.confirmDelete = function () {
    alert("Your account has been deleted."); // replace with real logic
    closeModal("deleteModal");
  };
  