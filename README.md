# TesterMatcher
This application connects to a MySQL database and uses API calls to make queries to it.

I decided to use this stack, (MySQL, Node, Express, written in TypeScript) because the problem presented seemed best modeled in a relational database. I wanted to make a 
REST API to connect to the database and make requests to it because that is likely how the problem would be approached in a real world scenario. A SQL query or 
function could have solved the problem, but the ability to use this stack to add new entries to the database, add a front end, and make database requests asynchronously made this approach more attractive. 

I considered other implementations, including Java Spring Boot, but resorted to using Node because of familiarity.

Libraries Used:
MySQL2: A library that allows connection to a MySQL database and queries written in TypeScript to be read by the database.
Express: Manage routes and set up server.

Included is a video in the res folder of various requests. I populated the database manually and it only exists locally right now, so I don't have a solution for loading the database onto another machine right now.  
