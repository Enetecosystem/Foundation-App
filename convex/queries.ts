import { internalQuery } from "./_generated/server";
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
