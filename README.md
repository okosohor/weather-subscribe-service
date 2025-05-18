# 🌦️ Weather Subscribe Service

> 🧪 **Demo frontend**: [github-crm.vercel.app](https://github-crm.vercel.app)

> ⚠️ **Backend runs on a free Render server**, which:
> - can take up to **60 seconds to wake up** on the first request
> - **sleeps after 15 minutes** of inactivity
> - for testing email confirmation or daily sending, try hitting the API manually:
>   - just before `HH:50` to trigger hourly logic
>   - or just before `09:50` to catch daily triggers
> 
> ⚠️ **If testing locally**, confirmation email links will point to `http://localhost:3000` — if the client isn't running, you can **manually copy the token from the URL** and test via Postman or your browser.

---

## 🗂️ Project Structure

```
src/
├── config/         # Configuration (DB, mailer, etc.)
├── controllers/    # Route handlers
├── enums/          # Enum definitions
├── middlewares/    # Express middlewares (e.g., error handler)
├── migrations/     # DB migration scripts
├── models/         # DB models/entities
├── repositories/   # DB access logic
├── routes/         # API routes
├── services/       # Business logic
├── templates/      # Email templates
├── utils/          # Helper functions
└── index.ts        # Entry point
```

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory:

```
DB_HOST=db
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=weatherdb
PORT=4444

NODE_MAILER_EMAIL=weatherserviceokosohor@gmail.com
NODE_MAILER_APP_PASSWORD=xvvl vcdu mnca rzbm
CLIENT_URL=http://localhost:3000
NODE_ENV=development

JWT_SECRET_KEY=weather
WEATHER_API_KEY=6437423c59174b81a07220025251705
WEATHER_API_URL=http://api.weatherapi.com/v1/current.json
```

> ⚠️ Keep `.env` secret in production

---

## 🐳 Docker Compose Setup

Use the following `docker-compose.yml` to run the app with PostgreSQL:

```yaml
version: '3.9'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 3s
      retries: 5

  app:
    build: .
    depends_on:
      db:
        condition: service_healthy
    ports:
      - "${PORT}:${PORT}"
    environment:
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_USER: ${DB_USER}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
    command: ["sh", "-c", "npm run migrate  && npm run production"]
    env_file:
      - .env

volumes:
  pgdata:
```

---

## 🚀 How to Run the Project

1. **Clone the repository**

```bash
git clone https://github.com/okosohor/weather-subscribe-service.git
cd weather-subscribe-service
```

2. **Create `.env` file** (based on above)

3. **Build and run the project**

```bash
docker-compose up --build
```

4. **The API will be available at**:  
   `http://localhost:4444/api`

---

## 📮 API Endpoints

| Method | Endpoint                 | Description                          |
|--------|--------------------------|--------------------------------------|
| GET    | `/weather?city=City`     | Get current weather for a city       |
| POST   | `/subscribe`             | Subscribe to weather updates         |
| GET    | `/confirm/:token`        | Confirm subscription via token       |
| GET    | `/unsubscribe/:token`    | Unsubscribe via token                |

---

## 📌 Notes

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Email confirmation is required after subscription
- JWT is used to securely encode tokens

---
