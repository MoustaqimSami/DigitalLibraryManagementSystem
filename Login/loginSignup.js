const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');
const sendLoginBtn = document.querySelector('.btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

sendLoginBtn.addEventListener('click', async (e) => {
    e.preventDefault(); 

    console.log("Login button clicked!");

    container.classList.remove('active');

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
        console.log("res.ok:", res.ok);

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
});
