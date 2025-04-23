// === Fake Member Database ===
let member1 = {
    Fname: "Tasnim",
    MInit: "H.",
    Lname: "Hossain",
    Email: "tasnimhp9@gmail.com",
    Phone_No: "+1 234 567 8901",
    Start_Date: "March 1, 2023",
    Expiration_Date: "March 1, 2026",
    Password: "oldpassword123" // for demonstration only
  };
  

let member = null;
let session = null;
  // === Populate Profile Info ===
  window.addEventListener("DOMContentLoaded", async () => {  
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

    session = await getSessionInfo();
    member = await getUser();
    console.log(member)

    populateProfile();


    async function getSessionInfo() {
      try {
        const res = await fetch('/session-info', {
          method: 'GET',
          credentials: 'include' // important to include cookies
        });
    
        if (!res.ok) {
          throw new Error('Not logged in');
        }
    
        const user = await res.json();
  
        const initials = user.username.slice(0, 2).toUpperCase();
  
        const initialsElement = document.getElementById('initials');
        if (initialsElement) {
          initialsElement.textContent = initials;
        }
    
        return user;
      } catch (err) {
        console.error('Error fetching session info:', err);
        return null;
      }
    }
  
    async function getUser() {
      const selectedEmail = encodeURIComponent(session.email);
    
      try {
        const response = await fetch(`http://localhost:8800/api/getUserInfo/${selectedEmail}`);
    
        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }
    
        const data = await response.json();
        console.log("User Info:", data);
        return data;
    
      } catch (err) {
        console.error('Error fetching user info:', err);
        return null;
      }
    }
    document.getElementById("editProfileForm").addEventListener("submit", async (e) => {
      e.preventDefault();
    
      // Collect updated form values
      const updatedMember = {
        Fname: document.getElementById("editFname").value,
        MInit: document.getElementById("editMInit").value,
        Lname: document.getElementById("editLname").value,
        Phone_No: document.getElementById("editPhone").value
      };
    
      try {
        const response = await fetch(`http://localhost:8800/api/profile/${encodeURIComponent(session.email)}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedMember)
        });
    
        if (!response.ok) {
          throw new Error(`Failed to update profile: ${response.status}`);
        }
    
        // Update the local member object
        Object.assign(member, updatedMember);
    
        showToast("Profile updated successfully!", "success");
        populateProfile();
        closeModal("editModal");
    
      } catch (error) {
        console.error("Error updating profile:", error);
        showToast("Error updating profile. Please try again.", "error");
      }
    });

    // Change Password Submission
    document.getElementById("changePasswordForm").addEventListener("submit", async (e) => {
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
    
      try {
        const res = await fetch(`http://localhost:8800/api/profile/password/${encodeURIComponent(member.Email)}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ newPassword: newPass })
        });
    
        if (!res.ok) throw new Error('Failed to update password');
    
        member.Password = newPass; // Update in-memory reference
        showToast("Password updated successfully!", "success");
        closeModal("passwordModal");
      } catch (err) {
        console.error("Error updating password:", err);
        showToast("Something went wrong. Try again.", "error");
      }
    });
  
    document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
      try {
        const res = await fetch(`http://localhost:8800/api/profile/${encodeURIComponent(member.Email)}`, {
          method: 'DELETE',
          credentials: 'include'
        });
    
        if (!res.ok) {
          throw new Error('Failed to delete account');
        }
    
        showToast("Account deleted successfully.", "success");
        closeModal("deleteModal");
    
        setTimeout(() => {
          window.location.href = '/';  // Redirect to main page
        }, 1500);
      } catch (err) {
        console.error("Error deleting account:", err);
        showToast("Error deleting account. Try again later.", "error");
      }
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
  