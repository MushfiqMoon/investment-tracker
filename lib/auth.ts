'use client';

const HUSBAND_PASSWORD = process.env.NEXT_PUBLIC_USER1_PASSWORD || '';
const WIFE_PASSWORD = process.env.NEXT_PUBLIC_USER2_PASSWORD || '';

export type UserRole = 'Husband' | 'Wife' | null;

export function authenticate(password: string): UserRole {
  if (password === HUSBAND_PASSWORD) {
    return 'Husband';
  }
  if (password === WIFE_PASSWORD) {
    return 'Wife';
  }
  return null;
}

export function setUserSession(user: UserRole) {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('investment_user', user);
    } else {
      localStorage.removeItem('investment_user');
    }
  }
}

export function getUserSession(): UserRole {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('investment_user');
    return (user as UserRole) || null;
  }
  return null;
}

export function clearUserSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('investment_user');
  }
}
