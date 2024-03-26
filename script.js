
function init() {
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
        // Populate table with user data
        console.log(data)
        const userTableBody = document.getElementById('userTableBody');
        data.forEach(user => {
            const row = `
                <tr>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.phone}</td>
                    <td>${user.sickdate}</td>
                </tr>
            `;
            userTableBody.innerHTML += row;
        });
    })
    .catch(error => console.error('Error fetching user data:', error));

}

function showVaccineDetails() {
    const numVaccines = parseInt(document.getElementById('numVaccines').value);

    let vaccineDetailsHTML = '';
    for (let i = 1; i <= numVaccines; i++) {
        vaccineDetailsHTML += `
            <label for="vaccine${i}Manufacture"> ${i}יצרן חיסון:</label><br>
            <input type="text" id="vaccine${i}Manufacture" name="vaccine${i}Manufacture" required><br><br>
            
            <label for="vaccine${i}Date">${i} תאריך חיסון:</label><br>
            <input type="date" id="vaccine${i}Date" name="vaccine${i}Date" required><br><br>
        `;
    }

    document.getElementById('vaccineDetails').innerHTML = vaccineDetailsHTML;
}


const addUser = () => {
    // Extracting data from the form fields
    const userData = {
        id: document.getElementById('id').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phone: document.getElementById('phone').value,
        cellphone: document.getElementById('cellphone').value,
        address: {
            city: document.getElementById('city').value,
            street: document.getElementById('street').value,
            houseNumber: document.getElementById('houseNumber').value
        },
        covidDetails: {
            vaccines: [],
            sickDate: document.getElementById('sickDate').value,
            recoveryDate: document.getElementById('recoveryDate').value
        }
    };

    // Extracting vaccine details if available
    const numVaccines = parseInt(document.getElementById('numVaccines').value);
    for (let i = 1; i <= 4; i++) {
        const manufactureName = (i <= numVaccines) ? document.getElementById(`vaccine${i}Manufacture`).value : '00-00-0000';
        const date = (i <= numVaccines) ? document.getElementById(`vaccine${i}Date`).value : null;
        userData.covidDetails.vaccines.push({ manufactureName, date });
    }
     

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            if (response.ok) {
                console.log("User added")
            } else {
                console.log('Failed to add user');
            }
        })
        .catch(error => console.error('Error adding user:', error));
}

