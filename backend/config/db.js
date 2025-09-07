import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv/config";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

export const sql = neon(
    // ban đầu thiếu dấu "?" sau ${PGDATABASE}
  `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
);
