import Link from "next/link";
import NotFound from "../../not-found";

// Fetch single post server-side
async function getPost(id: string) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null; // return null if not found
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // unwrap the promise
  console.log("Fetching post with ID:", id);

  const post = await getPost(id);

  if (!post) return <NotFound />;

  if (!post) {
    return (
      <main className="p-6">
        <Link href="/" className="text-sm text-gray-500 hover:underline">← Back to Home</Link>
        <h1 className="text-2xl font-bold mt-2 text-red-600">Post Not Found</h1>
        <p className="mt-2">The post with ID {id} does not exist.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <Link href="/" className="text-sm text-gray-500 hover:underline">← Back to Home</Link>
      <h1 className="text-3xl font-bold mt-2">{post.title}</h1>
      <p className="mt-4 text-gray-700">{post.body}</p>
    </main>
  );
}
