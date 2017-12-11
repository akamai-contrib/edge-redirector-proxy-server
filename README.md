# Edge Redirector PRoxy Server Setup

## Prerequisies

* Make sure you have Node.js installed.
* Globally install the Swagger library `npm install -g swagger`.

## Setup

1. Clone the repo, and navigate to the repo.
2. **If you do not have swagger installed globally - you will need this before
   continuing.** `npm install -g swagger`
3. Run `npm install` to install the necessary dependencies.
4. Configure your API endpoints in Akamai Luna console to generate the
   appropriate API keys and place them into an `.edgerc` file in the root folder
   of the application.
5. Start the services using 'npm run', or 'swagger project start'.

## Documentation

For in depth look at how each API endpoint works and what data is required, see
'http://localhost:8080/docs/'.
