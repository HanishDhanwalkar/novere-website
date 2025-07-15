// pages/applyJobs.js
// Handles content and listeners for the Apply Jobs page.

import { currentUser, showMessage } from '../utils.js'; // Import currentUser and showMessage
import { navigateTo } from '../navigation.js'; // Import navigateTo

/**
 * Returns the HTML content for the Apply Jobs page, dynamically loading job data.
 * @returns {Promise<string>} A promise that resolves to the HTML string.
 */
export async function getApplyJobsPageContent() {
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

/**
 * Sets up event listeners specific to the Apply Jobs page.
 */
export function setupApplyJobsPageListeners() {
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
