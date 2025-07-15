// navigation.js
// Centralized page navigation logic.

import { getHomePageContent, setupHomePageListeners } from './pages/home.js';
import { getApplyJobsPageContent, setupApplyJobsPageListeners } from './pages/applyJobs.js';
import { getAuthPageContent, setupAuthPageListeners } from './pages/auth.js';
import { getProfilePageContent, setupProfilePageListeners } from './pages/profile.js';
import { currentUser, showMessage } from './utils.js'; // Import currentUser and showMessage for checks

/**
 * Navigates to a specified page, loads its content, and sets up its event listeners.
 * @param {string} page - The name of the page to navigate to (e.g., 'home', 'profile').
 */
export async function navigateTo(page) {
    const app = document.getElementById('app');
    if (!app) {
        console.error('Main app container (#app) not found.');
        return;
    }
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

// Expose navigateTo globally for onclick attributes in HTML
window.navigateTo = navigateTo;
