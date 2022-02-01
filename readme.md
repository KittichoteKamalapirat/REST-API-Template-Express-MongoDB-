# REST API with express template

A REST Express API template for cruding post with MongoDB.

## Function

- CRUD post

## Technologies

- NodeJS
- Express
- MongoDB
- Mongoose

### Guidelines to replicate

1. Instantiate an express app

- Don't forget to create a middleware `app.use(express.json())` so we can access `req.body`. Otherwise it will be `undefined`

2. Connect to MongoDB

- `mongoose.connect(process.env.DATABASE_URL);`
- save in `.env` file for security. Ex. `DATABASE_URL=mongodb://localhost/dbname` ( Usually in this format)

3. Create a mongoose Schema

- in `/models/Post.js`, `/models.User.js`

4. Create an api router. For exmaple.

- folder `/routes/posts` -> define endpoint like `/api/posts`
- folder `/routes/users` -> define endpoint like `/api/users`

5. Define crud routes in each router file

- Also create middleware if needed. Like getting the user by `req.params.id`

6. Test the API with rest client extension in VS code is super easy.

- Create a file ending with `.rest` or `.http`
