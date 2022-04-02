const getDayOfWeek = (isoDate: string) => {
  switch (new Date(isoDate).getDay()) {
    case 0:
      return 'Saturday';
    case 1:
      return 'Sunday';
    case 2:
      return 'Monday';
    case 3:
      return 'Tuesday';
    case 4:
      return 'Wednsday';
    case 5:
      return 'Thursday';
    case 6:
      return 'Friday';
  }
};
export default getDayOfWeek;
