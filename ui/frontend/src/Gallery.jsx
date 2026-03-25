import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  data,
  useLocation,
} from "react-router-dom";

const Gallery = ({ query }) => {
  const [images, setImages] = useState(null);
  const apiKey = "oQlOCXPVR3uFW8QHZ9eCQEw5ynlZFeszLatPHGRPttJlnYgOsQfNilnm";

  useEffect(() => {
    const url = `https://api.pexels.com/v1/search?query=${query}&per_page=7`;
    fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, [query]);

  if (!images) return <h1>No Images for this country oh noooo</h1>;

  return (
    <>
      <div className="main-gallery-card">
        <h3 className="gallery-title">Gallery</h3>
        <div className="images-grid">
          {images.photos.map((photo) => {
            return (
              <div className="photo-frame">
                <img src={photo.src.original} alt={photo.alt}></img>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Gallery;
