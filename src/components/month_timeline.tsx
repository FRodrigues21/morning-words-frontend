import React from 'react';
import moment from 'moment';
import { Label } from 'react-bootstrap';

type MonthTimelineProps = {
  year: number;
  month: number;
  day: number;
  onDaySelect: (day: number) => void;
  goalCheck: (day: number) => boolean;
};

const MonthTimeline = ({
  year,
  month,
  day,
  onDaySelect,
  goalCheck
}: MonthTimelineProps) => {
  const renderTimeline = (y: number, m: number, d: number) => {
    const timeline = [];
    const days = moment(`${y}-${m}`, 'YYYY-MM').daysInMonth();

    const getDayClass = (i: any) => {
      if (i > d) {
        return 'primary';
      } else if (i === Number(d)) {
        return 'primary';
      } else if (goalCheck(i)) {
        return 'success';
      } else if (!goalCheck(i)) {
        return 'danger';
      }
    };

    for (let currentDay = 1; currentDay <= days; currentDay++) {
      timeline.push(
        <span key={currentDay}>
          <Label
            bsStyle={getDayClass(currentDay)}
            onClick={() => onDaySelect(currentDay)}
          >
            {currentDay === Number(d)
              ? `${currentDay} ${moment().format('MMMM YYYY')}`
              : currentDay}
          </Label>{' '}
        </span>
      );
    }
    return timeline;
  };

  return <div>{renderTimeline(year, month, day)}</div>;
};

export default MonthTimeline;
