export const getTimeDifference = (dateString: string): string => {
   const now = new Date();
   const postDate = new Date(dateString);
   const diffInMs = now.getTime() - postDate.getTime();

   const seconds = Math.floor(diffInMs / 1000);
   const minutes = Math.floor(seconds / 60);
   const hours = Math.floor(minutes / 60);
   const days = Math.floor(hours / 24);
   const weeks = Math.floor(days / 7);
   const months = Math.floor(days / 30); // Approximate as 30 days per month
   const years = Math.floor(days / 365);

   if (seconds < 60) return `Posted ${seconds} second${seconds > 1 ? 's' : ''} ago`;
   if (minutes < 60) return `Posted ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
   if (hours < 24) return `Posted ${hours} hour${hours > 1 ? 's' : ''} ago`;
   if (days < 7) return `Posted ${days} day${days > 1 ? 's' : ''} ago`;
   if (weeks < 4) return `Posted ${weeks} week${weeks > 1 ? 's' : ''} ago`;
   if (months < 12) return `Posted ${months} month${months > 1 ? 's' : ''} ago`;
   return `Posted ${years} year${years > 1 ? 's' : ''} ago`;
};
