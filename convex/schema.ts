import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    email: v.string(),
    minedCount: v.optional(v.float64()),
    miningRate: v.float64(),
    nickname: v.optional(v.string()),
    otpSecret: v.optional(v.string()),
    password: v.optional(v.string()),
    mineActive: v.boolean(),
    mineHours: v.number(),
    redeemableCount: v.float64(),
    mineStartTime: v.optional(v.number()),
    referreeCode: v.optional(v.string()),
    referralCode: v.optional(v.string()),
    referralCount: v.number(),
    xpCount: v.number(),
    speedBoost: v.object({
      isActive: v.boolean(),
      rate: v.number(),
      level: v.union(v.literal(1), v.literal(2), v.literal(3)),
    }),
    botBoost: v.object({
      isActive: v.boolean(),
      hours: v.number(),
      level: v.union(v.literal(1), v.literal(2), v.literal(3)),
    }),
  })
    .index("by_xpCount", ["xpCount"])
    .index("by_mineActive", ["mineActive"]),
  activity: defineTable({
    userId: v.id("user"),
    message: v.string(),
    extra: v.optional(v.string()),
    type: v.union(v.literal("xp"), v.literal("rank")),
  }),
});
