import { OrderTypes, Directions } from '../constants/orders';

export interface UserInfoShape {
  // from query on User entity table
  id: string;
  email: string;
  username: string;
  githubId: string;
  dailyEmail: boolean;
  weeklyEmail: boolean;
  darkMode: boolean;
  projectOrder: OrderTypes;
  projectDirection: Directions;
  saveOrder: boolean;
  displayName: string;
  avatarUrl: string;
}
