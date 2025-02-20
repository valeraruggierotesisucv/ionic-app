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
  },
} as const; 