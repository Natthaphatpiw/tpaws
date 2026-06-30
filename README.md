# 🐾 ThaiPaws

An interactive adoption and charity platform linking animal foundations and loving homes across Thailand. Built with React 19, TypeScript, Vite, Tailwind CSS, and Motion.

---

## 🎨 Design Concept & Visual Style
ThaiPaws utilizes the **Kindness & Kinship** design system, combining **Modern Minimalism** with **Tactile Softness**:
- **Warm & Organic Palette:** Bathed in a cozy off-white background (`#FFFBF5`) that reduces eye strain, paired with vibrant sunset oranges (`#FF8C42` / `#9b4500`) and soft mint greens (`#006d41`).
- **Rounded Terminal Shapes:** Friendly, modern rounded geometry with high-radius corners (`24px` / `rounded-xl`) and pill-shaped elements that feel welcoming.
- **Micro-Animations:** Fluid state and tab transitions powered by `motion` for an immersive, tactile experience.
- **Thai-Friendly Fallbacks:** Elegant font pairing using **Quicksand** for beautiful headlines alongside **Inter** and **Kanit** for highly legible English/Thai body texts.

---

## 🌟 Key Features

### 1. 🧭 Foundation Discovery (Interactive Map & Search)
- **Interactive Visual Map:** Features a styled vector-style Thailand sanctuary map with interactive pins. Zoom in/out, locate, and explore animal shelters dynamically.
- **Filter Dashboard:** Browse shelters across Bangkok, Chiang Mai, or Phuket, and filter by animal types (Dogs, Cats, Wildlife).
- **Comprehensive Profiles:** Read registered mission statements, official registration credentials, view recent activities, and meet individual adoptable animals.

### 2. 🔥 Swipe Matcher Deck
- **Interactive Swipe Controls:** Swipe right to Like/Favorite, left to Pass/Nope, or click the bottom triggers to filter through adoptable pets.
- **Dynamic Stamps:** Visual feedback stamps ("LIKE" / "NOPE") rotate and fade in dynamically during drag actions.
- **Checklist Badges:** Quick access to crucial attributes such as Vaccination Status, Neutered Status, House Training, and Child Friendliness.

### 3. 🧠 Smart Lifestyle Matcher (Quiz)
- **Interactive Questionnaires:** Answer a quick lifestyle and time-availability quiz.
- **Advanced Mapping:** Matches you with ideal pets residing in partner shelters based on your cozy, active, or space-limited apartment lifestyle.

### 4. 📈 Supporter Dashboard & Real-time Pet Chat
- **Aggregate Supporter Metrics:** Track your favorited pets count and total donation summary.
- **Interactive Chat System:** Initiate secure chat logs with favorited pets, backed by tailored response algorithms fitting individual pet profiles (e.g., *เจ้าทอง*, *Milo*, *Bella*).
- **Official Receipt Invoicing:** Securely triggers detailed digital tax-deductible invoice receipts upon successful donations.

---

## 🛠️ Technology Stack
- **Frontend:** React 19, Vite, TypeScript
- **Styling:** Tailwind CSS (Custom M3-inspired Token configuration)
- **Animations:** Motion (`motion/react`)
- **Iconography:** Lucide React, Google Material Symbols

---

## 🚀 Running the App Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
The application will boot on `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
npm run start
```
