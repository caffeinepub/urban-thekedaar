# Specification

## Summary
**Goal:** Remove the profile setup popup, update the hero headline, and replace the admin panel's Internet Identity login with a simple hardcoded username/password form.

**Planned changes:**
- Remove the `ProfileSetup` modal/component so it never appears after login or anywhere in the app
- Update the Hero section's main headline to "Urban Thekedaar — We build structures for generations"
- Replace the admin panel's Internet Identity authentication with a login form using hardcoded credentials (username: `admin`, password: `admin123`), showing an error message for incorrect credentials and granting full admin access on success

**User-visible outcome:** After logging in, users no longer see a profile setup popup. The homepage hero displays the new headline. Admins can access the admin panel by entering the hardcoded credentials instead of using Internet Identity.
