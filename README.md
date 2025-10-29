# Yellow Solaris (Vite + React) - Demo Trading Simulator

## What this package includes
- Vite + React app styled in dark golden-yellow theme
- Supabase integration (signup/login/persistent balances)
- Email verification using EmailJS
- Admin panel to view/edit up to 1000 users
- Netlify-ready (_redirects included)

## Important credentials (demo)
- Admin email: frankmorrison000000001@gmail.com
- Admin password: JOKER123

## How to deploy
1. Unzip and open the folder.
2. Create a GitHub repo and push the contents.
3. On Netlify: Import from GitHub, set build command `npm run build`, publish dir `dist`.
4. Ensure you set any required environment variables in Netlify if you move keys to env vars.

## Notes
- This is a demo/training app. Do NOT use for real funds.
- Passwords are stored plain-text in the demo table for convenience. Use Supabase Auth for production.
