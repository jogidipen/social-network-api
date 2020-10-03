## User Story
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

## Acceptance Criteria

GIVEN a social network API
DONE WHEN I enter the command to invoke the application
DONE THEN 
  * DONE my server is started 
  * DONE and the Mongoose models are synced to the MongoDB database
WHEN I test API GET, POST, PUT, and DELETE routes in Insomnia Core
THEN 
  * I am able to successfully 
    - create, DONE users, DONE thoughts, DONE reactions, friends
    - get, DONE users, DONE thoughts, (single user has both populated schemas of thoughts and friends), (all users have only the thoughtId's, and friendId's, with the counts displayed for thoughts and friends )
    - update, DONE users, DONE thoughts, DONE reactions, 
    - delete, DONE users, DONE thoughts, DONE reactions, friends




 [ x ] - place the user id into the thought object of which user created that thought.