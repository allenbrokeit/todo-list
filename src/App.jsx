import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableColumns, faPlus } from '@fortawesome/free-solid-svg-icons';
import Column from './components/Column';
import TaskModal from './components/TaskModal';


const initialData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Design System', summary: 'Develop a consistent design system for the app', date: new Date(), priority: 'high' },
    'task-2': { id: 'task-2', title: 'Implementation', summary: 'Implement the core Kanban functionality', date: new Date(), priority: 'medium' },
    'task-3': { id: 'task-3', title: 'Testing', summary: 'Run comprehensive tests across all browsers', date: new Date(), priority: 'low' },
  },
  columns: {
    'todo': {
      id: 'todo',
      title: 'To Do',
      taskIds: ['task-1'],
    },
    'in-progress': {
      id: 'in-progress',
      title: 'In Progress',
      taskIds: ['task-2'],
    },
    'done': {
      id: 'done',
      title: 'Done',
      taskIds: ['task-3'],
    },
  },
  columnOrder: ['todo', 'in-progress', 'done',],
};

function App() {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeColumnId, setActiveColumnId] = useState(null);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // Moving within the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // Moving between columns
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  const handleAddTask = (columnId) => {
    setActiveColumnId(columnId);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId) => {
    const newData = { ...data };
    delete newData.tasks[taskId];
    
    Object.keys(newData.columns).forEach(colId => {
      newData.columns[colId].taskIds = newData.columns[colId].taskIds.filter(id => id !== taskId);
    });

    setData(newData);
  };

  const handleSaveTask = (task) => {
    const isEditing = !!editingTask;
    const newData = { ...data };
    
    newData.tasks[task.id] = task;

    if (!isEditing) {
      newData.columns[activeColumnId].taskIds.push(task.id);
    }

    setData(newData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Navbar */}
      <nav className="h-16 border-b border-border/50 flex items-center justify-between px-8 bg-background/50 backdrop-blur-md z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
            <FontAwesomeIcon icon={faTableColumns} className="text-primary-foreground text-xl" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">KanbanFlow</h1>
        </div>

        <div className="flex items-center gap-6">
          {/* Header Actions Removed as requested */}
        </div>
      </nav>

      {/* Main Board Area */}
      <main className="flex-1 overflow-x-auto p-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background">
        <div className="h-full inline-flex gap-8">
          <DragDropContext onDragEnd={onDragEnd}>
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onEditTask={handleEditTask}
                  onDeleteTask={handleDeleteTask}
                />
              );
            })}
          </DragDropContext>
          
          {/* Add New Column Placeholder */}
          <div className="w-[320px] h-full flex items-center justify-center border-2 border-dashed border-border/30 rounded-3xl group cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
            <div className="flex flex-col items-center gap-3 text-muted-foreground group-hover:text-primary transition-colors">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-all">
                <FontAwesomeIcon icon={faPlus} className="text-lg" />
              </div>
              <span className="font-bold text-sm tracking-widest uppercase">Add Column</span>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <TaskModal
        key={editingTask ? editingTask.id : (activeColumnId || 'new')}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        task={editingTask}
        initialColumnId={activeColumnId}
      />
    </div>
  );
}

export default App;
