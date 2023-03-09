const express = require('express');
// const router = require('./src/routes/routes');
const app = express();
const validateToken = require('./src/middlewares/auth.token');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000']
}));

app.use(validateToken);
app.get('/', (req, res) => {
  res.send('This is backend service');
}
);

// app.use('/api', router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}
);
