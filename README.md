## Quick Start

#### Install dependencies
`npm install`

#### Make sure to run to compile jsx files

`npx babel --presets react-app/prod --extensions ".jsx" public --watch public
--out-dir public &`

#### Server on localhost:55106

`npm start` or `npm miniServer3` or `node miniServer3`

#### Setup Database

`node createDB.js`

#### Instructions

HTML file used is `index.html` all front end is completed and inside
`translations.jsx`. However there is no connection between all the pages yet.
The current page is the page when it is the user's first time. To see the other
pages you may comment and uncomment the last three react components in
`translations.jsx` to render the other templates. Unfortunately the other pages
do not have functionality yet. 

On the first time page. The user may input a word on the left and when they hit
enter it will translate on the right. The user may then store this instance
inside the database by hitting the save button.