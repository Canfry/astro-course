import type { APIRoute } from 'astro';
import { XataClient } from '../../xata';

export const POST: APIRoute = async ({ request, cookies }) => {
  const user = cookies.get('userId');

  if (!user) {
    return new Response(JSON.stringify({ error: 'Not logged in' }), {
      status: 401,
    });
  }

  const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY });
  const { post, emoji } = await request.json();

  if (!post || !emoji) {
    return new Response(JSON.stringify({ error: 'Missing post or emoji' }), {
      status: 400,
    });
  }

  try {
    const existingReaction = await xata.db.reactions
      .filter({
        post,
        emoji,
        'user.id': user.value,
      })
      .getFirst();
    if (existingReaction) {
      await existingReaction.delete();
      return new Response(JSON.stringify({ existingReaction }), {
        status: 200,
      });
    } else {
      const createdReaction = await xata.db.reactions.create({
        post,
        emoji,
        user: user.value,
      });
      return new Response(JSON.stringify(createdReaction), { status: 200 });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Something went wrong',
      }),
      {
        status: 500,
      }
    );
  }
};
