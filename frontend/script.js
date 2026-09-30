// FastAPI backend URL (running default uvicorn port 8000)
const API_BASE_URL = 'http://127.0.0.1:8000';

// DOM Elements
const loadEventsBtn = document.getElementById('load-events-btn');
const eventsContainer = document.getElementById('events-container');
const registrationForm = document.getElementById('registration-form');
const responseMessage = document.getElementById('response-message');

// Event Listener: Load Events from Backend GET /api/events
loadEventsBtn.addEventListener('click', fetchEvents);

// Event Listener: Submit Registration Form to Backend POST /api/register
registrationForm.addEventListener('submit', handleRegistration);

/**
 * Fetch list of events from backend API and render to DOM
 */
async function fetchEvents() {
    loadEventsBtn.disabled = true;
    loadEventsBtn.textContent = 'Loading...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/api/events`);
        
        if (!response.ok) {
            throw new Error(`Server returned status ${response.status}`);
        }

        const data = await response.json();
        renderEvents(data.events);

    } catch (error) {
        console.error('Error fetching events:', error);
        eventsContainer.innerHTML = `
            <p class="placeholder-text" style="color: #e74c3c;">
                Failed to load events. Make sure your FastAPI backend server is running on ${API_BASE_URL}!
            </p>
        `;
    } finally {
        loadEventsBtn.disabled = false;
        loadEventsBtn.textContent = 'Load Events';
    }
}

/**
 * Render array of event objects into HTML cards
 */
function renderEvents(events) {
    if (!events || events.length === 0) {
        eventsContainer.innerHTML = '<p class="placeholder-text">No upcoming events found.</p>';
        return;
    }

    eventsContainer.innerHTML = events.map(event => `
        <div class="event-card">
            <h3>${escapeHtml(event.title)}</h3>
            <div class="event-meta">
                📅 ${escapeHtml(event.date)} | ⏰ ${escapeHtml(event.time)}<br>
                📍 ${escapeHtml(event.location)}
            </div>
            <p class="event-desc">${escapeHtml(event.description)}</p>
        </div>
    `).join('');
}

/**
 * Handle user registration form submit
 */
async function handleRegistration(event) {
    event.preventDefault(); // Prevent default page refresh on form submit

    const nameInput = document.getElementById('student-name');
    const emailInput = document.getElementById('student-email');

    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
    };

    // Hide previous messages
    responseMessage.className = 'message-box hidden';

    try {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(data.message, 'success');
            registrationForm.reset(); // Clear input fields
        } else {
            showMessage(data.detail || 'Failed to submit registration.', 'error');
        }

    } catch (error) {
        console.error('Error registering student:', error);
        showMessage(`Could not connect to backend server. Make sure FastAPI is running on ${API_BASE_URL}!`, 'error');
    }
}

/**
 * Helper to display UI feedback messages
 */
function showMessage(text, type) {
    responseMessage.textContent = text;
    responseMessage.className = `message-box ${type}`;
}

/**
 * Basic helper to sanitize string input before inserting into HTML
 */
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
