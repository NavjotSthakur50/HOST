'use server';

import { StreamClient } from '@stream-io/node-sdk';

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async (userId: string) => {
  if (!STREAM_API_KEY) throw new Error('Stream API key is missing');
  if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

  const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

  // Define the user object
  const newUser = {
    id: userId,
    role: 'user', // Default role
    name: userId, // Use userId as the name (you can modify this)
    image: '', // Optional: Add a default image URL if needed
  };

  // Upsert the user in Stream
  await streamClient.upsertUsers([newUser]);

  // Generate a token for the user
  const validity = 60 * 60; // Token validity in seconds (1 hour)
  const token = await streamClient.generateUserToken({
    user_id: userId,
    validity_in_seconds: validity,
  });

  return token;
};










// 'use server';

// import { currentUser } from '@clerk/nextjs/server';
// import { StreamClient } from '@stream-io/node-sdk';

// const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const STREAM_API_SECRET = process.env.STREAM_SECRET_KEY;

// export const tokenProvider = async () => {
//   const user = await currentUser();

//   if (!user) throw new Error('User is not authenticated');
//   if (!STREAM_API_KEY) throw new Error('Stream API key is missing');
//   if (!STREAM_API_SECRET) throw new Error('Stream API secret is missing');

//   const streamClient = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);

//   // Define the user object
//   const newUser = {
//     id: user.id,
//     role: 'user', // Default role
//     name: user.fullName || user.username || 'Anonymous', // Fallback to 'Anonymous' if no name is available
//     image: user.imageUrl, // User's profile image from Clerk
//   };

//   // Upsert the user in Stream
//   await streamClient.upsertUsers([newUser]);

//   // Generate a token for the user
//   const validity = 60 * 60; // Token validity in seconds (1 hour)
//   const token = await streamClient.generateUserToken({
//     user_id: user.id,
//     validity_in_seconds: validity,
//   });

//   return token;
// };



