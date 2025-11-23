// src/routes/Dashboard/Feed.jsx
import React, { useState, memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/feed.css';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import Avatar from 'react-avatar';

// Memoized Comment to prevent unnecessary re-renders
const Comment = memo(function Comment({ postId, comment, onReact, onReply }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const [showMessageConfirm, setShowMessageConfirm] = useState(false);

  const navigate = useNavigate();

  const reactionsAvailable = ['👍', '❤️', '😂', '😮', '😢', '👏'];

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText('');
      setShowReplyInput(false);
    }
  };

  const handleReactionSelect = (reaction) => {
    onReact(comment.id, reaction);
    setShowReactionPicker(false);
  };

  const handleMessageClick = () => {
    navigate('/dashboard/messages', { state: { user: comment.user } });
    setShowMessageConfirm(false);
  };

  return (
    <div className="comment">
      <Avatar
        name={comment.user.name}
        round={true}
        size="36"
        className="comment-avatar"
        onClick={() => setShowMessageConfirm(true)}
        style={{ cursor: 'pointer' }}
      />
      <div className="comment-body">
        <div
          className="comment-username"
          onClick={() => setShowMessageConfirm(true)}
          style={{ cursor: 'pointer' }}
        >
          {comment.user.name}
        </div>
        <div>{comment.text}</div>

        <div className="comment-reactions">
          {comment.reactions && Object.entries(comment.reactions).length > 0 &&
            Object.entries(comment.reactions).map(([reaction, count]) => (
              <div
                key={reaction}
                className="comment-reaction-btn"
                onClick={() => onReact(comment.id, reaction)}
                title={`React with ${reaction}`}
              >
                {reaction} {count}
              </div>
            ))
          }

          <div
            className="comment-reaction-picker-toggle"
            onClick={() => setShowReactionPicker(!showReactionPicker)}
            title="Add reaction"
          >
            🐶
          </div>

          {showReactionPicker && (
            <div className="comment-reaction-picker">
              {reactionsAvailable.map((reaction) => (
                <span
                  key={reaction}
                  className="comment-reaction-picker-btn"
                  onClick={() => handleReactionSelect(reaction)}
                >
                  {reaction}
                </span>
              ))}
            </div>
          )}
        </div>

        <div
          className="comment-reply-btn"
          onClick={() => setShowReplyInput(!showReplyInput)}
          tabIndex={0}
          role="button"
          onKeyPress={(e) => {
            if (e.key === 'Enter') setShowReplyInput(!showReplyInput);
          }}
        >
          Reply
        </div>

        {showReplyInput && (
          <div className="comment-reply-input-container">
            <input
              type="text"
              className="comment-input"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write a reply..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleReplySubmit();
              }}
              aria-label="Write a reply"
              autoFocus
            />
            <button
              className="comment-send-btn"
              onClick={handleReplySubmit}
              aria-label="Send reply"
            >
              Send
            </button>
          </div>
        )}

        {comment.replies && comment.replies.length > 0 && (
          <div className="comment-replies">
            {comment.replies.map((reply) => (
              <Comment
                key={reply.id}
                postId={postId}
                comment={reply}
                onReact={onReact}
                onReply={onReply}
              />
            ))}
          </div>
        )}
      </div>

      {showMessageConfirm && (
        <div
          className="message-confirm-overlay"
          onClick={() => setShowMessageConfirm(false)}
        >
          <div
            className="message-confirm-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="message-confirm-text">Message <strong>{comment.user.name}</strong>?</p>
            <div className="message-confirm-buttons">
              <button className="btn btn-message" onClick={handleMessageClick}>Message</button>
              <button className="btn btn-cancel" onClick={() => setShowMessageConfirm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

// FeedCard without animation
function FeedCard({ post, toggleLike, toggleComments, handleReact, handleReply }) {
  return (
    <div className="feed-card">
      <img src={post.image} alt={post.title} className="feed-img" />

      <div className="feed-caption">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>

      <div className="feed-actions">
        <span onClick={() => toggleLike(post.id)} style={{ cursor: 'pointer' }}>
          {post.liked ? (
            <AiFillHeart className="heart liked" />
          ) : (
            <AiOutlineHeart className="heart" />
          )}
        </span>

        <span onClick={() => toggleComments(post.id)} style={{ cursor: 'pointer' }}>
          <FaRegComment className="comment-icon" />
        </span>
      </div>

      {post.showComments && (
        <div className="comment-section">
          <div className="existing-comments">
            {post.comments.map((comment) => (
              <Comment
                key={comment.id}
                postId={post.id}
                comment={comment}
                onReact={(commentId, reaction) =>
                  handleReact(post.id, commentId, reaction)
                }
                onReply={(commentId, replyText) =>
                  handleReply(post.id, commentId, replyText)
                }
              />
            ))}
          </div>

          <input
            type="text"
            placeholder="Add a comment..."
            className="comment-input"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const value = e.target.value.trim();
                if (value) {
                  handleReply(post.id, null, value);
                  e.target.value = '';
                }
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default function Feed({ posts, setPosts }) {
  // Add default comments on mount if none exist (testing only)
  useEffect(() => {
    if (posts.length === 0) return;
    let changed = false;
    const newPosts = posts.map(post => {
      if (!post.comments || post.comments.length === 0) {
        changed = true;
        return {
          ...post,
          showComments: true,
          comments: [
            {
              id: 101,
              user: { name: "Alice" },
              text: "Great post!",
              reactions: { "❤️": 2 },
              replies: [],
            },
            {
              id: 102,
              user: { name: "Bob" },
              text: "Thanks for sharing.",
              reactions: {},
              replies: [],
            }
          ],
        };
      }
      return post;
    });

    if (changed) {
      setPosts(newPosts);
    }
  }, [posts, setPosts]);

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const toggleComments = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, showComments: !post.showComments } : post
      )
    );
  };

  const handleReact = (postId, commentId, reaction) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        const addReaction = (comments) =>
          comments.map((c) => {
            if (c.id === commentId) {
              const newReactions = { ...c.reactions };
              newReactions[reaction] = (newReactions[reaction] || 0) + 1;
              return { ...c, reactions: newReactions };
            }
            if (c.replies?.length > 0) {
              return { ...c, replies: addReaction(c.replies) };
            }
            return c;
          });

        return { ...post, comments: addReaction(post.comments) };
      })
    );
  };

  const handleReply = (postId, parentCommentId, replyText) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: Date.now(),
      user: { name: 'You', avatar: 'https://i.pravatar.cc/150?u=you' },
      text: replyText,
      reactions: {},
      replies: [],
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        if (parentCommentId === null) {
          return { ...post, comments: [...post.comments, newReply] };
        }

        const addReply = (comments) =>
          comments.map((c) => {
            if (c.id === parentCommentId) {
              return { ...c, replies: [...c.replies, newReply] };
            }
            if (c.replies?.length > 0) {
              return { ...c, replies: addReply(c.replies) };
            }
            return c;
          });

        return { ...post, comments: addReply(post.comments) };
      })
    );
  };

  return (
    <div className="feed-page">
      <h2 className="feed-title">Feed</h2>

      <div className="feed-container">
        {posts.map((post) => (
          <FeedCard
            key={post.id}
            post={post}
            toggleLike={toggleLike}
            toggleComments={toggleComments}
            handleReact={handleReact}
            handleReply={handleReply}
          />
        ))}
      </div>
    </div>
  );
}
