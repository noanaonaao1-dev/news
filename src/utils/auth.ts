import type { AstroCookies } from 'astro';

async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export async function isAuthenticated(cookies: AstroCookies, password?: string) {
  const session = cookies.get('admin_session')?.value;
  if (!session) return false;

  if (password) {
    const hashed = await hashPassword(password);
    return session === hashed;
  }

  return !!session;
}

export { hashPassword };

export function redirectToLogin() {
  return new Response(null, {
    status: 302,
    headers: {
      Location: '/admin/login',
    },
  });
}
