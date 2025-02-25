import { useState, useEffect, useRef } from 'react';
import { IonButton, IonContent, IonPage, IonAlert } from '@ionic/react';
import { InputField, InputFieldVariant } from '../components/InputField/InputField';
import { Button, ButtonSize, ButtonVariant } from '../components/Button/Button';
import { Tabs, Tab } from '../components/Tabs/Tabs';
import { IconLogo } from '../components/IconLogo/IconLogo';
import { useAuth } from '../contexts/AuthContext';
import '../styles/authView.css';
import { DateTimePickerField } from '../components/DateTimePickerField/DateTimePickerField';
import { eye, eyeOff, mail, person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import * as Yup from 'yup';
import { SignUpController } from '../controllers/SignUpController';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';

export function AuthView() {
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const history = useHistory();
  
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Separate password visibility states for login and register forms
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [registerPasswordVisible, setRegisterPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // Update the useEffect to also reset form values when switching tabs
  useEffect(() => {
    setLoginPasswordVisible(false);
    setRegisterPasswordVisible(false);
    setConfirmPasswordVisible(false);
  }, [activeTab]);

  const { t } = useTranslation();
  const tabs: Tab[] = [
    { id: 'login', label: t('auth.login') },
    { id: 'register', label: t('auth.sign_up') },
  ];

  // Validation schemas
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email inválido')
      .required('Email es requerido'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Contraseña es requerida'),
  });

  const registerSchema = Yup.object().shape({
    username: Yup.string()
      .required('Nombre de usuario es requerido'),
    fullName: Yup.string()
      .required('Nombre completo es requerido'),
    email: Yup.string()
      .email('Email inválido')
      .required('Email es requerido'),
    birthDate: Yup.date()
      .max(new Date(), 'La fecha debe ser en el pasado')
      .required('Fecha de nacimiento es requerida'),
    password: Yup.string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .required('Contraseña es requerida'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
      .required('Confirmar contraseña es requerida')
  });

  const renderLoginForm = ({ values, errors, touched, handleChange }: any) => (
    <div className="form-container">
      <InputField
        label={t('auth.email')}
        value={values.email}
        onChangeText={handleChange('email')}
        placeholder={t('auth.email_placeholder')}
        icon={mail}
        error={touched.email && errors.email}
      />
      <InputField
        label={t('auth.password')}
        value={values.password}
        onChangeText={handleChange('password')}
        secureTextEntry={!loginPasswordVisible}
        placeholder={t('auth.password_placeholder')}
        icon={loginPasswordVisible ? eye : eyeOff}
        onPressIcon={() => setLoginPasswordVisible(!loginPasswordVisible)}
        error={touched.password && errors.password}
      />
      <div className="forgot-password-container">
        <button
          onClick={() => history.push(ROUTES.AUTH.FORGOT_PASSWORD)}
          style={{ backgroundColor: 'transparent' }}
        >
          <p style={{ color: '#050F71', fontSize: 17, fontFamily: 'SF-Pro-Text-Semibold' }}>{t('auth.forgot_password')}</p>
        </button>
      </div>
    </div>
  );

  const renderRegisterForm = ({ values, errors, touched, handleChange, setFieldValue }: any) => (
    <div className="form-container">
      <InputField
        label={t('auth.username')}
        value={values.username}
        onChangeText={handleChange('username')}

        placeholder={t('auth.username_placeholder')}
        icon={person}
        error={touched.username && errors.username}
      />
      <InputField
        label={t('auth.fullname')}
        value={values.fullName}
        onChangeText={handleChange('fullName')}

        placeholder={t('auth.fullname_placeholder')}
        icon={person}
        error={touched.fullName && errors.fullName}
      />
      <InputField
        label={t('auth.email')}
        value={values.email}
        onChangeText={handleChange('email')}

        placeholder={t('auth.email_placeholder')}
        icon={mail}
        error={touched.email && errors.email}
      />
      <DateTimePickerField
        label={t('auth.birthdate')}
        value={values.birthDate}
        onChange={(date) => setFieldValue('birthDate', date)}
        error={touched.birthDate && errors.birthDate}
      />
      <InputField
        label={t('auth.password')}
        value={values.password}
        onChangeText={handleChange('password')}
        secureTextEntry={!registerPasswordVisible}
        placeholder={t('auth.password_placeholder')}
        icon={registerPasswordVisible ? eye : eyeOff}
        onPressIcon={() => setRegisterPasswordVisible(!registerPasswordVisible)}
        error={touched.password && errors.password}
      />
      <InputField
        label={t('auth.confirm_password')}
        value={values.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        secureTextEntry={!confirmPasswordVisible}
        placeholder={t('auth.confirm_password_placeholder')}
        icon={confirmPasswordVisible ? eye : eyeOff}
        onPressIcon={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
        error={touched.confirmPassword && errors.confirmPassword}
      />
    </div>
  );

  const handleLoginSubmit = async (values: any) => {
    try {
      const { error } = await login(values.email, values.password);
      
      if (error) {
        setAlertMessage(error);
        setShowAlert(true);
        return;
      }
      
      history.push(ROUTES.HOME.ROOT);
    } catch (error) {
      setAlertMessage("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      setShowAlert(true);
    }
  };

  const handleRegisterSubmit = async (values: any) => {
    try {
      const { user, error } = await signup(
        values.email, 
        values.password, 
        values.fullName, 
        values.username
      );
      
      if (error) {
        setAlertMessage(error);
        setShowAlert(true);
        return;
      }

      if (!user) {
        setAlertMessage("Error al crear el usuario");
        setShowAlert(true);
        return;
      }

      await SignUpController.signUp({
        userId: user.id,
        username: values.username,
        fullName: values.fullName,
        email: values.email,
        birthDate: values.birthDate
      });

      history.push(ROUTES.HOME.ROOT);
    } catch (error) {
      setAlertMessage("Error al registrarse. Por favor, inténtalo de nuevo.");
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        header={'Error'}
        message={alertMessage}
        buttons={['OK']}
        cssClass="custom-alert"
      />
      <IonContent>
        <div className="auth-container">
          <div className="auth-header">
            <div className="logo-container">
              <IconLogo />
            </div>
            
            <div className="tabs-wrapper">
              <Tabs 
                tabs={tabs} 
                onTabChange={(tab) => setActiveTab(tab.id)}
                className="auth-tabs"
                gap={40}
              />
            </div>
          </div>

          <div className="auth-content">
            {activeTab === 'login' ? (
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={handleLoginSubmit}
                key="login"
              >
                {(formikProps) => (
                  <>
                    {renderLoginForm(formikProps)}
                    <div className="auth-button-container">
                      <Button
                        label={t('auth.login')}
                        size={ButtonSize.LARGE}
                        variant={ButtonVariant.PRIMARY}
                        onClick={formikProps.handleSubmit}
                        disabled={!formikProps.isValid || formikProps.isSubmitting}
                      />
                    </div>
                  </>
                )}
              </Formik>
            ) : (
              <Formik
                initialValues={{
                  username: '',
                  fullName: '',
                  email: '',
                  birthDate: new Date(),
                  password: '',
                  confirmPassword: ''
                }}
                validationSchema={registerSchema}
                onSubmit={handleRegisterSubmit}
                key="register"
              >
                {(formikProps) => (
                  <>
                    {renderRegisterForm(formikProps)}
                    <div className="auth-button-container" style={{ marginTop: 20 }}>
                      <Button
                        label={t('auth.sign_up')}
                        size={ButtonSize.LARGE}
                        variant={ButtonVariant.PRIMARY}
                        onClick={formikProps.handleSubmit}
                        disabled={!formikProps.isValid || formikProps.isSubmitting}
                      />
                    </div>
                  </>
                )}
              </Formik>
            )}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}