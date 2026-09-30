from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Student Tech Hub API")

# Enable CORS (Cross-Origin Resource Sharing) so frontend can call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Pydantic model for registration request body
class Registration(BaseModel):
    name: str
    email: str

# In-memory storage for registrations (for demonstration)
registrations_db = []

# Sample event data
events_db = [
    {
        "id": 1,
        "title": "AI & ML Workshop for Beginners",
        "date": "October 15, 2026",
        "time": "5:00 PM - 7:00 PM",
        "location": "Auditorium A & Online",
        "description": "Learn the basics of Artificial Intelligence and Machine Learning with hands-on Python exercises."
    },
    {
        "id": 2,
        "title": "Hackathon 2026: Build for Good",
        "date": "November 5-6, 2026",
        "time": "9:00 AM kickoff",
        "location": "Student Innovation Lab",
        "description": "Join teams, solve real-world community challenges, and win exciting prizes!"
    },
    {
        "id": 3,
        "title": "Web Development Tech Talk",
        "date": "November 20, 2026",
        "time": "4:00 PM - 5:30 PM",
        "location": "Room 302",
        "description": "Discover modern web design principles, REST APIs, and responsive CSS tricks."
    }
]

@app.get("/")
def read_root():
    return {"message": "Welcome to Student Tech Hub API!"}

@app.get("/api/events")
def get_events():
    """GET endpoint returning upcoming technical events."""
    return {"events": events_db}

@app.post("/api/register")
def register_student(data: Registration):
    """POST endpoint receiving student name and email."""
    registrations_db.append(data.dict())
    return {
        "status": "success",
        "message": f"Thank you {data.name}! Your registration was successful.",
        "received": data
    }
