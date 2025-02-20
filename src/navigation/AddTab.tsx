import React from 'react';
import { IonContent, IonFooter, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { AppHeader } from '../components/AppHeader/AppHeader';
import { Button } from '../components/Button/Button';
import {AddEventView} from '../views/AddEventView';

const AddTab: React.FC = () => {
  return (
    <AddEventView />
  );
};

export default AddTab; 