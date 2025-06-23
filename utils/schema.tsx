
import { pgTable, serial, varchar, text, timestamp,boolean } from "drizzle-orm/pg-core";


export const AIOutput = pgTable("aiOutput", {
  id: serial("id").primaryKey(),
  formData: varchar("formData", { length: 255 }).notNull(),
  aiResponse: text("aiResponse"),
  templateSlug: varchar("templateSlug", { length: 255 }).notNull(),
  createdBy: varchar("email", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", { mode: "string" }).defaultNow().notNull(),
});




export const UserSubscription = pgTable('userSubscription', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }),
  userName: varchar('userName', { length: 255 }),
  active: boolean('active'),
  paymentId: varchar('paymentId', { length: 255 }),
  joinDate: varchar('joinDate', { length: 100 }),
  plan: varchar('plan').default('free').notNull(),
});
