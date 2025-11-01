export default function ItemsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ border: "2px solid #ddd", padding: "1rem" }}>
      <h2>Items Section</h2>
      {children}
    </div>
  );
}
