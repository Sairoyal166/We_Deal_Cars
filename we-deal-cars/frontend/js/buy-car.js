async function fetchCars(model = '', minPrice = '', maxPrice = '') {
    const response = await fetch(`http://localhost:5000/api/cars?model=${model}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
    const cars = await response.json();
    const carsTable = document.getElementById('carsTable');
    carsTable.innerHTML = '';

    cars.forEach(car => {
        const row = `
            <tr>
                <td>${car.model}</td>
                <td>${car.price}</td>
                <td>${car.details}</td>
            </tr>
        `;
        carsTable.innerHTML += row;
    });
}

document.getElementById('filterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const model = e.target.model.value;
    const minPrice = e.target.minPrice.value;
    const maxPrice = e.target.maxPrice.value;
    fetchCars(model, minPrice, maxPrice);
});

// Load Cars on Page Load
fetchCars();


function logout() {
    // Clear localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('editCarId'); // Clear any edit car id also if needed
    
    // Redirect to login page
    window.location.href = 'login.html';
}