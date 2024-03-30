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
                    <td>${user.address_street + " " + user.address_housenumber + " " + user.address_city}</td>
                    <td>${user.sickdate}</td>
                    <td>${user.recoverydate}</td>
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
 


