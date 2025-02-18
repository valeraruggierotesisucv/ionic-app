import './Avatar.css';

const IMAGE_PLACEHOLDER = '';

interface AvatarProps {
  source?: string;
  size?: number;
}

export function Avatar({ source, size = 40 }: AvatarProps) {
  return (
    <img
      src={source || IMAGE_PLACEHOLDER}
      className="avatar"
      style={{ 
        width: size,
        height: size,
      }}
      alt="Profile"
    />
  );
} 