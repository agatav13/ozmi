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

// do wyświetlania elementów dodwania pól tekstowych i zdjęć
export type CaseStudyInputType = {
  type: "text" | "file";
  content: string | File | null;
};

// do wyświetlania postów case study
export type CaseStudyPostsContentType = {
  post_id: number;
  position_number: number;
  content_type: "text" | "photo";
  content: string;
};

export interface CaseStudyDataType {
  title: string;
  date: Date;
  category: string;
  content?: CaseStudyPostsContentType[];
}

export interface CaseStudyDataTypeWithId extends CaseStudyDataType {
  id: number;
}
