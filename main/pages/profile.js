// pages/profile.js
// Handles content and listeners for the Profile page.

import { currentUser, showMessage } from '../utils.js'; // Import currentUser and showMessage
import { navigateTo } from '../navigation.js'; // Import navigateTo
import { logout } from '../utils.js'; // Import logout

/**
 * Returns the HTML content for the Profile page, dynamically loading user data.
 * @returns {Promise<string>} A promise that resolves to the HTML string.
 */
export async function getProfilePageContent() {
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
                            <button class="btn-secondary w-full" onclick="window.logout()">Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

/**
 * Sets up event listeners specific to the Profile page.
 */
export function setupProfilePageListeners() {
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
