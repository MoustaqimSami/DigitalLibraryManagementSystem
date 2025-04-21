const staffLogin = document.getElementById('staffLogin');

staffLogin.addEventListener('click', async (e) => {
    e.preventDefault(); 

    console.log("Login button clicked!");

    const email = document.querySelector('input[name="sEmail"]').value;
    const password = document.querySelector('input[name="sPassword"]').value;
    const errorMessage = document.getElementById('errorMessage');

    try {
        const res = await fetch('http://localhost:8800/stafflogin', {
            method: 'POST',
            credentials: 'include', // <-- ADD THIS LINE
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: email,
                Password: password
            })
        });

        console.log("Got response", res);

        if (res.ok) {
            window.location.href = "/staffDashboard";
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