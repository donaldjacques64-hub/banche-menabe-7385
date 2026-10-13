import { z } from "zod";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import { contactRequests } from "../database/schema";

const recent = new Map<string, number>();
export const requests = {
  create: base
    .input(
      z.object({
        name: z.string().trim().min(2).max(100),
        email: z.string().trim().email().max(200),
        phone: z.string().trim().max(40),
        subject: z.enum(["Bénévolat", "Soutien et dons", "Partenariat", "Autre demande"]),
        message: z.string().trim().min(10).max(3000),
        consent: z.literal(true),
        website: z.string().max(0),
      }),
    )
    .handler(async ({ input }) => {
      const now = Date.now();
      for (const [key, time] of recent) if (now - time > 60000) recent.delete(key);
      if (recent.has(input.email.toLowerCase()))
        throw new ORPCError("TOO_MANY_REQUESTS", {
          message: "Veuillez patienter une minute avant un nouvel envoi.",
        });
      const id = crypto.randomUUID();
      await db
        .insert(contactRequests)
        .values({
          id,
          name: input.name,
          email: input.email,
          phone: input.phone,
          subject: input.subject,
          message: input.message,
        });
      recent.set(input.email.toLowerCase(), now);
      return { reference: id.slice(0, 8).toUpperCase() };
    }),
};
