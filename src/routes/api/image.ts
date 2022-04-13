import express from 'express';

const image = express.Router();

// health check endpoint
image.get('/', (req, res) => {
    res.send(req.query);
});

export default image;