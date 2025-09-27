import { MONTH_NAMES } from "../const";

export function formatArticleDate(input: Date | string): string {
  let dateObj = input instanceof Date ? input : new Date(input);
  const dateDay = dateObj.getDate();
  const dateMonth = MONTH_NAMES[dateObj.getMonth()];
  const dateYear = dateObj.getFullYear();
  const formattedDate = `${dateDay} ${dateMonth}, ${dateYear}`;
  return formattedDate;
}
