export const prerender = false;
export async function GET({ cookies, redirect }: any) {
  cookies.delete('admin_session', { path: '/' });
  return redirect('/admin/login');
}
