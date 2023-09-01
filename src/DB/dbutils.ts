import { esClient } from '../app.js';

export async function checkClusterHealth(): Promise<string> {
  try {
    const response = await esClient.cat.health();
    console.info('Cluster health:', response);
    return response;
  } catch (error) {
    console.error('Error checking cluster health');
    return 'Error checking cluster health';
  }
}

export async function BulkStoreToDB(validFiles: any): Promise<void> {
  try {
    if (validFiles.length == 0) {
      return;
    }
    const response = await esClient.bulk({ body: validFiles });
    return response;
  } catch (error) {
    console.error('Error bulk indexing:', error);
  }
}

export async function DeleteDocumentWithId(Id: string): Promise<void> {
  try {
    const index = 'openapi';
    const updatedDocument = {
      isDeleted: true,
    };
    await esClient.update({
      index,
      id: Id,
      body: {
        doc: updatedDocument,
      },
    });
    console.info(`Document with ID ${Id} soft deleted.`);
  } catch (error) {
    console.error('Error deleting document from the database:', error);
  }
}

export async function CreateDocument(Id: string, document: any): Promise<void> {
  try {
    const index = 'openapi';
    await esClient.index({
      index,
      id: Id,
      body: {
        doc: document,
      },
    });
    console.info(`New Document Added with ID ${Id}`);
  } catch (error) {
    //TODO: Add error handling for 400 over here
    console.error('Error creating the document:', error);
  }
}

export async function GetDocumentWithId(Id: string): Promise<any> {
  try {
    const index = 'openapi';
    const document = await esClient.get({
      index,
      id: Id,
    });
    return document;
  } catch (error) {
    console.error('Error getting document from database:', error);
  }
}
