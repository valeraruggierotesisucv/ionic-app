import type { Meta, StoryObj } from '@storybook/react';
import { DateTimePickerField } from './DateTimePickerField';

const meta: Meta<typeof DateTimePickerField> = {
  title: 'Components/DateTimePickerField',
  component: DateTimePickerField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateTimePickerField>;

export const Default: Story = {
  args: {
    label: 'Fecha de Nacimiento',
    value: new Date(),
    onChange: (date) => console.log('Date changed:', date),
    placeholder: 'Seleccionar fecha',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: 'Campo requerido',
  },
};

export const GrayBackground: Story = {
  args: {
    ...Default.args,
    variant: 'grayBackground',
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    value: '',
  },
};
