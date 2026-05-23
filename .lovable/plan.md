## Goal
A hidden admin that controls **100% of platform content** — every section's text, every image (upload/replace/delete), contact channels (email / WhatsApp / Instagram), and an inbox for inquiry submissions.

## 1. Hidden entry
- Small unlabeled square in the bottom-left corner (site-wide, in `__root.tsx`).
- Requires **3 clicks within 3 seconds** to open a login modal.
- Login modal asks for username + password. Default: `admin` / `1234` (as requested).
- On success: store an `admin_session` flag in `sessionStorage` and route to `/admin`.
- `/admin/*` routes check the flag; otherwise redirect home.

Note: hardcoded credentials + clientside gate are insecure (anyone viewing the bundle can see them and bypass writes). I'll honor your request, but I'll also enable Lovable Cloud and put **database write rules** behind a real signed-in admin account created on first launch, so the dashboard stays functional but data can't be vandalised by a curious visitor. The 3-click + admin/1234 flow will silently sign that admin account in behind the scenes.

## 2. Lovable Cloud (backend)
Enable Cloud for: Postgres tables, image Storage bucket, and an admin auth user.

**Tables**
- `site_settings` (single row) — contact email, WhatsApp number, Instagram URL/handle, plus any global text (tagline, footer line).
- `sections` — keyed JSON content for each home section (`hero`, `about`, `services_intro`, `process`, `cta`, `footer`…). One row per key, `content jsonb`.
- `services` — title, slug, summary, body, icon, image, order.
- `portfolio_items` — name, slug, chapter, story, cover image, gallery images[], order.
- `team_members` — name, role, bio, photo, order.
- `testimonials` — quote, name, role, rating, order.
- `inquiries` — name, email, phone, event type, date, message, created_at, read flag.

**Storage**: public bucket `media` for all uploaded/replaced images. Old images are deleted from storage when replaced/removed.

## 3. Public site changes
- `Footer.tsx` (and any contact CTA) reads `site_settings` and wires the three icons:
  - Instagram → `https://instagram.com/<handle>`
  - WhatsApp → `https://wa.me/<digits-only>?text=...`
  - Email → `mailto:<email>`
- `QuickInquiry` / contact form posts to `inquiries` table (with zod validation, length caps) instead of (or in addition to) the WhatsApp link.
- Every hardcoded text/image array currently in `index.tsx`, `portfolio.$slug.tsx`, `services.$slug.tsx`, `meet-the-team.tsx`, `testimonials.tsx` is replaced by data loaded from the tables. Bundled images become **seed defaults** inserted on first run so the site looks identical on day 1.

## 4. Admin dashboard (`/admin`)
Sidebar layout with one page per content area, each matching the site's section order so it feels 1:1:

1. **Dashboard** — counts, latest inquiries.
2. **Hero / About / Process / CTA / Footer copy** — form per section with live preview.
3. **Services** — list + create/edit/delete, image upload, reorder.
4. **Portfolio** — list + create/edit/delete, cover + gallery image manager, reorder.
5. **Team** — list + create/edit/delete, photo upload, reorder.
6. **Testimonials** — list + create/edit/delete.
7. **Inquiries (Inbox)** — table of submissions, mark read, delete, click row for details.
8. **Settings** — email, WhatsApp number, Instagram handle, change-admin-password.

Every image field uses a shared `<ImageUploader>` (drag/drop, preview, delete) backed by Storage. Every form uses react-hook-form + zod with length/format limits.

## 5. Technical details
- TanStack Start server functions (`createServerFn` + `requireSupabaseAuth`) for all writes; public reads use the browser client and RLS-public select.
- RLS: public `select` on content tables, public `insert` only on `inquiries`, all writes restricted to the admin user.
- Seed migration inserts current text/images so nothing visually changes until you edit it.
- WhatsApp/email/Instagram values are sanitised before being turned into URLs.

## Out of scope (ask if you want them)
- Multi-admin / role management.
- Audit log of edits.
- Rich-text WYSIWYG (I'll use textarea + simple line breaks; can upgrade to TipTap later).
