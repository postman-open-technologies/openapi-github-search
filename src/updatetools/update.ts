import { UpdateDocument, scrollSearch } from './updateutils.js';

export async function UpdateOpenAPIFiles(): Promise<string> {
  const params = {
    index: 'openapi',
    scroll: '30s',
    size: 1,
    _source: ['owner', 'repository', 'filepath', 'ETAG', 'isDeleted'],
    body: {
      query: {
        match_all: {},
      },
    },
  };
  for await (const hit of scrollSearch(params)) {
    await UpdateDocument(hit);
  }
  return 'Updated All OpenAPI Files';
}
