import { IonImg } from '@ionic/react';
import './EventThumbnailList.css';

export interface EventThumbnail {
  id: string;
  imageUrl: string;
}

interface EventThumbnailListProps {
  events: EventThumbnail[];
  onPressEvent?: (eventId: string) => void;
}

export function EventThumbnailList({ events, onPressEvent }: EventThumbnailListProps) {
  return (
    <div className="thumbnail-list-container">
      <div className="thumbnail-grid">
        {events.map((event) => (
          <button
            key={event.id}
            className="thumbnail-item"
            onClick={() => onPressEvent?.(event.id)}
          >
            <IonImg
              src={event.imageUrl}
              alt={`Event ${event.id}`}
              className="thumbnail-image"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
