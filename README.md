# About
This repository includes the capstone projects that were developed as progression indicators for each main module of a web application course for full stack development in udemy.

# Personal Site
First simple capstone project for basic HTML and CSS usage. It is a personal CV-like website design that can be run using `live server`.

# Blog Web Application
This project is a blog web application that uses `Node js`, `Express js`, and `body-parser` _without_ a database connection. The users can create posts and the main page will display it and they can be edited.

## To run:
First open your terminal and move to the Blog Web Application repository. 

Then run:
```npm i```
to install the node modules,
```node index.js```
then check the
```http://localhost:3000/```
url to see it.

# Space API website
This project is a website made using  Node js, Express js, Axios, body-parser, and dotenv _without_ a database connection. It is a space themed website that usses the APOD API from NASA to receive Astronomy images to display daily. 
There is also a search function to enter a date range to get an image for specific dates.

## To run:
First open your terminal and move to the Space API website repository.

Then run: 
```npm i```
to install the node modules.

Then create a .env file that contains `API_KEY` and `URL` information. 

```
API_KEY= # Your NASA API key
URL= # URL of APOD with api_key param that you can find from https://api.nasa.gov/ example: https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
```

Then in ternminal run: 
```
node index.js
```
then check the
```http://localhost:3000/```
url to see it.

# Book Website
This project uses Node js, Express js, body-parser, dotenv and pg for PostgreSQL connection. This website is a book blog website that uses Open Library's Cover API to display the book's cover. The user can write a review on books they read and enter the ISBN number for the cover.

## To run:
First open your terminal and move to the Book Website.

Then run: 
```npm i```
to install the node modules.

Create a .env file that holds:
```
USER= # Your PostgreSQL usser name
HOST= # Host
DB= # Database name 
PASSWORD= # PostgreSQL password
PORT= # PostgreSQL port
```


Then in ternminal run: 
```
node index.js
```
then check the
```http://localhost:3000/```
url to see it.