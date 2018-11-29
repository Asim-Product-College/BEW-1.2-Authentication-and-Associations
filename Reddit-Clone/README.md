# Reddit-Clone

Step by step game plan. Here are some routes we can built.

Create a post
    1. Make a posts#new route (/posts/new) and template (posts_new.handlebars) - DONE
    2. Make create posts route and check that form data is sending to new route - DONE
Show all posts
    1. Make the root route (/) go to the posts#index route render a posts-index template
    2. Style the template and loop over the posts object
    3. Make route to posts#show route (/posts/:id)
    4. Style the template and display the post object
Comment on posts
 - comments model
 - comments controller
Create subreddit
 - implemented, not sure if working or not.
Create a post on a subreddit
 - not sure if this is working.
Show all subreddits
- not sure if this is working.
Sign up and Login
    - Make User model
    - Encrypt users' passwords
        Install bcryptjs to our project and require it in our model.
        Add a method to our user model that detects if the password attribute is being modified, and if it is salt and has the password to produce a password digest that we'll save into the database.
        Lastly, make a model method called comparePassword() that takes in an attempted password and returns true or false if the attempt matches what is in the database.
    - Create JWT and add cookies
    - Demonstrate that user is logged in and password is encrypted
    - Make /login route, template and form
    - Make POST /login route and logic
Associate posts, comments, and votes with their author
    - Check authentication and make req.user and currentUser objects
    - Add author attribute to comments and posts
    - Save the user as the author of posts
    - Display the author's username on posts and comments
    - Make comments on comments
    - Vote a post up or down

###Project setup instructions:
- Run $npm init


##MongoDB Notes

scaling is incriasinly expensieve 
slow reads and writes
slwo epxensive and complex failovers

scaling horizontally is a money first situation which is great because there's more
money than developer hours. - scalable 

dynamci object data model stored together

sql representation looks like excel

how mongodb affects project timeline - 
    mongoose is our persistence layer
    
why we learned mongodb rn - 
mongodb > sql
 
 

 #Challenges:
  - Displaying usernames on the frontend.
    - On get post/:id
        - find and render the post
        - find all comments with that post id...
            - for each of those comments, find their author's username to render.


# Learning Day 8: Authentication with JWT (JSON Web Tokens) in Node: https://github.com/Product-College-Courses/BEW-1.2-Authentication-and-Associations/tree/master/08-Authentication-Sessions-vs-JWT


- Compare and contrast session based authentication and JSON Web Token (JWT) authentication.
- Use express-jwt to add JWT authentication to an express server.