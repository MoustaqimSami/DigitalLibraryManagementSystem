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
            window.location.href = "/home";
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
    const emailS = document.querySelector('input[name="emailSignUp"]').value;
    const password = document.querySelector('input[name="passwordSignUp"]').value;

    const errorMessage = document.getElementById('errorMessage');

    if (!username || !emailS || !password) {
        errorMessage.textContent = "All fields are required.";
        return;
    }

    if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters long.";
        return;
    }

    if (!emailS.includes('@')) {
        errorMessage.textContent = "Please enter a valid email address.";
        return;
    }

    try {
        const res = await fetch('http://localhost:8800/signup', {
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