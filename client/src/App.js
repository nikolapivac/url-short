import React, { useState } from "react";
import './App.css';

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const shorten = async (e) => {
    e.preventDefault();
    
    // send the long URL to the server 
    const response = await fetch("http://localhost:5001/api/url/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({longUrl})
    });

    // get the short URL
    const data = await response.json();
    setShortUrl(data.shortUrl);
  }

  return (
    <div className="main">

      <h1 className="title">URL shortener</h1>
      <form className="form" onSubmit={shorten}>
          <div className="input-container">
            <input type="text" id="input" required="" placeholder="Enter URL" value={longUrl} onChange={(e) => setLongUrl(e.target.value)} />
          </div>
          <button className="submitBtn" type="submit">SHORTEN</button>
      </form>

      {shortUrl && (
        <div className="short">
          Short URL:    <a href={shortUrl}>{shortUrl}</a>
        </div>
      )}

    </div>
  );
}

export default App;
