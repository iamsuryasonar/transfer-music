import { useState } from 'react'
import { getPlaylistItemsFromSpotify, getPlaylistItemsFromYoutube } from '../services/playlist';

declare global {
    interface Window {
        google: any;
    }
}

function TransferPage() {
    const [input, setInput] = useState<string>('');
    const [type, setType] = useState('spotify_to_youtube');

    const googleLoginHandler = () => {
        if (window?.google) {
            const tokenClient = window.google.accounts.oauth2.initTokenClient({
                client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
                scope: 'https://www.googleapis.com/auth/youtube',
                callback: (response: any) => {
                    if (response.access_token) {
                        return response.access_token;
                    } else {
                        return null;
                    }
                }
            });
            tokenClient.requestAccessToken();
        } else {
            return null;
        }
    }

    async function handleClick() {

        if (type === 'spotify_to_youtube') {
            // fetch all items in the playlist from spotify
            // log in to google for permission and access token
            // add each playlistItem to youtube
            // display success toast

            let playlistItems = getPlaylistItemsFromSpotify(input);
            let token = googleLoginHandler();
            if (!token) return;

        } else if (type === 'youtube_to_spotify') {

            // fetch all items in the playlist from youtube
            // log in to spotify for permission and access token
            // add each playlistItem to spotify
            // display success toast

            let playlistItems = getPlaylistItemsFromYoutube(input);
        }
        setInput('');
    }

    return (
        <div className='w-full h-screen bg-slate-900 text-white flex'>
            <div className='m-auto w-[500px] p-6 flex flex-col gap-2'>
                <label className='flex gap-2 items-center'>
                    <input type='radio'
                        name='spotify to youtube'
                        value={'spotify_to_youtube'}
                        checked={type === 'spotify_to_youtube'}
                        onChange={(e) => setType(e.target.value)}></input>
                    Spotify to youtube
                </label>
                <label className='flex gap-2 items-center'>
                    <input type='radio'
                        name='youtube to spotify'
                        value={'youtube_to_spotify'}
                        checked={type === 'youtube_to_spotify'}
                        onChange={(e) => setType(e.target.value)}></input>
                    Youtube to spotify
                </label>
                <div className='flex items-center gap-4'>
                    <input className='p-1 border-1 border-white w-full text-white' onChange={(e) => setInput(e.target.value)} value={input} placeholder={`Paste url of ${type === 'spotify_to_youtube' ? 'spotify' : 'youtube'} playlist`}></input>
                    <button className='px-2 py-1 border-1 border-white' onClick={handleClick}>Transfer</button>
                </div>
            </div>
        </div>
    )
}

export default TransferPage;
