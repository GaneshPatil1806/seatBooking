const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/theatre', require('../routes/theatreRoutes'));
app.use('/api/movie', require('../routes/movieRoutes'));

app.get('/ram', (req, res) => {
    res.send('Hello');
});

// Start the server
app.listen(PORT, () => {
    console.log("Server is up on port", PORT);
});
