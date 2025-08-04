# HTML to PDF Server

This is a Node.js server that accepts HTML via a POST request and returns a PDF generated using Puppeteer.

## How to Use

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. Send a POST request to `http://localhost:3000/html-to-pdf` with your HTML in the request body (Content-Type: text/html).

The server will respond with a PDF file generated from the provided HTML.
# utils
