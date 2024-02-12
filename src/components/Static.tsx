"use client";
export default function Static() {
  return (
    <div
      className="absolute opacity-35 animate-shift inset-[-500px]"
      style={{
        backgroundImage: "url('/img/static.png')",
        backgroundSize: "320px",
      }}
    />
  );
}
