import { ROUTES } from '../utils/routes';

export class NavigationService {
  static goToHomeDetail() {
    return ROUTES.HOME.DETAIL;
  }

  static goToHome() {
    return ROUTES.HOME.ROOT;
  }

  // Add more navigation methods as needed
} 