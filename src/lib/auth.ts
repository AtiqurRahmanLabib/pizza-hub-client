import { betterAuth } from "better-auth";
import { getOAuthState } from "better-auth/api";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("pizzaHub");

type PublicRole = "customer" | "vendor";

const publicRoles = new Set<PublicRole>(["customer", "vendor"]);

/**
 * The public sign-up form sends the chosen role as an intent, not as the
 * protected `role` field. The Admin plugin owns `role` and keeps it
 * `input: false`, so clients can never promote themselves to `admin`.
 */
function resolvePublicRole(value: unknown): PublicRole | undefined {
  return typeof value === "string" && publicRoles.has(value as PublicRole)
    ? (value as PublicRole)
    : undefined;
}

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      // Accepted from public sign-up, then removed in the hook below.
      requestedRole: {
        type: ["customer", "vendor"],
        required: false,
        input: true,
        returned: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          const oauthState = await getOAuthState();
          const requestedRole =
            resolvePublicRole(user.requestedRole) ??
            resolvePublicRole(ctx?.body?.requestedRole) ??
            resolvePublicRole(oauthState?.requestedRole);

          const data = { ...user };
          delete data.requestedRole;

          return {
            data: requestedRole ? { ...data, role: requestedRole } : data,
          };
        },
      },
    },
  },
  plugins: [
    admin({
      defaultRole: "customer",
      adminRoles: ["admin"],
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
