# Community Forum

Community Forum is a frontend application.

## Features

- Create an announcement and a post
- Edit, like, delete, comment a post and an announcement
- Search posts and announcements
- User authentication

## Installation

1. Clone the repository: `git clone https://github.com/raniamo8/Forum.git`
2. Navigate to the project directory: `cd forum`
3. Install the dependencies: `npm install`

## Run Configuration
To Create a built in server you need to follow this steps

1. Edit configurations.
2. Add new configuration.
3. Select a JavaScript Debug.
4. Enter the name 'Local Server'.
5. Enter the URL 'http://localhost:63342/Forum/src/html/pages/login.html'.
6. Choose a browser to debug with.
7. Apply and click 'Ok'


Note: This frontend application can only run with a built in server.

## Usage

1. Choose the run configuration 'Local Server'
2. Click 'Run Local Server'

## JSDoc

1. Install Dependencies globally:

```
npm install -g jsdoc
```
```
npm install --save-dev jsdoc
```
2. Change Directory 
```
cd webtech_project
```

## Jest

1. Install Dependencies globally:
```
npm install --save-dev jest
```
2. Run all tests:
```
npm run test
```

## Folder Structure

```
Forum
├── .vscode
├── __tests__
├── docs
├── node_modules
├── src
│   ├── assets
│   │   ├── images
│   │   │   ├── deos-logo.png
│   │   │   └── deos-logo-white.png
│   │   └── videos
│   │       └── willkommen-admin.mp4
│   ├── css
│   │   ├── footer.css
│   │   ├── global-styles.css
│   │   ├── header.css
│   │   ├── home.css
│   │   ├── index.css
│   │   └── post-detail.css
│   ├── html
│   │   └── pages
│   │       ├── home.html
│   │       ├── login.html
│   │       ├── post-detail.html
│   │       └── welcome.html
│   └── js
│       ├── home.js
│       ├── login.js
│       ├── logout.js
│       ├── post-detail.js
│       └── search.js
├── .gitignore
├── app.js
├── jsdoc.json
├── LICENSE
├── package.json
└── package-lock.json
└── README.md

```


## License

This project is licensed under the [Eclipse Public License 2.0]([https://github.com/raniamo8/Forum/blob/master/LICENSE]).

