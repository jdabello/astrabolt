# Astrabolt Backend

This is a simple backend, that uses `typescript`, `express`, `@datastax/astra-db-ts` and `langchain`, and is responsible for connecting to Astra DB, and retrieving the product catalog, and the similarity search queries from both text and images. This backend also uses Google's Gemini multimodal embeddings.

## Prerequisites:
Requires Node.js and npm (version 5.2 or later) to be installed.

## Start Backend:

1. Update `.env.template` with your Astra DB Token and Astra DB Endpoint, and load the environment variables.
    ```bash
    source .env
    ```
2. Execute the following command to authenticate with Google Cloud to use Vertex AI (Gemini). You can use alternative authentication mechanisms as documented [here](https://cloud.google.com/docs/authentication/provide-credentials-adc).
    ```bash
    gcloud auth application-default login
    ```
3.  In the `astrabolt-backend-js` execute the following command to install the dependencies.
    ```bash
    npm install
    ```
4.  In the `astrabolt-backend-js` execute the TypeScript compiler.
    ```bash
    npx tsc
    ```
5.  In the `astrabolt-backend-js` execute the following command to start the backend. You should see the message `Server listening on port 3001`. Make sure you are in the `astrabolt-backend-ts` directory.
    ```bash
    npm start
    ```
