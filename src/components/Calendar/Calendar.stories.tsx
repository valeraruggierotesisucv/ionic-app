import type { Meta, StoryObj } from '@storybook/react';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  args: {
    date: new Date(),
    onDateChange: (date) => console.log('Date changed:', date),
    onStartTimeChange: (time) => console.log('Start time changed:', time),
    onEndTimeChange: (time) => console.log('End time changed:', time),
  },
};

export const WithInitialTimes: Story = {
  args: {
    ...Default.args,
    initialStartTime: new Date('2024-02-18T09:00:00'),
    initialEndTime: new Date('2024-02-18T18:00:00'),
  },
};

export const WithMaxDate: Story = {
  args: {
    ...Default.args,
    maxDate: new Date('2024-12-31'),
  },
};
