/**
 * @fileOverview Mock services for providing context data like weather and calendar events.
 * This is a placeholder for actual API calls in a production environment.
 */

/**
 * A mock function to get the current weather.
 * @returns A hardcoded weather object.
 */
export const getWeather = () => {
  return { temp: 13, condition: "Rainy", location: "Thessaloniki" };
};

/**
 * A mock function to get upcoming calendar events.
 * @returns A hardcoded calendar event object.
 */
export const getCalendarEvents = () => {
  return { time: "10:00 AM", event: "Quarterly Business Review" };
};
