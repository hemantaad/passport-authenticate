# Passport JWT Authentication

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE) [![Node.js](https://img.shields.io/badge/node-v20.10.0-green.svg)](https://nodejs.org/) [![Express.js](https://img.shields.io/badge/express-v4.18.2-blue.svg)](https://expressjs.com/) [![MongoDB](https://img.shields.io/badge/mongodb-v4.4.0-green.svg)](https://www.mongodb.com/) [![Passport](https://img.shields.io/badge/passport-v0.7.0-blue.svg)](http://www.passportjs.org/)

## Getting Started

This repository has two branches passport-local and passport-jwt. The passport-local branch implements session-based authentication using the Passport local strategy, while the passport-jwt branch utilizes the Passport JWT strategy.
The master branch is aligned with the **passport-jwt** branch, and the accompanying documentation is based on this strategy.

### Installation

Clone the repo:

```bash
git clone https://github.com/hemantaad/passport-authenticate.git
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

### Commands

Running locally:

```bash
npm run dev
```

## Project Structure

```
config              # Environment variables
src\
 |--config\         # configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--index.js        # App entry point
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\
`POST /v1/auth/refresh-tokens` - refresh auth tokens\

**User routes**:\
`GET /v1/users` - get all users\

## Error Handling

The app has a centralized error handling mechanism.

Controllers should try to catch the errors and forward them to the error handling middleware (by calling `next(error)`). For convenience, you can also wrap the controller inside the catchAsync utility wrapper, which forwards the error.

```javascript
const catchAsync = require("../utils/catchAsync");

const controller = catchAsync(async (req, res) => {
  // this error will be forwarded to the error handling middleware
  throw new Error("Something wrong happened");
});
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "message": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

The app has a utility ApiError class to which you can attach a response code and a message, and then throw it from anywhere (catchAsync will catch it).

For example, if you are trying to get a user from the DB who is not found, and you want to send a 404 error, the code should look something like:

```javascript
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");

const getUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
};
```

## Validation

Request data is validated using [Joi](https://hapi.dev/family/joi/). Check the [documentation](https://hapi.dev/family/joi/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validate` middleware.

```javascript
const express = require("express");
const validate = require("../../middlewares/validate");
const userValidation = require("../../validations/user.validation");
const userController = require("../../controllers/user.controller");

const router = express.Router();

router.post(
  "/users",
  validate(userValidation.createUser),
  userController.createUser
);
```

## Authentication

To require authentication for certain routes, you can use the `auth` middleware.

```javascript
const express = require("express");
const auth = require("../../middlewares/auth");
const userController = require("../../controllers/user.controller");

const router = express.Router();

router.post("/users", auth(), userController.createUser);
```

These routes require a valid JWT access token in the Authorization request header using the Bearer schema. If the request does not contain a valid access token, an Unauthorized (401) error is thrown.

**Generating Access Tokens**:

An access token can be generated by making a successful call to the register (`POST /v1/auth/register`) or login (`POST /v1/auth/login`) endpoints. The response of these endpoints also contains refresh tokens (explained below).

An access token is valid for 30 minutes. You can modify this expiration time by changing the `JWT_ACCESS_EXPIRATION_MINUTES` environment variable in thedevelopment.json file.

**Refreshing Access Tokens**:

After the access token expires, a new access token can be generated, by making a call to the refresh token endpoint (`POST /v1/auth/refresh-tokens`) and sending along a valid refresh token in the request body. This call returns a new access token and a new refresh token.

A refresh token is valid for 30 days. You can modify this expiration time by changing the `JWT_REFRESH_EXPIRATION_DAYS` environment variable in the development.json file.

## MongoDB Integration

This project uses MongoDB as the database to store user information. Make sure to have MongoDB installed and running on your local machine or provide the appropriate connection URI in your environment variables.

### MongoDB Configuration

The MongoDB connection details are specified in the `.env` file at the root of your project. Open the `.env` file and ensure the following variables are set according to your MongoDB setup:

```env
MONGODB_URI=mongodb://localhost:27017/your-database
```

## Conclusion

Congratulations! You've successfully set up the Passport JWT Authentication project. If you followed the installation and configuration steps above, your development environment should be ready to go.

Thank you for choosing this project template. Happy coding!

If you found this project helpful, consider giving it a star on GitHub and sharing it with others.

## Contribution

Contributions are welcome and encouraged! Here's how you can contribute to this project:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

Please make sure to follow the [code of conduct](CODE_OF_CONDUCT.md) and the [contribution guidelines](CONTRIBUTING.md) outlined in the repository. Your contributions help improve and grow the project, making it more valuable for the community.

Thank you for your contributions!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
