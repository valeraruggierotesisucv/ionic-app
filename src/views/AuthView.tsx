import { useState } from 'react';
import { IonButton, IonContent, IonPage } from '@ionic/react';
import { InputField, InputFieldVariant } from '../components/InputField/InputField';
import { Button, ButtonSize, ButtonVariant } from '../components/Button/Button';
import { Tabs, Tab } from '../components/Tabs/Tabs';
import { IconLogo } from '../components/IconLogo/IconLogo';
import { useAuth } from '../contexts/AuthContext';
import './authView.css';
import { DateTimePickerField } from '../components/DateTimePickerField/DateTimePickerField';
import { eye, eyeOff, mail, person } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../utils/routes';

export function AuthView() {
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const history = useHistory();
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Register form state
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const tabs: Tab[] = [
    { id: 'login', label: 'Iniciar Sesión' },
    { id: 'register', label: 'Registro' },
  ];

  const handleSubmit = async () => {
    if (activeTab === 'login') {
      try {
        await login(email, password);
        history.push(ROUTES.HOME.ROOT);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // await signup(registerEmail, registerPassword);
        history.push(ROUTES.HOME.ROOT);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const renderLoginForm = () => (
    <div className="form-container">
      <InputField
        label="Correo"
        value={email}
        onChangeText={setEmail}
        placeholder="ejemplo@email.com"
        icon={mail}
      />
      <InputField
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        placeholder="Contraseña"
        icon={showPassword ? eye : eyeOff}
        onPressIcon={() => setShowPassword(!showPassword)}
      />
      <div className="forgot-password-container">
        <button
          onClick={() => history.push(ROUTES.AUTH.FORGOT_PASSWORD)}
          style={{ backgroundColor: 'transparent' }}
        >
          <p style={{ color: '#050F71', fontSize: 17, fontFamily: 'SF-Pro-Text-Semibold' }}>¿Olvidaste tu contraseña?</p>
        </button>
      </div>
    </div>
  );

  const renderRegisterForm = () => (
    <div className="form-container">
      <InputField
        label="Nombre de Usuario"
        value={username}
        onChangeText={setUsername}
        placeholder="Nombre de usuario"
        icon={person}
      />
      <InputField
        label="Nombre Completo"
        value={fullName}
        onChangeText={setFullName}
        placeholder="Nombre completo"
        icon={person}
      />
      <InputField
        label="Correo"
        value={registerEmail}
        onChangeText={setRegisterEmail}
        placeholder="ejemplo@email.com"
        icon={mail}
      />
      <DateTimePickerField
        label="Fecha de Nacimiento"
        value={birthDate}
        onChange={setBirthDate}
      />
      <InputField
        label="Contraseña"
        value={registerPassword}
        onChangeText={setRegisterPassword}
        secureTextEntry={!showRegisterPassword}
        placeholder="Contraseña"
        icon={showRegisterPassword ? eye : eyeOff}
        onPressIcon={() => setShowRegisterPassword(!showRegisterPassword)}
      />
      <InputField
        label="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirmPassword}
        placeholder="Confirmar contraseña"
        icon={showConfirmPassword ? eyeOff : eye}
        onPressIcon={() => setShowConfirmPassword(!showConfirmPassword)}
      />
    </div>
  );

  return (
    <IonPage>
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
            {activeTab === 'login' ? renderLoginForm() : renderRegisterForm()}
            
            <div className="auth-button-container" style={activeTab === 'register' ? { marginTop: 20 } : undefined}>
              <Button
                label="Continuar"
                size={ButtonSize.LARGE}
                variant={ButtonVariant.PRIMARY}
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}