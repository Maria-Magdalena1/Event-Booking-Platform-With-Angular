import { User } from './user';

export interface EditProfileUser extends Pick<User, 'id' | 'username' | 'email'> {
  //role user admin ama string da go napravim
  name: string;
  age: number;

  //joinedAt localdatetime
}
