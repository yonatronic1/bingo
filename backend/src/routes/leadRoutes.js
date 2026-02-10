import { Router } from "express";
import { z } from "zod";
import { pool } from "../db/pool.js";

const leadRouter = Router();

const leadSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email().max(160),
  company: z.string().max(120).optional().default(""),
  monthlyBudget: z.number().int().nonnegative(),
  challenge: z.string().max(500).optional().default("")
});

leadRouter.get("/", async (_req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT id, full_name AS "fullName", email, company, monthly_budget AS "monthlyBudget", challenge, created_at AS "createdAt"
       FROM leads
       ORDER BY created_at DESC
       LIMIT 100`
    );

    res.json({ leads: rows });
  } catch (error) {
    next(error);
  }
});

leadRouter.post("/", async (req, res, next) => {
  try {
    const parsed = leadSchema.parse(req.body);

    const { rows } = await pool.query(
      `INSERT INTO leads (full_name, email, company, monthly_budget, challenge)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO UPDATE
       SET full_name = EXCLUDED.full_name,
           company = EXCLUDED.company,
           monthly_budget = EXCLUDED.monthly_budget,
           challenge = EXCLUDED.challenge
       RETURNING id, full_name AS "fullName", email, company, monthly_budget AS "monthlyBudget", challenge, created_at AS "createdAt"`,
      [parsed.fullName, parsed.email, parsed.company, parsed.monthlyBudget, parsed.challenge]
    );

    res.status(201).json({ lead: rows[0] });
  } catch (error) {
    if (error?.name === "ZodError") {
      return res.status(400).json({ message: "Invalid payload", issues: error.issues });
    }

    next(error);
  }
});

export { leadRouter };
