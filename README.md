# ATG-challenge

ATG has branched out into movie award shows and we need your help. Please build us an app to help manage our favourite movies.

### The Challenge
React.js/Django web app that can search OMDB for movies and allow the user to save their favourite films to the database. Five is the maximum movies a user can have saved, 
and they should be notified when five has been reached.

### Functionality
- Search OMDB and display the results (movies only)
- Add a movie from the search results to the database
- View the list of films already saved in the database
- Remove movies saved in the database

### Tech-Stack
- Front-end: React.JS, Redux
- Back-end: Django, SQLite

### Potential Improvement
#### Frontend
There are some possible improvements that could be done in the code:
- Separating Concerns: It would be beneficial to move the API calls to a separate file or utility. This way, the logic for fetching data will be separate from the component, making the code more organized and reusable.
- Handling Errors: Implementing better error handling and displaying clear error messages to the user can be helpful. This involves catching specific types of errors, dealing with network errors appropriately, and providing relevant feedback to the user.
- Hide secret keys: use env file to store api keys.

#### Backend
-  In the Movie model, one potential improvement could be to avoid using JSONField and instead define separate model fields for the data that is currently stored as a JSON object.


#### Demo
[Demo video](demo-video.mp4)
