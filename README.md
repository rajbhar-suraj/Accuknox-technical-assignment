**How to run it locally**  
1. clone the repository in the local machine: git clone https://github.com/rajbhar-suraj/Accuknox-technical-assignment.git
2. run the following commands:<br>
      npm install <br>
      npm run dev <br>


**High‑Level Summary of the *Accuknox Technical Assignment* Repository**

| Aspect | Details |
|--------|---------|
| **Purpose** | A small React + Vite dashboard demo that lets a user create **categories** and **widgets** on the fly, store them locally, and filter/search through them. |
| **Core Technologies** | • **React 19** (functional components)  <br>• **Vite** for dev/build tooling  <br>• **Tailwind CSS 4** for styling  <br>• **Zustand** (with `persist` middleware) for global state and local‑storage persistence  <br>• **React‑Hot‑Toast** for user notifications  <br>• **React‑Router‑Dom 7** for routing |
| **Project Structure** | ```
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json / package-lock.json
├── vite.config.js
├── public/
│   └── vite.svg
└── src/
    ├── App.jsx                – top‑level component with routes
    ├── index.css              – imports Tailwind
    ├── main.jsx                – renders <App/> inside BrowserRouter
    ├── assets/
    │   └── react.svg
    ├── components/
    │   ├── AddCategoryDrawer.jsx   – side drawer to add a new category
    │   ├── AddWidgetDrawer.jsx     – side drawer to add a new widget
    │   ├── CategoryList.jsx        – (external raw file, not shown here)
    │   ├── Navbar.jsx              – top navigation, search bar, add‑category button
    │   └── WidgetCard.jsx          – visual card for each widget
    ├── pages/
    │   ├── Dashboard.jsx           – main view showing categories & widgets, add‑widget button
    │   ├── Home.jsx                – placeholder “In Development” page
    │   └── NotFound.jsx            – 404 page
    └── store/
        └── useLocalStorage.js      – Zustand store handling categories, widgets, search, persistence
``` |
| **State Management** (`useLocalStorage.js`) | • `categories`: array of objects `{ id, name, widgets: [{id, widgetName, widgetText}] }` <br>• `searchQuery`: string for the global search bar <br>• **Actions**: <br>  - `addCategory(name)` – validates uniqueness, adds with empty widget list, shows toast <br>  - `addWidget(categoryId, widgetName, widgetText)` – appends widget, shows toast <br>  - `removeWidget(categoryId, widgetId)` – filters out widget, shows toast <br>  - `setSearchQuery(query)` – updates filter term <br>• Persistence via `zustand/middleware` → `localStorage` (`dashboard-storage` key) |
| **Key UI Features** | • **Navbar** – navigation links, search input (updates `searchQuery`), “Add Category” button (opens `AddCategoryDrawer`). <br>• **AddCategoryDrawer** – slide‑in panel; lets the user type a category name and confirm. <br>• **Dashboard** – shows each category title and a row of `WidgetCard`s. <br>• **AddWidgetDrawer** – similar slide‑in panel; user selects a category (default is the one they clicked “Add Widget” on) and enters widget name & text. <br>• **WidgetCard** – displays widget name, text, placeholder chart icon, and a delete (✕) button that triggers `removeWidget`. <br>• **Search / Filter** – `Dashboard` memoizes a filtered view based on `searchQuery`, matching either category names or widget name/text. |
| **Routing** | • `/` → `Home` (placeholder) <br>• `/dashboard` → `Dashboard` (main UI) <br>• `*` → `NotFound` |
| **Styling** | Tailwind utilities are used throughout; components rely on responsive classes (e.g., `md:flex`, `lg:hidden`). |
| **Linting** | ESLint config pulls in the recommended rules from `@eslint/js`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`. |
| **Scripts** (from `package.json`) | • `dev` – `vite` (development server) <br>• `build` – `vite build` (production bundle) <br>• `preview` – preview built app <br>• `lint` – run ESLint <br>• `start` – serve static `dist` with `serve` |
| **Potential Extensions** | – Convert to TypeScript for stronger typing. <br>– Replace local‑storage with a backend API. <br>– Add drag‑and‑drop reordering of widgets. <br>– Implement real chart data instead of the placeholder icon. |
| **Overall Takeaway** | This repo demonstrates a compact, functional dashboard prototype built with modern React tooling. It showcases component composition, global state persistence with Zustand, UI interactions via slide‑in drawers, and a live search filter—all styled with Tailwind and scaffolded by Vite.
