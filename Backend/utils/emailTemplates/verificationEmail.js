export const getVerificationEmailHtml = (verificationUrl) => {
    return `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333;">Welcome to Chat App 🎉</h2>
        <p style="font-size: 16px; color: #555;">Please confirm your email address by clicking the button below:</p>
        <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; margin-top: 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
        <p style="margin-top: 30px; font-size: 14px; color: #999;">If you did not create an account, you can safely ignore this email.</p>
      </div>
    </div>`
}