import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { nanoid } from "nanoid";
import crons from "./crons";
import { internal } from "./_generated/api";

export const storeEmail = internalMutation({
  args: { email: v.string(), referreeCode: v.optional(v.string()) },
  handler: async (ctx, args) => {
    // Store email and referral
    const userId = await ctx.db.insert("user", {
      email: args.email,
      referreeCode: args.referreeCode,
      referralCode: nanoid(5).toUpperCase(),
      minedCount: 0,
      miningRate: 2,
    });

    console.log(userId, ":::User id");
    return userId;
  },
});

export const storeOTPSecret = internalMutation({
  args: { secret: v.string(), userId: v.id("user") },
  handler: async (ctx, { secret, userId }) => {
    try {
      await ctx.db.patch(userId, { otpSecret: secret });
    } catch (e: any) {
      console.log(e, ":::Path errorr");
      throw e;
    }
  },
});

export const saveUserPassword = internalMutation({
  args: { hashedPassword: v.string(), userId: v.id("user") },
  handler: async (ctx, args) => {
    try {
      await ctx.db.patch(args.userId, { password: args.hashedPassword });
    } catch (e: any) {
      console.log(e.message ?? e.toString());

      throw e;
    }
  },
});

export const startMinig = internalMutation({
  handler: async (ctx, args) => {
    // Update minedCount based on active boosts and bot level
  },
});
