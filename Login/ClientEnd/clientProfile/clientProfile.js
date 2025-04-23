// === Fake Member Database ===
let member = {
    Fname: "Tasnim",
    MInit: "H.",
    Lname: "Hossain",
    Email: "tasnimhp9@gmail.com",
    Phone_No: "+1 234 567 8901",
    Start_Date: "March 1, 2023",
    Expiration_Date: "March 1, 2026",
    Password: "oldpassword123" // for demonstration only
  };
  
  // === Populate Profile Info ===
  window.addEventListener("DOMContentLoaded", () => {
    populateProfile();
  
    // Modal Toggle Buttons
    document.getElementById("editBtn").onclick = () =>
      document.getElementById("editModal").classList.remove("hidden");
  
    document.getElementById("passwordBtn").onclick = () =>
      document.getElementById("passwordModal").classList.remove("hidden");
  
    document.getElementById("deleteBtn").onclick = () =>
      document.getElementById("deleteModal").classList.remove("hidden");
  
    document.querySelectorAll(".close-modal-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest(".modal").classList.add("hidden");
      });
    });
  
    // Edit Profile Submission
    document.getElementById("editProfileForm").addEventListener("submit", (e) => {
      e.preventDefault();
      member.Fname = document.getElementById("editFname").value;
      member.MInit = document.getElementById("editMInit").value;
      member.Lname = document.getElementById("editLname").value;
      member.Phone_No = document.getElementById("editPhone").value;
      showToast("Profile updated successfully!", "success");
      populateProfile();
      closeModal("editModal");
    });
  
    // Change Password Submission
    document.getElementById("changePasswordForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const current = document.getElementById("currentPassword").value;
      const newPass = document.getElementById("newPassword").value;
      const confirmPass = document.getElementById("confirmPassword").value;
  
      if (current !== member.Password) {
        showToast("Current password is incorrect.", "error");
        return;
      }
  
      if (newPass !== confirmPass) {
        showToast("New passwords do not match.", "error");
        return;
      }
  
      member.Password = newPass;
      showToast("Password updated successfully!", "success");
      closeModal("passwordModal");
    });
  
    // Delete Account Logic
    document.getElementById("confirmDeleteBtn").addEventListener("click", () => {
      showToast("Account deleted successfully.", "success");
      closeModal("deleteModal");
      setTimeout(() => {
        // Redirect to login page
      }, 1500);
    });
  });
  
  function populateProfile() {
    document.getElementById("memberName").textContent = `${member.Fname} ${member.MInit} ${member.Lname}`;
    document.getElementById("memberEmail").textContent = member.Email;
    document.getElementById("memberPhone").textContent = member.Phone_No;
    document.getElementById("memberStartDate").textContent = member.Start_Date;
    document.getElementById("memberEndDate").textContent = member.Expiration_Date;
  
    // Pre-fill edit form
    document.getElementById("editFname").value = member.Fname;
    document.getElementById("editMInit").value = member.MInit;
    document.getElementById("editLname").value = member.Lname;
    document.getElementById("editPhone").value = member.Phone_No;
    document.getElementById("editEmail").value = member.Email;
  }
  
  function closeModal(id) {
    document.getElementById(id).classList.add("hidden");
  }
  
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    toast.style.backgroundColor = type === "error" ? "#c9302c" : "#28a745";
    toast.style.color = "#fff";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "6px";
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.zIndex = "2000";
    toast.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
  
    document.getElementById("toastContainer").appendChild(toast);
  
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
  