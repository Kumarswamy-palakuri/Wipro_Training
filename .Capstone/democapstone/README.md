# democapstone

Full-Stack Inventory Management System with .NET 9, SQL Server, JWT, Role-Based Access Control, React + Redux Toolkit, Axios, and Docker.

## Run (local, no Docker)

### Backend
cd backend/democapstone
dotnet tool install --global dotnet-ef
dotnet restore
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
# API at http://localhost:5000 (Swagger at /swagger)

### Frontend
cd frontend
npm i
npm run dev
# UI at http://localhost:5173

### Login users
- admin/admin123
- manager/manager123
- staff/staff123

## Run (Docker, with SQL Server container)
docker compose up --build
# UI: http://localhost:8088
# API: http://localhost:5000
# SQL: localhost:1433 (sa / YourStrong!Passw0rd)

## API
- POST /api/auth/login
- GET /api/products
- GET /api/products/{id}
- POST /api/products
- PUT /api/products/{id}
- DELETE /api/products/{id}
