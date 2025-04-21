const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");
const submitBtn = document.getElementById("submitBtn")

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
