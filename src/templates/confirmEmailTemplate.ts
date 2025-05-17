const generateCofirmMail = (buttonUrl: string): string => {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
          <h1 style="text-align: center; color: #2a9df4;">Thank you for choosing our service!</h1>
          <p style="text-align: center; font-size: 16px;">
            We are excited to have you with us. To confirm your subscription, please click the button below. 
            This will help us ensure that you're receiving the updates you requested.
          </p>
          <p style="text-align: center; font-size: 16px;">
            If you did not request this, feel free to ignore this message.
          </p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${buttonUrl}" style="background-color: #00aaff; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; border-radius: 4px; font-weight: bold;">
              Confirm Subscription
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default generateCofirmMail;
