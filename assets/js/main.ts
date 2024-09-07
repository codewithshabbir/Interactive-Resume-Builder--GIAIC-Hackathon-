const showMore = document.getElementById('showMore') as HTMLButtonElement | null;
const showFullForm = document.getElementById('showFullForm') as HTMLElement | null;
const submitButton = document.getElementById('submitButton') as HTMLButtonElement | null;
const editButton = document.getElementById('editResume') as HTMLButtonElement | null;

const fname = document.getElementById('fname') as HTMLInputElement | null;
const lname = document.getElementById('lname') as HTMLInputElement | null;
const email = document.getElementById('email') as HTMLInputElement | null;
const number = document.getElementById('number') as HTMLInputElement | null;
const degree = document.getElementById('degree') as HTMLInputElement | null;
const institute = document.getElementById('institute') as HTMLInputElement | null;
const graduationYear = document.getElementById('graduation-year') as HTMLInputElement | null;
const skills = document.getElementById('skills') as HTMLTextAreaElement | null;
const jobTitle = document.getElementById('job-title') as HTMLInputElement | null;
const companyName = document.getElementById('company-name') as HTMLInputElement | null;
const yearsExperience = document.getElementById('years-experience') as HTMLInputElement | null;
const responsibilities = document.getElementById('responsibilities') as HTMLTextAreaElement | null;

const resumeContent = document.getElementById('resumeContent') as HTMLElement | null;

showMore?.addEventListener('click', () => {
    if (showMore.value.toLowerCase() === "show more") {
        showFullForm!.style.display = "block";
        showMore.style.display = "none";
        submitButton?.removeAttribute('disabled');
    }
});

submitButton?.addEventListener('click', (event) => {
    event.preventDefault();

    clearErrors();

    const isValid = validateForm();

    if (isValid && resumeContent) {
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
                        <div><b>Full Name:</b> <span id="resumeName">${fname?.value} ${lname?.value}</span></div>
                        <div><b>Email:</b> <span id="resumeEmail">${email?.value}</span></div>
                        <div><b>Phone Number:</b> <span id="resumeNumber">${number?.value}</span></div>
                    </div>
                </section>
                <section class="resume-section">
                    <h2>Education</h2>
                    <div class="resume-info">
                        <div><b>Degree:</b> <span id="resumeDegree">${degree?.value}</span></div>
                        <div><b>Institute:</b> <span id="resumeInstitute">${institute?.value}</span></div>
                        <div><b>Year of Graduation:</b> <span id="resumeGraduationYear">${graduationYear?.value}</span></div>
                    </div>
                </section>
                <section class="resume-section">
                    <h2>Skills</h2>
                    <div class="resume-info">
                        <div><b>List your skills:</b> <span id="resumeSkills">${skills?.value}</span></div>
                    </div>
                </section>
                <section class="resume-section">
                    <h2>Work Experience</h2>
                    <div class="resume-info">
                        <div><b>Job Title:</b> <span id="resumeJobTitle">${jobTitle?.value}</span></div>
                        <div><b>Company Name:</b> <span id="resumeCompanyName">${companyName?.value}</span></div>
                        <div><b>Years of Experience:</b> <span id="resumeExperience">${yearsExperience?.value}</span></div>
                        <div><b>Responsibilities:</b> <span id="resumeResponsibilities">${responsibilities?.value}</span></div>
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
        clearFormFields();

        // Add event listener to the new "Edit my Resume" button
        const editButton = document.getElementById('editResume') as HTMLButtonElement | null;
        editButton?.addEventListener('click', populateFormFields);

        submitButton?.setAttribute('disabled', 'disabled');
    }
});

function validateForm(): boolean {
    let isValid = true;

    if (fname?.value.trim() === '') {
        showError('fnameError', 'Please enter your first name.');
        isValid = false;
    }

    if (lname?.value.trim() === '') {
        showError('lnameError', 'Please enter your last name.');
        isValid = false;
    }

    if (!validateEmail(email?.value || '')) {
        showError('emailError', 'Please enter a valid email address.');
        isValid = false;
    }

    if (!validatePhoneNumber(number?.value || '')) {
        showError('numberError', 'Please enter a valid phone number.');
        isValid = false;
    }

    if (degree?.value.trim() === '') {
        showError('degreeError', 'Please enter your degree.');
        isValid = false;
    }

    if (institute?.value.trim() === '') {
        showError('instituteError', 'Please enter your institute name.');
        isValid = false;
    }

    if (graduationYear?.value.trim() === '') {
        showError('graduationYearError', 'Please enter your year of graduation.');
        isValid = false;
    }

    if (skills?.value.trim() === '') {
        showError('skillsError', 'Please list your skills.');
        isValid = false;
    }

    if (jobTitle?.value.trim() === '') {
        showError('jobTitleError', 'Please enter your job title.');
        isValid = false;
    }

    if (companyName?.value.trim() === '') {
        showError('companyNameError', 'Please enter your company name.');
        isValid = false;
    }

    if (!validateYearsExperience(yearsExperience?.value || '')) {
        showError('yearsExperienceError', 'Please enter a valid number for years of experience.');
        isValid = false;
    }

    if (responsibilities?.value.trim() === '') {
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

function showError(elementId: string, message: string): void {
    const errorElement = document.getElementById(elementId) as HTMLDivElement | null;
    if (errorElement) {
        errorElement.innerText = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors(): void {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach((element) => {
        (element as HTMLDivElement).style.display = 'none';
    });
}

function clearFormFields(): void {
    if (fname) fname.value = '';
    if (lname) lname.value = '';
    if (email) email.value = '';
    if (number) number.value = '';
    if (degree) degree.value = '';
    if (institute) institute.value = '';
    if (graduationYear) graduationYear.value = '';
    if (skills) skills.value = '';
    if (jobTitle) jobTitle.value = '';
    if (companyName) companyName.value = '';
    if (yearsExperience) yearsExperience.value = '';
    if (responsibilities) responsibilities.value = '';
}

function populateFormFields(): void {
    submitButton?.removeAttribute('disabled');

    const resumeName = document.getElementById('resumeName') as HTMLSpanElement | null;
    const resumeEmail = document.getElementById('resumeEmail') as HTMLSpanElement | null;
    const resumeNumber = document.getElementById('resumeNumber') as HTMLSpanElement | null;
    const resumeDegree = document.getElementById('resumeDegree') as HTMLSpanElement | null;
    const resumeInstitute = document.getElementById('resumeInstitute') as HTMLSpanElement | null;
    const resumeGraduationYear = document.getElementById('resumeGraduationYear') as HTMLSpanElement | null;
    const resumeSkills = document.getElementById('resumeSkills') as HTMLSpanElement | null;
    const resumeJobTitle = document.getElementById('resumeJobTitle') as HTMLSpanElement | null;
    const resumeCompanyName = document.getElementById('resumeCompanyName') as HTMLSpanElement | null;
    const resumeExperience = document.getElementById('resumeExperience') as HTMLSpanElement | null;
    const resumeResponsibilities = document.getElementById('resumeResponsibilities') as HTMLSpanElement | null;

    // Populate the form with resume data
    if (fname && resumeName) fname.value = resumeName.innerText.split(' ')[0];
    if (lname && resumeName) lname.value = resumeName.innerText.split(' ')[1];
    if (email && resumeEmail) email.value = resumeEmail.innerText;
    if (number && resumeNumber) number.value = resumeNumber.innerText;
    if (degree && resumeDegree) degree.value = resumeDegree.innerText;
    if (institute && resumeInstitute) institute.value = resumeInstitute.innerText;
    if (graduationYear && resumeGraduationYear) graduationYear.value = resumeGraduationYear.innerText;
    if (skills && resumeSkills) skills.value = resumeSkills.innerText;
    if (jobTitle && resumeJobTitle) jobTitle.value = resumeJobTitle.innerText;
    if (companyName && resumeCompanyName) companyName.value = resumeCompanyName.innerText;
    if (yearsExperience && resumeExperience) yearsExperience.value = resumeExperience.innerText;
    if (responsibilities && resumeResponsibilities) responsibilities.value = resumeResponsibilities.innerText;
}

function printResume(): void {
    window.print();
}

function generateShareableURL(): void {
    const resumeContentDiv = document.getElementById('resume-body') as HTMLElement | null;
    const encodedContent = encodeURIComponent(resumeContentDiv?.outerHTML || '');
    const shareableURL = `${window.location.href}?resumeContent=${encodedContent}`;
    prompt('Shareable URL:', shareableURL);
}