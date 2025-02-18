import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'changed' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    value: '',
    placeholder: 'Search',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Search term',
    placeholder: 'Search',
    
  },
};

export const WithCustomPlaceholder: Story = {
  args: {
    value: '',
    placeholder: 'Search products...',
  },
};