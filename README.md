# Async Tic-Tac-Toe

This is a simple tic-tac-toe game built with [React](https://reactjs.org/) and [Firebase](https://firebase.google.com/). It allows users to play tic-tac-toe against each other in real-time, using Firebase's firestore database to keep the game state synced between players.

## Prerequisites

Before you can run this project, you'll need to have the following software installed on your computer:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (should come with Node.js)

## Getting Started

To get started, follow these steps:

1.  Clone this repository to your local machine using `git clone https://github.com/the-mr-compiler/async-tic-tac-toe.git`.
2.  Navigate to the project directory and install the dependencies by running `npm install`.
3.  Create a new Firebase project and get your Firebase config by following the steps in the next section.
4.  In src `src/firebase/firebase.js` change the firebaseConfig object with new firebase config from previous section
5.  Run the project in development mode by running `npm start`. This will start a local development server and open the game in your default web browser.

## Creating a New Firebase Project

To create a new Firebase project and get your Firebase config:

1.  Go to the [Firebase console](https://console.firebase.google.com/).
2.  Click the "Add project" button.
3.  Give your project a name and click "Continue".
4.  Enable the "Google Analytics" for your project and click "Create project".
5.  Click the "Web" icon to set up a new web app for your project.
6.  Give your app a nickname and click "Register app".
7.  Copy the Firebase config object from the Firebase console and use it to replace the firebaseConfig in `src/firebase/firebase.js` file as described in the previous section.

## Deploying to Production

To build and deploy the production version of the app, run the following command:

Copy code

`npm run build`

This will create a production-ready build of the app in the `build` folder. You can then serve the app using any static file server, such as [Firebase Hosting](https://firebase.google.com/docs/hosting/).

## Built With

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)

## Author

[Meghanath Nalawade](https://github.com/the-mr-compiler)
