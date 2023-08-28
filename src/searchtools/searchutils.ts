import { octokit } from '../app.js';
// import { CodeSearchResponse } from "./searchstructs.js";
import crypto from 'crypto';
import OASNormalize from 'oas-normalize';
import { BulkStoreToDB } from '../DB/dbutils.js';

export function generateUUID(): string {
  // Generate a random buffer of 16 bytes
  const buffer = crypto.randomBytes(16);

  // Set the version (4) and variant (2) bits
  buffer[6] = (buffer[6] & 0x0f) | 0x40;
  buffer[8] = (buffer[8] & 0x3f) | 0x80;

  // Convert the buffer to a string representation of the UUID
  const uuid = buffer.toString('hex').match(/(.{8})(.{4})(.{4})(.{4})(.{12})/);
  uuid.shift();
  return uuid.join('-');
}

export async function getFileContents(
  repoowner: string,
  reponame: string,
  filepath: string,
): Promise<any> {
  const response = await octokit.request(
    'GET /repos/{owner}/{repo}/contents/{path}',
    {
      owner: repoowner,
      repo: reponame,
      path: filepath,
    },
  );
  return response;
}

export async function queryBuilder(
  prompt: string,
  repo: string,
  organisation: string,
  username: string,
  rootquery: string,
): Promise<string> {
  if (prompt == undefined) {
    prompt = '';
  }
  let query: string;
  let filter: string;
  if (rootquery != undefined) {
    if (rootquery === 'openapi') {
      query = 'openapi: 3';
    } else if (rootquery === 'swagger') {
      query = '"swagger: \\"2"';
    }
    return query;
  }
  if (repo != undefined) {
    filter = '+repo:' + repo + ' ';
  } else if (organisation != undefined) {
    filter = 'org:' + organisation + ' ';
  } else if (username != undefined) {
    filter += '+user:' + username + ' ';
  }
  if (prompt) {
    query = filter + prompt + ' "openapi: 3"';
    // query = filter + prompt + ` "swagger: \\"2"`;
  } else {
    query = filter + ' "openapi: 3"';
    // query = filter + ' "swagger: \\"2"';
  }
  return query;
}

export async function ValidateandStoreFiles(files: any[]): Promise<any> {
  if (files.length == 0) {
    return;
  }
  console.info('Validating and storing files');
  let validFiles = [];
  for (const file of files) {
    const response = await getFileContents(
      file.repository.owner.login,
      file.repository.name,
      file.path,
    );
    const content = Buffer.from(
      response['data']['content'],
      'base64',
    ).toString();
    const oas = new OASNormalize.default(content);
    oas
      .validate()
      .then((definition) => {
        console.info('File ' + file.name + ' is valid');
        console.info(definition?.info?.title);
        console.info(validFiles.length);
        validFiles.push({
          index: { _index: 'openapi', _id: response['data']['sha'] },
        });
        validFiles.push({
          URL: response['url'].split('api.github.com/repos/')[1],
          ETAG: response['headers']['etag'],
          title: definition?.info?.title,
          description: definition?.info?.description,
          version: definition?.info?.version,
          servers: JSON.stringify(definition?.servers),
          paths: JSON.stringify(definition?.paths),
          filepath: file.path,
          repository: file?.repository?.name,
          owner: file?.repository?.owner?.login,
          data: content,
          LastModified: response['headers']['last-modified'],
          LastUpdated: new Date().toISOString(),
          isDeleted: false,
        });
        if (validFiles.length >= 50) {
          console.info('Storing some of the valid files');
          BulkStoreToDB(validFiles as any[]);
          validFiles = [];
        }
      })
      .catch(() => {
        console.info('File ' + file.name + ' is not valid');
      });
  }
  BulkStoreToDB(validFiles as any[]);
  return validFiles;
}
