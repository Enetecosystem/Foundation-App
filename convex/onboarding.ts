// TODO: Create convex action to store user data, create OTP and send email with novu
import { action, mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { customAlphabet } from "nanoid";
import { Id } from "./_generated/dataModel";
import bcrypt from "bcryptjs";

// Random OTP code
const generateOTPCode = customAlphabet("0123456789", 6);

export const initializeNewUser = action({
  args: { email: v.string(), referral: v.optional(v.string()) },
  handler: async (ctx, args): Promise<string> => {
    // TODO: handle oslo OTP creation and novu email workflow trigger
    const userId: Id<"user"> = await ctx.runMutation(
      internal.mutations.storeEmail,
      {
        email: args.email,
        referreeCode: args.referral,
      },
    );

    // TODO: Create OTP
    const otp = generateOTPCode();
    console.log(otp, ":::User OTP");

    await ctx.runMutation(internal.mutations.storeOTPSecret, {
      userId,
      secret: otp,
    });

    // TODO: call novu action
    const novuResult = await ctx.runAction(internal.novu.triggerOTPWorkflow, {
      otp,
      userId: userId,
      email: args.email,
    });

    console.log(novuResult, ":::Novu result");

    return userId;
  },
});

export const resendOTPCode = action({
  args: { email: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    // TODO: Create OTP
    const otp = generateOTPCode();
    console.log(otp, ":::User OTP");

    await ctx.runMutation(internal.mutations.storeOTPSecret, {
      userId: args.userId as Id<"user">,
      secret: otp,
    });

    // TODO: call novu action
    await ctx.runAction(internal.novu.triggerOTPWorkflow, {
      otp,
      userId: args.userId,
      email: args.email,
    });
  },
});

export const verifyUserOTP = action({
  args: { otp: v.string(), userId: v.id("user") },
  handler: async (ctx, args) => {
    // Call query to get secretstring
    const secretString: string = await ctx.runQuery(
      internal.queries.getOTPSecret,
      { userId: args.userId },
    );

    console.log(secretString, args.otp, args.userId, ":::OPT values");

    const isValid = args.otp === secretString;
    return isValid;
  },
});

export const storePassword = action({
  args: { userId: v.id("user"), password: v.string() },
  handler: async (ctx, args) => {
    const hashedPassword = await bcrypt.hash(args.password, 10);

    await ctx.runMutation(internal.mutations.saveUserPassword, {
      userId: args.userId,
      hashedPassword: hashedPassword,
    });
  },
});

export const storeNickname = mutation({
  args: { nickname: v.string(), userId: v.id("user") },
  handler: async (ctx, { nickname, userId }) => {
    await ctx.db.patch(userId, { nickname: nickname });
  },
});
