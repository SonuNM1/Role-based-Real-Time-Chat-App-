
---

## ✅ **User & Admin Authentication**

### **📝 User Signup**

* [ ] Test user signup with name, first name, email, country, and password.
* [ ] Ensure email verification is sent after signup.
* [ ] Test that a user cannot sign up with an already registered email.
* [ ] Verify that an unverified user cannot log in.

### **🔑 Admin Login**

* [ ] Test admin login with valid credentials.
* [ ] Test admin login with invalid credentials (wrong email or password).
* [ ] Ensure JWT token is correctly issued for admin login.

### **👑 Admin Creation (Only for Existing Admins)**

* [ ] Test creation of new admins by existing admins.
* [ ] Ensure that a non-admin cannot create new admins.
* [ ] Ensure the newly created admin can log in and receive a valid JWT token.

### **📧 Email Verification**

* [ ] Test the email verification flow for users after signing up.
* [ ] Verify that users can’t log in without verifying their email.
* [ ] Test edge cases like expired or invalid verification links.

---

## 💬 **WebSocket Messaging**

### **🔐 Private Messaging (User to User)**

* [ ] Test that users can send messages to other users via WebSockets.
* [ ] Ensure that only the intended recipient receives the message.

### **👥 Group Messaging**

* [ ] Test that users can join a group and send messages to that group.
* [ ] Verify that users who are part of the group can receive group messages.
* [ ] Test that users can leave a group and no longer receive group messages.

### **🛡️ Authorization of Messages**

* [ ] Ensure that only authenticated users can send messages.
* [ ] Test that unauthorized users are blocked from sending messages.

---

## 🛠️ **Server-Side Validation**

### **📝 Field Validation for Signup/Login**

* [ ] Test that missing fields in the signup or login request return appropriate validation errors.
* [ ] Ensure that password strength validation is working as expected.

### **🔒 API Endpoint Validation**

* [ ] Test server-side validation for all endpoints (signup, login, create admin, send message, etc.).
* [ ] Verify that invalid requests (e.g., invalid email format, missing parameters) return appropriate error messages.

---

## 📝 **Logging & Log Rotation**

### **📋 General Logging**

* [ ] Verify that logs are generated for key actions (user signup, login, admin creation, etc.).
* [ ] Ensure that all sensitive data (e.g., passwords) is masked or excluded from logs.

### **🔄 Log Rotation**

* [ ] Test that logs are being rotated properly (logs should not grow indefinitely).
* [ ] Verify that old logs are archived or deleted as per the log rotation policy.

---

## ⏳ **Rate Limiting**

### **⚙️ Rate Limiting on Endpoints**

* [ ] Test that rate limits are applied on all API endpoints (signup, login, create admin, etc.).
* [ ] Verify that users receive a proper response when they exceed the rate limit (e.g., "Too many requests" error).

### **🔄 Rate Limiting Behavior**

* [ ] Ensure that rate limiting is reset after the specified time interval (e.g., 1 minute, 1 hour).
* [ ] Test that rate limiting is applied per IP address and/or user account as per your requirements.

---

## 📖 **Swagger Documentation**

### **🧑‍💻 API Documentation (Swagger)**

* [ ] Verify that the Swagger UI displays the correct API routes for users and admins.
* [ ] Ensure that the Swagger documentation has accurate parameters, request bodies, and responses for each endpoint.
* [ ] Test the "Authorize" functionality in Swagger UI to authenticate with the JWT token.

### **🔐 Admin & User Swagger Links**

* [ ] Test that the `/api/docs/user` and `/api/docs/admin` endpoints in Swagger UI show separate documentation for user and admin-specific actions.

---

