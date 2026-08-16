/**
 * db.js - Database connection layer for Rise Financial Services backend.
 * ------------------------------------------------------------------------
 * Reads configuration from environment variables (see .env.example).
 *
 * Default: SQLite (zero setup, single file, works everywhere) via
 * better-sqlite3, a synchronous driver that's simple and fast for a
 * small app like this one.
 *
 * If you outgrow SQLite, swap this file for a Postgres/MySQL client
 * (e.g. "pg") -- server.js only calls the functions exported below, so
 * nothing else needs to change.
 */

require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { DatabaseSync } = require('node:sqlite'); // built into Node.js 22.5+ -- no native compile step needed

const BASE_DIR = __dirname;

const SQLITE_PATH_RAW = process.env.SQLITE_PATH || 'data/applications.db';
const SQLITE_PATH = path.isAbsolute(SQLITE_PATH_RAW)
  ? SQLITE_PATH_RAW
  : path.join(BASE_DIR, SQLITE_PATH_RAW);

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS applications (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  submitted_at  TEXT NOT NULL,
  name          TEXT NOT NULL,
  mobile        TEXT NOT NULL,
  email         TEXT,
  city          TEXT,
  loan          TEXT NOT NULL,
  call_time     TEXT,
  details       TEXT
);
`;

let db;

function getConnection() {
  if (!db) {
    fs.mkdirSync(path.dirname(SQLITE_PATH), { recursive: true });
    db = new DatabaseSync(SQLITE_PATH);
    db.exec('PRAGMA journal_mode = WAL');
  }
  return db;
}

function initDb() {
  const conn = getConnection();
  conn.exec(CREATE_TABLE_SQL);
}

function checkConnection() {
  const conn = getConnection();
  conn.prepare('SELECT 1').get();
  return true;
}

module.exports = {
  getConnection,
  initDb,
  checkConnection,
  DB_ENGINE: 'sqlite',
  SQLITE_PATH,
};
