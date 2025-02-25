import './ProfileCard.css';
import { Avatar } from '../Avatar/Avatar';
import { IMAGE_PLACEHOLDER } from '../../utils/consts';
import { useTranslation } from 'react-i18next';

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
  profileImage=IMAGE_PLACEHOLDER,
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
  const { t } = useTranslation();
  return (
    <div className="profile-card">
      <div className="profile-content">
        <div className="header-section">
          <Avatar source={profileImage} size={80} />
          <div className="stats-container">
            <button className="stat-item" onClick={onEvents}>
              <span className="stat-number">{events}</span>
              <span className="stat-label">{t("profile.events")}</span>
            </button>
            <button className="stat-item" onClick={onFollowers}>
              <span className="stat-number">{followers}</span>
              <span className="stat-label">{t("profile.followers")}</span>
            </button>
            <button className="stat-item" onClick={onFollowed}>
              <span className="stat-number">{following}</span>
              <span className="stat-label">{t("profile.following")}</span>
            </button>
          </div>
        </div>
        
        <div className="userCard-info">
          <h2 className="username">{username}</h2>
          <p className="biography">{biography}</p>
        </div>

        <div className="profileCard-button-container">
          {onFollow && (
            <button
              className={`continue-button ${isFollowing ? 'unfollow-button' : ''}`}
              onClick={onFollow}
              disabled={disableFollowButton}
            >
              {isFollowing ? t('common.unfollow') : t('common.follow')}
            </button>
          )}

          {onEditProfile && (
            <button
              className="profile-button"
              onClick={onEditProfile}
            >
              {t('profile.edit_profile')}
            </button>
          )}
          
          {onConfigureProfile && (
            <button
              className="profile-button"
              onClick={onConfigureProfile}
            >
              {t('profile.configure_profile')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
