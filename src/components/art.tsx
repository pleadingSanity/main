import { useState } from "react";

export function Art({
  src,
  alt,
  className,
  eager,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return <div className={`bg-surface ${className ?? ""}`} aria-hidden />;
  }
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={eager ? "eager" : "lazy"}
      onError={() => setOk(false)}
    />
  );
}
