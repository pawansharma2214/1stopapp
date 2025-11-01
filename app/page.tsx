import Link from "next/link";

// Fetch posts server-side
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", { cache: 'no-store' });
  return res.json();
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div>
      <h2>Welcome to My App</h2>
      <p>Go to <a href="/items">Items List</a></p>
    </div>
  );
}
