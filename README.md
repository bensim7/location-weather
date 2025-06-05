# Get Location and Weather

- React / TypeScript application that fetches the user's IP-based location and displays current weather information based the the location of the user.
- It has responsive layout implemented through tailwindcss that uses different styles and sizes based on screen width.
- It has a dark/light mode toggle with Material UI icons and and placeholders for data before they are populated.

## Features

- Gets user location based on IP address using ipstack API
- Retrieves weather data for the user's location using weatherstack API
- Dark/Light mode toggle with Material UI slider switch
- Responsive layout and differing styles for large screen and smaller screen devices e.g. desktop or mobile
- Placeholder containers maintain layout for before the data is populated and after the data is populated
- Error and loading states

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Material UI Icons
- Axios

## Setup Instructions

1. cd to the root folder
   cd location-weather-ben

2. Install dependecies
   npm install

3. Create a .env file in the root directory and add the following:
   REACT_APP_IPSTACK_API_KEY=insert_your_ipstack_API_key
   REACT_APP_WEATHERSTACK_API_KEY=insert_your_weatherstack_API_key

4. Build and start the development server
   npm run build
   npm start

5. Troubleshooting
   In case of any issues with dependencies or modules not found, install the dependencies manually if needed:

- npm install -D tailwindcss@3 postcss autoprefixer
- npx tailwindcss init
- npm install axios
- npm install @mui/icons-material @mui/material @emotion/react @emotion/styled
