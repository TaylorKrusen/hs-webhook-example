const express = require('express');
require('dotenv').config();
const multer = require('multer');
const upload = multer();
const app = express();
const crypto = require('crypto');

const verifyEventHash = (event) => {
    const eventHash = event.event_hash;
    const apiKey = process.env['HS_API_KEY'];
    console.log(apiKey)
    const generatedHash = crypto.createHmac('sha256', apiKey).update(event.event_time + event.event_type).digest('hex').toString();
    // Sends back a boolean to confirm whether this payload is safe to process
    return Boolean(generatedHash === eventHash);
}

app.post('/hs-events', upload.array(), (req, res) => {
    // Grabs payload body and makes it easier to use
    const data = JSON.parse(req.body.json);
    const event = data.event;
    // Verify the event_event hash for security
    const isSafeEvent = verifyEventHash(event);
    // Bail out of unsafe payloads before they're processed
    if (!isSafeEvent) {
        console.log("Unsafe event. Can't verify source of data.");
        return res.status(401).end("Event hash doesn't match");
    }
    // Gives visbility into which events are firing throughout signing flow
    console.log('Received HelloSign event: ' + event.event_type);
    // The event_type is a good way to set a conditional
    // if (event.event_type === "signature_request_all_signed") {
     // do some stuff
    // }
    // but let's just log everything for now
    console.log(data)
    // HelloSign is expecting this in response to the events
    res.set('content-Type', 'text/plain');
    res.send('Hello API Event Received');
});

app.listen(8080, () => console.log('Example app is listening on port 8080.'));