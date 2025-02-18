import { searchOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search',
  className = '',
  ariaLabel = 'Search input',
}: SearchBarProps) {
  return (
    <div className={`search-bar-container ${className}`}>
      <div className="search-bar-wrapper">
        <IonIcon 
          icon={searchOutline} 
          style={{ 
            width: '20px', 
            height: '20px', 
            
            position: 'absolute',
            left: '12px'
          }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          aria-label={ariaLabel}
        />
      </div>
    </div>
  );
}
