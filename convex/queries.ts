import { action, internalQuery, query } from "./_generated/server";
import { v } from "convex/values";
// import { DataModel } from "./_generated/dataModel"

// Get User OTP secret from the db and return
export const getOTPSecret = internalQuery({
  args: { userId: v.id("user") },
  handler: async (ctx, { userId }): Promise<string> => {
    if (!userId) throw new Error("Invalid user ID supplied");

    const user = await ctx.db.get(userId);

    console.log(user, ":::User");

    if (!user) {
      throw new Error("No user exists with that email");
    }

    return user?.otpSecret as string;
  },
});

// Get user details to be rendered on main dashboard
export const getUserDetails = query({
  args: { userId: v.id("user") },
  handler: async ({ db }, { userId }) => {
    return await db.get(userId);
  },
});

// Get leader board filtered and ordered by XP
export const getLeaderBoard = query({
  handler: async ({ db }) => {
    return await db
      .query("user")
      .filter((q) => q.gte(q.field("xpCount"), 100))
      .order("desc")
      .collect();
  },
});

export const getHistory = query({
  args: { userId: v.id("user") },
  handler: async ({ db }, { userId }) => {
    return await db
      .query("activity")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc")
      .take(100);
  },
});
