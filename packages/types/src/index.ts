export interface FileWithPreview extends File {
  preview: string;
}

export interface FormDataType {
  title: string,
  category: string,
  content: string
}

export interface FormDataTypeWithId extends FormDataType {
  id: number
}