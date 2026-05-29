# Migrating Linchry Events to an External Supabase Project

This kit lets you move the platform off Lovable Cloud onto a Supabase
project you own. You will end up with the same admin dashboard, the
same public site, and the same data shape — just pointed at your own
Supabase URL and keys.

## What you need

- A free Supabase account: https://supabase.com
- 10 minutes

---

## 1. Create the Supabase project

1. Go to https://supabase.com/dashboard → **New project**.
2. Pick a name + region close to your audience (Frankfurt / Singapore for KE).
3. Save the database password somewhere safe.
4. Wait ~2 minutes for it to provision.

## 2. Run the schema

1. Open **SQL Editor → New query**.
2. Paste the entire contents of `schema.sql` (next to this file).
3. **Before running**, find/replace `admin@linchry.local` with the
   email you want to use as the admin (e.g. `you@yourdomain.com`).
4. Click **Run**. You should see "Success. No rows returned."

This creates: `site_settings`, `sections`, `services`, `portfolio_items`,
`team_members`, `testimonials`, `inquiries`, the `media` storage bucket,
and all RLS policies. It also seeds default services / portfolio / team
/ testimonial rows so the site isn't empty on day 1.

## 3. Create the admin user

1. **Authentication → Users → Add user → Create new user**.
2. Email: the one you used in step 2.
3. Password: anything ≥ 6 chars.
4. **Tick "Auto Confirm Email"** so you can log in immediately.

## 4. Grab your API keys

In **Project Settings → API**, copy:

| Field in dashboard | Goes into env var |
|---|---|
| Project URL | `VITE_SUPABASE_URL` and `SUPABASE_URL` |
| `anon` / `publishable` key | `VITE_SUPABASE_PUBLISHABLE_KEY` and `SUPABASE_PUBLISHABLE_KEY` |
| `service_role` key (secret) | `SUPABASE_SERVICE_ROLE_KEY` |
| Project ref (in URL) | `VITE_SUPABASE_PROJECT_ID` |

## 5. Point the app at your project

If you're hosting outside Lovable (Vercel, Netlify, Cloudflare, your own
server), set these as environment variables on your host:

```
VITE_SUPABASE_URL=https://YOUR-REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...   (anon key)
VITE_SUPABASE_PROJECT_ID=YOUR-REF
SUPABASE_URL=https://YOUR-REF.supabase.co
SUPABASE_PUBLISHABLE_KEY=eyJhbGc...        (anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...       (service role — server only!)
```

Then redeploy. Nothing else in the code needs to change — the Supabase
client reads these env vars automatically.

## 6. Update the admin email in code (optional)

The admin login modal accepts the literal username `admin` and maps it to
`admin@linchry.local`. If you used a different admin email, open
`src/lib/admin.functions.ts` and change `ADMIN_EMAIL` to match.

## 7. Sign in

1. Open your site.
2. Click the small **invisible square** in the **bottom-left corner**
   three times within three seconds.
3. Enter the admin email (or `admin` if you kept the default) and the
   password you set in step 3.
4. You land on `/admin`.

## 8. Day-to-day editing

| Section of the site | Where to edit |
|---|---|
| Hero / About / CTA copy | Admin → Page Copy |
| Service cards & images | Admin → Services |
| Portfolio strip & detail pages | Admin → Portfolio |
| Team grid | Admin → Team |
| Testimonials block | Admin → Testimonials |
| Email / WhatsApp / Instagram (footer + contact icons) | Admin → Settings |
| Form submissions from visitors | Admin → Inquiries |

Every change you save is visible on the public site within ~30 seconds
(query cache TTL). Hard-refresh in another tab to see it instantly.

## Notes on images

- The `media` bucket stores **originals** at full resolution — no
  resizing, no compression. What you upload is what your visitors see.
- Keep uploads under 10 MB. For hero images, export JPEG at quality 85
  and ~2400 px wide for the best size/quality trade-off.
- Public URLs look like
  `https://YOUR-REF.supabase.co/storage/v1/object/public/media/...`
  and are cached for 1 hour at the CDN edge.

## Backing up

- **SQL Editor → "Database" → "Backups"** for full snapshots.
- Or `pg_dump` against the database URL in Project Settings → Database.

## Troubleshooting

- **"new row violates row-level security policy"** when saving in admin:
  the email on your admin user doesn't match the email baked into the
  policies. Re-run `schema.sql` with the correct email, or run
  `ALTER POLICY ... USING ((auth.jwt()->>'email') = 'your@email')` for
  each `admin write *` policy.
- **Images upload but don't appear**: confirm the `media` bucket is
  marked **public** in Storage → media → Configuration.
- **Contact form returns an error**: check `inquiries` RLS — the
  `public insert inquiries` policy must exist.
