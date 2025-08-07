const express = require('express');
const bodyParser = require('body-parser');
const puppeteer = require('puppeteer');
const fs = require('fs');
const os = require('os');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.text({ type: 'text/html' }));

app.post('/html-to-pdf', async (req, res) => {
    const html = req.body;
    if (!html) {
        return res.status(400).send('No HTML provided');
    }
    // Save HTML to a temp file in the ../tmp directory
    const tempDir = path.join(__dirname, '../tmp');
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
    }
    const tempFile = path.join(tempDir, `html-to-pdf-${Date.now()}.html`);
    try {
        fs.writeFileSync(tempFile, html, 'utf8');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('file://' + tempFile, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();
        // Clean up temp file
        fs.unlinkSync(tempFile);
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="output.pdf"',
        });
        res.send(pdfBuffer);
    } catch (err) {
        // Clean up temp file if it exists
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        res.status(500).send('Error generating PDF: ' + err.message);
    }
});

    app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    });
