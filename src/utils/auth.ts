import type { AstroCookies } from 'astro';

export function isAuthenticated(cookies: AstroCookies) {
  return cookies.get('admin_session')?.value === 'true';
}

export function redirectToLogin() {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/admin/login',
    },
  });
}
