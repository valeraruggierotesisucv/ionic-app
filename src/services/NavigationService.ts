import { ROUTES } from '../utils/routes';

export class NavigationService {
  static goToHomeDetail() {
    return ROUTES.HOME.DETAIL;
  }

  static goToHome() {
    return ROUTES.HOME.ROOT;
  }

  static goToEditProfile() {
    return ROUTES.PROFILE.EDIT;
  }

  static goToConfiguration() {
    return ROUTES.PROFILE.CONFIGURATION;
  }

  // Add more navigation methods as needed
} 