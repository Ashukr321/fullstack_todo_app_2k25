# Task Dashboard Frontend

A modern, responsive task management dashboard built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎯 Task Management
- **Create Tasks**: Add new tasks with title, description, due date, and completion status
- **Edit Tasks**: Modify existing task details
- **Delete Tasks**: Remove tasks with confirmation
- **Toggle Completion**: Mark tasks as complete/incomplete with one click

### 📊 Dashboard Overview
- **Task Statistics**: View total, completed, pending, and overdue tasks
- **Completion Rate**: Visual progress bar showing overall completion percentage
- **Real-time Updates**: Statistics update automatically as tasks are modified

### 🔍 Search & Filter
- **Search Tasks**: Find tasks by title or description
- **Status Filtering**: Filter by all, pending, completed, or overdue tasks
- **Combined Search**: Use search and filters together for precise results

### 🎨 Modern UI/UX
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Visual Status Indicators**: Color-coded task cards (green for completed, red for overdue, blue for pending)
- **Smooth Animations**: Hover effects and transitions for better user experience
- **Toast Notifications**: Success and error messages for user feedback

### 📱 Components
- **TaskStats**: Overview cards with task statistics
- **TaskCard**: Individual task display with action buttons
- **TaskForm**: Modal form for creating/editing tasks
- **Dashboard**: Main page with all functionality integrated

## API Integration

The dashboard is designed to work with the following REST API endpoints:

```
POST   /api/tasks          - Create new task
GET    /api/tasks          - Get all tasks
GET    /api/tasks/:id      - Get task by ID
PUT    /api/tasks/:id      - Update task
DELETE /api/tasks/:id      - Delete task
```

### Task Data Structure
```typescript
interface Task {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date | string;
  user: string; // mongoose.Schema.Types.ObjectId
  createdAt?: Date;
  updatedAt?: Date;
}
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   # Create .env.local file
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Current Status

### ✅ Implemented
- Complete dashboard UI with all components
- Task CRUD operations (currently using dummy data)
- Search and filtering functionality
- Responsive design with Tailwind CSS
- TypeScript interfaces and type safety
- Toast notifications for user feedback
- Form validation and error handling

### 🔄 Ready for API Integration
- Task service functions are prepared for API calls
- All CRUD operations are structured for easy API integration
- Error handling is in place for API failures
- Loading states are implemented

### 📝 To Enable Real API Integration
1. Uncomment the API calls in `frontend/src/app/dashboard/page.tsx`
2. Ensure your backend API is running on the configured URL
3. Update the user ID in the task service to match your authentication system

## Dummy Data

The dashboard currently includes 5 sample tasks to demonstrate functionality:
- Complete Project Documentation (pending, due in 2 days)
- Review Code Changes (completed, due 1 day ago)
- Setup Development Environment (pending, overdue)
- Implement User Authentication (pending, due in 5 days)
- Design Database Schema (completed, due 3 days ago)

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Icons** - Icon library
- **React Hot Toast** - Notifications
- **React Hooks** - State management

## Project Structure

```
frontend/src/
├── app/
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard page
│   ├── layout.tsx            # Root layout with Toaster
│   └── page.tsx              # Home page (redirects to dashboard)
├── components/
│   └── dashboard/
│       ├── TaskCard.tsx      # Individual task display
│       ├── TaskForm.tsx      # Create/edit task modal
│       └── TaskStats.tsx     # Statistics overview
├── services/
│   └── task/
│       └── task.js           # API service functions
└── types/
    └── task.ts               # TypeScript interfaces
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
