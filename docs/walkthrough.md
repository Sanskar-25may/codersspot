# Walkthrough: Module 1 - Authentication & Onboarding

We have successfully built and verified the complete Authentication & Onboarding pipeline! All files compile cleanly and are fully synchronized in git.

---

## 1. Backend Changes (Django API)

We built the core auth operations inside the `authentication` Django app:
*   **`authentication/models.py`**: Defined the custom `User` UUID database model and the `UserProfile` relation fields.
*   **`authentication/serializers.py`**:
    *   `UserRegisterSerializer`: Validates email availability, full name, phone number, and hashes credentials securely.
    *   `UserProfileSerializer`: Maps onboarding biography and specialization properties.
    *   `UserSerializer`: Serves user attributes and checks `onboarded` status via user profile presence.
*   **`authentication/views.py`**:
    *   `RegisterView`: Creates user credentials and yields tokens.
    *   `VerifyOTPView`: Decodes and authenticates Firebase IDTokens. Includes a dynamic `settings.DEBUG` mock bypass allowing dev verification.
    *   `OnboardingView`: Sets the role (`STUDENT` or `FACULTY`), creates the matching `UserProfile` profile card, and saves the details.
    *   `UserProfileDetailView`: Yields the authenticated profile details.
*   **`authentication/urls.py`**: Mapped auth routes to the endpoints under `/api/`.

---

## 2. Frontend Changes (React Client)

We built the state context and pages for portal verification:
*   **`src/services/api.ts`**: Initialized the global Axios instance. Attach access tokens to request headers and intercepts 401 Unauthorized errors to automatically request token refreshes.
*   **`src/context/AuthContext.tsx`**: React provider carrying session controls: `login`, `register`, `verifyOTP`, `onboard`, and silent token checks.
*   **`src/components/ProtectedRoute.tsx`**: Route guard. Restricts access to role subsets (`STUDENT`, `FACULTY`, `ADMIN`) and automatically forwards un-onboarded accounts to `/onboarding`.
*   **`src/pages/auth/AuthPage.tsx`**: Dynamic split-pane signup/login page. Supports validation errors, Firebase verifier prompts, and mock account credentials.
*   **`src/pages/onboarding/OnboardingPage.tsx`**: Dynamic card selector for Role onboarding setup.
*   **`src/App.tsx`**: Hooked up all pages inside the React router inside the global `<AuthProvider>`.

---

## 3. Verification & Build Confirmation

*   **Django system check**: Ran successfully with **0 errors**.
*   **Vite React SPA Build**: Built cleanly with **0 compiler warnings/errors**:
    ```bash
    dist/index.html                   0.45 kB
    dist/assets/index-CgQ8QyuB.css   20.86 kB
    dist/assets/index-Egt_cqzy.js   298.33 kB
    ```
*   **Git Sync**: Checked status and pushed all files cleanly to your remote GitHub main branch.
