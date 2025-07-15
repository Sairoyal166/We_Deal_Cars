// Fetch Users
async function fetchUsers() {
    const response = await fetch('http://localhost:5000/api/users');
    const users = await response.json();
    const usersTable = document.getElementById('usersTable');
    usersTable.innerHTML = '';

    users.forEach(user => {
        const row = `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><button onclick="deleteUser(${user.id})">Delete</button></td>
            </tr>
        `;
        usersTable.innerHTML += row;
    });
}

// Delete User
async function deleteUser(id) {
    const response = await fetch(`http://localhost:5000/api/users/delete/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    alert(data.message);
    fetchUsers();
}

// Fetch Cars
async function fetchCars() {
    const response = await fetch('http://localhost:5000/api/cars');
    const cars = await response.json();
    const carsTable = document.getElementById('carsTable');
    carsTable.innerHTML = '';

    cars.forEach(car => {
        const row = `
            <tr>
                <td>${car.id}</td>
                <td>${car.model}</td>
                <td>${car.price}</td>
                <td>
                    <button onclick="deleteCar(${car.id})">Delete</button>
                    <button onclick="editCar(${car.id})">Edit</button>
                </td>
            </tr>
        `;
        carsTable.innerHTML += row;
    });
}

// Delete Car
async function deleteCar(id) {
    const response = await fetch(`http://localhost:5000/api/cars/delete/${id}`, {
        method: 'DELETE'
    });
    const data = await response.json();
    alert(data.message);
    fetchCars();
}

// Edit Car (Dummy Function for Now)
function editCar(id) {
    localStorage.setItem('editCarId', id);
    window.location.href = 'edit-car.html';}

// Load Data on Page Load
fetchUsers();
fetchCars();

function logout() {
    // Clear localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('editCarId'); // Clear any edit car id also if needed
      localStorage.removeItem('userRole');

    // Redirect to login page
    window.location.href = 'login.html';
}

