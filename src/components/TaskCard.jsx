import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faFlag, faEdit, faTrashAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../lib/utils';

const priorityColors = {
  low: 'text-blue-400 bg-blue-400/10',
  medium: 'text-yellow-400 bg-yellow-400/10',
  high: 'text-red-400 bg-red-400/10',
};

const TaskCard = ({ task, index, onEdit, onDelete, isDone }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={cn(
            "group relative p-4 mb-3 rounded-xl border transition-all duration-200",
            "bg-card/40 backdrop-blur-sm border-border/50",
            "hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5",
            snapshot.isDragging && "shadow-2xl border-primary scale-[1.02] rotate-1 z-50 bg-card",
            isDone && "opacity-60 grayscale-[0.5]"
          )}
        >
          {/* Priority Badge */}
          <div className="flex items-center justify-between mb-3">
            <span className={cn(
              "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1",
              priorityColors[task.priority]
            )}>
              <FontAwesomeIcon icon={faFlag} className="w-2 h-2" />
              {task.priority}
            </span>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.stopPropagation(); onEdit(task); }}
                className="p-1 px-1.5 hover:bg-primary/20 rounded transition-colors text-muted-foreground hover:text-primary"
              >
                <FontAwesomeIcon icon={faEdit} className="w-3 h-3" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(task.id); }}
                className="p-1 px-1.5 hover:bg-destructive/20 rounded transition-colors text-muted-foreground hover:text-destructive"
              >
                <FontAwesomeIcon icon={faTrashAlt} className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Title & Summary */}
          <div className="mb-4">
            <h3 className={cn(
              "font-semibold text-foreground mb-1 group-hover:text-primary transition-colors",
              isDone && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {task.summary}
            </p>
          </div>

          {/* Footer Info */}
          <div className="flex items-center justify-between pt-3 border-t border-border/30 mt-3">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <FontAwesomeIcon icon={faCalendarAlt} className="w-2.5 h-2.5" />
              {task.date ? format(new Date(task.date), 'MMM d, yyyy') : 'No date'}
            </div>
            {isDone && (
              <div className="text-primary flex items-center gap-1 text-[10px] font-bold">
                <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3" />
                DONE
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
