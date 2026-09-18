# My Portfolio

My personal portfolio is a living record of projects, writing, and progress as I build
toward starting my own company. Not a resume site; a personal brand and track-record
platform.

**Live site:** https://portfolio-dusky-sigma-31.vercel.app

## Tech stack

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS, dark theme, Space Grotesk font
- **Carousels:** Embla Carousel
- **Blog rendering:** react-markdown + @tailwindcss/typography
- **Contact form:** Resend API
- **Projects data:** Live GitHub API integration (not static) auto-pulls public
  repos, language stats, and links directly to GitHub
- **Deployment:** Vercel

## Features

- Home page with Top Projects and Recent Projects carousels, pulled live from GitHub
- Projects grid with tag/language filtering and per-language usage tooltips
- Blog with Markdown-rendered posts
- About page with bio, skills, and a "My Journey" section
- News page - a changelog-style feed of personal/project updates
- Contact form that sends real emails via Resend
- Fully responsive, accessible (keyboard nav, ARIA labels), and SEO-optimized
  (sitemap, robots.txt, per-page metadata)

  src/
app/ → Next.js App Router pages
components/ → Reusable UI and section components
content/ → Blog posts, news entries, project overrides
lib/ → Data-fetching helpers (GitHub API, content)
types/ → Shared TypeScript interfaces

## Contact

- Email: kalyanadineshnarada@gmail.com
- LinkedIn: https://www.linkedin.com/in/d-narada/
- X/Twitter: https://x.com/DineshNarada98
- GitHub: https://github.com/Dinesh-N98
