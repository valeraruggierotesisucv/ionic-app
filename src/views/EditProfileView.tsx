import { IonButton, IonContent, IonInput, IonPage, IonIcon, useIonViewWillEnter } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useHistory } from "react-router-dom";
import { InputField, InputFieldVariant } from "../components/InputField/InputField";
import { useEffect, useState } from "react";
import { Button, ButtonSize, ButtonVariant } from "../components/Button/Button";
import { Avatar } from "../components/Avatar/Avatar";
import { camera, checkmarkCircle } from 'ionicons/icons';
import '../styles/editProfileView.css';
import useImagePicker from "../hooks/useImagePicker";
import { CustomModal } from "../components/CustomModal/CustomModal";
import { IMAGE_PLACEHOLDER } from "../utils/consts";
import { EditProfileController } from "../controllers/EditProfileController";
import { useAuth } from "../contexts/AuthContext";
import { useTranslation } from "react-i18next";

export function EditProfileView() {
    const {t} = useTranslation();
    const history = useHistory();
    const { user, session } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [biography, setBiography] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [originalImage, setOriginalImage] = useState('');
    const { image: imageUri, handleOpenCamera, handleOpenGallery } = useImagePicker();
    const [imageModal, setImageModal] = useState(false);
    const [initialProfile, setInitialProfile] = useState<any>(null);

    const getUser = async () => {
        if (user && session) {
            try {
                setIsLoading(true);
                const response = await EditProfileController.getProfile(session?.access_token, user.id);
                setInitialProfile(response);
                setProfileImage(response.profileImage || IMAGE_PLACEHOLDER);
                setOriginalImage(response.profileImage || IMAGE_PLACEHOLDER);
                setFullName(response.fullName);
                setBiography(response.biography || "");
                setIsLoading(false);
            } catch (error) {
                console.error("Error in EditProfileView:", error);
            }
        }
    };

    useIonViewWillEnter(() => {
        getUser();
    });

    const handleSave = async () => {
        if (!session || !user) return;
        
        try {
            setIsLoading(true);
            await EditProfileController.updateProfile(
                session.access_token,
                user.id,
                {
                    fullName,
                    biography,
                    profileImage: imageUri || profileImage
                }
            );
            history.goBack();
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const hasChanges = () => {
        const imageChanged = imageUri || (profileImage !== originalImage);
        const nameChanged = fullName !== initialProfile?.fullName;
        const bioChanged = biography !== (initialProfile?.biography || "");
        
        return imageChanged || nameChanged || bioChanged;
    };

    return (
        <IonPage>
            <AppHeader goBack={() => {history.goBack()}} title={t('editProfile.title')} />
            <IonContent className="ion-padding">
                <div className="edit-profile-container">
                    <div className="avatar-section">
                        <button className="avatar-wrapper" onClick={() => setImageModal(true)}>
                            <Avatar 
                                size={120} 
                                source={imageUri || profileImage || IMAGE_PLACEHOLDER}
                            />
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
                            label={t('editProfile.fullName')}
                            value={fullName}
                            onChangeText={setFullName}
                            variant={InputFieldVariant.GRAY_BACKGROUND}
                        />
                        <InputField 
                            label={t('editProfile.biography')}
                            value={biography}
                            onChangeText={setBiography}
                            variant={InputFieldVariant.GRAY_BACKGROUND}
                        />
                    </div>
                    <div className="edit-profile-button-container">
                        <Button 
                            label={t('editProfile.save')}
                            size={ButtonSize.LARGE}
                            variant={ButtonVariant.PRIMARY}
                            onClick={handleSave}
                            disabled={isLoading || !hasChanges()}
                        />
                    </div>
                </div>

                <CustomModal 
                    isOpen={imageModal}
                    onClose={() => setImageModal(false)}
                >        
                    <IonButton 
                        expand="block" 
                        className="custom-button" 
                        onClick={handleOpenCamera}
                    >
                        Take Photo
                    </IonButton>
                    <IonButton 
                        expand="block" 
                        className="custom-button" 
                        onClick={handleOpenGallery}
                    >
                        Choose from Gallery
                    </IonButton>
                    <IonButton 
                        expand="block" 
                        className="custom-button" 
                        onClick={() => setImageModal(false)}
                    >
                        Cancel
                    </IonButton>
                </CustomModal>
            </IonContent>
        </IonPage>
    );
}
