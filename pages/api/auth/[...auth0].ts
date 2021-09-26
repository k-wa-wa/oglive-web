import { initAuth0 } from '@auth0/nextjs-auth0';

const baseURL = process.env.VERCEL_URL || process.env.AUTH0_BASE_URL;
export default initAuth0({ baseURL }).handleAuth();