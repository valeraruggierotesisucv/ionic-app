import { useState } from 'react';
import './Pills.css';

export interface Category {
  id: string;
  label: string;
}

interface PillsProps {
  pills: {
    id: string;
    label: string;
  }[];
  onSelectCategories?: (categoryIds: string[]) => void;
  selectedCategories?: string[];
}

export function Pills({
  pills,
  onSelectCategories,
  selectedCategories = [],
}: PillsProps) {
  const [selected, setSelected] = useState<string[]>(selectedCategories);

  const handleClick = (categoryId: string) => {
    const newSelected = selected.includes(categoryId)
      ? selected.filter((id) => id !== categoryId)
      : [...selected, categoryId];

    setSelected(newSelected);
    onSelectCategories?.(newSelected);
  };

  return (
    <div className="pills-container">
      {pills.map((category) => (
        <button
          key={category.id}
          className={`pill ${
            selected.includes(category.id) ? 'selected-pill' : ''
          }`}
          onClick={() => handleClick(category.id)}
          type="button"
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
