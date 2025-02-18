import { IonButton, IonIcon } from "@ionic/react";
import { logoIonic } from "ionicons/icons";
import "./CategoryButton.css";

interface CategoryButtonProps {
  label: string;
  onPress: () => void;
  icon: string;
  selected: boolean;
}

export function CategoryButton({
  label,
  icon,
  selected,
  onPress,
}: CategoryButtonProps) {
  return (
    <div className="category-button-container">
      <IonButton
        className="category-button"
        fill={selected ? "solid" : "outline"}
        color="primary"
        style={{
          width: "100px",
          height: "100px",
        }}
        onClick={onPress}
      >
        <IonIcon
          icon={icon}
          style={{
            width: "50px",
            height: "50px",
            color: selected ? "#fff" : "#050F71",
          }}
        />
      </IonButton>
      <p className="category-button-title">{label}</p>
    </div>
  );
}
