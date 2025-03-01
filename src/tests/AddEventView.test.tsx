import { render } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';
import { AddEventView } from '../views/AddEventView';


test('AddEventView renders without crashing', () => {
  render(
    <AuthProvider>
      <AddEventView />
    </AuthProvider>
  );
});
