import { IonButton, IonContent, IonInput, IonPage, IonIcon } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useHistory } from "react-router-dom";
import { InputField, InputFieldVariant } from "../components/InputField/InputField";
import { useState } from "react";
import { Button, ButtonSize, ButtonVariant } from "../components/Button/Button";
import { Avatar } from "../components/Avatar/Avatar";
import { camera, checkmarkCircle } from 'ionicons/icons';
import './editProfileView.css';

export function EditProfileView() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    
    return (
        <IonPage>
            <AppHeader goBack={() => {history.goBack()}} title="Edit Profile" />
            <IonContent className="ion-padding">
                <div className="edit-profile-container">
                    <div className="avatar-section">
                        <button className="avatar-wrapper" onClick={() => {console.log('clicked')}}>
                            <Avatar size={120} source="https://www.musicokey.com/wp-content/uploads/2022/02/Martin-Garrix.jpg" />
                            <div className="verified-badge">
                                <IonIcon 
                                    icon={camera} 
                                    color="white"
                                    className="verified-icon"
                                />
                            </div>
                        </button>
                    </div>

                    <div className="inputs-container">
                        <InputField 
                            label="Name"
                            value={name}
                            onChangeText={setName}
                            variant={InputFieldVariant.GRAY_BACKGROUND}
                        />
                        <InputField 
                            label="Bio"
                            value={bio}
                            onChangeText={setBio}
                            variant={InputFieldVariant.GRAY_BACKGROUND}
                        />
                    </div>
                    <div className="button-container">
                        <Button 
                            label="Enviar"
                            size={ButtonSize.LARGE}
                            variant={ButtonVariant.PRIMARY}
                        />
                    </div>
                </div>
            </IonContent>
        </IonPage>
    );
}
