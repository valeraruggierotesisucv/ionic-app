import { useEffect, useState, useRef } from 'react';
import { IonIcon } from '@ionic/react';
import { playOutline, pauseOutline } from 'ionicons/icons';
import './AudioPlayer.css';

interface AudioPlayerProps {
  uri: string;
}

export function AudioPlayer({ uri }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio(uri);
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration * 1000);
    });

    audio.addEventListener('timeupdate', () => {
      setPosition(audio.currentTime * 1000);
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setPosition(0);
      audio.currentTime = 0;
    });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [uri]);

  const togglePlayback = async () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      await audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const onSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setPosition(value);
    if (audioRef.current) {
      audioRef.current.currentTime = value / 1000;
    }
  };

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="audio-player">
      <button className="play-button" onClick={togglePlayback}>
        <IonIcon
          icon={isPlaying ? pauseOutline : playOutline}
          style={{
            width: '24px',
            height: '24px',
            color: isPlaying ? '#050F71' : '#000000'
          }}
        />
      </button>
      <div className="slider-container">
        <input
          type="range"
          className="slider"
          min={0}
          max={duration}
          value={position}
          onChange={onSliderChange}
        />
        <div className="time-container">
          <span className="time-text">{formatTime(position)}</span>
          <span className="time-text">{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
