import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCalendarAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import Calendar from './Calendar';


const TaskModal = ({ isOpen, onClose, onSave, task, initialColumnId }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [summary, setSummary] = useState(task?.summary || '');
  const [date, setDate] = useState(task?.date ? new Date(task.date) : new Date());
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: task?.id || Math.random().toString(36).substr(2, 9),
      title,
      summary,
      date,
      priority,
      columnId: task?.columnId || initialColumnId,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg glass rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/10">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
              {task ? 'Edit Task' : 'Create New Task'}
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors group"
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Title</label>
              <input
                autoFocus
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Description</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Add more details..."
                className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[100px] resize-none placeholder:text-muted-foreground/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Due Date</label>
                <button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="w-full flex items-center gap-3 bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 hover:bg-secondary/80 transition-all text-left"
                >
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-primary" />
                  <span className="text-sm">{format(date, 'MMM d, yyyy')}</span>
                </button>

                {showCalendar && (
                  <div ref={calendarRef} className="absolute bottom-full mb-2 left-0 z-50 animate-in slide-in-from-bottom-2 duration-200">
                    <Calendar
                      selectedDate={date}
                      onSelect={(newDate) => {
                        setDate(newDate);
                        setShowCalendar(false);
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Priority</label>
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full appearance-none bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm cursor-pointer"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <FontAwesomeIcon icon={faChevronDown} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground w-3" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl font-semibold border border-border hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl font-bold bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 transition-all"
              >
                {task ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
