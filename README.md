
# Leave Portal

This is a web application built using Node.js, React.js, and MongoDB that allows users to track, approve, or reject leave requests for students or employees. The application supports two types of accounts: user and admin. 

Live site : https://leaveportal.vercel.app/
## Features

- User Registration and Sign-in: Users can create an account and sign in to the application.
- Leave Application: Users can apply for leave by providing necessary details.
- Leave Approval/Rejection: Admin users can view all leave requests and approve or reject them.
- Leave Records: Users can view their previous leave records.
- JWT Token System: The application uses JWT tokens for secure communication between the client and server.
- Responsive Design: The website is fully responsive and supports mobile views.
- Pagination: Leave records and leave requests are paginated for better user experience.








## Technologies used

- Frontend: ReactJS
- Backend: Node.js, Express.js, JWT, CORS, Mongoose, MongoDB
## Installation

- Clone the repository to your local machine
- Install the required dependencies by running npm install
- Set up environment variables:

Rename the .env.example file in the server directory to .env.
Update the necessary environment variables in the .env file, such as database credentials and JWT secret.

- Start the server by running

```bash
cd ../server
npm start   
``` 
- Start the client:
```bash
cd ../client
npm start 
``` 
- Open the application in your browser:
```bash
http://localhost:3000 
``` 

    
## Contributing

Contributions are welcome! If you find any bugs or want to enhance the application, feel free to submit an issue or pull request.

## Credits

 - This project was created by [Renjith Samuel](https://renjithsamuel.onrender.com/). 

## License

[MIT](https://choosealicense.com/licenses/mit/)

