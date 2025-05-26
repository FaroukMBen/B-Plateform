import {
  createContext,
} from 'react';
import type { AppUser } from './types';


/**
 * Note to myself: the Context a way to share values that are used by multiple componenets without re-defining them
 * or fetching them in each component, or passing them down through a chain of props. Like a storage that lets you access
 * a value from anywhere when you need it.
 */

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);



