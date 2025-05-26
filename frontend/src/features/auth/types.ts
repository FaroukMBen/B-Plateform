export interface AppUser {
  userid: number;
  username: string;
  email: string;
  bio?: string | null;
  profilephotourl?: string | null;
  role: string;
  bpcoins: number;
  lvl: number;
  xp: number;
  isVerified?: boolean;
}