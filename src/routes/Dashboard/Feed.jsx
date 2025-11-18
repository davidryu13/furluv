import React, { useState } from 'react';
import '../../styles/feed.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';

export default function Feed() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Fluffy just had a walk!',
      content: 'Check out the latest updates from pet lovers near you.',
      image: '/assets/fluffy-walk.jpg', // replace with your image
      liked: false,
      comments: ['So cute!', 'Love it!'],
      showComments: false
    },
    {
      id: 2,
      title: 'New Puppy Listing',
      content: 'A cute Labrador is available for adoption.',
      image: '/assets/labrador.jpg', // replace with your image
      liked: false,
      comments: ['I want this puppy!', 'Adorable!'],
      showComments: false
    }
  ]);

  const toggleLike = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, liked: !post.liked } : post));
  };

  const toggleComments = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, showComments: !post.showComments } : post));
  };

  const addComment = (id, comment) => {
    if (!comment) return;
    setPosts(posts.map(post => post.id === id ? { ...post, comments: [...post.comments, comment] } : post));
  };

  return (
    <div className="feed-page">
      <h2>Feed</h2>
      <div className="feed-container">
        {posts.map(post => (
          <div key={post.id} className="feed-post">
            <div className="post-image">
              {post.image && <img src={post.image} alt={post.title} />}
            </div>
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>

            <div className="feed-actions">
              <span onClick={() => toggleLike(post.id)}>
                {post.liked ? <AiFillHeart className="heart liked" /> : <AiOutlineHeart className="heart" />}
              </span>
              <span onClick={() => toggleComments(post.id)}>
                <FaRegComment className="comment-icon" />
              </span>
            </div>

            {post.showComments && (
              <div className="comment-section">
                <div className="existing-comments">
                  {post.comments.map((c, idx) => (
                    <p key={idx} className="comment">{c}</p>
                  ))}
                </div>
                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        addComment(post.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
