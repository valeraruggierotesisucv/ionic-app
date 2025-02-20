import { useState } from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { InputField, InputFieldVariant } from '../components/InputField/InputField';
import { Button, ButtonSize, ButtonVariant } from '../components/Button/Button';
import { Tabs, Tab } from '../components/Tabs/Tabs';
import { IconLogo } from '../components/IconLogo/IconLogo';
import { useAuth } from '../contexts/AuthContext';
import './authView.css';
import { DateTimePickerField } from '../components/DateTimePickerField/DateTimePickerField';
import { eye, eyeOff, mail, person } from 'ionicons/icons';

export function AuthView() {
  const { login, signup } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  
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
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        // await signup(registerEmail, registerPassword);
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
        variant={InputFieldVariant.GRAY_BACKGROUND}
        placeholder="ejemplo@email.com"
        icon={mail}
      />
      <InputField
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        variant={InputFieldVariant.GRAY_BACKGROUND}
        secureTextEntry={!showPassword}
        placeholder="¿Olvidaste tu contraseña?"
        icon={showPassword ? eyeOff : eye}
        onPressIcon={() => setShowPassword(!showPassword)}
      />
    </div>
  );

  const renderRegisterForm = () => (
    <div className="form-container">
      <InputField
        label="Nombre de Usuario"
        value={username}
        onChangeText={setUsername}
        variant={InputFieldVariant.GRAY_BACKGROUND}
        placeholder="Nombre de usuario"
        icon={person}
      />
      <InputField
        label="Nombre Completo"
        value={fullName}
        onChangeText={setFullName}
        variant={InputFieldVariant.GRAY_BACKGROUND}
        placeholder="Nombre completo"
        icon={person}
      />
      <InputField
        label="Correo"
        value={registerEmail}
        onChangeText={setRegisterEmail}
        variant={InputFieldVariant.GRAY_BACKGROUND}
        placeholder="ejemplo@email.com"
        icon={mail}
      />
      <DateTimePickerField
        label="Fecha de Nacimiento"
        value={birthDate}
        onChange={setBirthDate}
        variant={InputFieldVariant.GRAY_BACKGROUND}
      />
      <InputField
        label="Contraseña"
        value={registerPassword}
        onChangeText={setRegisterPassword}
        variant={InputFieldVariant.GRAY_BACKGROUND}
        secureTextEntry={!showRegisterPassword}
        placeholder="Contraseña"
        icon={showRegisterPassword ? eyeOff : eye}
        onPressIcon={() => setShowRegisterPassword(!showRegisterPassword)}
      />
      <InputField
        label="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        variant={InputFieldVariant.GRAY_BACKGROUND}
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
            
            <div className="button-container">
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