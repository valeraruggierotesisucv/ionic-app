import './Tabs.css';
import { useEffect, useRef, useState } from 'react';

export interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  onTabChange?: (tab: Tab) => void;
  gap?: number;
  className?: string;
}

export function Tabs({ 
  tabs, 
  onTabChange,
  gap,
  className = ''
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const previousTabRef = useRef<string>(activeTab);

  useEffect(() => {
    previousTabRef.current = activeTab;
  }, [activeTab]);

  const handleTabPress = (tab: Tab) => {
    setActiveTab(tab.id);
    onTabChange?.(tab);
  };

  return (
    <div className={`tabs-container ${className}`}>
      <div className="tabs-inner-container" style={{ gap }}>
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          const wasSelected = previousTabRef.current === tab.id;
          
          return (
            <button
              key={tab.id}
              className={`tab ${isSelected ? 'selected' : ''} ${wasSelected ? 'was-selected' : ''}`}
              onClick={() => handleTabPress(tab)}
              role="tab"
              aria-selected={isSelected}
            >
              {tab.label}
              {(isSelected || wasSelected) && (
                <div 
                  className="tab-indicator"
                  key={isSelected ? 'selected' : 'unselected'}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
