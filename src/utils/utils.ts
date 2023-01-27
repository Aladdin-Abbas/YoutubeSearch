export const getYearDiff = (date1: Date, date2 = new Date()) => {
  return Math.abs(date2.getFullYear() - date1.getFullYear());
};

export const subtractDays = (days: number, date = new Date()) => {
  var result = new Date(date);
  result.setDate(result.getDate() - days);
  return new Date(result).toISOString();
};
