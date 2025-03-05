import { LogSeverity } from "@/graphql/gql/graphql";

export const logSeverityColors: Record<
  LogSeverity,
  "primary" | "warning" | "danger" | "secondary" | "default" | "success"
> = {
  [LogSeverity.Info]: "primary",
  [LogSeverity.Warning]: "warning",
  [LogSeverity.Error]: "danger",
  [LogSeverity.Debug]: "secondary",
  [LogSeverity.Alert]: "warning",
  [LogSeverity.Critical]: "danger",
  [LogSeverity.Emergency]: "danger",
  [LogSeverity.Notice]: "success",
  [LogSeverity.Default]: "default",
};
