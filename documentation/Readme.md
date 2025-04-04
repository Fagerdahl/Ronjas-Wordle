# This is a Repository for my own version of Wordle

_ _Figma Design:_ _ https://www.figma.com/design/aKxmfxzUziLLlGa4TJb2Bi/Ronjas-Wordle?node-id=0-1&p=f&t=Donb6lAhhpLaXOcV-0

_________________________________________________________________________________________
# MAIN PAGES
1. Start page where the game is played (React)
2. About us PAGE (Static)
-static HTML or React page with information about the project, tools used, and purpose
3. Highscore List (SSR Backend)
-Has its own URL Route, Data is fetched from a database and page is server-side rendered 
__________________________________________________________________________________________

# Server & Functionality
The app runs at: http://localhost:5080
Fullstack app with three Routes (Startpage/Game, info & highscore)

# The GAME
GUI built with React (mobile-first approach)

User can choose word length and whether repeated letters are allowed

A word is randomly selected via a backend API using algorithmB

User enters guesses in a free text field

Feedback is provided using algorithmA:
Green = correct letter and position
Yellow = correct letter, wrong position
Red = incorrect letter

When the correct word is guessed:
The user can enter their name
The result (name, time, guesses, settings) is saved to the database

# The TECHNICALS
_ _Frontend:_ _ React is my chosen library to build dynamic UI.  

_ _Backend:_ _ Node.js + Express 
Node.js lets me run JS on the server, Express defines routes and API:s.

_ _Testing:_ _ Jest is my chosen JS framework to test my logic. 

_ _Database:_ _ MongoDB is my database of choise. Mongoose= Thirdpart library.

__________________________________________________________________________________________________________

# REST API DESIGN/Backend structure
_ _Mainfunction of my API:_ _ 
- Save Gameresults
- Show Highscore
- Delete data or show details?

## API Endpoints

### POST /api/highscore
Saves a new highscore in my database
Method: Post

**Body (JSON):**
{
  "username": "Ronja",
  "score": 3,
  "guesses": ["sunny", "flute", "winner"]
}

Answer: {
  "message": "Highscore saved!",
    "data": {
    "_id": "abc123",
    "username": "Ronja",
    "score": 3,
    "guesses": ["sunny", "flute", "winner"],
    "createdAt": "2025-04-03T12:00:00Z"
  }
}

### GET /api/highscore
Gets the highscore with the best results and lowest rate of guessed words
Method: Get
Query: limit (/api/highscore?limit=5)
sort=asc

Answer:
[
  { "username": "Henry", "score": 2 },
  { "username": "Ronja", "score": 3 }
]

### DELETE /api/highscore/:id
To delete a highscore based on an ID
Method: Delete

Answer
{ "message": "Highscore deleted" }