export type Workspace = {
  name: string
  version: string
}

export interface FileWithPreview extends File {
  preview: string;
}

export interface FormDataType {
  title: string,
  category: string,
  content: string
}