import React from 'react';

const formatDateRange = (startDateString: any, endDateString: any) => {
  // Modify options to use short month names
  const options: any = { month: 'short', day: 'numeric' };
  const yearOptions: any = { year: 'numeric' };

  // Manually create Date objects by splitting the date strings
  const startParts = startDateString.split('-');
  const endParts = endDateString.split('-');
  const startDate = new Date(startParts[0], startParts[1] - 1, startParts[2]); // Month is 0-based
  const endDate = new Date(endParts[0], endParts[1] - 1, endParts[2]);

  // Format dates
  const startFormatted = startDate.toLocaleDateString('en-US', options);
  const endFormatted = endDate.toLocaleDateString('en-US', options);
  const yearFormatted = startDate.toLocaleDateString('en-US', yearOptions);

  // Check if both dates are in the same month and year
  const sameMonth = startDate.getMonth() === endDate.getMonth();
  const sameYear = startDate.getFullYear() === endDate.getFullYear();

  if (sameMonth && sameYear) {
    return `${startFormatted} - ${endDate.getDate()}, ${yearFormatted}`;
  } else if (sameYear) {
    const endMonthFormatted = endDate.toLocaleDateString('en-US', { month: 'short' });
    return `${startFormatted} - ${endMonthFormatted} ${endDate.getDate()}, ${yearFormatted}`;
  } else {
    const endFullFormatted = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startFormatted}, ${yearFormatted} - ${endFullFormatted}`;
  }
};

export default formatDateRange;
