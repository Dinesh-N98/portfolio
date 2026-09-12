import Image from "next/image";

interface ProjectThumbnailProps {
  title: string;
  image?: string;
  primaryLanguage?: string;
}

const gradients = [
  "linear-gradient(135deg, rgba(12,17,29,0.96) 0%, rgba(20,74,109,0.92) 28%, rgba(32,182,181,0.9) 100%)",
  "linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(67,56,202,0.92) 35%, rgba(59,130,246,0.88) 100%)",
  "linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(6,78,59,0.9) 38%, rgba(16,185,129,0.88) 100%)",
  "linear-gradient(135deg, rgba(17,24,39,0.96) 0%, rgba(124,58,237,0.9) 32%, rgba(244,114,182,0.86) 100%)",
  "linear-gradient(135deg, rgba(12,17,29,0.96) 0%, rgba(153,27,27,0.92) 30%, rgba(251,146,60,0.9) 100%)",
  "linear-gradient(135deg, rgba(12,17,29,0.96) 0%, rgba(30,64,175,0.9) 34%, rgba(96,165,250,0.88) 100%)",
  "linear-gradient(135deg, rgba(12,17,29,0.96) 0%, rgba(15,118,110,0.9) 36%, rgba(45,212,191,0.9) 100%)",
  "linear-gradient(135deg, rgba(9,12,22,0.96) 0%, rgba(88,28,135,0.9) 36%, rgba(168,85,247,0.88) 100%)",
];

function hashString(value: string) {
  return [...value].reduce((total, char) => total + char.charCodeAt(0), 0);
}

export default function ProjectThumbnail({ title, image, primaryLanguage }: ProjectThumbnailProps) {
  const paletteIndex = Math.abs(hashString(title)) % gradients.length;
  const gradient = gradients[paletteIndex];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-t-lg bg-slate-950" style={{ background: gradient }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.45),transparent_42%)]" />

      {image ? (
        <div className="relative z-10 flex h-full w-full items-center justify-center p-3 sm:p-4">
          <div className="relative h-full w-full overflow-hidden rounded-md bg-black/10" aria-hidden="true">
            <Image
              src={image}
              alt={`${title} project preview`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex h-full w-full items-center justify-center p-6 text-center">
          <div className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-white/80">
            {primaryLanguage || "Project"}
          </div>
        </div>
      )}
    </div>
  );
}
