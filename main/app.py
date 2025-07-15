# app.py
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
from werkzeug.utils import secure_filename # For secure filename handling

app = Flask(__name__, static_folder='.') # Serve static files from the current directory
CORS(app) # Enable CORS for all routes

# Define paths for JSON data files and file upload folders
USERS_FILE = 'users.json'
PROFILE_INFO_FILE = 'profile_info.json'
JDS_FOLDER = 'JDs'
CANDIDATE_RESUMES_FOLDER = 'CandidateResumes' # New: Folder for uploaded resumes

# Allowed extensions for resume uploads
ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Initialize JSON files and folders if they don't exist
def init_json_files():
    if not os.path.exists(USERS_FILE):
        print(f"Initializing {USERS_FILE}...")
        with open(USERS_FILE, 'w') as f:
            json.dump({'test@example.com': 'password123'}, f, indent=4) # Add a default user
    if not os.path.exists(PROFILE_INFO_FILE):
        print(f"Initializing {PROFILE_INFO_FILE}...")
        with open(PROFILE_INFO_FILE, 'w') as f:
            json.dump({
                'test@example.com': {
                    'email': 'test@example.com',
                    'about': 'Passionate about innovation and building impactful products. Always looking for new challenges and learning opportunities in the startup ecosystem.',
                    'applications': [
                        {'job': 'Software Engineer at Acme Corp', 'status': 'Pending'},
                        {'job': 'Product Manager at Innovate Solutions', 'status': 'Reviewed'},
                        {'job': 'Marketing Specialist at Growth Hub Inc.', 'status': 'Rejected'}
                    ],
                    # New fields for profile
                    'fullName': 'Test User',
                    'linkedinUrl': 'https://linkedin.com/in/testuser',
                    'education': 'B.S. Computer Science, University of Example',
                    'previousExperience': 'Software Engineer at TechCorp (2020-2023)\nProduct Intern at StartupX (2019)',
                    'resumeFileName': 'test_resume.pdf',
                    'linkedinVerified': False # New field for LinkedIn verification
                }
            }, f, indent=4)
    
    # Create JDs folder and a sample JD file if not present
    if not os.path.exists(JDS_FOLDER):
        print(f"JDs folder: DOES NOT exists")

    # New: Create CandidateResumes folder if not present
    if not os.path.exists(CANDIDATE_RESUMES_FOLDER):
        print(f"CandidateResumes folder: DOES NOT exists")


init_json_files()

# Helper function to read JSON data
def read_json_file(filename):
    try:
        with open(filename, 'r') as f:
            data = json.load(f)
            print(f"Successfully read {filename}. Data: {data}")
            return data
    except FileNotFoundError:
        print(f"File not found: {filename}. Returning empty dict.")
        return {}
    except json.JSONDecodeError:
        print(f"JSONDecodeError in {filename}. File might be corrupted. Returning empty dict.")
        return {} # Return empty if file is corrupted

# Helper function to write JSON data
def write_json_file(filename, data):
    try:
        with open(filename, 'w') as f:
            json.dump(data, f, indent=4)
            print(f"Successfully wrote to {filename}. Data: {data}")
    except Exception as e:
        print(f"Error writing to {filename}: {e}")


# Serve the main HTML file
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

# Serve static files (CSS, JS)
@app.route('/<path:filename>')
def static_files(filename):
    return send_from_directory('.', filename)

# API for user signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        print("Signup: Missing email or password.")
        return jsonify({'message': 'Email and password are required'}), 400

    users_data = read_json_file(USERS_FILE)
    if email in users_data:
        print(f"Signup: User {email} already exists.")
        return jsonify({'message': 'User with this email already exists'}), 409

    # Store password directly (for demo). In production, use password hashing!
    users_data[email] = password
    write_json_file(USERS_FILE, users_data) # This line should write to users.json

    # Create a default profile for the new user, including new fields
    profile_data = read_json_file(PROFILE_INFO_FILE)
    profile_data[email] = {
        'email': email,
        'about': 'New user, excited to explore opportunities!',
        'applications': [],
        'fullName': '', # Default empty
        'linkedinUrl': '', # Default empty
        'education': '', # Default empty
        'previousExperience': '', # Default empty
        'resumeFileName': 'No file uploaded', # Default
        'linkedinVerified': False # New field for LinkedIn verification
    }
    write_json_file(PROFILE_INFO_FILE, profile_data) # This line should write to profile_info.json

    print(f"Signup: User {email} registered successfully.")
    return jsonify({'message': 'User registered successfully'}), 201

# API for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    users_data = read_json_file(USERS_FILE)

    # In production, compare hashed passwords
    if email in users_data and users_data[email] == password:
        print(f"Login: User {email} successful.")
        return jsonify({'message': 'Login successful', 'email': email}), 200
    else:
        print(f"Login: Invalid credentials for {email}.")
        return jsonify({'message': 'Invalid email or password'}), 401

# API to get user profile
@app.route('/profile/<email>', methods=['GET'])
def get_profile(email):
    profile_data = read_json_file(PROFILE_INFO_FILE)
    profile = profile_data.get(email)
    if profile:
        print(f"Profile: Retrieved profile for {email}.")
        return jsonify(profile), 200
    else:
        print(f"Profile: Profile not found for {email}.")
        return jsonify({'message': 'Profile not found'}), 404

# API to apply for a job
@app.route('/apply_job', methods=['POST'])
def apply_job():
    data = request.get_json()
    email = data.get('email')
    job_title = data.get('jobTitle')

    if not email or not job_title:
        print("Apply Job: Missing email or job title.")
        return jsonify({'message': 'Email and job title are required'}), 400

    profile_data = read_json_file(PROFILE_INFO_FILE)
    if email not in profile_data:
        print(f"Apply Job: User profile not found for {email}.")
        return jsonify({'message': 'User profile not found'}), 404

    # Add application to user's profile
    if 'applications' not in profile_data[email]:
        profile_data[email]['applications'] = []
    profile_data[email]['applications'].append({'job': job_title, 'status': 'Pending'})
    write_json_file(PROFILE_INFO_FILE, profile_data)

    print(f"Apply Job: Application for {job_title} submitted by {email}.")
    return jsonify({'message': f'Application for "{job_title}" submitted successfully'}), 200

# API: Update user profile
@app.route('/update_profile', methods=['POST'])
def update_profile():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        print("Update Profile: Missing email.")
        return jsonify({'message': 'Email is required'}), 400

    profile_data = read_json_file(PROFILE_INFO_FILE)
    if email not in profile_data:
        print(f"Update Profile: Profile not found for {email}.")
        return jsonify({'message': 'Profile not found'}), 404

    # Update fields if they exist in the incoming data
    profile_to_update = profile_data[email]
    profile_to_update['fullName'] = data.get('fullName', profile_to_update.get('fullName', ''))
    profile_to_update['linkedinUrl'] = data.get('linkedinUrl', profile_to_update.get('linkedinUrl', ''))
    profile_to_update['education'] = data.get('education', profile_to_update.get('education', ''))
    profile_to_update['previousExperience'] = data.get('previousExperience', profile_to_update.get('previousExperience', ''))
    profile_to_update['about'] = data.get('about', profile_to_update.get('about', ''))
    profile_to_update['resumeFileName'] = data.get('resumeFileName', profile_to_update.get('resumeFileName', 'No file uploaded'))
    profile_to_update['linkedinVerified'] = data.get('linkedinVerified', profile_to_update.get('linkedinVerified', False)) # Update verification status

    write_json_file(PROFILE_INFO_FILE, profile_data)
    print(f"Update Profile: Profile for {email} updated successfully.")
    return jsonify({'message': 'Profile updated successfully'}), 200

# API: Get all job listings from JDs folder
@app.route('/jobs', methods=['GET'])
def get_jobs():
    jobs = []
    if os.path.exists(JDS_FOLDER):
        for filename in os.listdir(JDS_FOLDER):
            if filename.endswith('.json'):
                filepath = os.path.join(JDS_FOLDER, filename)
                try:
                    with open(filepath, 'r') as f:
                        job_data = json.load(f)
                        jobs.append(job_data)
                except Exception as e:
                    print(f"Error reading job file {filename}: {e}")
    print(f"Retrieved {len(jobs)} job listings.")
    return jsonify(jobs), 200

# NEW API: Upload resume
@app.route('/upload_resume', methods=['POST'])
def upload_resume():
    if 'resume' not in request.files:
        return jsonify({'message': 'No resume file part in the request'}), 400
    
    file = request.files['resume']
    
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        # Prepend email to filename to ensure uniqueness and easy lookup
        email = request.form.get('email') # Get email from form data
        if not email:
            return jsonify({'message': 'User email not provided for resume upload'}), 400
        
        # Create a unique filename for the resume using email and original filename
        unique_filename = f"{email}_{filename}"
        filepath = os.path.join(CANDIDATE_RESUMES_FOLDER, unique_filename)
        
        try:
            file.save(filepath)
            print(f"Resume saved: {filepath}")
            return jsonify({'message': 'Resume uploaded successfully', 'fileName': unique_filename}), 200
        except Exception as e:
            print(f"Error saving resume file: {e}")
            return jsonify({'message': 'Failed to save resume file'}), 500
    else:
        return jsonify({'message': 'File type not allowed. Only PDF files are accepted.'}), 400


if __name__ == '__main__':
    app.run(debug=True, port=5000) # Run on port 5000
