import { IonModal, IonIcon } from '@ionic/react';
import "./customModal.css"; 

interface CustomModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export function CustomModal({ isOpen, children, onClose }: CustomModalProps) {
  return (
    <IonModal 
      isOpen={isOpen} 
      className="custom-modal"
      onDidDismiss={onClose}
    >
      <div className="modal-container">
          
        <div className="modal-content">
          {children}
        </div>
      </div>
    </IonModal>
  );
}
