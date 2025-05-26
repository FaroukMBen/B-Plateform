import {
  useEffect,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../../supabaseClient';
import type { AppUser } from './types';
import {authService} from './lib/authService';
import { AuthContext } from './authContext';


/**
 * Note to myself: This function fetches the user profile from the database using the backend API.
 * It allows us to get the full user data that I defined in the database schema because the Supabase
 * auth service only provides a limited set of user information wich are the user ID, email.
 */
async function fetchUserProfile(userId: string, token: string): Promise<AppUser> {
  const res = await fetch(`/users/id/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('Failed to fetch user profile');
  return res.json();
}

/**
 * Note to myself: The AuthProvider is basically a component that provide the authContext will all the data
 * that it needs, to see if a user is logged in or out, to sign up, sign in, sign out, and of course to know if the user
 * is loading or not.
 */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    /**
     * Note to myself: // Loading and setLoading allows us to know if the user have to wait for the session 
     * to be loaded or not. wich allow us to show a spinning loader or something.
     */

  async function loadSession(): Promise<void> {
      setLoading(true);
      try {
        const session = await authService.getSession();
        const supabaseUser = session?.user ?? null;

        if (supabaseUser && session && session.access_token) {
          const fullUser = await fetchUserProfile(supabaseUser.id, session.access_token);
          setUser(fullUser);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load session');
        }
      } finally {
        setLoading(false);
      }
    }

    /**
     * Note to myself: So basically for the useEffect, we are constantly listening to see when yhe user logs in or out
     * to update the user state and it is accessible to all components by useAuth hook because it is wrapped to the authContext
     * wich itself is wrapped to the authProvider because the authProvider is the one that update the value of the context.
     */
  useEffect(() => {
    loadSession();
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user && session.access_token) {
          try {
            setLoading(true);
            const fullUser = await fetchUserProfile(session.user.id, session.access_token);
            setUser(fullUser);
          } catch {
            setUser(null);
          } finally {
            setLoading(false);
          }
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  async function signUp(email: string, password: string): Promise<void> {
    try {
      await authService.signUp(email, password);
      const session = await authService.getSession();
      if (session?.user && session.access_token) {
        const fullUser = await fetchUserProfile(session.user.id, session.access_token);
        setUser(fullUser);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }else {
        setError('Signup failed');
      }
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    try {
      await authService.signIn(email, password);
      const session = await authService.getSession();
      if (session?.user && session.access_token) {
        const fullUser = await fetchUserProfile(session.user.id, session.access_token);
        setUser(fullUser);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Signin failed');
      }
    }
  }

  async function signOut(): Promise<void> {
    try {
      await authService.signOut();
      setUser(null);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
      else {
        setError('Signout failed');
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}