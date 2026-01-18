export default function AuthErrorPage() {
  return (
    <div
      style={{
        padding: "40px",
        textAlign: "center",
        fontFamily: "var(--font-outfit)",
      }}
    >
      <h1 style={{ fontSize: "2rem", fontWeight: "900" }}>
        Authentication Error
      </h1>
      <p>
        The login link may have expired or was already used. Please try logging
        in again.
      </p>
      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "12px 24px",
          background: "#000",
          color: "#fff",
          borderRadius: "100px",
          textDecoration: "none",
          fontWeight: "700",
        }}
      >
        Back to Home
      </a>
    </div>
  );
}
