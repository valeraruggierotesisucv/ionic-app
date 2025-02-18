import type { Meta, StoryObj } from '@storybook/react';
import { InputField, InputFieldVariant } from './InputField';
import { eyeOutline, eyeOffOutline, personCircleOutline } from 'ionicons/icons';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: 'Label',
    value: '',
    placeholder: 'Text...',
    onChangeText: (text) => console.log('Text changed:', text),
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: '*error message',
  },
};

export const WithIcon: Story = {
  args: {
    ...Default.args,
    icon: personCircleOutline,
    onPressIcon: () => console.log('Icon clicked'),
  },
};

export const GrayBackground: Story = {
  args: {
    ...Default.args,
    variant: InputFieldVariant.GRAY_BACKGROUND,
  },
};

export const Password: Story = {
  args: {
    ...Default.args,
    label: 'Password',
    secureTextEntry: true,
    icon: eyeOutline,
    onPressIcon: () => console.log('Toggle password visibility'),
  },
};
