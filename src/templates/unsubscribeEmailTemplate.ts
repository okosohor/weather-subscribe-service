const generateUnsubscribeMail = (buttonUrl: string): string => {
  return `
    <html>
      <body style="font-family: Arial, sans-serif; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; border-radius: 8px;">
          <h1 style="text-align: center; color: #2a9df4;">Subscription confirmed!</h1>
          <p style="text-align: center; font-size: 16px;">
            Thank you for confirming your subscription. You'll now receive regular weather updates for your city.
          </p>
          <p style="text-align: center; font-size: 16px;">
            If at any point you no longer wish to receive updates, just click the button below to unsubscribe.
          </p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${buttonUrl}" style="background-color: #d9534f; color: white; padding: 12px 28px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; border-radius: 4px; font-weight: bold;">
              Unsubscribe
            </a>
          </div>
        </div>
      </body>
    </html>
  `;
};

export default generateUnsubscribeMail;
