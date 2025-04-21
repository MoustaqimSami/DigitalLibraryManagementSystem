const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

const createDocBtn = document.getElementById("createDocBtn");
const docWrapper = document.querySelector(".doc-center-wrapper");
const form = document.getElementById("createDocForm");

createDocBtn.addEventListener("click", () => {
  docWrapper.classList.add("creating-document");
  form.classList.remove("hidden");
});
