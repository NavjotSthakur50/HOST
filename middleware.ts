// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const protectedRoute = createRouteMatcher([
//   "/upcoming",
//   "/meeting(.*)",
//   "/previous",
//   "/recordings",
//   "/personal-room",
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   const authObj = await auth();

//   if (protectedRoute(req) && !authObj.userId) {
//     return (await auth()).redirectToSignIn({ returnBackUrl: req.url }); // ✅ Correct way to redirect
//   }
// });

// // Exclude public pages like /sign-in and /sign-up
// export const config = {
//   matcher: [
//     "/((?!sign-in|sign-up|api|_next/static|_next/image|favicon.ico).*)",
//   ],
// };







import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoute = createRouteMatcher([
  "/upcoming",
  "/meeting(.*)",
  "/previous",
  "/recordings",
  "/personal-room",
]);

export default clerkMiddleware(async (auth, req) => {
  const authObj = await auth(); // ✅ Await the auth object

  if (protectedRoute(req) && !authObj.userId) {
    return redirectToSignIn({ returnBackUrl: req.url }); // ✅ Redirect unauthenticated users
  }
});

// Exclude public pages like /sign-in and /sign-up
export const config = {
  matcher: [
    "/((?!sign-in|sign-up|api|_next/static|_next/image|favicon.ico).*)",
  ],
};

function redirectToSignIn(arg0: { returnBackUrl: string; }): import("next/dist/server/web/types").NextMiddlewareResult | PromiseLike<import("next/dist/server/web/types").NextMiddlewareResult> {
  throw new Error("Function not implemented.");
}
