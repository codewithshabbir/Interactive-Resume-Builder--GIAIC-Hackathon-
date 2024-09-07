var _a, _b;
var showMore = document.getElementById('showMore');
var showFullForm = document.getElementById('showFullForm');
var submitButton = document.getElementById('submitButton');
var editButton = document.getElementById('editResume');
var fname = document.getElementById('fname');
var lname = document.getElementById('lname');
var email = document.getElementById('email');
var number = document.getElementById('number');
var degree = document.getElementById('degree');
var institute = document.getElementById('institute');
var graduationYear = document.getElementById('graduation-year');
var skills = document.getElementById('skills');
var jobTitle = document.getElementById('job-title');
var companyName = document.getElementById('company-name');
var yearsExperience = document.getElementById('years-experience');
var responsibilities = document.getElementById('responsibilities');
var resumeContent = document.getElementById('resumeContent');
showMore.addEventListener('click', function () {
    if (showMore.value.toLowerCase() === "show more") {
        showFullForm.style.display = "block";
        showMore.style.display = "none";
        submitButton.removeAttribute('disabled');
    }
});
submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    clearErrors();
    var isValid = validateForm();
    if (isValid) {
        var resumeOutput = document.querySelector('.resume-output');
        resumeOutput.style.display = "block";
        // Generate resume content
        resumeContent.innerHTML = "\n            <div class=\"resume-header\">\n                <h1>My Resume</h1>\n            </div>\n            <div id=\"resume-body\">\n                <section class=\"resume-section\">\n                    <h2>Personal Information</h2>\n                    <div class=\"resume-info\">\n                        <div><b>Full Name:</b> <span id=\"resumeName\">".concat(fname.value, " ").concat(lname.value, "</span></div>\n                        <div><b>Email:</b> <span id=\"resumeEmail\">").concat(email.value, "</span></div>\n                        <div><b>Phone Number:</b> <span id=\"resumeNumber\">").concat(number.value, "</span></div>\n                    </div>\n                </section>\n                <section class=\"resume-section\">\n                    <h2>Education</h2>\n                    <div class=\"resume-info\">\n                        <div><b>Degree:</b> <span id=\"resumeDegree\">").concat(degree.value, "</span></div>\n                        <div><b>Institute:</b> <span id=\"resumeInstitute\">").concat(institute.value, "</span></div>\n                        <div><b>Year of Graduation:</b> <span id=\"resumeGraduationYear\">").concat(graduationYear.value, "</span></div>\n                    </div>\n                </section>\n                <section class=\"resume-section\">\n                    <h2>Skills</h2>\n                    <div class=\"resume-info\">\n                        <div><b>List your skills:</b> <span id=\"resumeSkills\">").concat(skills.value, "</span></div>\n                    </div>\n                </section>\n                <section class=\"resume-section\">\n                    <h2>Work Experience</h2>\n                    <div class=\"resume-info\">\n                        <div><b>Job Title:</b> <span id=\"resumeJobTitle\">").concat(jobTitle.value, "</span></div>\n                        <div><b>Company Name:</b> <span id=\"resumeCompanyName\">").concat(companyName.value, "</span></div>\n                        <div><b>Years of Experience:</b> <span id=\"resumeExperience\">").concat(yearsExperience.value, "</span></div>\n                        <div><b>Responsibilities:</b> <span id=\"resumeResponsibilities\">").concat(responsibilities.value, "</span></div>\n                    </div>\n                </section>\n            </div>\n            <div class=\"resume-footer\">\n                <button id=\"generateURL\" onclick=\"generateShareableURL()\">Generate Shareable URL</button>\n                <button id=\"downloadPDF\" onclick=\"printResume()\">Download as PDF</button>\n                <button id=\"editResume\">Edit my Resume</button>\n            </div>\n        ");
        // Clear all form fields
        fname.value = '';
        lname.value = '';
        email.value = '';
        number.value = '';
        degree.value = '';
        institute.value = '';
        graduationYear.value = '';
        skills.value = '';
        jobTitle.value = '';
        companyName.value = '';
        yearsExperience.value = '';
        responsibilities.value = '';
        // Add event listener to the new "Edit my Resume" button
        var editButton_1 = document.getElementById('editResume');
        editButton_1.addEventListener('click', populateFormFields);
        submitButton.setAttribute('disabled', 'disabled');
    }
});
function validateForm() {
    var isValid = true;
    if (fname.value.trim() === '') {
        showError('fnameError', 'Please enter your first name.');
        isValid = false;
    }
    if (lname.value.trim() === '') {
        showError('lnameError', 'Please enter your last name.');
        isValid = false;
    }
    if (!validateEmail(email.value)) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
    }
    if (!validatePhoneNumber(number.value)) {
        showError('numberError', 'Please enter a valid phone number.');
        isValid = false;
    }
    if (degree.value.trim() === '') {
        showError('degreeError', 'Please enter your degree.');
        isValid = false;
    }
    if (institute.value.trim() === '') {
        showError('instituteError', 'Please enter your institute name.');
        isValid = false;
    }
    if (graduationYear.value.trim() === '') {
        showError('graduationYearError', 'Please enter your year of graduation.');
        isValid = false;
    }
    if (skills.value.trim() === '') {
        showError('skillsError', 'Please list your skills.');
        isValid = false;
    }
    if (jobTitle.value.trim() === '') {
        showError('jobTitleError', 'Please enter your job title.');
        isValid = false;
    }
    if (companyName.value.trim() === '') {
        showError('companyNameError', 'Please enter your company name.');
        isValid = false;
    }
    if (!validateYearsExperience(yearsExperience.value)) {
        showError('yearsExperienceError', 'Please enter a valid number for years of experience.');
        isValid = false;
    }
    if (responsibilities.value.trim() === '') {
        showError('responsibilitiesError', 'Please describe your responsibilities.');
        isValid = false;
    }
    return isValid;
}
function validateEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
function validatePhoneNumber(number) {
    var phonePattern = /^03[0-9]{2}-[0-9]{7}$/;
    return phonePattern.test(number);
}
function validateYearsExperience(years) {
    return /^\d+$/.test(years);
}
function showError(elementId, message) {
    var errorElement = document.getElementById(elementId);
    errorElement.innerText = message;
    errorElement.style.display = 'block';
}
function clearErrors() {
    var errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(function (element) {
        element.style.display = 'none';
    });
}
function populateFormFields() {
    submitButton.removeAttribute('disabled');
    // Retrieve data from resume content
    var resumeName = document.getElementById('resumeName');
    var resumeEmail = document.getElementById('resumeEmail');
    var resumeNumber = document.getElementById('resumeNumber');
    var resumeDegree = document.getElementById('resumeDegree');
    var resumeInstitute = document.getElementById('resumeInstitute');
    var resumeGraduationYear = document.getElementById('resumeGraduationYear');
    var resumeSkills = document.getElementById('resumeSkills');
    var resumeJobTitle = document.getElementById('resumeJobTitle');
    var resumeCompanyName = document.getElementById('resumeCompanyName');
    var resumeExperience = document.getElementById('resumeExperience');
    var resumeResponsibilities = document.getElementById('resumeResponsibilities');
    // Set values back into form fields
    var _a = resumeName.innerText.split(' '), firstName = _a[0], lastName = _a[1];
    fname.value = firstName || '';
    lname.value = lastName || '';
    email.value = resumeEmail.innerText;
    number.value = resumeNumber.innerText;
    degree.value = resumeDegree.innerText;
    institute.value = resumeInstitute.innerText;
    graduationYear.value = resumeGraduationYear.innerText;
    skills.value = resumeSkills.innerText;
    jobTitle.value = resumeJobTitle.innerText;
    companyName.value = resumeCompanyName.innerText;
    yearsExperience.value = resumeExperience.innerText;
    responsibilities.value = resumeResponsibilities.innerText;
    // Update the submit button text
    submitButton.value = 'Update Resume';
}
function printResume() {
    var resumeContent = document.getElementById('resume-body');
    // Create a new window
    var printWindow = window.open('', '', 'height=600,width=800');
    // Write the HTML content to the new window
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write('<html><head><title>Resume</title>');
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write('<style>body { font-family: Arial, sans-serif; margin: 20px; }');
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write('h1, h2 { color: #333; }');
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write('.resume-section { margin-bottom: 20px; }');
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write('</style>');
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write('</head><body >');
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write(resumeContent.innerHTML);
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.write('</body></html>');
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.document.close();
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.focus();
    printWindow === null || printWindow === void 0 ? void 0 : printWindow.print();
}
function generateShareableURL() {
    var _a;
    var fullNameElement = document.getElementById('resumeName');
    if (!fullNameElement) {
        alert("Resume name element not found.");
        return;
    }
    var fullName = (_a = fullNameElement.textContent) === null || _a === void 0 ? void 0 : _a.trim();
    if (!fullName) {
        alert("Name content is empty.");
        return;
    }
    // create username
    var nameParts = fullName.split("");
    var username = nameParts.join('-').toLowerCase();
    // Create the shareable URL
    var encodedUsername = encodeURIComponent(username);
    var uniqueURL = "https://interactive-resume-builder-giaic-hackathon.vercel.app/resume?username=".concat(encodedUsername);
    console.log('Shareable URL:', uniqueURL);
    alert("Shareable URL: ".concat(uniqueURL));
}
(_a = document.getElementById('downloadPDF')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', printResume);
(_b = document.getElementById('generateURL')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', generateShareableURL);
