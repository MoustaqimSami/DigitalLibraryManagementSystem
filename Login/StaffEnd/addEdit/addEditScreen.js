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

/*
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault(); 

    console.log("Add button clicked!");

    const title = document.querySelector('input[name="title"]').value;
    const type = document.querySelector('input[name="type"]').value;
    const author = document.querySelector('input[name="author"]').value;
    const genre = document.querySelector('input[name="genre"]').value;
    const rating = document.querySelector('input[name="rating"]').value;
    const totalCopies = document.querySelector('input[name="totalCopies"]').value;
    const availableCopies = document.querySelector('input[name="availableCopies"]').value;
    const coverColor = document.querySelector('input[name="coverColor"]').value;
    const coverUrl = document.querySelector('input[name="coverUrl"]').value;
    const summary = document.querySelector('input[name="summary"]').value;
    const language = document.querySelector('input[name="language"]').value;
    const pages = document.querySelector('input[name="pages"]').value;

    const errorMessage = document.getElementById('errorMessage');

    try {
        const res = await fetch('http://localhost:8800/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                User: username,
                Email: emailS,
                Password: password
            })
        });

        console.log("Got response", res);

        if (res.ok) {
            console.log("worked");
        } else {
            const errorText = await res.text();
            errorMessage.textContent = errorText || 'Login failed.';
            console.log("Login failed with message:", errorText);
        }
    } catch (err) {
        console.error("Fetch error:", err);
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
})
    */
