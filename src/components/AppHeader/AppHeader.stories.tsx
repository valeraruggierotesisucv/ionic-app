import type { Meta, StoryObj } from '@storybook/react';
import { AppHeader } from './AppHeader';

const meta: Meta<typeof AppHeader> = {
  title: 'Components/AppHeader',
  component: AppHeader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppHeader>;

export const WithLogo: Story = {
  args: {
    goBack: () => console.log('Go back clicked'),
    goToConfig: () => console.log('Config clicked'),
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Subtítulo',
    goBack: () => console.log('Go back clicked'),
    goToConfig: () => console.log('Config clicked'),
  },
};

export const OnlyTitle: Story = {
  args: {
    title: 'EVENTIFY',
  },
};

export const OnlyLogo: Story = {
  args: {},
};

export const WithBackButton: Story = {
  args: {
    title: 'EVENTIFY',
    goBack: () => console.log('Go back clicked'),
  },
};

export const WithConfigButton: Story = {
  args: {
    title: 'EVENTIFY',
    goToConfig: () => console.log('Config clicked'),
  },
};
