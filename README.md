# keeper

[See keeper in production](https://geckoboard-keeper.herokuapp.com/) (⚠️ Keeper is currently broken)

Keeper helps you set and track team goals... keeper... goal keeper... get it?

It's a simple app that lets you create a set of team goals. Each goal can be assigned a set of Clubhouse cards and Keeper will tell you when those cards are done.

![image](https://user-images.githubusercontent.com/6588325/127516556-04986d8a-5ce7-40d4-b0ab-3232d1771127.png)

## How it works

This repo contains a Node server and a client React app. The server uses a PostgreSQL for storing a list of teams and a set of goals for each team. The server exposes endpoints for:

Local data (teams and goals)

- `GET /api/teams` List all teams
- `GET /api/teams/:teamId` Get a single team
- `GET /api/:teamId/goals` List a teams goals
- `POST /api/:teamId/goals` Create a goal
- `PUT /api/:teamId/goals` Update a goal
- `DELETE /api/:teamId/goals` Delete a goal
- `PUT /api/:teamId/goals/orders` Reorder cards in a goal

It also exposes some endpoints that forward requests to Clubhouse

- `GET /api/members` Get Clubhouse members
- `GET /api/projects` Get Clubhouse projects
- `GET /api/stories` Get Clubhouse stories relating to a single team
- `POST /api/stories` Add a Clubhouse card to the Ready column of a project

And finally it exposes a webhook endpoint that Clubhouse posts to so that the app updates in real time

- `POST /api/webhook` Receives Clubhouse webhooks

## Setup

This is how to get keeper running on your machine so that you're able to work on it.

### Clubhouse API key
Before getting started, login to clubhouse to generate an API key. You can do this from your account settings -> API key. Make a note of this token, it's a good idea to store it in your 1password.

### 1. Clone the repo and install node modules
```
git clone git@github.com:geckoboard/keeper.git
cd keeper
yarn
```

### 2. Install postgresql and create the keeper database
```
brew install postgresql
createdb keeper-dev
```

If creating the db gives you an error, postgresql might not be running. To start it run this:
```
brew services start postgresql
```

### 3. Update the keeper config file
In `server/server/config/config.json`, change the username `dan` to the username on your machine. If you don't know what it is, `whoami` will give it to you.

### 4. Run the db migrations
Run this from the `server/server/` directory:

```
cd server/server/
npx sequelize-cli db:migrate
```

### 5. Add the API key to environment variables
Create a new file in the `/server` directory named `.env`. Add the clubhouse API key to this file:
```
CLUBHOUSE_API_KEY=YOUR_API_KEY
```

### 6. Start the keeper server and client
```
cd server && yarn start
cd client && yarn start
```
