export function formatTo12HourTime(dateString: string, roundToHour: boolean = false): string {
   const date = new Date(dateString);

   // Optionally round minutes to 0 if roundToHour is true
   if (roundToHour) {
       date.setMinutes(0);
   }

   const formattedTime = new Intl.DateTimeFormat('en-US', {
       hour: 'numeric',
       minute: 'numeric',
       hour12: true,
   }).format(date);

   return formattedTime.toLowerCase();  // To ensure 'am'/'pm' is in lowercase
}