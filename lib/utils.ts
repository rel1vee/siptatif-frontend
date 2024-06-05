import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import Cookies from 'js-cookie';

export const getAuthorizationHeader = () => {
  const token = Cookies.get('accessToken');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
