# Security Specification: InstaMocks

This document defines the data invariants, malicious payloads, and rules for validating Firebase access patterns.

## 1. Data Invariants

1. **User Identity Invariant**: A user's document ID in Firestore (`/users/{uid}`) must be exactly equal to their authenticated Firebase Authentication user ID (`request.auth.uid`).
2. **User PII Isolation Invariant**: Reading or modifying a user profile is restricted strictly to the owner of that profile (`isOwner` pattern). Blanket reads of user data are denied.
3. **User Profile Structure Invariant**: A user profile MUST consist of `uid`, `name`, `email`, `profilePhoto` (optional), and `createdAt`. Any extra shadow/ghost fields must trigger validation failure.
4. **Temporal Creation Invariant**: `createdAt` must be the server time of creation and is completely immutable thereafter.

---

## 2. The "Dirty Dozen" Malicious Payloads

The following payloads target the `/users/{uid}` path and must be rejected as `PERMISSION_DENIED`:

### Group A: Identity Spoofing (Setting uid to someone else)
1. **Payload 1**: Authenticated as `user_123`, writing to `users/user_456` with `uid: "user_456"`.
2. **Payload 2**: Authenticated as `user_123`, writing to `users/user_123` with a mismatched `uid: "user_fake"`.

### Group B: Shadow Fields / Privilege Escalation
3. **Payload 3**: Injecting an admin flag (`isAdmin: true`).
4. **Payload 4**: Injecting a custom permission role (`role: "super_admin"`).
5. **Payload 5**: Injecting a ghost field (`isVerified: true`).

### Group C: Temporal Violations (Messed up or Client-controlled timestamps)
6. **Payload 6**: Creating a user with a client-controlled `createdAt` timestamp in the past (`createdAt: 1000000000`).
7. **Payload 7**: Updating an existing user and mutating their immutable `createdAt` timestamp.

### Group D: Resource Poisoning (Denial of Wallet and overflow attacks)
8. **Payload 8**: Injecting a 2MB string as the `name` field to inflate resource sizes.
9. **Payload 9**: Injecting a 5MB base64 string as the `profilePhoto` field.
10. **Payload 10**: Attempting to query with a path ID with hostile/junk characters (`users/user_123<script>poison</script>`).

### Group E: Unauthenticated Access & Privilege Spying
11. **Payload 11**: Reading `users/user_123` as an unauthenticated or guest user.
12. **Payload 12**: Reading someone else's user profile (`users/user_456`) disguised with a valid login token as `user_123`.

---

## 3. Security Rules Execution

The security rules are defined to completely prevent all 12 of these vulnerability payloads. All updates and additions are constrained by:
1. `isOwner(uid)`
2. `isValidId(uid)`
3. `incoming().createdAt == request.time` (for creation)
4. `incoming().createdAt == existing().createdAt` (for updates)
