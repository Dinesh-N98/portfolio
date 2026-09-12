export interface Project {
  slug: string;
  title: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  featured: boolean;
  date: string;
  pushedAt?: string;
  status: "Completed" | "Ongoing";
  techStack: string[];
  links?: {
    demo?: string;
    repo?: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  coverImage: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
}

export interface NewsEntry {
  title: string;
  date: string;
  description: string;
  category?: "Milestone" | "Project" | "Personal";
}
