import { useContext } from "react";
import { AuthContext } from "../authContext";


/**
 * Note to myself: A hook allows us to use a group of functions in the components itself but without
 * defining them in the hook itself. like a gatekeeper that gives access to certain functions. It allows a
 * organization of the code and a better readability. 
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}