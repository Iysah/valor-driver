function calculateHoursBetween(startTime:any, endTime:any) {
   // Helper function to convert time string to Date object
   const parseTime = (timeStr:any) => {
     const [time, modifier] = timeStr.split(' ');
     let [hours, minutes] = time.split(':').map(Number);
     if (modifier === 'PM' && hours !== 12) hours += 12;
     if (modifier === 'AM' && hours === 12) hours = 0;
     return new Date(2000, 0, 1, hours, minutes); // Arbitrary date, just for time calculation
   };
 
   // Convert times to Date objects
   const start:any = parseTime(startTime);
   const end:any = parseTime(endTime);
 
   // Calculate the difference in milliseconds
   const diffMs = end - start;
 
   // Convert milliseconds to hours
   const diffHours = diffMs / (1000 * 60 * 60);
 
   return Math.round(diffHours);;
 }
 
 export default calculateHoursBetween