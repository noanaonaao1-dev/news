import type { AstroCookies } from 'astro';

export function isAuthenticated(cookies: AstroCookies, password?: string) {
  const session = cookies.get('admin_session')?.value;
  if (!session) return false;

  if (password) {
    return session === password;
  }

  // フォールバック（互換性のため）
  return session === 'true' || !!session;
}

export function redirectToLogin() {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/admin/login',
    },
  });
}
