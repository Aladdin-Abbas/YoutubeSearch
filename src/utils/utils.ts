export const getYearDiff = (date1: Date, date2 = new Date()) => {
  return Math.abs(date2.getFullYear() - date1.getFullYear());
};
