import { db } from "@/db/drizzle";
import { auth } from "@/lib/auth";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Seeding started...");

  const email = process.env.SEED_USER_EMAIL!;

  // Check: is seed user already there?
  const existingAdmin = await db.query.user.findFirst({
    where: (u, { eq }) => eq(u.email, process.env.SEED_USER_EMAIL!),
  });

  if (!existingAdmin) {
    // add user via better auth API
    const response = await auth.api.signUpEmail({
      body: {
        email: email,
        password: process.env.SEED_USER_PASSWORD!,
        name: "Seed User",
      },
    });

    // set email_verified to true via drizzle
    if (response) {
      // 3. Email manuell auf verifiziert setzen (Drizzle Update)
      await db
        .update(user)
        .set({ emailVerified: true })
        .where(eq(user.email, email));

      console.log("✅ Seed user created and email marked as verified.");
    }
  } else {
    console.log("ℹ️ Seed user already exists. Skipping...");
  }
}

main().catch((e) => {
  console.error("❌ Seeding failed:", e);
  process.exit(1);
});
