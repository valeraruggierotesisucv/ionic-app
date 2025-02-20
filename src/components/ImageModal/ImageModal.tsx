import { IonModal, IonIcon } from '@ionic/react';
import "./imageModal.css"; 

interface CustomModalProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export function CustomModal({ isOpen, children }: CustomModalProps) {
  return (
    <IonModal 
      isOpen={isOpen} 
      className="custom-modal"
    >
      <div className="modal-container">
          
        <div className="modal-content">
          {children}
        </div>
      </div>
    </IonModal>
  );
}
