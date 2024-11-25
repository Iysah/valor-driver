export function generateCalendar(month: number, year: number) {
   const weeksInMonth = [];
   const firstDay = new Date(year, month, 1).getDay();
   const daysInMonth = new Date(year, month + 1, 0).getDate();

   let week = [];
   for (let i = 0; i < firstDay; i++) {
       week.push(0);
   }

   for (let day = 1; day <= daysInMonth; day++) {
       week.push(day);
       if (week.length === 7) {
           weeksInMonth.push(week);
           week = [];
       }
   }
   if (week.length > 0) {
       while (week.length < 7) {
           week.push(0);
       }
       weeksInMonth.push(week);
   }

   return weeksInMonth;
}
