# 🧠 SkillSprint – Personalized Learning Path Generator

SkillSprint is a responsive web application that allows users to generate a **6-week personalized learning roadmap** based on a target job role (e.g., “Full Stack Developer”, “UI/UX Designer”, “Cloud Engineer”, etc). It uses AI to suggest modules and resources tailored to the selected role, making it easier for users to upskill effectively.

---

## 🚀 Features

- 🔍 Input any job role or goal and instantly get a 6-week plan
- ✅ Interactive checkmarks for completed tasks
- 🔄 Dropdown list of popular tech career paths
- 📬 (Planned) Weekly progress email reminders
- 🧠 AI-powered roadmap generation using GenAI (can be extended with OpenAI or HuggingFace APIs)

---

## 🛠 Tech Stack

- **Frontend**: React.js, Next.js 14
- **Styling**: Tailwind CSS
- **Backend/AI**: Local AI flow generation (extendable with GeminiAI or HuggingFace)
- **Deployment**: Vercel

---

## 📝 Getting Started (Development Setup)

1. Clone the repository:
   ```bash
   git clone https://github.com/MananPatel0801/RoadmapGenerator.git
   cd RoadmapGenerator

2. Install DependenciesL
    npm install

3. Run locally
    npm run dev

4. Open http://localhost:3000 in your browser.

##
⚠️ Data Persistence Notice
🔒 This project does not currently use a database or user authentication. That means:

Data will be lost on page refresh

Data will not persist across devices or browsers

✅ However, RoadmapGenerator can be easily connected to a backend like Supabase or MongoDB to:

1. Store user-generated learning paths

2. Add login/signup authentication

3. Track weekly progress

4. Send email reminders using Supabase Edge Functions or CRON jobs


📄 License
MIT License — free to use, share, and modify.


Author: Manan Patel