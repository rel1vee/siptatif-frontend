import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import Cookies from 'js-cookie';

const getAuthorizationHeader = () => {
  const token = Cookies.get('token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

const getEmailFromToken = (token: string) => {
  const base64Payload = token.split('.')[1];
  const payloadBuffer = Buffer.from(base64Payload, 'base64');
  const payload = JSON.parse(payloadBuffer.toString());
  return payload.email;
};

export const getUserData = async () => {
  const authHeader = getAuthorizationHeader();
  if (!authHeader.Authorization) return null;

  try {
    const response = await fetch('https://siptatif-backend.vercel.app/api/auth/user', {
      headers: authHeader
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const user = data.data.find((user: any) => user.email === getEmailFromToken(authHeader.Authorization));
    return user;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
