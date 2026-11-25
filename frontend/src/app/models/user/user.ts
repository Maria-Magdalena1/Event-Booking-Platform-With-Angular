export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  age?: number;
  createdAt: string;
  role: string;
  active: boolean;
}
