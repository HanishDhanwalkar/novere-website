// utils.js
// Core utility functions and global state management

/**
 * Global variable to store the currently logged-in user's email.
 * This acts as a simple session indicator.
 * @type {string | null}
 */
export let currentUser = null;

/**
 * Sets the current logged-in user's email.
 * @param {string | null} email - The email of the logged-in user, or null if logged out.
 */
export function setCurrentUser(email) {
    currentUser = email;
}

/**
 * Displays a custom modal message to the user.
 * @param {string} message - The message to be displayed.
 */
export function showMessage(message) {
    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    if (modal && modalMessage) {
        modalMessage.textContent = message;
        modal.style.display = 'flex'; // Use flex to center the modal
    } else {
        console.error('Message modal or message element not found.');
    }
}

/**
 * Hides the custom modal message.
 */
export function closeModal() {
    const modal = document.getElementById('messageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Handles user logout: clears current user, shows message, updates navigation, and redirects to home.
 * Assumes `navigateTo` and `updateHeaderNavigation` are available (imported or globally accessible).
 */
export function logout() {
    setCurrentUser(null); // Clear current user
    showMessage('You have been logged out.');
    // These functions will be imported in main.js or navigation.js,
    // and this function will be called from an event listener.
    // For now, we assume they are accessible in the context where logout is called.
    // In a modular setup, logout would typically trigger an event,
    // and a central listener would handle navigation and header updates.
    // For simplicity in this structure, we'll directly call them.
    // This will be handled by main.js importing and calling these functions.
}

/**
 * Dynamically updates the header navigation links based on the current user's login status.
 * Shows "Login/Sign Up" if no user is logged in, and "Profile" if a user is logged in.
 * Assumes `navigateTo` is available (imported or globally accessible).
 */
export function updateHeaderNavigation() {
    const navUl = document.querySelector('header nav ul');
    if (!navUl) {
        console.warn('Navigation list (ul) not found in header.');
        return;
    }

    navUl.innerHTML = ''; // Clear existing navigation items

    // Always show Home and Apply for Jobs
    navUl.innerHTML += `<li><a href="#" class="text-gray-700 hover:text-orange-600 font-medium" onclick="window.navigateTo('home')">Home</a></li>`;
    navUl.innerHTML += `<li><a href="#" class="text-gray-700 hover:text-orange-600 font-medium" onclick="window.navigateTo('apply-jobs')">Apply for Jobs</a></li>`;

    // Conditionally show Login/Sign Up or Profile
    if (currentUser) {
        navUl.innerHTML += `<li><a href="#" class="text-gray-700 hover:text-orange-600 font-medium" onclick="window.navigateTo('profile')">Profile</a></li>`;
    } else {
        navUl.innerHTML += `<li><a href="#" class="text-gray-700 hover:text-orange-600 font-medium" onclick="window.navigateTo('login-signup')">Login/Sign Up</a></li>`;
    }
}
