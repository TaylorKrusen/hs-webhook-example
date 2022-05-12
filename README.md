1. Clone this repo to your local environment and run `npm install`.
2. Copy your HelloSign API Key into the _.env-example_ file and rename it to .env
3. From the root folder of this repo, run `node server` to start the express server.
4. In a separate shell, `ngrok http 8080` (port must match `PORT` in the server.js file). This creates a public url to your localhost which is used for webhooks.
5. Copy the forwarded https url from ngrok.
6. In the HelloSign [API Settings page](https://app.hellosign.com/home/myAccount?current_tab=integrations#api), paste the copied ngrok url into the "Account callback" field and append the /hellosign-events POST route defined in _server.js_. (My callback url looks like this: `https://a0a5-50-47-128-110.ngrok.io/hs-events`)  
7. Click the "test" button to verify your webhook handler is working. You should see a success message that your server received the test event.
8. You're all set. Now you can observe callback events as you're tinkering with the API.