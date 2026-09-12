"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import EmptyState from "@/src/components/ui/EmptyState";
import ProjectCard from "@/src/components/sections/ProjectCard";
import type { Project } from "@/src/types/content";

interface ProjectCarouselProps {
  projects: Project[];
  variant: "hot" | "recent";
  languageStats?: Record<string, number>;
}

export default function ProjectCarousel({ projects, variant, languageStats = {} }: ProjectCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateCarouselState = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setScrollSnaps(emblaApi.scrollSnapList());
    };

    updateCarouselState();
    emblaApi.on("select", updateCarouselState);
    emblaApi.on("reInit", updateCarouselState);

    return () => {
      emblaApi.off("select", updateCarouselState);
      emblaApi.off("reInit", updateCarouselState);
    };
  }, [emblaApi]);

  if (projects.length === 0) {
    return <EmptyState message={`No ${variant === "hot" ? "featured" : "recent"} projects yet.`} />;
  }

  const slideSize = variant === "hot" ? "basis-full md:basis-1/2" : "basis-1/2 md:basis-1/3 lg:basis-1/4";
  const carouselLabel = variant === "hot" ? "Featured projects" : "Recent projects";

  return (
    <div
      className="focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
      role="region"
      aria-label={carouselLabel}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          emblaApi?.scrollPrev();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          emblaApi?.scrollNext();
        }
      }}
    >
      <div className="touch-pan-y overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex" aria-live="polite">
          {projects.map((project, index) => (
            <div key={project.slug} className={`min-w-0 shrink-0 grow-0 pl-4 ${slideSize}`}>
              <ProjectCard project={project} priority={index === 0} languageStats={languageStats} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2" aria-label={`${carouselLabel} pagination`}>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to ${carouselLabel.toLowerCase()} slide ${index + 1}`}
              aria-current={index === selectedIndex ? "true" : undefined}
              onClick={() => emblaApi?.scrollTo(index)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <span
                aria-hidden="true"
                className={`block h-2.5 rounded-full transition-all ${
                  index === selectedIndex ? "w-7 bg-accent" : "w-2.5 bg-white/25"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label={`Previous ${carouselLabel.toLowerCase()}`}
            disabled={!canScrollPrev}
            onClick={() => emblaApi?.scrollPrev()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-lg transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span aria-hidden="true">&lt;-</span>
          </button>
          <button
            type="button"
            aria-label={`Next ${carouselLabel.toLowerCase()}`}
            disabled={!canScrollNext}
            onClick={() => emblaApi?.scrollNext()}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-lg transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span aria-hidden="true">-&gt;</span>
          </button>
        </div>
      </div>
    </div>
  );
}