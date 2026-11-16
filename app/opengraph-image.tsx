import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The image renderer cannot read tokens.css, so the light theme colors are written inline.
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 60,
        background: "#f2f5fc",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 64,
          background: "#ffffff",
          border: "4px solid #0e1630",
          boxShadow: "12px 12px 0 0 #0e1630",
          color: "#0e1630",
        }}
      >
        <div style={{ fontSize: 32, color: "#56607f" }}>{profile.location}</div>
        <div style={{ marginTop: 8, fontSize: 104 }}>{profile.name}</div>
        <div style={{ display: "flex", marginTop: 24 }}>
          <div
            style={{ padding: "4px 16px", fontSize: 44, background: "#8ab4ff" }}
          >
            {profile.title}
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
