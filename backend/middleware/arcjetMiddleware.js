import { isSpoofedBot } from "@arcjet/inspect";
import { aj } from "../lib/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    // Skip Arcjet in development if no key is provided
    if (!process.env.ARCJET_KEY && process.env.NODE_ENV !== "production") {
      console.log("Arcjet middleware skipped - no ARCJET_KEY in development");
      return next();
    }

    const decision = await aj.protect(req, { requested: 2 }); // Deduct 2 tokens from the bucket
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ error: "No bots allowed" });
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    } else if (decision.ip.isHosting()) {
      // Requests from hosting IPs are likely from bots
      return res.status(403).json({ error: "Forbidden" });
    } else if (decision.results.some(isSpoofedBot)) {
      // Check for spoofed bots
      return res.status(403).json({ error: "Forbidden" });
    } else if (
      decision.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed()
      )
    ) {
      return res.status(403).json({ error: "Spoofed bot detected" });
    }

    // If all checks pass, proceed to next middleware
    next();
  } catch (error) {
    console.log("Arcjet error:", error);
    // In production, fail closed for security
    if (process.env.NODE_ENV === "production") {
      return res.status(500).json({ error: "Internal server error" });
    }
    // In development, allow request to continue
    next();
  }
};

export default arcjetMiddleware;
