document.getElementById('sellCarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const model = e.target.model.value;
    const price = e.target.price.value;
    const image = e.target.image.value;
    const details = e.target.details.value;

    const userId = localStorage.getItem('userId');


    const response = await fetch('http://localhost:5000/api/cars/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, price, image, details, user_id: userId }) 
    });

    const data = await response.json();
    if (data.error) {
        alert(data.error);
    } else {
        alert(data.message);
        window.location.href = 'user.html';
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
