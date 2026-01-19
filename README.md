# 🛠️ Setup Steps: 

**For Backend:**
```bash
cd backend
npm install express mongoose dotenv cors
# To run the backend 
node server.js or npm start
```
**For Frontend:**
```bash
cd frontend
npm i
npm install lucide-react recharts tailwindcss @tailwindcss/vite
# To run the frontend 
npm run dev

```
# 🔑 Environment Configuration

**Ensure your backend/.env file contains the following keys:**
```bash
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/leadDashboard?appName=Cluster0
```
### Database Seeding
To populate the database with dummy lead data for testing and analytics:

```bash
cd backend
node seed.js
```
### Deployed URL:
```bash
https://lead-management-dashboard1.vercel.app/
```
### Demo Login Credentials
```bash
Name: xyz
Email: admin@example.com  
Password: admin123
```
