export interface CloudItem {
  id: string;
  name: string;
  isFolder: boolean;
}

export interface CloudFolder extends CloudItem {
  isFolder: true;
}

export interface CloudFile extends CloudItem {
  isFolder: false;
}

export interface CloudUser {
  name: string;
  id: string;
}

export interface CloudLoggedInStatus {
  loggedIn: boolean;
  user?: CloudUser | undefined;
}

export interface CloudStorageAPIOptions {
  updateLoggedInStatus: (status: CloudLoggedInStatus) => void;
}

export interface CloudStorageAPI<CloudStorageAPIOptions> {
  load(options: any): void;
  login(options: any): void;
  logout(): void;
  listFiles(options: {
    parentDirectory: string | undefined;
  }): Promise<Array<CloudItem>>;
}
