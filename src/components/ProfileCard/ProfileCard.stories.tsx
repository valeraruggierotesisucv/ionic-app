import type { Meta, StoryObj } from '@storybook/react';
import { ProfileCard } from './ProfileCard';

const meta: Meta<typeof ProfileCard> = {
  title: 'Components/ProfileCard',
  component: ProfileCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Default: Story = {
  args: {
    username: 'José Miguel Valera',
    biography: 'No 15 ul street off ovie palace road effurun delta state',
    events: 24,
    profileImage: 'https://sm.ign.com/t/ign_latam/feature/a/avatar-the/avatar-the-way-of-water-post-credits-scene-check-in-and-endi_zv4t.1280.jpg',
    followers: 32,
    following: 40,
    isFollowing: false,
  },
};

export const Following: Story = {
  args: {
    ...Default.args,
    isFollowing: true,
  },
};

export const WithEditProfile: Story = {
  args: {
    ...Default.args,
    onEditProfile: () => console.log('Edit profile clicked'),
  },
};

export const WithConfigureProfile: Story = {
  args: {
    ...Default.args,
    onConfigureProfile: () => console.log('Configure profile clicked'),
  },
};
