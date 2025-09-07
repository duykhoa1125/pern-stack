import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";

import "dotenv/config";

// Check if ARCJET_KEY is available
if (!process.env.ARCJET_KEY && process.env.NODE_ENV === "production") {
  console.error("ARCJET_KEY environment variable is required in production");
  process.exit(1);
}

export const aj = arcjet({
  // Get your site key from https://app.arcjet.com and set it as an environment
  // variable rather than hard coding.
  key: process.env.ARCJET_KEY || "test-key-for-development",
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: process.env.ARCJET_KEY ? "LIVE" : "DRY_RUN" }),
    // Create a bot detection rule
    detectBot({
      mode: process.env.ARCJET_KEY ? "LIVE" : "DRY_RUN", // Use DRY_RUN if no key
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: process.env.ARCJET_KEY ? "LIVE" : "DRY_RUN",
      // Tracked by IP address by default, but this can be customized
      // See https://docs.arcjet.com/fingerprints
      //characteristics: ["ip.src"],
      refillRate: 10, // Refill 10 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 20, // Bucket capacity of 20 tokens
    }),
  ],
});
