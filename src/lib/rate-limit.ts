// Sliding-window rate limiter for Route Handlers and Server Actions

interface RateLimitStore {
  tokens: number;
  lastRefill: number;
}

const memoryStore = new Map<string, RateLimitStore>();

export interface RateLimitConfig {
  maxRequests: number; // Max requests allowed in the window
  windowSeconds: number; // Window duration in seconds
}

export async function rateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 5, windowSeconds: 60 }
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  
  const record = memoryStore.get(identifier);

  if (!record) {
    memoryStore.set(identifier, {
      tokens: config.maxRequests - 1,
      lastRefill: now,
    });
    return {
      success: true,
      remaining: config.maxRequests - 1,
      reset: Math.ceil((now + windowMs) / 1000),
    };
  }

  // Calculate elapsed time and refill tokens if needed
  const timeElapsed = now - record.lastRefill;
  if (timeElapsed >= windowMs) {
    record.tokens = config.maxRequests - 1;
    record.lastRefill = now;
    return {
      success: true,
      remaining: record.tokens,
      reset: Math.ceil((now + windowMs) / 1000),
    };
  }

  if (record.tokens > 0) {
    record.tokens -= 1;
    return {
      success: true,
      remaining: record.tokens,
      reset: Math.ceil((record.lastRefill + windowMs) / 1000),
    };
  }

  return {
    success: false,
    remaining: 0,
    reset: Math.ceil((record.lastRefill + windowMs) / 1000),
  };
}
