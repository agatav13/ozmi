export interface FileWithPreview extends File {
  preview: string;
}

export interface FormDataType {
  title: string;
  date: Date;
  category: string;
  content: string;
  images?: string[];
}

export interface FormDataTypeWithId extends FormDataType {
  id: number;
}

export interface CaseStudyDataType {
  title: string;
  date: Date;
  category: string;
}

export interface CaseStudyDataTypeWithId extends CaseStudyDataType {
  id: number;
}
