document.getElementById('sellCarForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const model = e.target.model.value;
    const price = e.target.price.value;
    const image = e.target.image.value;
    const details = e.target.details.value;

    const response = await fetch('http://localhost:5000/api/cars/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, price, image, details, user_id: 1 }) // Replace 1 with actual user ID
    });

    const data = await response.json();
    if (data.error) {
        alert(data.error);
    } else {
        alert(data.message);
        window.location.href = 'user.html';
    }
});
