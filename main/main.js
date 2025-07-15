// main.js
// Main entry point for the Novere Talent application.
// This file orchestrates the loading and initialization of other modules.

import { navigateTo } from './navigation.js';
import { updateHeaderNavigation, logout, showMessage, closeModal } from './utils.js'; // Import showMessage and closeModal

// Expose globally for onclick attributes in HTML
window.navigateTo = navigateTo; // Already there
window.logout = logout;         // Already there
window.showMessage = showMessage; // NEW: Expose showMessage globally
window.closeModal = closeModal;   // NEW: Expose closeModal globally

// Initial page load logic
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderNavigation(); // Initial header setup based on current user status
    navigateTo('home'); // Load the home page by default
});
