import type { Meta, StoryObj } from '@storybook/react';
import { CommentItem } from './CommentItem';

const meta: Meta<typeof CommentItem> = {
  title: 'Components/CommentItem',
  component: CommentItem,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentItem>;

const longComment = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`;

export const Default: Story = {
  args: {
    username: 'John Doe',
    comment: 'This is a short comment',
    timestamp: new Date(),
    userAvatar: 'https://picsum.photos/60/60',
  },
};

export const LongComment: Story = {
  args: {
    ...Default.args,
    comment: longComment,
  },
};

export const NoAvatar: Story = {
  args: {
    ...Default.args,
    userAvatar: undefined,
  },
}; 