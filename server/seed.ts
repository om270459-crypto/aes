import { storage } from "./storage";

async function seed() {
  const existing = await storage.getMessages();
  if (existing.length === 0) {
    console.log("Seeding database...");
    await storage.createMessage({ sender: "System", content: "Welcome to the Neon Sanctuary. Leave your love note here." });
    await storage.createMessage({ sender: "Guest", content: "This place is beautiful!" });
    console.log("Seeding complete.");
  } else {
    console.log("Database already seeded.");
  }
}

seed().catch(console.error);
