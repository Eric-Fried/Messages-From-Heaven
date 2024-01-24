/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import argon2, { hash } from 'argon2';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';
import jwt from 'jsonwebtoken';

type Plan = {
  planId: number;
  name: string;
  description: string;
  planType: string;
  pricePerMonth: number;
  purchasedBy: number;
  message: string;
  giftIncluded: string;
  toBeDeliveredOn: string;
  addressedTo: string;
};

type User = {
  username: string;
  userId: number;
  password: string;
  hashedPassword: string;
};

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const hashKey = process.env.TOKEN_SECRET;
if (!hashKey) throw new Error('TOKEN_SECRET not found in .env');

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/plans', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "plans";
    `;
    const result = await db.query(sql);
    const plans = result.rows;
    res.json(plans);
  } catch (err) {
    next(err);
  }
});

app.get('/api/plans/:planId', async (req, res, next) => {
  try {
    const planId = Number(req.params.planId);
    if (!planId) {
      throw new ClientError(400, 'productId must be a positive integer');
    }
    const sql = `
      select "planId",
            "name",
            "pricePerMonth",
            "description"
        from "plans"
        where "planId" = $1
    `;
    const params = [planId];
    const result = await db.query<Plan>(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, `cannot find plan with planId ${planId}`);
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.post('/api/planInfo', async (req, res, next) => {
  try {
    const {
      planId,
      message,
      purchasedBy,
      giftIncluded,
      toBeDeliveredOn,
      addressedTo,
    } = req.body as Partial<Plan>;
    if (!message || !planId) {
      throw new ClientError(400, 'Message is a required fields');
    }
    const sql = `
      insert into "planInfo" ("planId", "message", "purchasedBy" , "giftIncluded",
      "toBeDeliveredOn", "addressedTo")
        values ($1, $2, $3, $4, $5,$6)
        returning *;
    `;
    const params = [
      planId,
      message,
      purchasedBy,
      giftIncluded,
      toBeDeliveredOn,
      addressedTo,
    ];
    const result = await db.query<Plan>(sql, params);
    const [entry] = result.rows;
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body as Partial<User>;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    /* TODO:
     * Hash the user's password with `argon2.hash()` DONE
     * Insert the user's "username" and "hashedPassword" into the "users" table.
     * Respond to the client with a 201 status code and the new user's "userId", "username", and "createdAt" timestamp.
     * Catch any errors.
     *
     * Hint: Insert statements can include a `returning` clause to retrieve the insterted row(s).
     */

    const hashedPassword = await argon2.hash(password);

    const sql = `
      insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        returning "userId" , "username" ;
    `;
    const params = [username, hashedPassword];
    const result = await db.query<User>(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId",
            "hashedPassword"
        from "users"
      where "username" = $1
    `;
    const params = [username];
    const result = await db.query<User>(sql, params);
    const [auth] = result.rows;
    if (!auth) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = auth;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, hashKey);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
