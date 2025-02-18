import type { Meta, StoryObj } from '@storybook/react';
import { CategoryButton } from './CategoryButton';
import { logoIonic } from 'ionicons/icons';

const meta: Meta<typeof CategoryButton> = {
    title: 'Components/CategoryButton',
    component: CategoryButton,
    tags: ['autodocs'],
  };

export default meta;
type Story = StoryObj<typeof CategoryButton>;

export const Default: Story = {
    args: {
        label: 'Category',
        icon: logoIonic,
        selected: false,
        onPress: () => {}
    }
}
