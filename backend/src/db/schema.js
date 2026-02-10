import { pool } from "./pool.js";

export async function ensureSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id SERIAL PRIMARY KEY,
      full_name VARCHAR(120) NOT NULL,
      email VARCHAR(160) UNIQUE NOT NULL,
      company VARCHAR(120),
      monthly_budget INTEGER CHECK (monthly_budget >= 0),
      challenge TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);
}
