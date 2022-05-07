# Zero_Balance_Assignment

An API that allows its users to retrive movie list, rate a movie and view all movies title along with their respective ratings

## Table of Contents
* Generalinfo
* Technology
* Setup
* Functionality
* status

## Introduction
    
  The Application helps users to rate their favourite movies through API calls. Express is used with Node.js due to its fast, 
  unopinionated, minimalist web framework. MongoDB used to store data of users and the movies due to its avaliability of large
  range of Schema and ease to use. 
    
## Technology
    1. Node.js
    2. Express
    3. MongoDB
    4. Mongoose

## Setup
   Make sure that Node.js, Mongodb, robo3T, VS Code(any text editor) and Postman are installed in your local system. 
   Open the terminal and type the following commands
   * npm install --save-dev nodemon
   * npm install
   * create a .env file in the root of the project
   * Paste the following in your .env file
        ACCESS_TOKEN_SECRET = "Enter a Secret of your choice"
   * To run the project type **npm start** in the terminal

## Functionality

   ## Register User 
        To Register a new user "POST" request has to be sent to /user/register with _name, email, password
        age, mv1(1st movie name), mv1Rating(rating of mv1), mv2, mv2Rating, mv3, mv3Rating, mv4, mv4Rating, mv5,
        mv5Rating_ in the request body. Onece the registration is done the user is created and can continue to login. The 
        following image give a picture of registration request.
![register](https://user-images.githubusercontent.com/76957372/167250441-1bed146e-669b-4e72-b952-3028de2227e2.png)

   ## Login User
        Once the user is registered the user can send a "POST" request to /user/login with _email and password_ 
        in the request body. On a successful login the user will be given an accesstoken(The accessToken expires 
        after 30mintues) which can be used to retrive movie list and rate a movie.Note: The following picture paints 
        the image of the above statements.
 ![login](https://user-images.githubusercontent.com/76957372/167250519-2c507b6f-7d32-4bb1-ba6d-573e5625935c.png)
   ## Fetch Movie List      
        To retrive movie list send a "GET" request to /movie/list with header holding the value of accessToken
        against key 'auth-token'. The accessToken expires after 30mins so may get a Forbidden error, in that case login
        again and generate a new token and replace the header with the new token. Refer to below image incase of any doubts.
 ![Fetch List](https://user-images.githubusercontent.com/76957372/167250917-46994ef6-0d04-4d7f-b090-7375a9246b88.png)
   ## Search Movie
         To search a movie send a "GET" request to /movie/search with movie name in the body. send the movie name as
         a value against key 'movie'. Refer to the below image for more clarity.
![search](https://user-images.githubusercontent.com/76957372/167251238-7fd86c57-721b-4227-9314-885b3e14b53e.png)
   ## Rate a Movie
        Copy the id of a movie that you want to rate, paste the id in params against key id(reger image), in the Header
        section paste the access token against key "auth-token", add the rating(from 1-5) you wish to give to the movie
        in the body against key "rating" and send a "POST" request to /movie/rate/:id . If the accessToken is expired
        you will get a "Forbidden Error" in that case generate a new accessToken and paste it in the Header.
![Screenshot (334)](https://user-images.githubusercontent.com/76957372/167251321-80bc1b9e-b5e9-4cd7-91d2-40d10095cb51.png)
![Screenshot (335)](https://user-images.githubusercontent.com/76957372/167251329-499aa8ad-4755-4d09-bfdb-46d088ec89ca.png)
![Screenshot (336)](https://user-images.githubusercontent.com/76957372/167251337-99bdfe33-b09c-4fd3-9d31-9df62d8635f9.png)
   ## Open List
        This is an open API that shows the list of movies in the list along with their rating, to view this send a 
        "GET" request to /movie/open-list. Have a look at the below image for clarification.
![open_List](https://user-images.githubusercontent.com/76957372/167251022-bf148141-7cbf-4ef5-be54-006bb40468b9.png)




## Status
    This project is completely developed and has all required functionality. 
