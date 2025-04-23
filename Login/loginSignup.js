const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const sendLoginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

sendLoginBtn.addEventListener('click', async (e) => {
    e.preventDefault(); 

    console.log("Login button clicked!");

    const username = document.querySelector('input[name="User"]').value;
    const password = document.querySelector('input[name="Password"]').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const res = await fetch('http://localhost:8800/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                User: username,
                Password: password
            })
        });

        console.log("Got response", res);

        if (res.ok) {
            window.location.href="/home"
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
});

signupBtn.addEventListener('click', async (e) => {
    e.preventDefault(); 

    console.log("SignUp button clicked!");

    const username = document.querySelector('input[name="usernameSignUp"]').value;
    const firstName = document.querySelector('input[name="firstName"]').value;
    const middleInitial = document.querySelector('input[name="middleInitial"]').value;
    const lastName = document.querySelector('input[name="lastName"]').value;
    const phoneNumber = document.querySelector('input[name="phoneNumber"]').value;
    const passwordSignUp = document.querySelector('input[name="passwordSignUp"]').value;
    const email = document.querySelector('input[name="emailSignUp"]').value;

    const errorMessage = document.getElementById('errorMessage');

    try {
        const res = await fetch('http://localhost:8800/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                User: username,
                firstName: firstName,
                middleInitial: middleInitial,
                lastName: lastName,
                phoneNumber: phoneNumber,
                passwordSignUp: passwordSignUp,
                email: email
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