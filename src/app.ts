import express from 'express';
import { Octokit } from 'octokit';
import { activeSearch, passiveSearch } from './searchtools/search.js';
import dotenv from 'dotenv';
import es from 'elasticsearch';
import { checkClusterHealth } from './DB/dbutils.js';
import { throttling } from '@octokit/plugin-throttling';
import { retry } from '@octokit/plugin-retry';
import { UpdateOpenAPIFiles } from './updatetools/update.js';
import { fileURLToPath } from 'url';
import path from 'path';

const CustomOctokit = Octokit.plugin(throttling as any, retry as any);
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, 'src');

const octokit = new CustomOctokit({
  userAgent: 'github-openapi-search/v0.0.1',
  auth: process.env.GITHUB_API_KEY,
  throttle: {
    onRateLimit: (retryAfter, options): boolean => {
      octokit.log.warn(
        `Request quota exhausted for request ${options.method} ${options.url}`,
      );
      console.info(`Retrying after ${retryAfter} seconds!`);
      return true;
    },
    onSecondaryRateLimit: (retryAfter, options, octokit): void => {
      octokit.log.warn(
        `Secondary quota detected for request ${options.method} ${options.url}`,
      );
    },
  },
});

const esHost = process.env.ES_HOST || 'localhost';
const esClient = new es.Client({
  host: 'http://' + esHost + ':9200',
  // log: 'trace',
});

const app = express();
app.get('/search', async (_req, _res) => {
  const query = _req.query.q as string;
  const results = await passiveSearch(query);
  _res.send(results);
});

app.post('/openapi', async (_req, _res) => {
  const Repository = _req.query.repo as string;
  const Organisation = _req.query.org as string;
  const User = _req.query.user as string;
  const Prompt = _req.query.prompt as string;
  const RootQuery = _req.query.rootquery as string;
  const results = await activeSearch(
    Prompt as string,
    Repository as string,
    Organisation as string,
    User as string,
    RootQuery as string,
  );
  _res.send(results);
});

app.put('/openapi', async (_req, _res) => {
  const results = await UpdateOpenAPIFiles();
  _res.send(results);
});

app.use('/ping', async (_req, _res) => {
  const response = await checkClusterHealth();
  _res.send(response);
});

app.get('/', (_req, _res) => {
  const filePath = path.join(rootDir, 'templates', 'index.html');
  _res.sendFile(filePath);
});

export { octokit, esClient, app };
