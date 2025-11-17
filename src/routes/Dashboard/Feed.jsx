import React from 'react';
import '../../styles/feed.css';

export default function Feed() {
  return (
    <div className="feed-page">
      <h2>Feed</h2>
      <div className="feed-post">
        <h3>Fluffy just had a walk!</h3>
        <p>Check out the latest updates from pet lovers near you.</p>
      </div>
      <div className="feed-post">
        <h3>New Puppy Listing</h3>
        <p>A cute Labrador is available for adoption.</p>
      </div>
    </div>
  );
}
