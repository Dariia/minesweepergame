# Minesweeper app

## Instructions for MineSweeper

You are presented with a board of squares. Some squares contain mines (bombs), others don't. If you click on a square containing a bomb, you lose. If you manage to click all the squares (without clicking on any bombs) you win.
Clicking a square which doesn't have a bomb reveals the number of neighbouring squares containing bombs. Use this information plus some guess work to avoid the bombs.
To open a square, point at the square and click on it. To mark a square you think is a bomb, point and right-click (or hover with the mouse and press Space).

## Introduction to project
The project is configured using [**Webpack**](https://webpack.js.org/) and [**Babel**](https://babeljs.io/) and it also has a test configuration, running tests using [**Jest**](https://facebook.github.io/jest/) with [**enzyme**](https://github.com/airbnb/enzyme).

It follows the [`eslint-config-fortech-react`](https://github.com/FortechRomania/eslint-config-fortech-react) ESLint config standard for modern JavaScript and React.

The complete tools/modules used in this project are listed in **_package.json_**.

## Getting Started
To get started you can simply clone the repository and install the dependencies:


### Install project dependencies
```
npm install
```


### Run the server
```
npm run dev
```


> The application is running now, so open a browser and navigate to **_localhost:8080_**

You should see a message displayed on the screen, letting you know that it works.



### Running tests
Alternatively, if you want to run tests with jest, just write this command in the terminal:

```
npm run test
```


### Project Structure
The project has three main folders:
- **_src_** - containing the main folders and files (js, css etc.)
- **_tests_** - contains the test files
- **_test-config_** - contains the setup needed for running tests with enzyme
