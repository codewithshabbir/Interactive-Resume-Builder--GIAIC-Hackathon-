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
showMore === null || showMore === void 0 ? void 0 : showMore.addEventListener('click', function () {
    if (showMore.value.toLowerCase() === "show more") {
        showFullForm.style.display = "block";
        showMore.style.display = "none";
        submitButton === null || submitButton === void 0 ? void 0 : submitButton.removeAttribute('disabled');
    }
});
submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    clearErrors();
    var isValid = validateForm();
    if (isValid && resumeContent) {
        var resumeOutput = document.querySelector('.resume-output');
        resumeOutput.style.display = "block";
        // Generate resume content
        resumeContent.innerHTML = "\n            <div class=\"resume-header\">\n                <h1>My Resume</h1>\n            </div>\n            <div id=\"resume-body\">\n                <section class=\"resume-section\">\n                    <h2>Personal Information</h2>\n                    <div class=\"resume-info\">\n                        <div><b>Full Name:</b> <span id=\"resumeName\">".concat(fname === null || fname === void 0 ? void 0 : fname.value, " ").concat(lname === null || lname === void 0 ? void 0 : lname.value, "</span></div>\n                        <div><b>Email:</b> <span id=\"resumeEmail\">").concat(email === null || email === void 0 ? void 0 : email.value, "</span></div>\n                        <div><b>Phone Number:</b> <span id=\"resumeNumber\">").concat(number === null || number === void 0 ? void 0 : number.value, "</span></div>\n                    </div>\n                </section>\n                <section class=\"resume-section\">\n                    <h2>Education</h2>\n                    <div class=\"resume-info\">\n                        <div><b>Degree:</b> <span id=\"resumeDegree\">").concat(degree === null || degree === void 0 ? void 0 : degree.value, "</span></div>\n                        <div><b>Institute:</b> <span id=\"resumeInstitute\">").concat(institute === null || institute === void 0 ? void 0 : institute.value, "</span></div>\n                        <div><b>Year of Graduation:</b> <span id=\"resumeGraduationYear\">").concat(graduationYear === null || graduationYear === void 0 ? void 0 : graduationYear.value, "</span></div>\n                    </div>\n                </section>\n                <section class=\"resume-section\">\n                    <h2>Skills</h2>\n                    <div class=\"resume-info\">\n                        <div><b>List your skills:</b> <span id=\"resumeSkills\">").concat(skills === null || skills === void 0 ? void 0 : skills.value, "</span></div>\n                    </div>\n                </section>\n                <section class=\"resume-section\">\n                    <h2>Work Experience</h2>\n                    <div class=\"resume-info\">\n                        <div><b>Job Title:</b> <span id=\"resumeJobTitle\">").concat(jobTitle === null || jobTitle === void 0 ? void 0 : jobTitle.value, "</span></div>\n                        <div><b>Company Name:</b> <span id=\"resumeCompanyName\">").concat(companyName === null || companyName === void 0 ? void 0 : companyName.value, "</span></div>\n                        <div><b>Years of Experience:</b> <span id=\"resumeExperience\">").concat(yearsExperience === null || yearsExperience === void 0 ? void 0 : yearsExperience.value, "</span></div>\n                        <div><b>Responsibilities:</b> <span id=\"resumeResponsibilities\">").concat(responsibilities === null || responsibilities === void 0 ? void 0 : responsibilities.value, "</span></div>\n                    </div>\n                </section>\n            </div>\n            <div class=\"resume-footer\">\n                <button id=\"generateURL\" onclick=\"generateShareableURL()\">Generate Shareable URL</button>\n                <button id=\"downloadPDF\" onclick=\"printResume()\">Download as PDF</button>\n                <button id=\"editResume\">Edit my Resume</button>\n            </div>\n        ");
        // Clear all form fields
        clearFormFields();
        // Add event listener to the new "Edit my Resume" button
        var editButton_1 = document.getElementById('editResume');
        editButton_1 === null || editButton_1 === void 0 ? void 0 : editButton_1.addEventListener('click', populateFormFields);
        submitButton === null || submitButton === void 0 ? void 0 : submitButton.setAttribute('disabled', 'disabled');
    }
});
function validateForm() {
    var isValid = true;
    if ((fname === null || fname === void 0 ? void 0 : fname.value.trim()) === '') {
        showError('fnameError', 'Please enter your first name.');
        isValid = false;
    }
    if ((lname === null || lname === void 0 ? void 0 : lname.value.trim()) === '') {
        showError('lnameError', 'Please enter your last name.');
        isValid = false;
    }
    if (!validateEmail((email === null || email === void 0 ? void 0 : email.value) || '')) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
    }
    if (!validatePhoneNumber((number === null || number === void 0 ? void 0 : number.value) || '')) {
        showError('numberError', 'Please enter a valid phone number.');
        isValid = false;
    }
    if ((degree === null || degree === void 0 ? void 0 : degree.value.trim()) === '') {
        showError('degreeError', 'Please enter your degree.');
        isValid = false;
    }
    if ((institute === null || institute === void 0 ? void 0 : institute.value.trim()) === '') {
        showError('instituteError', 'Please enter your institute name.');
        isValid = false;
    }
    if ((graduationYear === null || graduationYear === void 0 ? void 0 : graduationYear.value.trim()) === '') {
        showError('graduationYearError', 'Please enter your year of graduation.');
        isValid = false;
    }
    if ((skills === null || skills === void 0 ? void 0 : skills.value.trim()) === '') {
        showError('skillsError', 'Please list your skills.');
        isValid = false;
    }
    if ((jobTitle === null || jobTitle === void 0 ? void 0 : jobTitle.value.trim()) === '') {
        showError('jobTitleError', 'Please enter your job title.');
        isValid = false;
    }
    if ((companyName === null || companyName === void 0 ? void 0 : companyName.value.trim()) === '') {
        showError('companyNameError', 'Please enter your company name.');
        isValid = false;
    }
    if (!validateYearsExperience((yearsExperience === null || yearsExperience === void 0 ? void 0 : yearsExperience.value) || '')) {
        showError('yearsExperienceError', 'Please enter a valid number for years of experience.');
        isValid = false;
    }
    if ((responsibilities === null || responsibilities === void 0 ? void 0 : responsibilities.value.trim()) === '') {
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
    if (errorElement) {
        errorElement.innerText = message;
        errorElement.style.display = 'block';
    }
}
function clearErrors() {
    var errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(function (element) {
        element.style.display = 'none';
    });
}
function clearFormFields() {
    if (fname)
        fname.value = '';
    if (lname)
        lname.value = '';
    if (email)
        email.value = '';
    if (number)
        number.value = '';
    if (degree)
        degree.value = '';
    if (institute)
        institute.value = '';
    if (graduationYear)
        graduationYear.value = '';
    if (skills)
        skills.value = '';
    if (jobTitle)
        jobTitle.value = '';
    if (companyName)
        companyName.value = '';
    if (yearsExperience)
        yearsExperience.value = '';
    if (responsibilities)
        responsibilities.value = '';
}
function populateFormFields() {
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.removeAttribute('disabled');
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
    // Populate the form with resume data
    if (fname && resumeName)
        fname.value = resumeName.innerText.split(' ')[0];
    if (lname && resumeName)
        lname.value = resumeName.innerText.split(' ')[1];
    if (email && resumeEmail)
        email.value = resumeEmail.innerText;
    if (number && resumeNumber)
        number.value = resumeNumber.innerText;
    if (degree && resumeDegree)
        degree.value = resumeDegree.innerText;
    if (institute && resumeInstitute)
        institute.value = resumeInstitute.innerText;
    if (graduationYear && resumeGraduationYear)
        graduationYear.value = resumeGraduationYear.innerText;
    if (skills && resumeSkills)
        skills.value = resumeSkills.innerText;
    if (jobTitle && resumeJobTitle)
        jobTitle.value = resumeJobTitle.innerText;
    if (companyName && resumeCompanyName)
        companyName.value = resumeCompanyName.innerText;
    if (yearsExperience && resumeExperience)
        yearsExperience.value = resumeExperience.innerText;
    if (responsibilities && resumeResponsibilities)
        responsibilities.value = resumeResponsibilities.innerText;
}
function printResume() {
    window.print();
}
function generateShareableURL() {
    var resumeContentDiv = document.getElementById('resume-body');
    var encodedContent = encodeURIComponent((resumeContentDiv === null || resumeContentDiv === void 0 ? void 0 : resumeContentDiv.outerHTML) || '');
    var shareableURL = "".concat(window.location.href, "?resumeContent=").concat(encodedContent);
    prompt('Shareable URL:', shareableURL);
}
