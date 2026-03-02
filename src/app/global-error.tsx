"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="uz">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#f5f5f5" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <div>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚽</div>
            <h1 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Sahifa vaqtincha ishlamayapti
            </h1>
            <p style={{ color: "#666", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
              Tizimda texnik nosozlik yuz berdi. Bir ozdan so&apos;ng qayta urinib ko&apos;ring.
            </p>
            <button
              onClick={reset}
              style={{
                padding: "0.5rem 1.5rem",
                background: "#1a3a6b",
                color: "#fff",
                border: "none",
                borderRadius: "0.75rem",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "0.875rem",
              }}
            >
              Qayta urinish
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
