const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define a schema and model for video data
const videoSchema = new mongoose.Schema({
  channelId: String,
  title: String,
  videoId: String,
  videoLink: String,
});

const Video = mongoose.model('Video', videoSchema);

// API endpoint to get videos
app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    const reversedVideos = videos.reverse(); // Reverse the array of videos
    res.json(reversedVideos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


