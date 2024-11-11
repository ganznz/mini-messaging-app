# Mini Messaging App

A simple real-time messaging application built with TypeScript, Express, React, and MongoDB.

For a more comprehensive list of technologies used, see below.

## Prerequisites
- Node.js (v18 or higher)
- npm
- MongoDB Atlas account

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/ganznz/mini-messaging-app.git
cd mini-messaging-app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create environment files
Create `.env` in the server directory and paste the following:
```env
NODE_ENV=dev ## dev | prod
MONGODB_CONNECTION_CREDENTIALS=<db_username>:<db_password>
MONGODB_CLUSTER_NAME=<cluster_name> ## e.g. if Cluster0, then "cluster0", if My Cluster then "my-cluster"
CLIENT_URL_DEV="http://localhost:5173" ## dev client url
CLIENT_URL_PROD=<your_production_url> ## prod client url
```

Create `.env` in the client directory and paste the following:
```env
VITE_ENV=dev ## dev | prod
VITE_API_URL_DEV=http://localhost:8080 ## express server dev url. requests redirected here
VITE_API_URL_PROD=<your_production_url> ## prod server url
```

## Running the application in dev mode
#### **Run the following cmds from the root directory.**
### 1. Start the server
```bash
npm run dev-server
```
### 2. Start the client
```bash
npm run dev-client
```
#### Open your browser and navigate to `http://localhost:5173`

## Technologies used
- TypeScript
- Express
- Socket.IO
- MongoDB
- React
- Tailwind CSS
- Vite
- [shadcn components](https://ui.shadcn.com/)
- [lucide icons](https://lucide.dev/)
- Zod (form schema validation)

## License
[MIT](https://choosealicense.com/licenses/mit/)
