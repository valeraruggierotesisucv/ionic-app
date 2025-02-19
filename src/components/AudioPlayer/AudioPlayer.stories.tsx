import type { Meta, StoryObj } from '@storybook/react';
import { AudioPlayer } from './AudioPlayer';

const meta: Meta<typeof AudioPlayer> = {
  title: 'Components/AudioPlayer',
  component: AudioPlayer,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AudioPlayer>;

export const Default: Story = {
  args: {
    uri: 'https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/EventMusic//1736911434515',
  },
};
