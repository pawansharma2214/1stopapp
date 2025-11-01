import Link from "next/link";

// Define type for posts API result
type Post = {
  id: number;
  title: string;
  body: string;
};

type GetPostsResult = {
  posts: Post[];
  total: number;
};

// Fetch posts with pagination
async function getPosts(page: number, limit: number): Promise<GetPostsResult> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return { posts: [], total: 0 }; // always return consistent shape
  }

  const posts: Post[] = await res.json();
  const totalHeader = res.headers.get("x-total-count");
  const total = totalHeader ? parseInt(totalHeader) : 0;

  return { posts, total };
}

export default async function ItemsPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const currentPage = parseInt(params?.page || "1", 10);
  const limit = 10;

  const { posts, total } = await getPosts(currentPage, limit);
  const totalPages = Math.ceil(total / limit);

  // Sliding window for pagination numbers
  const pageWindow = 5;
  let startPage = Math.max(currentPage - Math.floor(pageWindow / 2), 1);
  let endPage = startPage + pageWindow - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - pageWindow + 1, 1);
  }

  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <h2>Items List (Page {currentPage})</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/items/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {/* First */}
        {currentPage > 1 && (
          <Link href={`/items?page=1`} style={paginationStyle}>
            First
          </Link>
        )}
        {/* Prev */}
        {currentPage > 1 && (
          <Link href={`/items?page=${currentPage - 1}`} style={paginationStyle}>
            Prev
          </Link>
        )}
        {/* Ellipsis before */}
        {startPage > 1 && <span style={{ padding: "0.25rem 0.5rem" }}>…</span>}
        {/* Numbered pages */}
        {pageNumbers.map((num) => (
          <Link
            key={num}
            href={`/items?page=${num}`}
            style={{
              ...paginationStyle,
              border: num === currentPage ? "2px solid blue" : "1px solid #ccc",
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
          <Link href={`/items?page=${currentPage + 1}`} style={paginationStyle}>
            Next
          </Link>
        )}
        {/* Last */}
        {currentPage < totalPages && (
          <Link href={`/items?page=${totalPages}`} style={paginationStyle}>
            Last
          </Link>
        )}
      </div>
    </div>
  );
}

 

// Common pagination button style
const paginationStyle: React.CSSProperties = {
  padding: "0.25rem 0.5rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  textDecoration: "none",
  color: "black",
};
