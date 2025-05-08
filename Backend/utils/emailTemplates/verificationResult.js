export const getSuccessHtml = (name) => `
  <div style="text-align: center; margin-top: 100px;">
    <h1 style="color: green;">Email Verified ✅</h1>
    <p style="font-size: 18px;">Thank you for verifying your email.</p>
    <p>You can now log in and start using the application.</p>
  </div>
`;

export const getFailureHtml = () => `
  <div style="text-align: center; margin-top: 100px;">
    <h1 style="color: red;">Verification Failed ❌</h1>
    <p>Invalid or expired token. Please try signing up again.</p>
  </div>
`;
