import React, { FC, useState } from "react";
import { backendUrl } from "./environment";
import toast, { Toaster } from 'react-hot-toast';

/**
 * This is the root component for the frontend application.
 */
export const App: FC = (_) => {
  //
  // Do whatever you need to do here to make the frontend work.
  //
  const [fadeIn, setFadeIn] = useState(false);
  const [copied, setCopied] = useState(false);

  const [url, setUrl] = useState("");
  const [shortened, setShortened] = useState("");

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  }

  const shorten = async () => {
    fetch(`${backendUrl}/shorten`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFadeIn(true);
        if (!data.data)
          throw new Error(data.message);

        setShortened(data.data.shortCode);
      })
      .catch((error) => {
        console.log("Error:", error);
        toast.error(error.message);
      });
  }


  console.log("API URL:", backendUrl);

  return (
    <>
      <div>
        <h1>Small URI</h1>

        {
          shortened == "" ?
            <div className="shorten">
              <label>My URL</label>
              <input key={"url-input"} onChange={handleUrlChange} data-testid="url" />

              <button onClick={shorten}>Shorten</button>
            </div>
            :
            <div className={`shortened ${fadeIn ? 'fade-in' : ''}`} onAnimationEnd={() => setFadeIn(false)}>
              <label>Shortened URL</label>
              <input
                key={"shortened-input"}
                value={`${backendUrl}/${shortened}`}
                readOnly
                data-testid="shortened" />

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${backendUrl}/${shortened}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000); // hide after 2 seconds
                }}
              >Copy</button>
              {copied && <span className="copied-message">Copied!</span>}

              <button onClick={() => {
                setUrl("")
                setShortened("")
              }}>Shorten Next</button>
            </div>
        }
      </div>
      <Toaster />
    </>
  );
};
