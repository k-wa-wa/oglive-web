import { initAuth0 } from '@auth0/nextjs-auth0';

const handler = () => {
  const baseURL = process.env.VERCEL_URL || process.env.AUTH0_BASE_URL;
  console.log(process.env.VERCEL_URL);
  console.log(process.env.AUTH0_BASE_URL);
  return initAuth0({ baseURL }).handleAuth();
};

export default handler;