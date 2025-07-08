export const isNumber = (value: string): boolean => {
  return /^\d+$/.test(value.trim());
};
export const isValidDateFormat = (value: string) => {
  // Ожидается строка из 3 или 4 цифр без разделителей, например: 928 или 0928
  if (!/^\d{3,4}$/.test(value)) return false;

  // Разбираем месяц и день
  let month: number;
  let day: number;

  if (value.length === 3) {
    // Формат MDD
    month = Number(value.slice(0, 1));
    day = Number(value.slice(1));
  } else {
    // Формат MMDD
    month = Number(value.slice(0, 2));
    day = Number(value.slice(2));
  }

  if (month < 1 || month > 12) return false;

  // Максимальное число дней в каждом месяце (без учета високосного года)
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day < 1 || day > daysInMonth[month - 1]) return false;

  return true;
};
