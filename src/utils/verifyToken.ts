import { jwtDecode } from "jwt-decode";
import { User } from "types/user";

export const isTokenExpired = (user: User): boolean => {
  try {
    if (!user) return true;

    if (!user.token) return true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken = jwtDecode<any>(user.token);

    if (!decodedToken.exp) return true;

    const expirationDate = new Date(decodedToken.exp * 1000); // exp in seconds
    return expirationDate < new Date();
  } catch (error) {
    return true;
  }
};
