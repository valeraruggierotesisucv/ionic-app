import { IonApp } from '@ionic/react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Example from '../views/Example';
import { AuthProvider } from '../contexts/AuthContext';
import { PushNotificationProvider } from '../contexts/PushNotificationsContext';


test('button presents a modal when clicked', async () => {
  render(
    <IonApp>
        <AuthProvider>
            <Example />
        </AuthProvider>
      
    </IonApp>
  );
  // Simulate a click on the button
  fireEvent.click(screen.getByText('Open'));
  // Wait for the modal to be presented
  await waitFor(() => {
    // Assert that the modal is present
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });
});