import { OrderType, Direction } from './stringLiteralTypes';

export interface UserInfoShape {
  // from query on User entity table
  id: string;
  email: string;
  username: string;
  githubId: string;
  dailyEmail: boolean;
  weeklyEmail: boolean;
  darkMode: boolean;
  projectOrder: OrderType;
  projectDirection: Direction;
  saveOrder: boolean;
  displayName: string;
  avatarUrl: string;
}
