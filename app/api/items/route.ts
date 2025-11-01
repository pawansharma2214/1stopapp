export async function GET() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const items = await res.json();

  return Response.json(items);
}
