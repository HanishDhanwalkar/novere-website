// pages/home.js
// Handles content and listeners for the Home page.

import { showMessage } from '../utils.js'; // Import showMessage from utils.js

/**
 * Returns the HTML content for the Home page.
 * @returns {string} HTML string.
 */
export function getHomePageContent() {
    return `
        <section class="bg-gradient-to-r from-orange-500 to-red-600 text-white py-20 text-center">
            <div class="container">
                <h1 class="text-5xl font-extrabold mb-4 animate-fade-in-down">Novere Talent: Your Gateway to Elite Opportunities.</h1>
                <p class="text-xl mb-8 opacity-90 animate-fade-in-up">Connecting IITians with top companies and providing exclusive training.</p>
                <a href="#" class="btn-primary animate-scale-in" onclick="window.navigateTo('apply-jobs')">Explore Opportunities</a>
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
                        <a href="#" class="text-orange-600 hover:underline mt-3 block" onclick="window.showMessage('This link would open the article!')">Read Article</a>
                    </div>
                    <!-- Blog 1 -->
                    <div class="card">
                        <div class="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                            <i class="fas fa-blog text-6xl"></i>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Building Scalable Backend Systems</h3>
                        <p class="text-gray-600 text-sm">A blog series on microservices architecture and cloud deployment.</p>
                        <a href="#" class="text-orange-600 hover:underline mt-3 block" onclick="window.showMessage('This link would open the blog!')">Read Blog</a>
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
                        <a href="#" class="text-orange-600 hover:underline mt-3 block" onclick="window.showMessage('This link would open the article!')">Read Article</a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

/**
 * Sets up event listeners specific to the Home page.
 */
export function setupHomePageListeners() {
    // No specific listeners needed for elements within the home page content itself,
    // as navigation is handled by onclick attributes which call global navigateTo.
}
