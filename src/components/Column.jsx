import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import TaskCard from './TaskCard';
import { cn } from '../lib/utils';

const Column = ({ column, tasks, onAddTask, onEditTask, onDeleteTask }) => {
  return (
    <div className="flex flex-col w-[320px] h-full min-h-[500px] shrink-0">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-foreground tracking-tight text-sm uppercase flex items-center gap-2">
            <span className={cn(
              "w-2 h-2 rounded-full",
              column.id === 'todo' && "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]",
              column.id === 'in-progress' && "bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]",
              column.id === 'done' && "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]",
            )} />
            {column.title}
          </h2>
          <span className="bg-secondary text-secondary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
          <FontAwesomeIcon icon={faEllipsisH} className="w-3 h-3" />
        </button>
      </div>

      {/* Add Task Button */}
      <button
        onClick={() => onAddTask(column.id)}
        className="mb-4 mx-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-border/60 hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-primary transition-all duration-200 group"
      >
        <FontAwesomeIcon icon={faPlus} className="w-3 h-3 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-semibold">Add Task</span>
      </button>

      {/* Droppable Area */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={cn(
              "flex-1 p-2 rounded-2xl transition-colors duration-200",
              snapshot.isDraggingOver ? "bg-primary/5" : "bg-transparent"
            )}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
                isDone={column.id === 'done'}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
