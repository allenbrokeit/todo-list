# KanbanFlow

A modern, premium Kanban-style Todo List web application built with React and Tailwind CSS.

## 🚀 Features

- **Dynamic Kanban Board**: Organise tasks into customizable columns (To Do, In Progress, Done).
- **Drag & Drop Logic**: Move tasks effortlessly within columns or between them.
- **Task Management**:
  - Full CRUD support (Add, Edit, Delete).
  - Priority levels (Low, Medium, High) with visual badges.
  - Interactive Date Selection via a custom-built Calendar popup.
- **Premium UI/UX**:
  - Glassmorphism design system.
  - Fluid animations and hover effects.
  - Automated "Done" state styling (dimmed with checkmarks).
- **Modern Tech Stack**: React 19, Tailwind CSS v4, `@hello-pangea/dnd`, and `date-fns`.

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

- `src/App.jsx`: Main application logic and state management.
- `src/components/Column.jsx`: Kanban column component with drop functionality.
- `src/components/TaskCard.jsx`: Draggable task card with metadata display.
- `src/components/TaskModal.jsx`: Modal for adding and editing tasks.
- `src/components/Calendar.jsx`: Custom premium calendar component.
- `src/lib/utils.js`: Styling utilities for Tailwind class merging.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
