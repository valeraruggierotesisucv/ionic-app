import type { Meta, StoryObj } from '@storybook/react';
import { CommentsSection } from './CommentsSection';

const meta: Meta<typeof CommentsSection> = {
  title: 'Components/CommentsSection',
  component: CommentsSection,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentsSection>;

const mockComments = [
  {
    username: 'John Doe',
    comment: 'This is a comment',
    timestamp: new Date(),
    profileImage: 'https://picsum.photos/50/50',
  },
  {
    username: 'Jane Smith',
    comment: 'Another comment here',
    timestamp: new Date(),
    profileImage: 'https://picsum.photos/50/50',
  },
  // Add more mock comments as needed
];

export const Default: Story = {
  args: {
    comments: mockComments,
    isOpen: true,
    onAddComment: (comment) => console.log('New comment:', comment),
  },
}; 