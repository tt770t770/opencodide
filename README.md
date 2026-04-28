# הבית שלי - חנות אינטרנטית

חנות אינטרנטית בנויה עם Next.js, כולל ניהול מוצרים ומערכת התחברות.

## התקנה

```bash
npm install
```

## הפעלה

```bash
npm run dev
```

האתר יפתח ב-`http://localhost:3000`

## משתמש ברירת מחדל (לפיתוח)

| | אימייל | סיסמה |
|---|--------|-------|
| מנהל | admin@store.com | admin123 |
| משתמש | user@test.com | user123 |

## התחברות עם GitHub OAuth

1. צור OAuth App ב-GitHub:
   - עבור ל-**Settings → Developer settings → OAuth Apps**
   - לחץ **New OAuth App**
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

2. צור קובץ `.env.local`:

```env
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_SECRET=any_random_string
NEXTAUTH_URL=http://localhost:3000
```

3. הפעל מחדש את השרת.

## מבנה הפרויקט

- `app/page.js` - דף הבית (רשימת מוצרים)
- `app/cart/` - עגלת קניות
- `app/admin/` - פאנל ניהול (מוגן - רק מנהל)
- `app/api/` - API
- `lib/store.js` - מידע (מוצרים, עגלה)
- `lib/users.js` - משתמשים

## הפקודות

| פקודה | תיאור |
|-------|-------|
| `npm run dev` | הפעלת שרת פיתוח |
| `npm run build` | בנייה לייצור |
| `npm start` | הפעלת שרת ייצור |
