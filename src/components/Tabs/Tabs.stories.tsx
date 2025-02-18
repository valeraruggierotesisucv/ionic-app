import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { useState } from 'react';

// Creamos un componente contenedor para manejar el estado
function TabsWithState(args: any) {
  const [selectedTab, setSelectedTab] = useState(args.selectedTab);
  
  return (
    <Tabs
      {...args}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
    />
  );
}

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  // Usamos el componente contenedor para renderizar las stories
  render: (args) => <TabsWithState {...args} />,
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const defaultTabs = [
  { id: 'tab1', label: 'Eventos' },
  { id: 'tab2', label: 'Eventos' },
  { id: 'tab3', label: 'Eventos' },
];

export const Default: Story = {
  args: {
    tabs: defaultTabs,
  },
};

