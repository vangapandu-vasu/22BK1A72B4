import  { useState } from 'react';
import axios from 'axios';


function Home() {
  const [url, setUrl] = useState('');
  const [shortId, setShortId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      alert("URL cannot be empty");
      return;
    }

    try {
      const response = await axios.post("http://localhost:9000/urlshort", { url }, {
        withCredentials: true,
      });

      // Assuming the response is JSON with shortId
      if (response.data && response.data.id) {
        setShortId(response.data.id);
      } else {
        alert("URL generated but no ID returned.");
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
      alert("Failed to shorten URL");
    }
  };

  return (
    <div className="url-shortener">
      <h1>URL SHORTENER</h1>

      {shortId && (
        <p>
          GENERATED URL:{' '}
          <a
            href={`https://urlshortener-ebkh.onrender.com/${shortId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://urlshortener-ebkh.onrender.com/{shortId}
          </a>
        </p>
      )}

      <div className="fo">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ENTER URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit">Generate</button>
        </form>
      </div>
    </div>
  );
}

export default Home;