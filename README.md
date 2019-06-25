# keeper

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
