export interface TokenUser {
  firstName: string;
  lastName: string;
  createdAt: string;
  displayName: string;
  email: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface User {
  firstName: string;
  lastName: string;
  createdAt: string;
  displayName: string;
  email: string;
  id: string;
}
