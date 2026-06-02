# Admin Credentials

**Email:** admin@linchry.local
**Password:** 123456L

## Important Security Notes

1. **Change password immediately** after first login in Supabase Dashboard
2. Update the SQL policies if you change the admin email
3. The credentials are stored in:
   - `src/lib/admin.functions.ts` (for code)
   - Supabase Authentication (for actual user)

## How to Change Admin Credentials

### Update Code (for future admins):
Edit `src/lib/admin.functions.ts`:
```typescript
export const ADMIN_EMAIL = "your-new-email@example.com";
// In ensureAdminUser handler:
const password = "your-new-password";
```

### Update in Supabase:
1. Go to Authentication → Users
2. Find the admin user
3. Click "Reset Password" or delete and recreate
4. Update RLS policies if email changed:
   - Search for `admin@linchry.local` in your policies
   - Replace with new email
