import { parse } from "date-fns";

export const FORMAT = "yyyy-MM-dd";
export const LOCAL_FORMAT = "dd.MM.yyyy";

export function getAsDateOrNull(value: string) {
  return (value && parse(value, FORMAT, new Date())) || null;
}
