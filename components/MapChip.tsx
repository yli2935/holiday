import { gmaps } from "@/lib/data";

type MapChipProps = {
  query: string;
  label?: string;
  size?: "sm" | "md";
  className?: string;
};

// 统一的"打开地图"内联链接
export default function MapChip({
  query,
  label = "地图",
  size = "sm",
  className = "",
}: MapChipProps) {
  return (
    <a
      href={gmaps(query)}
      target="_blank"
      rel="noreferrer"
      className={`group/map inline-flex items-baseline gap-0.5 whitespace-nowrap align-baseline font-semibold text-sky-600 transition-colors hover:text-sky-700 active:opacity-70 ${
        size === "md" ? "text-xs font-bold" : "text-[12px]"
      } ${className}`}
    >
      <span aria-hidden className="text-[0.95em]">
        📍
      </span>
      <span className="font-art text-[1.2em] font-normal leading-none underline decoration-sky-300/80 decoration-[1.5px] underline-offset-[3px] transition-colors group-hover/map:decoration-sky-500">
        {label}
      </span>
    </a>
  );
}
