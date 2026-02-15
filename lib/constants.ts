export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function getInvestorDisplayName(investor: 'Husband' | 'Wife'): string {
  return investor === 'Husband' ? 'Moon' : 'Lovely';
}
