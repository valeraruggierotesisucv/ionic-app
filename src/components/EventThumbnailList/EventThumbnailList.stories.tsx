import type { Meta, StoryObj } from '@storybook/react';
import { EventThumbnailList } from './EventThumbnailList';

const meta: Meta<typeof EventThumbnailList> = {
  title: 'Components/EventThumbnailList',
  component: EventThumbnailList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EventThumbnailList>;

const mockEvents = Array(9).fill(null).map((_, index) => ({
  id: `event-${index + 1}`,
  imageUrl: 'https://picsum.photos/300/300',
}));

export const Default: Story = {
  args: {
    events: mockEvents,
    onPressEvent: (eventId) => console.log('Event pressed:', eventId),
  },
};

export const Empty: Story = {
  args: {
    events: [],
  },
};

export const SingleRow: Story = {
  args: {
    events: mockEvents.slice(0, 3),
  },
};
