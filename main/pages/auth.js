// pages/auth.js
// Handles content and listeners for the Login/Sign Up page.

import { currentUser, showMessage, setCurrentUser, updateHeaderNavigation } from '../utils.js'; // Import utilities
import { navigateTo } from '../navigation.js'; // Import navigateTo

/**
 * Returns the HTML content for the Login/Sign Up page.
 * @returns {string} HTML string.
 */
export function getAuthPageContent() {
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

/**
 * Sets up event listeners specific to the Login/Sign Up page.
 */
export function setupAuthPageListeners() {
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
                    setCurrentUser(data.email); // Set current user via utility function
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
