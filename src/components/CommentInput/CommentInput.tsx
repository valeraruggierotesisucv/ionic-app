import { IonIcon } from '@ionic/react';
import { sendOutline } from 'ionicons/icons';
import './CommentInput.css';
import { useState } from 'react';

interface CommentInputProps {
    onSend: (comment: string) => void;
}

export function CommentInput({ onSend }: CommentInputProps) {
    const [comment, setComment] = useState('');

    const handleSend = () => {
        onSend(comment);
        setComment('');
    }

    return (
        <div className="comment-input-container">
            <input className="comment-input" type="text" placeholder="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            <button className="comment-input-button" onClick={handleSend}>
                <IonIcon icon={sendOutline}  style={{height: '20px', width: '20px', color: '#000'}}/>
            </button>
        </div>
    )
}
