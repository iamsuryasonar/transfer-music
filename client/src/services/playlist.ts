export async function getPlaylistItemsFromYoutube(url: string) {
    const data = {
        playlistUrl: url,
    }

    try {
        const response: any = await fetch(
            'http://localhost:3000/youtube-to-spotify',
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.error}`);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error)
    }
}

export async function getPlaylistItemsFromSpotify(url: string) {
    const data = {
        playlistUrl: url,
    }

    try {
        const response: any = await fetch(
            'http://localhost:3000/spotify-to-youtube',
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.error}`);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.log(error)
    }
}