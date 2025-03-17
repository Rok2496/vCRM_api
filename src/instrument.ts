const Sentry = require("@sentry/nestjs");
// Comment out the profiling integration import
// const { nodeProfilingIntegration } = require("@sentry/profiling-node");

Sentry.init({
    dsn: "https://7ce971f5064c51da9ff944ca0fd3910e@o4508913391370240.ingest.de.sentry.io/4508913394974800",
    integrations: [
        // Disable profiling integration
        // nodeProfilingIntegration(),
    ],
    tracesSampleRate: 1.0,
    // Disable profiles sample rate
    // profilesSampleRate: 1.0,
});
