<h1 align='center'>Weather App</h1>

<h3 align='center'> :umbrella: A simple weather  application written in reactjs. :sunny:</h3>



### Screenshot
![light theme](https://github.com/foxching/weather/blob/master/public/images/screenshot/weather2.png)


### Installation

Install all the dependencies

```sh
$ yarn install or
$ npm install
```

### Serve
To serve in the browser  

```sh
$ yarn start or
$ npm start
```
Serve on localhost:300



[Demo](https://chingweatherapp.netlify.app/ "Demo")


### License

This project is licensed under the MIT License

npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev @babel/core
npm install --save-dev babel-loader
npm install --save-dev sass-loader node-sass node-less
npm install --save-dev node-sass

"start": "react-scripts start",
"start": "node_modules/.bin/webpack-dev-server --config webpack.config.js",
"start": "webpack-cli serve --mode development"
"start": "concurrently --kill-others \"less-watch-compiler --config less-watcher.config.json\" \"react-scripts start\"",