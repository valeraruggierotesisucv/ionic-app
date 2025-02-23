import { IonModal, IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={onClose}
      className="modal"
    >
      <div className="modal-container">
        <button 
          className="close-button"
          onClick={onClose}
        >
          <IonIcon icon={close} />
        </button>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </IonModal>
  );
}
