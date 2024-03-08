import { Id } from "./_generated/dataModel";
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
    const user = await db.get(userId);

    if (!user) {
      throw new Error("No user with that Id");
    }

    // Compute user global rank and return total user count
    const totalUserCount = (await db.query("user").collect()).length;
    const globalRank = calculateRank(
      await db.query("user").collect(),
      user?._id,
    );

    return { ...user, totalUserCount, globalRank };
  },
});

function calculateRank(users: Array<any>, userId: Id<"user">): number {
  const sortedUsers = users.slice().sort((a, b) => b.xpCount - a.xpCount);
  const userIndex = sortedUsers.findIndex((user) => user._id === userId);
  return userIndex + 1; // Adding 1 because array index starts from 0 but rank starts from 1
}

// Get user details with email
export const getUserWithEmail = internalQuery({
  args: { email: v.string() },
  handler: async ({ db }, { email }) => {
    try {
      return await db
        .query("user")
        .filter((q) => q.eq(q.field("email"), email))
        .first();
    } catch (e: any) {
      console.log(e.message ?? e.toString());
      throw e;
    }
  },
});

// Get leader board filtered and ordered by XP
export const getLeaderBoard = query({
  args: { userId: v.id("user") },
  handler: async ({ db }, { userId }) => {
    const users = await db
      .query("user")
      .withIndex("by_xpCount")
      .order("desc")
      .take(25);

    const user = await db.get(userId);

    if (!user) {
      throw new Error("No user with that id");
    }

    const sortedUsers = users.slice().sort((a, b) => b.xpCount - a.xpCount);
    const globalRank = calculateRank(
      (await db.query("user").collect()) ?? [],
      user?._id,
    );

    return {
      user,
      sortedUsers,
      globalRank,
      totalUsers: (await db.query("user").collect()).length,
    };
  },
});

export const getWeeklyTopRanked = internalQuery({
  handler: async ({ db }) => {
    return (
      (await db.query("user").withIndex("by_xpCount").order("desc").take(3)) ??
      []
    );
  },
});

export const getHistory = query({
  args: { userId: v.id("user") },
  handler: async ({ db }, { userId }) => {
    return (
      (await db
        .query("activity")
        .filter((q) => q.eq(q.field("userId"), userId))
        .order("desc")
        .take(25)) ?? []
    );
  },
});

export const getOnlyXpHistory = query({
  args: { userId: v.id("user") },
  handler: async ({ db }, { userId }) => {
    return (
      db
        .query("activity")
        .filter((q) =>
          q.and(q.eq(q.field("userId"), userId), q.eq(q.field("type"), "xp")),
        )
        .order("desc")
        .take(25) ?? []
    );
  },
});
