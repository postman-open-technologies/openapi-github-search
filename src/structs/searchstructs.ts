export interface CodeSearchResponse {
  Organisation: string;
  Repository: string;
  Username: string;
  Page: number;
  URL: string;
  Content: string;
  Filepath: string;
  Version: string | null;
  Info: string | null;
  Servers: string | null;
  Paths: string | null;
}
