import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;

// // Enlevez cette ligne si vous utilisez mongoDB
// export const runtime = "edge"; // optional
