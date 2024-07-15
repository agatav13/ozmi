export type Workspace = {
  name: string
  version: string
}

export interface FileWithPreview extends File {
  preview: string;
}