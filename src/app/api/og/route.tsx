// app/api/og/route.tsx
import { ImageResponse } from "next/og";

// Required for edge runtime
export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Default Title";

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "#fff",
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "50px",
          fontSize: 60,
          fontWeight: "bold",
          color: "#000",
        }}
      >
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
