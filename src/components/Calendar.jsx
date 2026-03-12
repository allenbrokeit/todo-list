import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, eachDayOfInterval } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { cn } from '../lib/utils';

const Calendar = ({ selectedDate, onSelect, className }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-sm font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-3 h-3" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return (
      <div className="grid grid-cols-7 mb-1">
        {days.map((day) => (
          <div key={day} className="text-[10px] font-bold text-center text-muted-foreground uppercase tracking-wider py-2">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    return (
      <div className="grid grid-cols-7 gap-px p-1 bg-border/50">
        {calendarDays.map((day) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, monthStart);
          const isToday = isSameDay(day, new Date());

          return (
            <button
              key={day.toString()}
              onClick={() => onSelect(day)}
              className={cn(
                "relative h-8 w-8 text-xs rounded-lg transition-all flex items-center justify-center bg-background",
                !isCurrentMonth && "text-muted-foreground/30",
                isCurrentMonth && !isSelected && "hover:bg-accent text-foreground",
                isSelected && "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20",
                isToday && !isSelected && "text-primary ring-1 ring-primary/30"
              )}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("inline-block glass rounded-xl shadow-2xl overflow-hidden border border-border w-[260px]", className)}>
      {renderHeader()}
      <div className="p-2">
        {renderDays()}
        {renderCells()}
      </div>
    </div>
  );
};

export default Calendar;
