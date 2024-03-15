const express = require('express');
const uploadRoute = require('./controller/routeUpload');

const app = express();
const PORT = 3000;
app.use(express.json());


//the route 
app.use("/api/users" , uploadRoute);


//posrt connection 
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

//cloudinary account:  https://cloudinary.com/signup