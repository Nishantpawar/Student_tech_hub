# Student Tech Hub 🎓

A beginner-friendly full-stack web application designed for students to explore upcoming technical events, workshops, and hackathons, as well as register for updates.

Built using plain **HTML, CSS, and Vanilla JavaScript** for the frontend and **Python with FastAPI** for the backend.

---

## 📁 Project Structure

```text
student-tech-hub/
├── frontend/
│   ├── index.html     # Web page structure and UI components
│   ├── style.css      # Clean modern responsive styling
│   └── script.js      # Vanilla JavaScript for API calls & DOM manipulation
├── backend/
│   ├── main.py        # FastAPI web server and endpoints
│   └── requirements.txt # Python dependencies (fastapi, uvicorn)
└── README.md          # Project documentation and guide
```

---

## 🚀 How to Install and Run

### 1. Prerequisites
Make sure you have **Python 3.8+** installed on your system.

---

### 2. Backend Setup & Run

1. Open your terminal or command prompt and navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install the required Python libraries:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the FastAPI backend server using Uvicorn:
   ```bash
   uvicorn main:app --reload
   ```

4. The backend server will start running at:
   - **API Server Base URL:** `http://127.0.0.1:8000`
   - **Interactive API Docs (Swagger UI):** `http://127.0.0.1:8000/docs`

---

### 3. Frontend Setup & Run

The frontend is built using standard HTML, CSS, and JS, so **no installation or build step is needed**.

1. Open the `frontend` folder.
2. Double-click `index.html` to open it directly in any modern web browser (e.g., Chrome, Edge, Firefox).
3. Alternatively, if you use VS Code, you can right-click `index.html` and select **"Open with Live Server"**.

---

## 🔗 How Frontend & Backend Communicate

The application connects the frontend web page with the Python FastAPI backend through **REST API HTTP endpoints**:

1. **Fetching Events (GET Request)**:
   - Clicking the **"Load Events"** button triggers an asynchronous JavaScript `fetch()` request to `http://127.0.0.1:8000/api/events`.
   - The FastAPI backend receives the request and returns a JSON list of upcoming technical events.
   - `script.js` dynamically updates the web page DOM to render the event cards.

2. **Submitting Student Registration (POST Request)**:
   - When a student enters their name and email and clicks **"Register Now"**, `script.js` prevents the default page reload (`event.preventDefault()`).
   - The JavaScript gathers the input values and sends a `POST` request with a JSON payload to `http://127.0.0.1:8000/api/register`.
   - FastAPI parses and validates the data using **Pydantic** models, stores it in memory, and returns a JSON confirmation message back to the frontend.
   - A success message is displayed directly on the webpage.

3. **CORS (Cross-Origin Resource Sharing)**:
   - Because the frontend runs from a local file (`file://`) or a different port (e.g., `http://127.0.0.1:5500`) than the backend (`http://127.0.0.1:8000`), CORS middleware is enabled in `main.py` using `CORSMiddleware`. This allows the browser to make cross-origin requests safely without getting blocked.
