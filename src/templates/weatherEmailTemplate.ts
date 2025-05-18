const generateWeatherMail = (
  temperature: number,
  humidity: number,
  description: string,
): string => {
  return `
    <html>
      <body>
        <p>Here is your weather forecast:</p>
        <ul>
          <li><strong>Temperature:</strong> ${temperature}°C</li>
          <li><strong>Humidity:</strong> ${humidity}%</li>
          <li><strong>Description:</strong> ${description}</li>
        </ul>
        <p>Stay safe and plan your day accordingly!</p>
      </body>
    </html>
  `;
};

export default generateWeatherMail;
