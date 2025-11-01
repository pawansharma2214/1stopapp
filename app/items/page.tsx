import Link from "next/link";

async function getPosts(page: number, limit: number) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
    { cache: "no-store" }
  );
  if (!res.ok) return [];
  const posts = await res.json();
  const total = res.headers.get("x-total-count");
  return { posts, total: total ? parseInt(total) : 0 };
}

export default async function ItemsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params?.page || "1", 10);
  const limit = 10;

  const { posts, total } = await getPosts(currentPage, limit);
  const totalPages = Math.ceil(total / limit);

  // Sliding window for page numbers
  const pageWindow = 5; // show 5 pages at a time
  let startPage = Math.max(currentPage - Math.floor(pageWindow / 2), 1);
  let endPage = startPage + pageWindow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - pageWindow + 1, 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  return (
    <div>
      <h3>Items List (Page {currentPage})</h3>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/items/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {/* First */}
        {currentPage > 1 && (
          <Link href={`/items?page=1`} style={{ padding: "0.25rem 0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}>
            First
          </Link>
        )}

        {/* Prev */}
        {currentPage > 1 && (
          <Link href={`/items?page=${currentPage - 1}`} style={{ padding: "0.25rem 0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}>
            Prev
          </Link>
        )}

        {/* Ellipsis before */}
        {startPage > 1 && <span style={{ padding: "0.25rem 0.5rem" }}>…</span>}

        {/* Numbered Pages */}
        {pageNumbers.map((num) => (
          <Link
            key={num}
            href={`/items?page=${num}`}
            style={{
              padding: "0.25rem 0.5rem",
              border: num === currentPage ? "2px solid blue" : "1px solid #ccc",
              borderRadius: "4px",
              background: num === currentPage ? "#e0f0ff" : "#fff",
            }}
          >
            {num}
          </Link>
        ))}

        {/* Ellipsis after */}
        {endPage < totalPages && <span style={{ padding: "0.25rem 0.5rem" }}>…</span>}

        {/* Next */}
        {currentPage < totalPages && (
          <Link href={`/items?page=${currentPage + 1}`} style={{ padding: "0.25rem 0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}>
            Next
          </Link>
        )}

        {/* Last */}
        {currentPage < totalPages && (
          <Link href={`/items?page=${totalPages}`} style={{ padding: "0.25rem 0.5rem", border: "1px solid #ccc", borderRadius: "4px" }}>
            Last
          </Link>
        )}
      </div>
    </div>
  );
}
