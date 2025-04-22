const createDocBtn = document.getElementById("createDocBtn");
const editDocBtn = document.getElementById("editDocBtn");
const docWrapper = document.querySelector(".doc-center-wrapper");
const form = document.getElementById("createDocForm");
const editMessage = document.getElementById("editMessage");
const welcomeText = document.querySelector(".welcome-text");
const allCards = document.querySelectorAll(".doc-card");

createDocBtn.addEventListener("click", () => {
  welcomeText.classList.add("move-up");

  setTimeout(() => {
    allCards.forEach(card => card.classList.add("shrink-height"));
  }, 200);

  setTimeout(() => {
    docWrapper.classList.add("creating-document");

    // Remove both highlights first
    createDocBtn.classList.remove("active-create");
    editDocBtn.classList.remove("active-edit");

    //  Highlight only create
    createDocBtn.classList.add("active-create");

    // Show form, hide message
    form.classList.remove("hidden");
    editMessage.classList.add("hidden");
    editMessage.classList.remove("show-message");

    form.scrollIntoView({ behavior: "smooth" });
  }, 400);
});


editDocBtn.addEventListener("click", () => {
  welcomeText.classList.add("move-up");

  setTimeout(() => {
    allCards.forEach(card => card.classList.add("shrink-height"));
  }, 200);

  setTimeout(() => {
    docWrapper.classList.add("creating-document");

    // Remove both highlights first
    createDocBtn.classList.remove("active-create");
    editDocBtn.classList.remove("active-edit");

    //  Highlight only edit
    editDocBtn.classList.add("active-edit");

    // Show message, hide form
    editMessage.classList.remove("hidden");
    editMessage.classList.add("show-message");
    form.classList.add("hidden");

    editMessage.scrollIntoView({ behavior: "smooth" });
  }, 400);
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
