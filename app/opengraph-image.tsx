import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Yayasan Pondok Pesantren Al Huda Plumbon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", background: "#0f4c3a", color: "white", padding: "72px 82px", position: "relative", fontFamily: "serif" }}><div style={{ position: "absolute", width: 430, height: 430, border: "1px solid rgba(232,202,139,.35)", borderRadius: 999, right: -80, top: -120, display: "flex" }}/><div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}><div style={{ display: "flex", alignItems: "center", gap: 18 }}><div style={{ width: 62, height: 62, border: "2px solid #d6af60", borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", color: "#f0d48f", fontSize: 20 }}>AH</div><div style={{ fontFamily: "sans-serif", fontSize: 21, color: "#dce9e2", display: "flex" }}>Yayasan Pondok Pesantren</div></div><div style={{ display: "flex", flexDirection: "column" }}><div style={{ color: "#e4c982", fontFamily: "sans-serif", fontSize: 22, textTransform: "uppercase", letterSpacing: 5, marginBottom: 20 }}>Pamijahan · Plumbon · Cirebon</div><div style={{ fontSize: 73, lineHeight: 1.05, maxWidth: 850, display: "flex" }}>Al Huda</div><div style={{ fontFamily: "sans-serif", fontSize: 30, color: "#c6d9d0", marginTop: 15, display: "flex" }}>Tumbuh dalam ilmu, kokoh dalam akhlak.</div></div></div></div>, size);
}
