const API_URL = 'http://localhost:3000';

async function addNhanVien() {
    const phonenumber = document.getElementById('addPhonenumber').value;
    const fullname = document.getElementById('addFullname').value;
    const firstname = document.getElementById('addFirstname').value;
    const lastname = document.getElementById('addLastname').value;
    const email = document.getElementById('addEmail').value;
    if (!phonenumber) {
        alert('Vui lòng nhập số điện thoại.');
        return;
    }
    if (!fullname) {
        alert('Vui lòng nhập họ tên.');
        return;
    }
    const response = await fetch(`${API_URL}/addNhanVien`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phonenumber, fullname, firstname, lastname, email })
    });

    const result = await response.text();
    alert(result);
}

async function updateNhanVien() {
    const phonenumber = document.getElementById('updatePhonenumber').value;
    const fullname = document.getElementById('updateFullname').value;
    const firstname = document.getElementById('updateFirstname').value;
    const lastname = document.getElementById('updateLastname').value;
    const email = document.getElementById('updateEmail').value;
    
    if (!phonenumber) {
        alert('Vui lòng nhập số điện thoại.');
        return;
    }
    const response = await fetch(`${API_URL}/updateNhanVien/${phonenumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullname, firstname, lastname, email })
    })

    const result = await response.text();
    alert(result);
}

async function deleteNhanVien() {
    const phonenumber = document.getElementById('deletePhonenumber').value;
    if (!phonenumber) {
        alert('Vui lòng nhập số điện thoại.');
        return;
    }
    const response = await fetch(`${API_URL}/deleteNhanVien/${phonenumber}`, {
        method: 'DELETE'
    });

    const result = await response.text();
    alert(result);
}

async function getNhanVienByPN() {
    const inputPhonenumber = document.getElementById('getPhonenumber').value;
    if (!inputPhonenumber) {
        alert('Vui lòng nhập số điện thoại.');
        return;
    }
    const response = await fetch(`${API_URL}/${inputPhonenumber}`);
    const result = await response.json();

    if (Object.keys(result).length === 0) {
        alert('Không tìm thấy nhân viên.');
        return;
    }

    // Xóa đi thông tin cũ (đã hiển thị) trước thông tin hiện tại
    document.getElementById('result').innerHTML = '';

    const employeeInfoDiv = document.createElement('div');
    employeeInfoDiv.classList.add('employee-info');

    // Hiển thị thông tin nhân viên
    const employeeElement = document.createElement('div');
    employeeElement.classList.add('employee');

    const phonenumber = document.createElement('p');
    phonenumber.textContent = `Số điện thoại: ${result.phonenumber}`;

    const fullname = document.createElement('p');
    fullname.textContent = `Họ và tên: ${result.fullname}`;

    const firstname = document.createElement('p');
    firstname.textContent = `Tên: ${result.firstname}`;

    const lastname = document.createElement('p');
    lastname.textContent = `Họ: ${result.lastname}`;

    const email = document.createElement('p');
    email.textContent = `Email: ${result.email}`;

    employeeElement.appendChild(phonenumber);
    employeeElement.appendChild(fullname);
    employeeElement.appendChild(firstname);
    employeeElement.appendChild(lastname);
    employeeElement.appendChild(email);

    employeeInfoDiv.appendChild(employeeElement);
    document.getElementById('result').appendChild(employeeInfoDiv);
}

async function getAllNhanVien() {
    const response = await fetch(`${API_URL}`);
    const result = await response.json();

    // Kiểm tra xem kết quả có dữ liệu không
    if (result.length === 0) {
        alert('Không có nhân viên nào.');
        return;
    }

    // Xóa nội dung cũ (nếu có)
    document.getElementById('allResults').innerHTML = '';

    // Tạo phần tử để hiển thị danh sách nhân viên
    const employeesContainer = document.createElement('div');
    employeesContainer.classList.add('employees-container');

    // Hiển thị thông tin của từng nhân viên
    result.forEach((employee, index) => {
        const employeeElement = document.createElement('div');
        employeeElement.classList.add('employee');

        const phonenumber = document.createElement('p');
        phonenumber.textContent = `Số điện thoại: ${employee.phonenumber}`;

        const fullname = document.createElement('p');
        fullname.textContent = `Họ và tên: ${employee.fullname}`;

        const firstname = document.createElement('p');
        firstname.textContent = `Tên: ${employee.firstname}`;

        const lastname = document.createElement('p');
        lastname.textContent = `Họ: ${employee.lastname}`;

        const email = document.createElement('p');
        email.textContent = `Email: ${employee.email}`;

        employeeElement.appendChild(phonenumber);
        employeeElement.appendChild(fullname);
        employeeElement.appendChild(firstname);
        employeeElement.appendChild(lastname);
        employeeElement.appendChild(email);

        employeesContainer.appendChild(employeeElement);

        // Thêm 1 đường thẳng sau mỗi nhân viên, trừ nhân viên cuối cùng
        if (index !== result.length - 1) {
            const divider = document.createElement('hr');
            employeesContainer.appendChild(divider);
        }
    });

    document.getElementById('allResults').appendChild(employeesContainer);
}


