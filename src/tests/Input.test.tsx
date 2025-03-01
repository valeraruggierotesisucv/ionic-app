import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from "vitest"; 
import Input, { InputVariant } from "../components/Input/Input"

test('renders input with label', () => {
  render(<Input label="Test Label" />);
  const labelElement = screen.getByText(/Test Label/i);
  expect(labelElement).toBeInTheDocument();
});

test('displays arrow icon when variant is ARROW', () => {
  render(<Input label="Test Arrow" variant={InputVariant.ARROW} />);
  const iconElement = screen.getByTestId('chevron-forward-icon');  
  expect(iconElement).toBeInTheDocument();
});

test("calls onPress when the input container is clicked"), () => {
    const mockOnPress = vi.fn();

    render(
        <Input 
            label="Click Test" 
            onPress={mockOnPress} 
        />
    ); 

    const inputContainer = screen.getByTestId("custom-input"); 
    fireEvent.click(inputContainer);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
}

test("calls onChangeValue when the input changes"), () => {
    const mockOnChangeValue = vi.fn(); 

    render(
        <Input
            label="Test"
            onChangeValue={mockOnChangeValue}
            value=""
        />
    ); 

    const inputElement = screen.getByTestId("custom-input"); 
    fireEvent.change(inputElement, { target: { value: 'new text' } });

    // Verificar que el mock fue llamado exactamente una vez y con el valor correcto
    expect(mockOnChangeValue).toHaveBeenCalledTimes(1);
    expect(mockOnChangeValue).toHaveBeenCalledWith('new text');
}