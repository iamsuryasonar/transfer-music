const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const parseUrl = require('parse-url');
require('dotenv').config();
const { getAllPlaylistItemsFromYoutube, getAllPlaylistItemsFromSpotify, getTokenFromSpotify } = require('./services/index');
const youtubePlaylist = require('./youtubeplaylist.json');
const spotifyPlaylist = require('./spotifyplaylist.json');

app.use(cors({
    origin: '*',
}));

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.post('/youtube-to-spotify', async (req, res) => {
    try {
        // const { playlistUrl } = req.body;

        // // extract playlist id query param from url
        // const playlistId = parseUrl(playlistUrl).query?.list;

        // if (!playlistId) return res.status(400).json({ error: 'invalid playlist url' });

        // const results = await getAllPlaylistItemsFromYoutube(process.env.YOUTUBE_API_KEY, playlistId);
        res.json(youtubePlaylist);
        // res.json(result);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'error occurred'
        });
    }
})

app.post('/spotify-to-youtube', async (req, res) => {
    try {
        const { playlistUrl } = req.body;

        // // extract playlist id query param from url
        // const urlData = parseUrl(playlistUrl);
        // let playlistId = '';

        // if (urlData.host === 'open.spotify.com') {
        //     let index = urlData.pathname.indexOf('playlist/');
        //     playlistId = urlData.pathname.slice(index + 9);
        // }

        // if (!playlistId) return res.status(400).json({ error: 'invalid playlist url' });

        // let ACCESS_TOKEN = await getTokenFromSpotify();
        // let songs = await getAllPlaylistItemsFromSpotify(ACCESS_TOKEN, playlistId);

        res.json(spotifyPlaylist);
        // res.json(songs);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'error occurred'
        });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})