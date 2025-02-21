import { IonImg } from "@ionic/react";
import iconLogo from '../../../public/images/IconLogo.png';
const iconLogoWidth = 200;
const iconLogoHeight = 200;

export function IconLogo() {
  return (
    <IonImg src={iconLogo} style={{ width: iconLogoWidth, height: iconLogoHeight }} />
  );
}
