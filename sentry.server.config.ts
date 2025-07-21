// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://6940683bf8ce72761d6bdb99fedc8480@o4508147244335104.ingest.us.sentry.io/4509687379918848",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Disable Sentry in development to prevent HMR issues
  enabled: process.env.NODE_ENV === "production",

  // Reduce noise in development
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 0,
});
