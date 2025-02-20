export const ROUTES = {
  HOME: {
    ROOT: '/home',
    DETAIL: '/home/detail',
  },
  ADD: {
    ROOT: '/add',
  },
  SEARCH: {
    ROOT: '/search',
  },
  NOTIFICATIONS: {
    ROOT: '/notifications',
  },
  PROFILE: {
    ROOT: '/profile',
    EDIT: '/profile/edit',
    FOLLOWERS: '/profile/followers',
    FOLLOWED: '/profile/followed',
    EVENTS: '/profile/events',
    CONFIGURATION: '/profile/configuration',
    CHANGE_PASSWORD: '/profile/change-password',
  },
  AUTH: {
    ROOT: '/',
    FORGOT_PASSWORD: '/forgot-password',
    FORGOT_PASSWORD_LOGIN: '/forgot-password-login',
  },
} as const; 