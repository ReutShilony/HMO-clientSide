
// Fetch user data from the server
fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
        // Populate table with user data
        const userTableBody = document.getElementById('userTableBody');
        data.forEach(user => {
            const row = `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.birthDate}</td>
                    <td>${user.wasSick ? 'Yes' : 'No'}</td>
                    <td>${user.wasVaccinated ? 'Yes' : 'No'}</td>
                </tr>
            `;
            userTableBody.innerHTML += row;
        });
    })
    .catch(error => console.error('Error fetching user data:', error));
