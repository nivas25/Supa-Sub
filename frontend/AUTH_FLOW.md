# Authentication Flow Documentation

## Overview

This document outlines the optimized authentication system for Supa Sub, including login, session management, and protected routes.

## Architecture

### 1. **Middleware Protection** (`middleware.ts`)

- Validates user sessions on every request
- Redirects unauthenticated users away from protected routes (`/dashboard/*`)
- Redirects authenticated users away from auth routes
- Uses Supabase SSR client for server-side session verification
- Safe error handling to prevent infinite redirects

**Protected Routes:**

- `/dashboard`
- `/dashboard/content`
- `/dashboard/earnings`
- `/dashboard/settings`

### 2. **Auth Context** (`lib/auth-context.tsx`)

- Provides global auth state to the app
- Manages user session and loading states
- Listens for auth state changes from Supabase
- Handles signed-out events with automatic redirect

**Usage:**

```tsx
import { useAuth } from "@/lib/auth-context";

function MyComponent() {
  const { user, session, isLoading, isAuthenticated } = useAuth();
  // Use auth state...
}
```

### 3. **Server Actions** (`app/auth/actions.ts`)

#### `signInWithSocial(provider)`

- Initiates OAuth flow with Google, Apple, or Azure
- Automatically redirects to provider's login page
- Returns error if provider login fails

#### `sendOTP(email)`

- Sends 6-digit OTP to provided email
- Validates email format
- Returns `{ success, error }`

#### `verifyOTP(email, token)`

- Verifies the 6-digit OTP
- Creates session automatically
- Redirects to `/dashboard` on success
- Returns error details on failure

#### `signOut()`

- Clears Supabase session
- Redirects to home page with HTTP 303 (prevents browser caching)
- Prevents back button access to dashboard

### 4. **Callback Route** (`app/auth/callback/route.ts`)

- Handles OAuth provider callbacks
- Exchanges authorization code for session
- Supports `next` parameter for custom redirects
- Uses HTTP 303 status to prevent caching

### 5. **Auth Modal** (`app/(landing-page)/_components/AuthModal.tsx`)

- Interactive login modal with three methods:
  1. **OAuth** (Google, Apple, Microsoft)
  2. **Email OTP** (Passwordless)
- Error handling with user-friendly messages
- Loading states for all operations
- Keyboard support (Enter to submit)
- Input validation

## Authentication Flow Diagrams

### Social Login Flow

```
User clicks "Sign in with Google"
         ↓
sendOAuth initiated
         ↓
Redirected to Google login
         ↓
User authenticates with Google
         ↓
Google redirects to /auth/callback with code
         ↓
Code exchanged for session
         ↓
Redirected to /dashboard
```

### Email OTP Flow

```
User enters email → Click "Send Code"
         ↓
sendOTP sends 6-digit code to email
         ↓
Modal shows "Enter Code" step
         ↓
User enters 6-digit code
         ↓
verifyOTP validates code
         ↓
Session created
         ↓
Redirected to /dashboard
```

### Logout Flow

```
User clicks logout button
         ↓
signOut() called
         ↓
Supabase session cleared
         ↓
Redirected to home (HTTP 303)
         ↓
AuthContext detects sign-out
         ↓
User data cleared from state
```

## Key Features

### 1. **Back Button Prevention**

- Uses HTTP 303 (See Other) for redirects to prevent browser caching
- Redirects after successful login clear history
- Logout redirect also uses HTTP 303
- Middleware prevents accessing protected routes when logged out

### 2. **Session Persistence**

- Supabase SSR handles cookie-based sessions
- Session survives page refreshes
- Cookies automatically managed by middleware

### 3. **Error Handling**

- Input validation before API calls
- User-friendly error messages in AuthModal
- Server-side error logging
- Graceful fallbacks

### 4. **Security**

- Environment variables required for Supabase keys
- Middleware validates all protected route access
- OTP tokens are time-limited (Supabase default)
- OAuth providers handle secure auth flow

## Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # or your production URL
```

## Testing the Flow

### Local Development

```bash
npm run dev
# Visit http://localhost:3000
# Click "Get Started" to open auth modal
# Test each authentication method
# After login, should redirect to /dashboard
# Try browser back button - should not go back to login
# Click logout - should redirect to home
```

### Test Cases

1. ✅ Social login (Google/Apple/Microsoft)
2. ✅ Email OTP send and verify
3. ✅ Invalid email validation
4. ✅ Invalid OTP validation
5. ✅ Session persistence on refresh
6. ✅ Protected route access with/without auth
7. ✅ Back button behavior after login
8. ✅ Logout functionality

## Common Issues & Solutions

### Issue: "Cannot access /dashboard" after login

**Solution:** Check middleware.ts is correctly set up and user session exists

### Issue: Back button takes user back to login

**Solution:** Verify HTTP 303 redirects are used (not 301/302)

### Issue: Session not persisting on refresh

**Solution:** Check environment variables are set and Supabase cookies are enabled

### Issue: Login modal errors not showing

**Solution:** Check browser console for detailed error logs

## Future Enhancements

- [ ] Remember me functionality
- [ ] Two-factor authentication
- [ ] Social account linking
- [ ] Password reset flow
- [ ] Account deactivation
- [ ] Session timeout handling
- [ ] Rate limiting on OTP attempts
