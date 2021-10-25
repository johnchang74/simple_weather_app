npm install --save-dev webpack webpack-cli webpack-dev-server
npm install --save-dev @babel/core
npm install --save-dev babel-loader
npm install --save-dev sass-loader node-sass node-less
npm install --save-dev node-sass

"start": "react-scripts start",
"start": "node_modules/.bin/webpack-dev-server --config webpack.config.js",
"start": "webpack-cli serve --mode development"
"start": "concurrently --kill-others \"less-watch-compiler --config less-watcher.config.json\" \"react-scripts start\"",