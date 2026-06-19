import { arraysEqual, createArray, greaterThan } from "./array-utils.js";
import { formatTime, translateMonth, diffToHuman, translateWeekDay, parseDatetimeTimezone } from "./date-utils.js";
import { updateActiveLink, isSameDomain, clearServiceWorker, getSearchParamId } from "./dom-utils.js";
import { getTodayHolidayData, getTodayVacationData, getCurrentDayGroupName } from "./holiday-utils.js";
import { convertNumberToDay, getBestMatchDayIndex } from "./day-utils.js";
import { renderText, wrapTextInArialIfNeeded, processContents } from "./react-utils.jsx";
import { resumeInfoLine, convertToSafeText, normalize, directionToText, formatMoney } from "./string-utils.js";

export default class Util {
  static updateActiveLink = updateActiveLink;
  static arraysEqual = arraysEqual;
  static createArray = createArray;
  static formatTime = formatTime;
  static resumeInfoLine = resumeInfoLine;
  static isSameDomain = isSameDomain;
  static convertToSafeText = convertToSafeText;
  static normalize = normalize;
  static convertNumberToDay = convertNumberToDay;
  static directionToText = directionToText;
  static formatMoney = formatMoney;
  static renderText = renderText;
  static processContents = processContents;
  static wrapTextInArialIfNeeded = wrapTextInArialIfNeeded;
  static translateMonth = translateMonth;
  static clearServiceWorker = clearServiceWorker;
  static diffToHuman = diffToHuman;
  static getTodayHolidayData = getTodayHolidayData;
  static getTodayVacationData = getTodayVacationData;
  static getCurrentDayGroupName = getCurrentDayGroupName;
  static greaterThan = greaterThan;
  static translateWeekDay = translateWeekDay;
  static parseDatetimeTimezone = parseDatetimeTimezone;
  static getSearchParamId = getSearchParamId;
  static getBestMatchDayIndex = getBestMatchDayIndex;
}
