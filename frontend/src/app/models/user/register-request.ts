import {LoginRequest} from './login-request';

export interface RegisterRequest extends LoginRequest{
  email: string;
  confirmPassword: string;
}
