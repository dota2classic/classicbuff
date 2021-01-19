import * as Sentry from "@sentry/browser";

// process.on("unhandledRejection", err => {
//   Sentry.captureException(err);
// });
//
// process.on("uncaughtException", err => {
//   Sentry.captureException(err);
// });

// Sentry.init({ dsn: "https://2adcf00258fd42448e8cf785eba255bf@o435989.ingest.sentry.io/5529684" });

// add this to _app.ts componentDidCatch
export const captureComponentException = (error: Error, errorInfo: any) => {
  Sentry.withScope(scope => {
    Object.keys(errorInfo).forEach(key => {
      scope.setExtra(key, errorInfo[key]);
    });

    Sentry.captureException(error);
  });
};
