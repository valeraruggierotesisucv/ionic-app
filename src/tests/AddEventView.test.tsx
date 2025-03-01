import { render, screen} from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext';
import { AddEventView } from '../views/AddEventView';


test('AddEventView renders without crashing', () => {
  render(
    <AuthProvider>
      <AddEventView />
    </AuthProvider>
  );
});

test('submit button is disabled initially', () => {
  render(
    <AuthProvider>
      <AddEventView />
    </AuthProvider>
  );
  const button = screen.getByTestId('publish-button');
  expect(button).toBeDisabled();
});
