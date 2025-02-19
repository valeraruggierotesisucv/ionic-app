import { useState, useRef, useEffect } from 'react';
import { formatDate } from '../../utils/formatDate';
import './CommentItem.css';

const MAX_LINES = 3;

interface CommentItemProps {
  username: string;
  comment: string;
  timestamp: Date;
  likes?: number;
  userAvatar?: string;
  onLike?: () => void;
  onReply?: () => void;
}

export function CommentItem({
  username,
  comment,
  timestamp,
  userAvatar,
}: CommentItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasTextOverflow, setHasTextOverflow] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const formattedTimestamp = formatDate(timestamp);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight);
      const height = textRef.current.scrollHeight;
      const maxHeight = lineHeight * MAX_LINES;
      setHasTextOverflow(height > maxHeight);
    }
  }, [comment]);

  return (
    <div className="comment-container">
      <div className="avatar-container">
        {userAvatar ? (
          <img src={userAvatar} alt={username} className="avatar" />
        ) : (
          <div className="avatar default-avatar" />
        )}
      </div>

      <div className="content-container">
        <div className="header-container">
          <span className="username">{username}</span>
          <span className="timestamp">{formattedTimestamp}</span>
        </div>

        <div className="comment-content">
          <p
            ref={textRef}
            className={`comment-text ${isExpanded ? 'expanded' : ''}`}
          >
            {comment}
          </p>

          {hasTextOverflow && (
            <button
              className="see-more-button"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
