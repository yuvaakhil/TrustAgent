export default function DocumentList({ docs }) {
  return (
    <div
      style={{
        width: "300px",
        borderLeft: "1px solid #334155",
        padding: "15px",
        background: "#020617"
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>📄 Documents</h3>

      {docs.length === 0 && <p>No documents yet</p>}

      {docs.map((d, i) => (
        <div
          key={i}
          style={{
            padding: "10px",
            marginBottom: "8px",
            background: "#020617",
            border: "1px solid #334155",
            borderRadius: "8px"
          }}
        >
          <strong>{d.fileName}</strong>
          <div style={{ fontSize: "12px", opacity: 0.7 }}>
            {d.docType}
          </div>
        </div>
      ))}
    </div>
  );
}
