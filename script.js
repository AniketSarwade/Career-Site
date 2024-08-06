// Function to convert an array of objects to a CSV string
function convertArrayOfObjectsToCSV(data) {
    const header = Object.keys(data[0]).join(',') + '\n';

    const csv = data.map(row => {
        return Object.values(row).join(',');
    }).join('\n');

    return header + csv;
}

// Function to download CSV file
function downloadCSV(csvData) {
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'job-applications.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to show job details modal
function showJobDetails(jobId) {
    document.getElementById('jobDetailsModal').style.display = 'block';
    document.querySelectorAll('.job-details').forEach(function(detail) {
        detail.style.display = 'none';
    });
    document.getElementById(jobId).style.display = 'block';
}

// Function to close job details modal
function closeJobDetails() {
    document.getElementById('jobDetailsModal').style.display = 'none';
}

// Function to show application form modal
function showApplicationForm() {
    document.getElementById('applicationFormModal').style.display = 'block';
}

// Function to close application form modal
function closeApplicationForm() {
    document.getElementById('applicationFormModal').style.display = 'none';
}

// Handle form submission
document.getElementById('jobApplicationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const formDataObj = {};
    formData.forEach((value, key) => {
        formDataObj[key] = value;
    });

    // Example: Add job position to formDataObj
    formDataObj['Job Position'] = document.querySelector('.job-details[style="display: block;"]').querySelector('h2').textContent;

    // Load existing job applications from localStorage
    const jobApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];

    // Add new application to jobApplications array
    jobApplications.push(formDataObj);

    // Convert jobApplications array to CSV-like string
    const csvData = convertArrayOfObjectsToCSV(jobApplications);

    // Download CSV file with all job applications
    downloadCSV(csvData);

    // Store updated job applications in localStorage
    localStorage.setItem('jobApplications', JSON.stringify(jobApplications));

    // Optionally, clear the form after submission
    this.reset();
    closeApplicationForm();
});
