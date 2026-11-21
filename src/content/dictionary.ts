import type { Locale } from "@/lib/i18n";
import dictData from "./data/dictionary.json";

export type Dictionary = (typeof dictData)["vi"];

export function getDict(locale: Locale): Dictionary {
  return dictData[locale];
}
