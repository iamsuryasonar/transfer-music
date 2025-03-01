const getAllPlaylistItemsFromYoutube = async (apiKey, playlistId) => {
    let allItems = [];
    let nextPageToken = "";

    do {
        const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
        url.searchParams.append("part", "snippet");
        url.searchParams.append("playlistId", playlistId);
        url.searchParams.append("maxResults", "50");

        if (nextPageToken) {
            url.searchParams.append("pageToken", nextPageToken);
        }

        url.searchParams.append("key", apiKey);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();

            allItems.push(...data.items);

            nextPageToken = data.nextPageToken || "";
        } catch (error) {
            console.error("Error fetching playlist items:", error);
            break;
        }
    } while (nextPageToken);

    return allItems;
}

const getAllPlaylistItemsFromSpotify = async (accessToken, playlistId) => {
    let result = [];
    let total = 10;

    do {
        const url = new URL(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${result.length}`);

        try {
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            total = data.total;
            result.push(...data.items);


        } catch (error) {
            console.error("Error fetching playlist items:", error);
            break;
        }
    } while (result.length < total);

    return result;
}

const getTokenFromSpotify = async () => {
    const url = new URL("https://accounts.spotify.com/api/token");
    url.searchParams.append("grant_type", "client_credentials");
    url.searchParams.append("client_id", process.env.OAUTH_CLIENT_ID);
    url.searchParams.append("client_secret", process.env.YOUTUBE_CLIENT_SECRET);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        return accessToken = data.access_token;
    } catch (error) {
        console.error("Error fetching token:", error);
    }
}

module.exports = {
    getAllPlaylistItemsFromYoutube,
    getAllPlaylistItemsFromSpotify,
    getTokenFromSpotify
}