const showMore = document.getElementById('showMore') as HTMLButtonElement;
const showFullForm = document.getElementById('showFullForm') as HTMLElement;
const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
const editButton = document.getElementById('editResume') as HTMLButtonElement;

const fname = document.getElementById('fname') as HTMLInputElement;
const lname = document.getElementById('lname') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const number = document.getElementById('number') as HTMLInputElement;
const degree = document.getElementById('degree') as HTMLInputElement;
const institute = document.getElementById('institute') as HTMLInputElement;
const graduationYear = document.getElementById('graduation-year') as HTMLInputElement;
const skills = document.getElementById('skills') as HTMLTextAreaElement;
const jobTitle = document.getElementById('job-title') as HTMLInputElement;
const companyName = document.getElementById('company-name') as HTMLInputElement;
const yearsExperience = document.getElementById('years-experience') as HTMLInputElement;
const responsibilities = document.getElementById('responsibilities') as HTMLTextAreaElement;

const resumeContent = document.getElementById('resumeContent') as HTMLElement;

showMore.addEventListener('click', () => {
    if (showMore.value.toLowerCase() === "show more") {
        showFullForm.style.display = "block";
        showMore.style.display = "none";
        submitButton.removeAttribute('disabled');
    }
});

submitButton.addEventListener('click', (event) => {
    event.preventDefault();

    clearErrors();

    const isValid = validateForm();

    if (isValid) {
        const resumeOutput = document.querySelector('.resume-output') as HTMLElement;
        resumeOutput.style.display = "block";
        
        // Generate resume content
        resumeContent.innerHTML = `
            <div class="resume-header">
                <h1>My Resume</h1>
            </div>
            <div id="resume-body">
                <section class="resume-section">
                    <h2>Personal Information</h2>
                    <div class="resume-info">
                        <div><b>Full Name:</b> <span id="resumeName">${fname.value} ${lname.value}</span></div>
                        <div><b>Email:</b> <span id="resumeEmail">${email.value}</span></div>
                        <div><b>Phone Number:</b> <span id="resumeNumber">${number.value}</span></div>
                    </div>
                </section>
                <section class="resume-section">
                    <h2>Education</h2>
                    <div class="resume-info">
                        <div><b>Degree:</b> <span id="resumeDegree">${degree.value}</span></div>
                        <div><b>Institute:</b> <span id="resumeInstitute">${institute.value}</span></div>
                        <div><b>Year of Graduation:</b> <span id="resumeGraduationYear">${graduationYear.value}</span></div>
                    </div>
                </section>
                <section class="resume-section">
                    <h2>Skills</h2>
                    <div class="resume-info">
                        <div><b>List your skills:</b> <span id="resumeSkills">${skills.value}</span></div>
                    </div>
                </section>
                <section class="resume-section">
                    <h2>Work Experience</h2>
                    <div class="resume-info">
                        <div><b>Job Title:</b> <span id="resumeJobTitle">${jobTitle.value}</span></div>
                        <div><b>Company Name:</b> <span id="resumeCompanyName">${companyName.value}</span></div>
                        <div><b>Years of Experience:</b> <span id="resumeExperience">${yearsExperience.value}</span></div>
                        <div><b>Responsibilities:</b> <span id="resumeResponsibilities">${responsibilities.value}</span></div>
                    </div>
                </section>
            </div>
            <div class="resume-footer">
                <button id="generateURL" onclick="generateShareableURL()">Generate Shareable URL</button>
                <button id="downloadPDF" onclick="printResume()">Download as PDF</button>
                <button id="editResume">Edit my Resume</button>
            </div>
        `;

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
        const editButton = document.getElementById('editResume') as HTMLButtonElement;
        editButton.addEventListener('click', populateFormFields);

        submitButton.setAttribute('disabled', 'disabled');
    }
});

function validateForm(): boolean {
    let isValid = true;

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

function validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePhoneNumber(number: string): boolean {
    const phonePattern = /^03[0-9]{2}-[0-9]{7}$/;
    return phonePattern.test(number);
}

function validateYearsExperience(years: string): boolean {
    return /^\d+$/.test(years);
}

function showError(elementId: string, message: string) {
    const errorElement = document.getElementById(elementId) as HTMLDivElement;
    errorElement.innerText = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach((element) => {
        (element as HTMLDivElement).style.display = 'none';
    });
}

function populateFormFields() {
    submitButton.removeAttribute('disabled');

    // Retrieve data from resume content
    const resumeName = document.getElementById('resumeName') as HTMLSpanElement;
    const resumeEmail = document.getElementById('resumeEmail') as HTMLSpanElement;
    const resumeNumber = document.getElementById('resumeNumber') as HTMLSpanElement;
    const resumeDegree = document.getElementById('resumeDegree') as HTMLSpanElement;
    const resumeInstitute = document.getElementById('resumeInstitute') as HTMLSpanElement;
    const resumeGraduationYear = document.getElementById('resumeGraduationYear') as HTMLSpanElement;
    const resumeSkills = document.getElementById('resumeSkills') as HTMLSpanElement;
    const resumeJobTitle = document.getElementById('resumeJobTitle') as HTMLSpanElement;
    const resumeCompanyName = document.getElementById('resumeCompanyName') as HTMLSpanElement;
    const resumeExperience = document.getElementById('resumeExperience') as HTMLSpanElement;
    const resumeResponsibilities = document.getElementById('resumeResponsibilities') as HTMLSpanElement;

    // Set values back into form fields
    const [firstName, lastName] = resumeName.innerText.split(' ');
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
    const resumeContent = document.getElementById('resume-body') as HTMLElement;

    // Create a new window
    const printWindow = window.open('', '', 'height=600,width=800');
    
    // Write the HTML content to the new window
    printWindow?.document.write('<html><head><title>Resume</title>');
    printWindow?.document.write('<style>body { font-family: Arial, sans-serif; margin: 20px; }');
    printWindow?.document.write('h1, h2 { color: #333; }');
    printWindow?.document.write('.resume-section { margin-bottom: 20px; }');
    printWindow?.document.write('</style>');
    printWindow?.document.write('</head><body >');
    printWindow?.document.write(resumeContent.innerHTML);
    printWindow?.document.write('</body></html>');
    
    printWindow?.document.close();
    printWindow?.focus();

    printWindow?.print();
}


function generateShareableURL() {
    const fullNameElement = document.getElementById('resumeName') as HTMLElement;
    
    if (!fullNameElement) {
        alert("Resume name element not found.");
        return;
    }
    
    const fullName = fullNameElement.textContent?.trim();
    
    if (!fullName) {
        alert("Name content is empty.");
        return;
    }

    // create username
    const nameParts = fullName.split("");
    const username = nameParts.join('-').toLowerCase();

    // Create the shareable URL
    const encodedUsername = encodeURIComponent(username);
    const uniqueURL = `https://interactive-resume-builder-giaic-hackathon.vercel.app/resume?username=${encodedUsername}`;

    console.log('Shareable URL:', uniqueURL);
    alert(`Shareable URL: ${uniqueURL}`);
}


document.getElementById('downloadPDF')?.addEventListener('click', printResume);
document.getElementById('generateURL')?.addEventListener('click', generateShareableURL);