import { IonContent, IonPage, useIonViewWillEnter } from "@ionic/react";
import { AppHeader } from "../components/AppHeader/AppHeader";
import { useHistory } from "react-router-dom";
import { ButtonVariant } from "../components/Button/Button";
import { ButtonSize } from "../components/Button/Button";
import { InputFieldVariant } from "../components/InputField/InputField";
import { InputField } from "../components/InputField/InputField";
import { Button } from "../components/Button/Button";
import { useState } from "react";
import "./changePasswordView.css";
import { useAuth } from "../contexts/AuthContext";
import { CustomModal } from "../components/CustomModal/CustomModal";
import { Formik } from "formik";
import * as Yup from "yup";
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { Modal } from "../components/Modal/Modal";

export function ChangePasswordView() {
    const history = useHistory();
    const { updatePassword } = useAuth();
    const [isModalVisible, setModalVisible] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required("New password is required")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], "Passwords must match")
            .required("Confirm password is required")
            .min(6, "Password must be at least 6 characters"),
    });

    const handlePasswordChange = async (values: { newPassword: string }) => {
        try {
            await updatePassword(values.newPassword);
            setModalVisible(true);
        } catch (error) {
            console.error("Error updating password:", error);
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        history.goBack();
    };

    return (
        <IonPage>
            <AppHeader title="Change Password" goBack={() => history.goBack()} />
            <IonContent className="ion-padding">
                <div className="change-password-container">
                    <Formik
                        initialValues={{ newPassword: "", confirmPassword: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handlePasswordChange}
                    >
                        {({ handleChange, handleSubmit, values, errors, touched }) => (
                            <>
                                <div className="inputs-container">
                                    <InputField 
                                        label="NEW PASSWORD"
                                        value={values.newPassword}
                                        onChangeText={handleChange("newPassword")}
                                        variant={InputFieldVariant.GRAY_BACKGROUND}
                                        secureTextEntry={!showPassword}
                                        icon={showPassword ? eyeOutline: eyeOffOutline }
                                        onPressIcon={() => setShowPassword(!showPassword)}
                                        error={touched.newPassword && errors.newPassword ? errors.newPassword : undefined}
                                    />
                                    <InputField 
                                        label="CONFIRM PASSWORD"
                                        value={values.confirmPassword}
                                        onChangeText={handleChange("confirmPassword")}
                                        variant={InputFieldVariant.GRAY_BACKGROUND}
                                        secureTextEntry={!showConfirmPassword}
                                        icon={showConfirmPassword ? eyeOutline : eyeOffOutline}
                                        onPressIcon={() => setShowConfirmPassword(!showConfirmPassword)}
                                        error={touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined}
                                    />
                                </div>
                                <div className="change-password-button-container">
                                    <Button 
                                        label="Send"
                                        size={ButtonSize.LARGE}
                                        variant={ButtonVariant.PRIMARY}
                                        onClick={() => handleSubmit()}
                                    />
                                </div>
                            </>
                        )}
                    </Formik>
                </div>

                <Modal 
                    isOpen={isModalVisible}
                    onClose={handleCloseModal}
                >
                    <div className="success-modal-content">
                        <img 
                            src="/images/Onboarding.png" 
                            alt="Success" 
                            className="success-image" 
                        />
                        <h2 className="success-text">Password Updated Successfully</h2>
                    </div>
                </Modal>
            </IonContent>
        </IonPage>
    );
}
