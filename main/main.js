// --- Core Application Logic (simulating main.js) ---
// Function to show a custom modal message instead of alert()
function showMessage(message) {
    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex'; // Use flex to center
}

// Function to close the custom modal
function closeModal() {
    document.getElementById('messageModal').style.display = 'none';
}

// Simulate user authentication state (backend logic simulation)
let currentUser = null; // Stores logged-in user's email

// Function to handle logout
function logout() {
    currentUser = null; // Clear current user
    showMessage('You have been logged out.');
    updateHeaderNavigation(); // Update header after logout
    navigateTo('home'); // Redirect to home page
}

// Function to dynamically update header navigation based on login status
function updateHeaderNavigation() {
    const navUl = document.querySelector('header nav ul');
    if (!navUl) return; // Exit if navigation list not found

    navUl.innerHTML = ''; // Clear existing navigation items

    // Always show Home and Apply for Jobs
    navUl.innerHTML += `<li><a href="#" class="text-gray-700 hover:text-orange-600 font-medium" onclick="navigateTo('home')">Home</a></li>`;
    navUl.innerHTML += `<li><a href="#" class="text-gray-700 hover:text-orange-600 font-medium" onclick="navigateTo('apply-jobs')">Apply for Jobs</a></li>`;

    // Conditionally show Login/Sign Up or Profile
    if (currentUser) {
        navUl.innerHTML += `<li><a href="#" class="text-gray-700 hover:text-orange-600 font-medium" onclick="navigateTo('profile')">Profile</a></li>`;
    } else {
        navUl.innerHTML += `<li><a href="#" class="text-gray-700 hover:text-orange-600 font-medium" onclick="navigateTo('login-signup')">Login/Sign Up</a></li>`;
    }
}

// --- Page Content and Logic Modules ---

// Home Page Module (simulating home.js)
function getHomePageContent() {
    return `
        <section class="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20 text-center">
            <div class="container">
                <h1 class="text-5xl font-extrabold mb-4 animate-fade-in-down">Novere Talent: Your Gateway to Elite Opportunities.</h1>
                <p class="text-xl mb-8 opacity-90 animate-fade-in-up">Connecting IITians with top companies and providing exclusive training.</p>
                <a href="#" class="btn-primary animate-scale-in" onclick="navigateTo('apply-jobs')">Explore Opportunities</a>
            </div>
        </section>

        <section class="py-16 bg-gray-50">
            <div class="container grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div class="card transform hover:scale-105 transition duration-300 ease-in-out">
                    <i class="fas fa-building text-orange-600 text-5xl mb-4"></i>
                    <h3 class="text-2xl font-bold mb-2">Top Companies</h3>
                    <p class="text-gray-600">Access exclusive roles from leading global and Indian firms.</p>
                </div>
                <div class="card transform hover:scale-105 transition duration-300 ease-in-out">
                    <i class="fas fa-user-graduate text-orange-600 text-5xl mb-4"></i>
                    <h3 class="text-2xl font-bold mb-2">Elite IITians</h3>
                    <p class="text-gray-600">A network of India's brightest engineering minds.</p>
                </div>
                <div class="card transform hover:scale-105 transition duration-300 ease-in-out">
                    <i class="fas fa-chalkboard-teacher text-orange-600 text-5xl mb-4"></i>
                    <h3 class="text-2xl font-bold mb-2">Exclusive Training</h3>
                    <p class="text-gray-600">Curated videos, blogs, and articles to sharpen your skills.</p>
                </div>
            </div>
        </section>

        <section class="py-16">
            <div class="container">
                <h2 class="text-4xl font-bold text-center mb-12">Training Resources: Videos, Blogs & Articles</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Video 1 -->
                    <div class="card">
                        <div class="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                            <i class="fas fa-play-circle text-6xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Mastering Advanced Algorithms</h3>
                        <p class="text-gray-600 text-sm">Deep dive into complex data structures and algorithms for competitive programming.</p>
                        <a href="https://www.youtube.com/watch?v=0l3_j5Wf8-o" target="_blank" class="text-orange-600 hover:underline mt-3 block">Watch Video</a>
                    </div>
                    <!-- Video 2 -->
                    <div class="card">
                        <div class="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                            <i class="fas fa-play-circle text-6xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Cracking Product Management Interviews</h3>
                        <p class="text-gray-600 text-sm">Strategies and frameworks for aspiring PMs from IITs.</p>
                        <a href="https://www.youtube.com/watch?v=0l3_j5Wf8-o" target="_blank" class="text-orange-600 hover:underline mt-3 block">Watch Video</a>
                    </div>
                    <!-- Article 1 -->
                    <div class="card">
                        <div class="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                            <i class="fas fa-newspaper text-6xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">The Future of AI in Fintech</h3>
                        <p class="text-gray-600 text-sm">An in-depth article on emerging trends and opportunities.</p>
                        <a href="#" class="text-orange-600 hover:underline mt-3 block" onclick="showMessage('This link would open the article!')">Read Article</a>
                    </div>
                    <!-- Blog 1 -->
                    <div class="card">
                        <div class="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                            <i class="fas fa-blog text-6xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Building Scalable Backend Systems</h3>
                        <p class="text-gray-600 text-sm">A blog series on microservices architecture and cloud deployment.</p>
                        <a href="#" class="text-orange-600 hover:underline mt-3 block" onclick="showMessage('This link would open the blog!')">Read Blog</a>
                    </div>
                    <!-- Video 3 -->
                    <div class="card">
                        <div class="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                            <i class="fas fa-play-circle text-6xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Data Science Interview Prep for IITians</h3>
                        <p class="text-gray-600 text-sm">Common interview questions and how to approach them.</p>
                        <a href="https://www.youtube.com/watch?v=0l3_j5Wf8-o" target="_blank" class="text-orange-600 hover:underline mt-3 block">Watch Video</a>
                    </div>
                    <!-- Article 2 -->
                    <div class="card">
                        <div class="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                            <i class="fas fa-file-alt text-6xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Entrepreneurship for Engineers</h3>
                        <p class="text-gray-600 text-sm">Key steps to launch your own startup after IIT.</p>
                        <a href="#" class="text-orange-600 hover:underline mt-3 block" onclick="showMessage('This link would open the article!')">Read Article</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function setupHomePageListeners() {
    // No specific listeners needed for elements within the home page content itself,
    // as navigation is handled by onclick attributes.
}

// Apply Jobs Page Module (simulating applyJobs.js)
async function getApplyJobsPageContent() {
    let userApplications = [];
    if (currentUser) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/profile/${currentUser}`);
            const data = await response.json();
            if (response.ok && data.applications) {
                userApplications = data.applications;
            }
        } catch (error) {
            console.error('Error fetching user applications for Apply Jobs page:', error);
            // Continue without applications if there's an error
        }
    }

    let jobs = [];
    try {
        const response = await fetch('http://127.0.0.1:5000/jobs');
        const data = await response.json();
        if (response.ok) {
            jobs = data;
        } else {
            console.error('Error fetching jobs:', data.message);
            showMessage('Failed to load job listings.');
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
        showMessage('Failed to connect to the server to load job listings.');
    }

    const jobListingsHtml = jobs.map(job => {
        const fullJobTitle = `${job.job_title} at ${job.company}`;
        const hasApplied = userApplications.some(app => app.job === fullJobTitle);
        const buttonText = hasApplied ? 'Application Pending' : 'Apply Now';
        const buttonClass = hasApplied ? 'btn-secondary opacity-70 cursor-not-allowed' : 'btn-secondary';
        const buttonDisabled = hasApplied ? 'disabled' : '';

        // Display skills
        const skillsHtml = job.required_skills ? job.required_skills.map(s => `<span class="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mr-2 mb-2">${s.skill}</span>`).join('') : '';

        return `
            <div class="border-b border-gray-200 pb-4">
                <h4 class="text-xl font-semibold text-orange-600">${job.job_title}</h4>
                <p class="text-gray-700">${job.company} - ${job.location}</p>
                <p class="text-gray-600 text-sm mt-2">${job.description}</p>
                <div class="mt-3">
                    <p class="text-sm font-medium text-gray-700">Required Skills:</p>
                    <div class="flex flex-wrap mt-1">${skillsHtml}</div>
                </div>
                <p class="text-gray-600 text-sm mt-2">Experience: ${job.required_experience_years}+ years</p>
                <p class="text-gray-600 text-sm mt-1">Education: ${job.required_education ? job.required_education.join(', ') : 'N/A'}</p>
                <button class="${buttonClass} mt-3 text-sm apply-job-btn" data-job="${fullJobTitle}" ${buttonDisabled}>${buttonText}</button>
            </div>
        `;
    }).join('');

    return `
        <section class="py-16">
            <div class="container">
                <h2 class="text-4xl font-bold text-center mb-12">Apply for Jobs</h2>

                <div class="grid grid-cols-1 gap-12">
                    <!-- Job Postings -->
                    <div class="card p-8">
                        <h3 class="text-2xl font-semibold mb-6">Open Positions</h3>
                        <p class="text-gray-600 mb-6">To apply for a job, please ensure you are logged in. Your profile information will be used for the application.</p>
                        <div class="space-y-6">
                            ${jobListingsHtml}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function setupApplyJobsPageListeners() {
    // Add event listeners for dummy job application buttons
    document.querySelectorAll('.apply-job-btn').forEach(button => {
        button.addEventListener('click', async function() {
            if (this.disabled) { // Prevent re-applying if already disabled
                return;
            }

            const jobTitle = this.dataset.job;
            if (currentUser) {
                try {
                    const response = await fetch('http://127.0.0.1:5000/apply_job', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email: currentUser, jobTitle: jobTitle })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        showMessage(data.message);
                        // Update the button visually after successful application
                        this.textContent = 'Application Pending';
                        this.disabled = true;
                        this.classList.add('opacity-70', 'cursor-not-allowed');
                        this.classList.remove('hover:bg-gray-300'); // Remove hover effect
                    } else {
                        showMessage(`Error applying for job: ${data.message}`);
                    }
                } catch (error) {
                    console.error('Error applying for job:', error);
                    showMessage('Failed to connect to the server. Please try again later.');
                }
            } else {
                showMessage('Please log in to apply for jobs.');
                navigateTo('login-signup'); // Redirect to login if not logged in
            }
        });
    });
}

// Login/Sign Up Page Module (simulating auth.js)
function getAuthPageContent() {
    return `
        <section class="py-16">
            <div class="container flex justify-center items-center min-h-[60vh]">
                <div class="card p-8 w-full max-w-md">
                    <h2 class="text-3xl font-bold text-center mb-8">Login / Sign Up</h2>

                    <!-- Login Form -->
                    <div id="loginFormContainer">
                        <h3 class="text-2xl font-semibold mb-6 text-center">Login</h3>
                        <form id="loginForm" class="space-y-6">
                            <div class="form-group">
                                <label for="loginEmail">Email Address</label>
                                <input type="email" id="loginEmail" name="email" placeholder="your.email@example.com" required>
                            </div>
                            <div class="form-group">
                                <label for="loginPassword">Password</label>
                                <input type="password" id="loginPassword" name="password" placeholder="********" required>
                            </div>
                            <button type="submit" class="btn-primary w-full">Login</button>
                        </form>
                        <p class="text-center text-gray-600 mt-4">Don't have an account? <a href="#" class="text-orange-600 hover:underline" id="showSignUpLink">Sign Up</a></p>
                    </div>

                    <!-- Sign Up Form (hidden by default) -->
                    <div id="signupFormContainer" style="display: none;">
                        <h3 class="text-2xl font-semibold mb-6 text-center">Sign Up</h3>
                        <form id="signupForm" class="space-y-6">
                            <div class="form-group">
                                <label for="signupEmail">Email Address</label>
                                <input type="email" id="signupEmail" name="email" placeholder="your.email@example.com" required>
                            </div>
                            <div class="form-group">
                                <label for="signupPassword">Password</label>
                                <input type="password" id="signupPassword" name="password" placeholder="********" required>
                            </div>
                            <div class="form-group">
                                <label for="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="********" required>
                            </div>
                            <button type="submit" class="btn-primary w-full">Sign Up</button>
                        </form>
                        <p class="text-center text-gray-600 mt-4">Already have an account? <a href="#" class="text-orange-600 hover:underline" id="showLoginLink">Login</a></p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function setupAuthPageListeners() {
    const loginFormContainer = document.getElementById('loginFormContainer');
    const signupFormContainer = document.getElementById('signupFormContainer');

    // Function to show Sign Up form and hide Login form
    const showSignUpForm = function() {
        if (loginFormContainer && signupFormContainer) {
            loginFormContainer.style.display = 'none';
            signupFormContainer.style.display = 'block';
        }
    };

    // Function to show Login form and hide Sign Up form
    const showLoginForm = function() {
        if (loginFormContainer && signupFormContainer) {
            loginFormContainer.style.display = 'block';
            signupFormContainer.style.display = 'none';
        }
    };

    const showSignUpLink = document.getElementById('showSignUpLink');
    if (showSignUpLink) {
        showSignUpLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSignUpForm();
        });
    }

    const showLoginLink = document.getElementById('showLoginLink');
    if (showLoginLink) {
        showLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            showLoginForm();
        });
    }

    // Add event listener for Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('http://127.0.0.1:5000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (response.ok) {
                    currentUser = data.email;
                    showMessage('Login successful! Redirecting to profile...');
                    updateHeaderNavigation(); // Update header after successful login
                    setTimeout(() => navigateTo('profile'), 1500); // Redirect after a short delay
                } else {
                    showMessage(`Login failed: ${data.message}`);
                }
            } catch (error) {
                console.error('Error during login:', error);
                showMessage('Failed to connect to the server. Please try again later.');
            }
        });
    }

    // Add event listener for Sign Up form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                showMessage('Passwords do not match. Please try again.');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:5000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });
                const data = await response.json();
                if (response.ok) {
                    showMessage(data.message + ' You can now log in.');
                    this.reset(); // Clear form fields
                    showLoginForm(); // Show login form after successful signup
                } else {
                    showMessage(`Sign up failed: ${data.message}`);
                }
            } catch (error) {
                console.error('Error during signup:', error);
                showMessage('Failed to connect to the server. Please try again later.');
            }
        });
    }
}

// Profile Page Module (simulating profile.js)
async function getProfilePageContent() {
    if (!currentUser) {
        // This case should ideally be caught by navigateTo, but as a fallback
        return `<p class="text-center text-xl mt-20">Please log in to view your profile.</p>`;
    }

    let userData = null;
    try {
        const response = await fetch(`http://127.0.0.1:5000/profile/${currentUser}`);
        const data = await response.json();
        if (response.ok) {
            userData = data;
        } else {
            showMessage(`Error fetching profile: ${data.message}`);
            return `<p class="text-center text-xl mt-20">Error loading profile data.</p>`;
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
        showMessage('Failed to load profile data. Please try again later.');
        return `<p class="text-center text-xl mt-20">Failed to load profile data.</p>`;
    }

    const applicationsHtml = userData.applications && userData.applications.length > 0
        ? userData.applications.map(app => `<li>${app.job} - <span class="text-${app.status === 'Pending' ? 'yellow' : app.status === 'Reviewed' ? 'green' : 'red'}-600">${app.status}</span></li>`).join('')
        : '<li>No applications submitted yet.</li>';

    // Default values for new fields if not present in userData
    const fullName = userData.fullName || '';
    const linkedinUrl = userData.linkedinUrl || '';
    const education = userData.education || '';
    const previousExperience = userData.previousExperience || '';
    const resumeFileName = userData.resumeFileName || 'No file uploaded';
    const linkedinVerified = userData.linkedinVerified || false; // New field

    const linkedinVerificationBadge = linkedinVerified
        ? `<span class="ml-2 text-green-600 text-sm font-semibold"><i class="fas fa-check-circle"></i> Verified</span>`
        : `<span class="ml-2 text-red-600 text-sm font-semibold"><i class="fas fa-times-circle"></i> Not Verified</span>`;

    const linkedinVerifyButton = `
        <button id="verifyLinkedinBtn" class="btn-secondary ml-2 text-sm hidden">Verify</button>
    `;

    return `
        <section class="py-16">
            <div class="container flex justify-center items-center min-h-[60vh]">
                <div class="card p-8 w-full max-w-2xl">
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-3xl font-bold">Your Profile</h2>
                        <button id="editProfileBtn" class="btn-primary">Edit Profile</button>
                    </div>
                    <div class="text-center mb-8">
                        <div class="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-5xl mx-auto mb-4">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <h3 class="text-2xl font-semibold text-orange-600">${userData.email}</h3>
                        <p class="text-gray-600">IITian Talent</p>
                    </div>

                    <div class="space-y-6">
                        <div class="form-group">
                            <label for="profileFullName">Full Name</label>
                            <input type="text" id="profileFullName" value="${fullName}" readonly>
                        </div>
                        <div class="form-group">
                            <label for="profileLinkedinUrl">LinkedIn URL</label>
                            <div class="flex items-center">
                                <input type="text" id="profileLinkedinUrl" value="${linkedinUrl}" placeholder="e.g., https://linkedin.com/in/yourprofile" readonly class="flex-grow">
                                ${linkedinUrl ? linkedinVerificationBadge : ''}
                                ${linkedinVerifyButton}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="profileEducation">Education</label>
                            <textarea id="profileEducation" rows="3" readonly>${education}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="profileExperience">Previous Experience</label>
                            <textarea id="profileExperience" rows="5" readonly>${previousExperience}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="profileResume">Resume File</label>
                            <input type="text" id="profileResumeFileName" value="${resumeFileName}" readonly class="mb-2">
                            <input type="file" id="profileResume" accept=".pdf" class="hidden">
                            <button id="uploadResumeBtn" class="btn-secondary w-full hidden">Upload New Resume</button>
                            ${resumeFileName !== 'No file uploaded' ? `<a href="CandidateResumes/${resumeFileName}" target="_blank" class="text-orange-600 hover:underline mt-2 block text-sm">View Current Resume</a>` : ''}
                        </div>
                        <div class="form-group">
                            <label for="profileAbout">About Me</label>
                            <textarea id="profileAbout" rows="5" readonly>${userData.about}</textarea>
                        </div>

                        <div class="flex justify-end space-x-4 mt-6">
                            <button id="cancelEditBtn" class="btn-secondary hidden">Cancel</button>
                            <button id="saveProfileBtn" class="btn-primary hidden">Save Changes</button>
                        </div>

                        <div class="border-b border-gray-200 pb-4 mt-8">
                            <h4 class="text-xl font-semibold mb-2">My Applications</h4>
                            <ul class="list-disc list-inside text-gray-700">
                                ${applicationsHtml}
                            </ul>
                        </div>
                        <div>
                            <button class="btn-secondary w-full" onclick="logout()">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function setupProfilePageListeners() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const uploadResumeBtn = document.getElementById('uploadResumeBtn');
    const profileResumeInput = document.getElementById('profileResume');
    const profileResumeFileNameInput = document.getElementById('profileResumeFileName');
    const profileLinkedinUrlInput = document.getElementById('profileLinkedinUrl');
    const verifyLinkedinBtn = document.getElementById('verifyLinkedinBtn');


    const fields = [
        document.getElementById('profileFullName'),
        profileLinkedinUrlInput, // Include LinkedIn URL in fields
        document.getElementById('profileEducation'),
        document.getElementById('profileExperience'),
        document.getElementById('profileAbout')
    ];

    let initialFieldValues = {}; // To store values for 'Cancel'
    let currentLinkedinVerifiedStatus = false; // Track current verification status
    let newResumeFile = null; // To store the selected new resume file

    // Function to update LinkedIn verification button visibility and status
    const updateLinkedinVerificationUI = () => {
        if (profileLinkedinUrlInput && verifyLinkedinBtn) {
            const urlValue = profileLinkedinUrlInput.value.trim();
            // Show verify button if URL is present and not verified
            if (urlValue !== '' && !currentLinkedinVerifiedStatus) {
                verifyLinkedinBtn.classList.remove('hidden');
            } else {
                verifyLinkedinBtn.classList.add('hidden');
            }
        }
    };

    const toggleEditMode = (isEditing) => {
        fields.forEach(field => {
            if (field) {
                field.readOnly = !isEditing;
                // Toggle Tailwind focus styles based on readonly state
                if (isEditing) {
                    field.classList.remove('focus:outline-none', 'focus:ring-2', 'focus:ring-orange-500');
                } else {
                    field.classList.add('focus:outline-none', 'focus:ring-2', 'focus:ring-orange-500');
                }
            }
        });

        if (isEditing) {
            editProfileBtn.classList.add('hidden'); // Hide Edit button
            saveProfileBtn.classList.remove('hidden');
            cancelEditBtn.classList.remove('hidden');
            uploadResumeBtn.classList.remove('hidden');
            profileResumeFileNameInput.classList.add('hidden'); // Hide filename when editing
            profileResumeInput.classList.remove('hidden'); // Show file input
            // Store current values to revert on cancel
            fields.forEach(field => {
                if (field) initialFieldValues[field.id] = field.value;
            });
            initialFieldValues['profileResumeFileName'] = profileResumeFileNameInput.value; // Store for resume as well
            initialFieldValues['linkedinVerified'] = currentLinkedinVerifiedStatus; // Store initial verification status
            newResumeFile = null; // Reset new resume file on entering edit mode

            updateLinkedinVerificationUI(); // Show/hide verify button based on current URL
        } else {
            editProfileBtn.classList.remove('hidden'); // Show Edit button
            saveProfileBtn.classList.add('hidden');
            cancelEditBtn.classList.add('hidden');
            uploadResumeBtn.classList.add('hidden');
            profileResumeFileNameInput.classList.remove('hidden'); // Show filename when not editing
            profileResumeInput.classList.add('hidden'); // Hide file input
            verifyLinkedinBtn.classList.add('hidden'); // Hide verify button when not editing
        }
    };

    // Fetch initial profile data to set currentLinkedinVerifiedStatus
    // This is important to ensure the correct initial state of the verify button
    (async () => {
        if (currentUser) {
            try {
                const response = await fetch(`http://127.0.0.1:5000/profile/${currentUser}`);
                const data = await response.json();
                if (response.ok && data.linkedinVerified !== undefined) {
                    currentLinkedinVerifiedStatus = data.linkedinVerified;
                    // Initial display of the verify button based on fetched status
                    updateLinkedinVerificationUI();
                }
            } catch (error) {
                console.error('Error fetching initial profile data for listeners:', error);
            }
        }
    })();


    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => toggleEditMode(true));
    }

    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', () => {
            fields.forEach(field => {
                if (field && initialFieldValues[field.id] !== undefined) {
                    field.value = initialFieldValues[field.id];
                }
            });
            if (profileResumeFileNameInput && initialFieldValues['profileResumeFileName'] !== undefined) {
                 profileResumeFileNameInput.value = initialFieldValues['profileResumeFileName'];
            }
            profileResumeInput.value = ''; // Clear file input on cancel
            newResumeFile = null; // Clear selected resume file
            currentLinkedinVerifiedStatus = initialFieldValues['linkedinVerified']; // Revert verification status
            toggleEditMode(false);
        });
    }

    if (uploadResumeBtn) {
        uploadResumeBtn.addEventListener('click', () => {
            profileResumeInput.click(); // Trigger file input click
        });
    }

    if (profileResumeInput) {
        profileResumeInput.addEventListener('change', () => {
            if (profileResumeInput.files.length > 0) {
                newResumeFile = profileResumeInput.files[0]; // Store the file object
                profileResumeFileNameInput.value = newResumeFile.name;
            } else {
                newResumeFile = null;
                profileResumeFileNameInput.value = 'No file uploaded';
            }
        });
    }

    if (profileLinkedinUrlInput) {
        profileLinkedinUrlInput.addEventListener('input', () => {
            // If URL changes, reset verification status to false
            currentLinkedinVerifiedStatus = false;
            updateLinkedinVerificationUI();
        });
    }

    if (verifyLinkedinBtn) {
        verifyLinkedinBtn.addEventListener('click', () => {
            const url = profileLinkedinUrlInput.value.trim();
            if (url) {
                // Simulate verification
                currentLinkedinVerifiedStatus = true;
                showMessage('LinkedIn URL marked as verified (simulated).');
                updateLinkedinVerificationUI(); // Hide button after verification
            } else {
                showMessage('Please enter a LinkedIn URL to verify.');
            }
        });
    }


    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', async () => {
            const linkedinUrlValue = profileLinkedinUrlInput.value.trim();
            if (linkedinUrlValue && !currentLinkedinVerifiedStatus) {
                showMessage('Please verify your LinkedIn URL before saving changes.');
                return; // Prevent saving
            }

            let uploadedResumeFileName = profileResumeFileNameInput.value; // Default to existing filename

            // Step 1: Upload resume if a new one is selected
            if (newResumeFile) {
                const formData = new FormData();
                formData.append('resume', newResumeFile);
                formData.append('email', currentUser); // Pass email for server-side filename generation

                try {
                    const uploadResponse = await fetch('http://127.0.0.1:5000/upload_resume', {
                        method: 'POST',
                        body: formData // FormData automatically sets Content-Type to multipart/form-data
                    });
                    const uploadData = await uploadResponse.json();
                    if (uploadResponse.ok) {
                        uploadedResumeFileName = uploadData.fileName; // Get the filename from the backend
                        showMessage(uploadData.message);
                    } else {
                        showMessage(`Resume upload failed: ${uploadData.message}`);
                        return; // Stop if resume upload fails
                    }
                } catch (error) {
                    console.error('Error uploading resume:', error);
                    showMessage('Failed to upload resume. Please try again later.');
                    return; // Stop if resume upload fails
                }
            }

            // Step 2: Save other profile changes (including the new resume filename if uploaded)
            const updatedProfile = {
                email: currentUser,
                fullName: document.getElementById('profileFullName').value,
                linkedinUrl: linkedinUrlValue,
                education: document.getElementById('profileEducation').value,
                previousExperience: document.getElementById('profileExperience').value,
                about: document.getElementById('profileAbout').value,
                resumeFileName: uploadedResumeFileName, // Use the uploaded filename
                linkedinVerified: currentLinkedinVerifiedStatus // Send verification status to backend
            };

            try {
                const response = await fetch('http://127.0.0.1:5000/update_profile', {
                    method: 'POST', // Using POST for simplicity, PUT would be more semantically correct for updates
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedProfile)
                });
                const data = await response.json();
                if (response.ok) {
                    showMessage(data.message);
                    toggleEditMode(false); // Exit edit mode
                    // Re-render profile to ensure all data is fresh from backend
                    navigateTo('profile');
                } else {
                    showMessage(`Failed to save profile: ${data.message}`);
                }
            } catch (error) {
                console.error('Error saving profile:', error);
                showMessage('Failed to save profile. Please try again later.');
            }
        });
    }
}

// --- Main Navigation Logic ---
async function navigateTo(page) {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Clear current content

    let pageContent = '';
    let setupListenersFunction = null;

    // Show a loading indicator while fetching profile data or job data
    if ((page === 'profile' && currentUser) || page === 'apply-jobs') {
        app.innerHTML = `<div class="text-center text-xl mt-20"><i class="fas fa-spinner fa-spin mr-2"></i> Loading ${page === 'profile' ? 'profile' : 'job listings'}...</div>`;
    }

    switch (page) {
        case 'home':
            pageContent = getHomePageContent();
            setupListenersFunction = setupHomePageListeners;
            break;
        case 'apply-jobs':
            // Await the content as it now fetches data asynchronously
            pageContent = await getApplyJobsPageContent();
            setupListenersFunction = setupApplyJobsPageListeners;
            break;
        case 'login-signup':
            pageContent = getAuthPageContent();
            setupListenersFunction = setupAuthPageListeners;
            break;
        case 'profile':
            if (!currentUser) {
                showMessage('Please log in to view your profile.');
                navigateTo('login-signup'); // Redirect to login if not logged in
                return; // Stop further execution for profile page
            }
            // Await the content as it now fetches data asynchronously
            pageContent = await getProfilePageContent();
            setupListenersFunction = setupProfilePageListeners;
            break;
        default:
            pageContent = `<p class="text-center text-xl mt-20">Page not found.</p>`;
    }

    app.innerHTML = pageContent;
    if (setupListenersFunction) {
        setupListenersFunction(); // Call the setup function for the current page
    }
}

// Initial page load
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderNavigation(); // Initial header setup
    navigateTo('home');
});
