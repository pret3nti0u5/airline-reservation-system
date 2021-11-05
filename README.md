# Some MERN Boiler Plate Code

### This some MERN Boilerplate code along with a boilerplate READEM.md.

<div align="center"><img src="" alt="insert project image here" width="1000" /></div>
<br/>

## Getting Started

### Development

#### Using Host Modules

This method requires `node version 12+` and `npm version 6.4+` installed on your machine.

```zsh
git clone https://github.com/pret3nti0u5/forum-like-quora.git
cd forum-like-quora
npm i                   #Install server side dependencies
npm run client-install  #Install client side dependencies
npm run dev             #You will have to setup all the required env variable in ./config/dev.env for this to work perfectly
```

This will start the react-dev-server on localhost on `port:3000` and the node-backend-server on `port:5000`.
You will have to setup your env variables in ./config/dev.env, which includes the server port.

You can also run the react-dev-server and node-backend-server separately using the following commands

```zsh
npm run server #Start node-backend-server on port 5000 using nodemon (auto server restart on code change)
npm run start  #Start node-backend-server on port 5000 using node (no auto reload)
npm run client #Start react-dev-server on port 3000
```

#### Using Docker Container Modules

This method only requires that you have the `Docker engine` and `docker-compose` installed on your machine.

- Added benefits to this method other than the ones that docker already provides is you are not confined to developing in the docker container. You can also develop using your local modules as defined above.
- Before spinning up your docker containers you will need to go to `./client/package.json` and change `proxy` from `http://localhost:5000` to `http://node_server:5000`.

```zsh
docker-compose up  #Starts the react-dev-server on localhost:3000 and node-server on localhost:5000
```

This will start the react-dev-server on localhost on `port:3000` and the node-backend-server on `port:5000`.
You will have to setup your env variables in ./config/dev.env, which includes the server port.

You can even run it detached in the background using the -d option.

```zsh
docker-compose up -d
docker-compose logs  #To view server logs
```

npm packages for the frontend or backend can be installed using `docker-compose exec`

```zsh
docker-compose exec -w /usr/src/node_server node_server npm install --save <package name>  #Install npm package for node-backend-server
docker-compose exec -w /usr/src/react_server react_server npm install --save <package name> #Install npm package for react-dev-server
```

Once done developing, you can clean up running containers and networks using:

```zsh
docker-compose down
```

### Production

Once you have made all the changes that you require you can push to production by -
<br/>

- Changing the `callbackURL` in `./middleware/passport-setup.js` and the `base_URI` in `./client/src/components/LoginPage.js` and `./client/src/components/Navbar.js` to the url this platform is being hosted on.

```zsh
cd client
npm run build
```

On build finish you can deploy it to the hosting provider of your choice.

#### Deployment to Heroku

If you plan to deploy it to heroku then I would suggest not deleting the Procfile or the heroku-postbuild script.

You can deploy to Heroku using the following steps.

- Ensure that you have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed.
- Run the following command

```zsh
heroku create [unique herkou repository name]
heroku config:set [env-variable-key:env-variable-value] #for all the env variables set up in ./config/dev.env
git add -A
git commit -m "Deploying to heroku"
git push heroku master
```

## Motivation

Some of this Readme.md will require changing according to the project that you're developing. Like this section for instance.

## Technologies Used

The platform has been developed using the **MERN** Stack. The exact use of each component of the MERN Stack and the technologies used have been described below

- **React** - Frontend for this app has been developed using ReactJS using [Create React App](https://github.com/facebook/create-react-app) bolierplate.

  - [**React Redux**](https://github.com/reduxjs/react-redux) - For State management.
  - [**React Router**](https://github.com/ReactTraining/react-router) - Most of the navigation is handled using React Router, only falling back to server side routing for Google Oauth steps.
  - [**Axios**](https://github.com/axios/axios) - For making api requests to the backend.
  - [**Bulma CSS**](https://bulma.io/) - Helps in making the app responsive and gives the app a neat uniform look.

- **Express** - Backend for this app has been made using the [Express](https://expressjs.com/) framework.

  - [**PassportJS**](http://www.passportjs.org/) - Google Oauth 2.0 strategy has been used and currently is the only method for authentication for this app. Suits my needs as I need to lock this app down so that it can be used only by students of my university.
  - [**cookie-session**](https://github.com/expressjs/cookie-session) - For generating cookies.

- **MongoDB** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) has been used for spinning up a free DB for this app.
  - [**mongoose**](https://mongoosejs.com/) - ODM library for MongoDB.

## To-Do List

- [ ] Complete Project.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## Show your support

If you got until here, show your love hitting the ⭐️ button, I'd really appreciate it.
