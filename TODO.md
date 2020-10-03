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
    - get, DONE users, DONE thoughts, DONE reactions, friends
    - update, DONE users, DONE thoughts, reactions, friends
    - delete, DONE users, DONE thoughts, reactions, friends