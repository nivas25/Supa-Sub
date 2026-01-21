"use client";
import CreatorStudio from "@/components/studio/CreatorStudio";

export default function EditorPage({ params }: { params: { id: string } }) {
  return (
    <div style={{ background: "#f8fafc", minHeight: "calc(100vh - 72px)" }}>
      <CreatorStudio />
    </div>
  );
}
