import { aj } from "../config/arcjet.js";

export const arcjectMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit)
        res.status(429).json({ message: "Too many requests" });
      if (decision.reason.isBot)
        res.status(403).json({ message: "Bot detected" });
    }
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error.message}`);
    next(error);
  }
};
