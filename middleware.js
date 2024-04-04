export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/properties/add',
    // NOTE: editing a property should be a private route
    '/properties/:id/edit',
    '/profile',
    '/properties/saved',
    '/messages',
  ],
};
