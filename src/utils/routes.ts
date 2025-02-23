export const ROUTES = {
  HOME: {
    ROOT: '/home',
    EVENT_DETAILS: '/home/event-details/:eventId',
    PROFILE_DETAILS: '/home/profile-details/:userId',
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
    EVENT_DETAILS: '/profile/event-details/:eventId',
    EDIT_EVENT: '/profile/edit-event/:eventId',
  },
  AUTH: {
    ROOT: '/',
    AUTH: '/auth',
    FORGOT_PASSWORD: '/forgot-password',
    FORGOT_PASSWORD_LOGIN: '/forgot-password-login',
    ONBOARDING: '/onboarding',
  },
} as const; 