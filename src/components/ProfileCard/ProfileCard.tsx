import './ProfileCard.css';
import { Avatar } from '../Avatar/Avatar';

interface ProfileCardProps {
  profileImage?: string;
  username: string;
  biography: string;
  events: number;
  followers: number;
  following: number;
  isFollowing?: boolean;
  onEditProfile?: () => void;
  onConfigureProfile?: () => void;
  onFollow?: () => void;
  onEvents?: () => void;
  onFollowers?: () => void;
  onFollowed?: () => void;
  disableFollowButton?: boolean;
}

export function ProfileCard({
  profileImage,
  username,
  biography,
  events,
  followers,
  following,
  isFollowing = false,
  onFollow,
  onConfigureProfile,
  onEditProfile,
  onEvents,
  onFollowers,
  onFollowed,
  disableFollowButton = false,
}: ProfileCardProps) {

  return (
    <div className="profile-card">
      <div className="profile-content">
        <div className="header-section">
          <Avatar source={profileImage} size={80} />
          <div className="stats-container">
            <button className="stat-item" onClick={onEvents}>
              <span className="stat-number">{events}</span>
              <span className="stat-label">Events</span>
            </button>
            <button className="stat-item" onClick={onFollowers}>
              <span className="stat-number">{followers}</span>
              <span className="stat-label">Followers</span>
            </button>
            <button className="stat-item" onClick={onFollowed}>
              <span className="stat-number">{following}</span>
              <span className="stat-label">Following</span>
            </button>
          </div>
        </div>
        
        <div className="user-info">
          <h2 className="username">{username}</h2>
          <p className="biography">{biography}</p>
        </div>

        <div className="button-container">
          {onFollow && (
            <button
              className={`continue-button ${isFollowing ? 'unfollow-button' : ''}`}
              onClick={onFollow}
              disabled={disableFollowButton}
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}

          {onEditProfile && (
            <button
              className="profile-button"
              onClick={onEditProfile}
            >
              Edit Profile
            </button>
          )}
          
          {onConfigureProfile && (
            <button
              className="profile-button"
              onClick={onConfigureProfile}
            >
              Configure Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
