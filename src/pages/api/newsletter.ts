import type { APIRoute } from 'astro';
import { XataClient } from '../../xata';

export const POST: APIRoute = async ({ request, redirect }) => {
  const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY });
  const formData = await request.formData();
  const email = formData.get('email') as string;

  if (!email) {
    return redirect('/newsletter/error?message=Email is required', 307);
  }
  try {
    await xata.db.subscribers.create({
      email,
    });
    return redirect('/newsletter/success', 307);
  } catch (error: any) {
    if (
      error?.errors[0]?.message ===
      'invalid record: column [email]: is not unique'
    ) {
      return redirect('/newsletter/error?message=Email already exists', 307);
    }
    return redirect('/newsletter/error?message=Something went wrong', 307);
  }
};
