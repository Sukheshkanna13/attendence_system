// Function to mark attendance
function markAttendance(status) {
    const studentNameInput = document.getElementById('studentName');
    const studentName = studentNameInput.value.trim();

    if (studentName === '') {
        alert('Please enter student name.');
        return;
    }

    // Check if student already marked present
    if (localStorage.getItem(studentName)) {
        alert('Attendance already marked for this student.');
        return;
    }

    const currentDate = new Date().toLocaleDateString();
    localStorage.setItem(studentName, status);

    updateAttendanceSummary();
    displayAttendanceDetails(studentName, status, currentDate);

    studentNameInput.value = ''; // Clear input field after marking attendance
}

// Function to reset attendance
function resetAttendance() {
    localStorage.clear();
    updateAttendanceSummary();
    clearAttendanceDetails();
}

// Function to update attendance summary
function updateAttendanceSummary() {
    const totalStudents = localStorage.length;
    let presentStudents = 0;

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (localStorage.getItem(key) === 'present') {
            presentStudents++;
        }
    }

    const absentStudents = totalStudents - presentStudents;
    const attendancePercentage = totalStudents === 0 ? 0 : ((presentStudents / totalStudents) * 100).toFixed(2);

    document.getElementById('totalStudents').textContent = totalStudents;
    document.getElementById('presentStudents').textContent = presentStudents;
    document.getElementById('absentStudents').textContent = absentStudents;
    document.getElementById('attendancePercentage').textContent = `${attendancePercentage}%`;
}

// Function to display attendance details in tabular format
function displayAttendanceDetails(name, status, date) {
    const tableBody = document.getElementById('attendanceTableBody');
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${status}</td>
        <td>${date}</td>
    `;
}

// Function to clear attendance details table
function clearAttendanceDetails() {
    const tableBody = document.getElementById('attendanceTableBody');
    tableBody.innerHTML = '';
}

// Load attendance summary and details on page load
window.onload = function() {
    updateAttendanceSummary();

    // Load existing attendance details from local storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const status = localStorage.getItem(key);
        const currentDate = new Date().toLocaleDateString();
        displayAttendanceDetails(key, status, currentDate);
    }
};
