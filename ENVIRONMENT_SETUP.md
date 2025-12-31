# Environment Setup Guide

This application now supports both localhost and IP address access automatically.

## How It Works

The application automatically detects whether you're accessing it via:
- `http://localhost:3000` 
- `http://192.168.1.10:3000` (or any IP address)

And configures the API calls accordingly.

## Quick Start

1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Access via localhost:**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`

3. **Access via IP address:**
   - Frontend: `http://192.168.1.10:3000`
   - Backend API: `http://192.168.1.10:8000`

## Environment Switching (Optional)

If you need to manually switch environments:

```bash
# Switch to localhost mode
npm run switch:local

# Switch to IP mode  
npm run switch:ip

# Start with specific environment
npm run dev:local    # localhost mode
npm run dev:ip       # IP mode
```

## Features

- ✅ Automatic API URL detection based on access method
- ✅ Dynamic OAuth callback URLs
- ✅ CORS configured for both localhost and IP access
- ✅ Works with Google and GitHub OAuth
- ✅ All API calls automatically use correct endpoints

## Troubleshooting

1. **OAuth not working**: Make sure you're accessing the app consistently (either always localhost or always IP)
2. **API calls failing**: Check that both frontend and backend are running
3. **CORS errors**: Restart the backend server after environment changes

## Technical Details

- Frontend uses dynamic API URL detection in `src/utils/apiConfig.js`
- Backend uses dynamic OAuth callbacks in `backend/src/routes/auth.js`
- CORS allows both localhost and IP origins
- Next.js binds to all interfaces (0.0.0.0) for IP access