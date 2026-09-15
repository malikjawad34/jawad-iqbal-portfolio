# M. Jawad Iqbal — portfolio

A production-oriented Next.js portfolio focused on enterprise software, full-stack ownership, cloud delivery, and practical AI integrations.

## Run locally

Requires Node.js 22 LTS and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. The project uses the Next.js App Router, React, strict TypeScript, Tailwind CSS 4, and a locally served Inter variable font. Exact package versions are recorded in package-lock.json.

## Build and verify

```sh
npm run build
npm run typecheck
npm run lint
npm start
```

The build exports static HTML and assets into `out/`. `npm start` serves that export locally. No application server, API secrets, or database are required. The preview server is intended for local inspection; use a managed static host for production. Run `python scripts/verify_export.py` after building to check internal routes, assets, metadata, and schema.

## Architecture

- `src/app`: pages, shared layout, static case-study routes, sitemap and robots.
- `src/components`: navigation, project cards, diagrams, enquiry form, and shared sections.
- `src/data/profile.ts`: identity, professional links, experience, expertise.
- `src/data/projects.ts`: typed case-study content, scopes, links, and architecture summaries.
- `src/data/seo.ts`: canonical origin and metadata factory.
- `src/styles/`: shared tokens, homepage, interior pages, and responsive design rules; imported by `src/app/globals.css`.
- `public`: optimized supplied images and original downloadable CV.
- `docs/STRATEGY.md`: positioning, design system, editorial choices, source notes, and content gaps.
- `docs/VERIFICATION.md`: final verification results and limitations.

Most components render at build time. Client JavaScript is restricted to navigation, work filtering, and the email enquiry builder. Project detail routes use `generateStaticParams`; unknown slugs return the 404 page. There is no CMS or runtime content fetch to fail at page load.

## Update content

Change the typed data files for projects, roles, skills, and profile links. A new case study needs a unique slug, a documented scope and role, evidence-based outcomes, and its source links. The Work page, project routes, next-project navigation, and sitemap update from that same data. Check the homepage selection when changing project order.

Replace `public/M-Jawad-Iqbal-CV.pdf` to update the downloadable CV. The supplied portrait and banner have local WebP versions with explicit dimensions. Fonts are bundled locally through `next/font/local`, avoiding third-party runtime font requests.

## Deploy to Vercel

1. Push this project to a repository under your account.
2. Import it in Vercel and select Next.js. Use Node.js 22, install command `npm ci`, build command `npm run build`, and static output `out` if an output override is needed.
3. Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin with no trailing slash, such as the exact domain assigned by Vercel. Copy `.env.example` to `.env.local` for local overrides. This value is public and embedded at build time.
4. Build and deploy. Test `/`, `/work/`, every case study, `/about/`, `/contact/`, `/404.html`, `/robots.txt`, and `/sitemap.xml`.
5. For a custom domain, add it in the hosting dashboard and apply the DNS records the host provides. After TLS is active, update `NEXT_PUBLIC_SITE_URL` and redeploy so canonical URLs and the sitemap match. Redirect other domain variants to the canonical domain through the host.

For another static host, upload the contents of `out/`, enable directory index files, and serve `/404.html` with HTTP status 404 for missing routes. Do not rewrite every missing URL to the homepage. The repository also includes a Sites manifest for the private review deployment; it does not affect Vercel.

A private review URL is not a public recruiting website. Configure the intended public host and domain before sharing with recruiters or requesting search indexing.

## Contact behavior

The enquiry form validates fields, then prepares a `mailto:` draft. It does not send email, store submissions, or claim successful delivery. The visitor reviews and sends using their email app. The copy action provides a fallback. Direct email and professional links remain usable without JavaScript.

If you later want on-site submission, add a managed form endpoint or server function with server-side validation, rate limiting, spam controls, and explicit delivery/error states. Keep provider credentials server-side. Static export has no API-route runtime.

## Analytics

No analytics is active and no third-party tracking scripts run by default. The semantic route structure supports later integration. A lightweight provider can capture page views and conversion events such as `case_study_opened`, `cv_download`, `contact_email_draft`, and `contact_copy`. Never record enquiry text or email addresses in analytics. Add tracking only after choosing a provider and reviewing its privacy requirements. Preview scores are lab results, not field Core Web Vitals.

## SEO and accessibility

Every content page has a unique title, description, canonical URL, Open Graph data, and a Twitter summary card. Person and case-study CreativeWork schemas identify the author and the work accurately. A generated sitemap and robots file are included. The supplied banner is used as the social-preview image; project diagrams are explicitly simplified architecture summaries.

Navigation, filters, form labels, keyboard focus, skip links, reduced-motion preferences, and responsive layouts are implemented. No autoplay, scroll hijacking, external font loading, or large animation library is used.
