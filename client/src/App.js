import React, { useState } from "react";
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shorten = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/api/url/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({longUrl})
    });

    const data = await response.json();
    setShortUrl(data.shortUrl);
  }

  return (
    <div className="main">

      <h1 className="title">URL shortener</h1>
      <form onSubmit={shorten}>
        <label>Enter your URL here:</label>
        <input type="text" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} />
        <button type="submit">SHORTEN</button>
      </form>

      {shortUrl && (
        <div className="short">
          Short URL: <a href={shortUrl}>{shortUrl}</a>
        </div>
      )}

    </div>
  );
}

export default App;
