### Transfer music

A react app to transfer music from spotify to youtube and vice versa.

**Installation**
Clone the Repository

`git clone https://github.com/iamsuryasonar/transfer-music.git`
Change directory to server for backend and client for frontend.

**Install Dependencies**
-Frontend and backend
`npm install`

**Environment Variables(backend):**
Create a .env file in the root directory and add the following environment variables:

- Frontend
```
VITE_GOOGLE_OAUTH_CLIENT_ID="Oauth client id"
```

- Backend
```
OAUTH_CLIENT_ID="Oauth client id"
YOUTUBE_API_KEY = 'google api key'
YOUTUBE_CLIENT_ID = 'google client id'
YOUTUBE_CLIENT_SECRET = 'google client secret'
```

**Run the Application**
- Frontend & backend
`npm run start`