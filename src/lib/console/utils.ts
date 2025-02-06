import { LoggableValue } from "./types";
import { MockConsoleInterface } from "./types";
// helper function to safely stringify any loggable value
export const safeStringify = (value: LoggableValue): string => {
  if (typeof value === "object" && value !== null) {
    try {
      return JSON.stringify(value);
    } catch (error) {
      return "[Complex Object]";
    }
  }
  return String(value);
};

// create Mock Console with proper typing
export const createMockConsole = (logs: string[]): MockConsoleInterface => {
  const logHandler = (...args: LoggableValue[]): void => {
    logs.push(args.map((arg) => safeStringify(arg)).join(" "));
  };

  return {
    log: logHandler,
    print: logHandler,
  };
};
