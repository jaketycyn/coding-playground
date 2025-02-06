export type LoggableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: LoggableValue }
  | LoggableValue[];

export interface MockConsoleInterface {
  log: (...args: LoggableValue[]) => void;
  print: (...args: LoggableValue[]) => void;
}
