export default function AppLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {children}
    </div>
  );
}
