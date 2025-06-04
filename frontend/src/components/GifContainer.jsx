import { getTrendingGifs } from '../adapters/giphyAdapters';
import { useEffect, useState } from 'react';

function GifContainer() {
    const [gifs, setGifs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const doFetch = async () => {
            const [data, error] = await getTrendingGifs();
            if (error) {
                setError(error);
            } else {
                setGifs(data.data);
            }
        };
        doFetch();
    }, []);

    if (error) {
        return (
            <div>
                <h3>Sorry, we couldn't fetch the gifs at this time.</h3>
            </div>
        );
    }

    return (
        <ul>
            {gifs.map((gif) => (
                <li key={gif.id}>
                    <img src={gif.images.original.url} alt={gif.title || 'GIF'} />
                </li>
            ))}
        </ul>
    );
}

export default GifContainer;
