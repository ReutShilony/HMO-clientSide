userDetails = [];

function init() {
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
        userDetails = data;
        console.log(data)
        const userTableBody = document.getElementById('userTableBody');
        data.forEach(user => {
            const row = `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firstname}</td>
                    <td>${user.lastname}</td>
                    <td>${user.phone}</td>
                    <td>${user.street + user.houseNumber +user.city}</td>
                    <td>${user.sickdate}</td>
                    <td>${user.recoveryDate}</td>
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
            <label for="vaccine${i}Manufacture">Manufacture ${i} :</label><br>
            <input type="text" id="vaccine${i}Manufacture" name="vaccine${i}Manufacture" required><br><br>
            
            <label for="vaccine${i}Date"> VaccineDate ${i}:</label><br>
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


async function deleteUser() {
    const userId = document.getElementById("userId").value
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to delete user: ${errorMessage}`);
      }
  
      console.log('User deleted successfully');
    } catch (error) {
      console.error(error);
    }

  }
  async function getUserById(userId) {
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user details:', error);
        return null;
    }
}

  
// Function to populate the form fields with user's current details
async function populateUserDetails(userId) {
    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        const userData = await response.json();
        document.getElementById('userId').value = userData.id;
        document.getElementById('firstName').value = userData.firstName;
        document.getElementById('lastName').value = userData.lastName;
        document.getElementById('phone').value = userData.phone;
        document.getElementById('cellphone').value = userData.cellphone || ''; // Set to empty string if null
        document.getElementById('city').value = userData.address.city;
        document.getElementById('street').value = userData.address.street;
        document.getElementById('houseNumber').value = userData.address.houseNumber;
        document.getElementById('sickDate').value = userData.covidDetails.sickDate;
        document.getElementById('recoveryDate').value = userData.covidDetails.recoveryDate;
        const numVaccines = userData.covidDetails.vaccines.length;
        document.getElementById('numVaccines').value = numVaccines;
        showVaccineDetails(numVaccines);
        userData.covidDetails.vaccines.forEach((vaccine, index) => {
            document.getElementById(`vaccine${index + 1}Manufacture`).value = vaccine.manufactureName;
            document.getElementById(`vaccine${index + 1}Date`).value = vaccine.date;
        });
    } catch (error) {
        console.error('Error populating user details:', error);
    }
}

// Function to update the user's details
async function updateUser() {
    var userId = document.getElementById("userId").value;
    // Assuming you have a function to fetch user data by ID
    var user = getUserById(userId);
    if (user) {
        // Redirect to the update form with user ID as a query parameter
        window.location.href = "update_user.html?id=" + userId;
    } else {
        alert("User not found");
    const userId = document.getElementById('userId').value;
    const userData = {
        id: userId,
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

    const numVaccines = parseInt(document.getElementById('numVaccines').value);
    for (let i = 1; i <= numVaccines; i++) {
        const manufactureName = document.getElementById(`vaccine${i}Manufacture`).value;
        const date = document.getElementById(`vaccine${i}Date`).value;
        userData.covidDetails.vaccines.push({ manufactureName, date });
    }

    try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error('Failed to update user');
        }

        console.log('User updated successfully');
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

// Function to show vaccine details based on the selected number of vaccines
function showVaccineDetails(numVaccines) {
    let vaccineDetailsHTML = '';
    for (let i = 1; i <= numVaccines; i++) {
        vaccineDetailsHTML += `
            <label for="vaccine${i}Manufacture">Manufacture ${i}:</label><br>
            <input type="text" id="vaccine${i}Manufacture" name="vaccine${i}Manufacture" required><br><br>
            
            <label for="vaccine${i}Date">Vaccine Date ${i}:</label><br>
            <input type="date" id="vaccine${i}Date" name="vaccine${i}Date" required><br><br>
        `;
    }
    document.getElementById('vaccineDetails').innerHTML = vaccineDetailsHTML;
}



}
