const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

const createDocBtn = document.getElementById("createDocBtn");
const docWrapper = document.querySelector(".doc-center-wrapper");
const form = document.getElementById("createDocForm");
const welcomeText = document.querySelector(".welcome-text");
const allCards = document.querySelectorAll(".doc-card");

createDocBtn.addEventListener("click", () => {
  // Step 1: Move heading up
  welcomeText.classList.add("move-up");

  // Step 2: Shrink cards (visible)
  setTimeout(() => {
    allCards.forEach(card => {
      card.classList.add("shrink-height");
    });
  }, 200);

  // Step 3: Add grid shift + transition class
  // NOTE: this triggers both margin and button highlight
  setTimeout(() => {
    docWrapper.classList.add("creating-document");
  }, 400); // enough time after shrink begins

  // Step 4: Reveal form
  setTimeout(() => {
    form.classList.remove("hidden");
    form.scrollIntoView({ behavior: "smooth" });
  }, 800);
});



const typeSelect = document.getElementById("type");
const genreGroup = document.getElementById("genreGroup");
const genreLabel = genreGroup.querySelector("label");
const genreSelect = document.getElementById("genre");

const editionGroup = document.getElementById("editionGroup");
const issnGroup = document.getElementById("issnGroup");
const formatGroup = document.getElementById("formatGroup");
const isbnGroup = document.getElementById("isbnGroup");


typeSelect.addEventListener("change", () => {
  const type = typeSelect.value;

  // Reset all dynamic fields
  genreSelect.innerHTML = "";
  editionGroup.classList.add("hidden");
  issnGroup.classList.add("hidden");
  formatGroup.classList.add("hidden");
  isbnGroup.classList.add("hidden");

  if (type === "Book") {
    genreLabel.textContent = "Genre";
    ["Classical", "Historical", "Dystopian", "Coming-of-Age", "Romance", "Adventure", "Poetry", "Fantasy"].forEach(option => {
      genreSelect.innerHTML += `<option value="${option}">${option}</option>`;
    });
    editionGroup.classList.remove("hidden");
    formatGroup.classList.remove("hidden");
    isbnGroup.classList.remove("hidden"); // Show ISBN for books
  } else if (type === "Magazine") {
    genreLabel.textContent = "Category";
    ["Fashion", "Entertainment", "Sports", "Cinema"].forEach(option => {
      genreSelect.innerHTML += `<option value="${option}">${option}</option>`;
    });
    editionGroup.classList.remove("hidden");
    issnGroup.classList.remove("hidden");
  } else if (type === "Research") {
    genreLabel.textContent = "Field of Study";
    ["Science", "Computer Science", "Biology", "Finance", "Education", "Psychology"].forEach(option => {
      genreSelect.innerHTML += `<option value="${option}">${option}</option>`;
    });
  }
});
