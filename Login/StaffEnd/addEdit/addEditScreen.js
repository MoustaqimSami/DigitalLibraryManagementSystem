const toggleBtn = document.getElementById("toggleSidebar");
const sidebar = document.querySelector(".sidebar");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});


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



 
const submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", async (e) => {

  e.preventDefault();

  const titleInput = document.getElementById("title").value;
  const typeInput = document.getElementById("type").value;
  const authorInput = document.getElementById("author").value;
  const publisherInput = document.getElementById("publisher").value;
  const publicationDateInput = document.getElementById("publicationDate").value;
  const editorInput = document.getElementById("editor").value;
  const genreInput = document.getElementById("genre").value;
  const formatInput = document.getElementById("format").value;
  const editionInput = document.getElementById("edition").value;
  const issnInput = document.getElementById("issn").value;
  const isbnInput = document.getElementById("isbn").value;
  const ratingInput = document.getElementById("rating").value;
  const totalCopiesInput = document.getElementById("totalCopies").value;
  const coverColorInput = document.getElementById("coverColor").value;
  const coverUrlInput = document.getElementById("coverUrl").value;
  const summaryInput = document.getElementById("summary").value;
  const languageInput = document.getElementById("language").value;
  const pagesInput = document.getElementById("pages").value;

  console.log(typeInput);
  console.log(titleInput);
    if (!typeInput){
      console.log("Please select a type");
    }
    else if (typeInput=="Book"){
      try {
        const res = await fetch('http://localhost:8800/staffDashboard/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Title: titleInput,
              Status: "Available",
              Language: languageInput,
              Publication_Date: publicationDateInput,
              Cover_Color: coverColorInput,
              Cover_URL: coverUrlInput,
              EditorName: editorInput,
              AuthorName: authorInput,
              PublisherName: publisherInput,
              ISBN: isbnInput,
              Page_Count: pagesInput,
              Genre: genreInput,
              Format: formatInput,
              Edition: editionInput,
              Rating: ratingInput,
              Synopsys: summaryInput
            })
        });

        console.log("Got response", res);

        if (res.ok) {
            console.log("worked");
        } else {
            console.log("Failed to add book:");
        }
    } catch (err) {
        console.error("Fetch error:", err);
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
    }
    else if (typeInput=="Magazine"){
      try {
        const res = await fetch('http://localhost:8800/addMagazine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Title: titleInput,
              Status: "Available",
              Language: languageInput,
              Publication_Date: publicationDateInput,
              Cover_Color: coverColorInput,
              Cover_URL: coverUrlInput,
              EditorName: editorInput,
              AuthorName: authorInput,
              PublisherName: publisherInput,
              ISSN: issnInput,
              Category: genreInput,
              Edition: editionInput,
            })
        });

        console.log("Got response", res);

        if (res.ok) {
            console.log("worked");
        } else {
            console.log("Failed to add magazine:");
        }
    } catch (err) {
        console.error("Fetch error:", err);
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
    }
    else{
      try {
        const res = await fetch('http://localhost:8800/addRP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              Title: titleInput,
              Status: "Available",
              Language: languageInput,
              Publication_Date: publicationDateInput,
              Cover_Color: coverColorInput,
              Cover_URL: coverUrlInput,
              EditorName: editorInput,
              AuthorName: authorInput,
              PublisherName: publisherInput,
              Institution: "University of Calgary",
              Field_of_Study: genreInput
            })
        });

        console.log("Got response", res);

        if (res.ok) {
            console.log("worked");
        } else {
            console.log("Failed to add book:");
        }
    } catch (err) {
        console.error("Fetch error:", err);
        errorMessage.textContent = 'An error occurred. Please try again.';
    }
    }
  }
)


window.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/session-info', {
      method: 'GET',
      credentials: 'include' 
    });

    if (res.ok) {
      const data = await res.json();
      console.log('Session info:', data);

      const initials = data.username.slice(0, 2).toUpperCase();

      const initialsElement = document.getElementById('initials');
      const welcomeMessage = document.getElementById('welcomeMessage')
      if (initialsElement) {
        initialsElement.textContent = initials;
        welcomeMessage.textContent = "Welcome " + data.username + ", how are you doing today?"
      }

    } else {
      console.log('Not logged in');
      window.location.href = '/'; // Redirect to login if no session
    }
  } catch (err) {
    console.error('Error fetching session info:', err);
  }
});