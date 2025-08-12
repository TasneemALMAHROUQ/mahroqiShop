const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;


const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth'); // ← أضف هذا

app.use(cors());
app.use(bodyParser.json());


app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter); 

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
