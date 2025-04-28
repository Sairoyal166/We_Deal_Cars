document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.error) {
        alert(data.error);
    } else {
        alert(data.message);
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('userName', data.user.name);
        if (data.user.role === 'admin') {
            window.location.href = 'admin.html';
        } else {
            window.location.href = 'user.html';
        }
    }
});
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const mobile = e.target.mobile.value;
    const address = e.target.address.value;

    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, mobile, address })
    });

    const data = await response.json();
    if (data.error) {
        alert(data.error);
    } else {
        alert(data.message);
        window.location.href = 'login.html';
    }
});

function logout() {
    // Clear localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('editCarId'); // Clear any edit car id also if needed

    // Redirect to login page
    window.location.href = 'login.html';
}
