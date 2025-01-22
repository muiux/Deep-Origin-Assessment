# URL Shortener

A simple web application to create and manage shortened URLs, making it easier to share and access long links.

## Features
- **URL Shortening**: Convert long URLs into short, easy-to-share links.
- **Redirection**: Accessing the shortened link redirects to the original URL.
- **Slug Management**: Unique slugs for each URL, with an option to customize.
- **URL Validation**: Ensures the input is a valid URL.
- **Visit Tracking**: Monitor the number of visits for each shortened URL.
- **Error Handling**: Displays 404 for invalid slugs and errors for invalid inputs.
- **Copy to Clipboard**: Quickly copy the shortened URL.
- **Rate-Limiting**: Prevent abuse with request limits.
- **Standards Compliance**: API follows the JSON:API specification.

## Tech Stack
### Frontend
- React with TypeScript
- Tailwind CSS and Daisy UI for React
### Backend
- Node.js with TypeScript
- Express.js
- MongoDB
### Deployment
- Docker for containerization

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/muiux/Deep-Origin-Assessment
   cd url-shortener
2. **Start the Application**:
- Build and run with Docker:
    ```bash
    docker compose up
- Alternatively, start manually:
    ```bash
    # Backend
    cd url-server
    npm install
    npm run dev

    # Frontend
    cd url-shortener
    npm install
    npm start

## Usage
- Open the app in your browser at http://localhost:3000
- Enter a URL in the form and submit.
- Access the short URL to get redirected to the original link.

## Extra Features
- **Custom Slug:** Update or delete a custom slug for your URL.
- **Visit Tracking:** View the visit count for shortened URLs.
- **Rate Limiting:** Protect the service from abuse.

## API Endpoints
- **POST** /url/shorten: Create a new slug.
- **PATCH** /url/redirect/:slug: Redirect to the original URL.
- **GET** /url/getlist: Fetch all the info related to URLs such as original URL, slug, visit count.
- **PATCH** /url/update: Update the slug for the user.
- **DELETE** /url/delete: Delete the URLs.