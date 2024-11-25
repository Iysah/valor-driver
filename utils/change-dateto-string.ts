export function convertIosString(dateString:string) {
   const date = new Date(dateString);
 
   // Extract the day, month, and year
   const day = date.getDate();
   const month = date.toLocaleString('default', { month: 'long' });
   const year = date.getFullYear();
 
   // Add the appropriate suffix to the day
   const daySuffix = (day:any) => {
     if (day > 3 && day < 21) return 'th'; // 11th, 12th, 13th
     switch (day % 10) {
       case 1: return 'st';
       case 2: return 'nd';
       case 3: return 'rd';
       default: return 'th';
     }
   };
 
   // Return the formatted date
   return `${month} ${day}${daySuffix(day)}, ${year}`;
 }