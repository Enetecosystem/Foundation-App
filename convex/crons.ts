import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Define cron for mining
// crons.interval("Start mining", { hours: 1 }, internal.mutations.startMinig, {});

export default crons;
