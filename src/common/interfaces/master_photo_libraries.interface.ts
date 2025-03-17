import { IBase } from './base.interface';
import { IPagination } from './pagination.interface';

export interface IMaster_Photo_Library extends IBase {
  name?: string;
  size?: string;
  file_extension?: string;
  dimension?: string;
  seo_tag?: string;
  attachment?: string;
  // store_product_medias?: IStore_Product_Media[];
  // course_medias?: ICourse_Media[];
  // course_lessons?: ICourse_Lesson[];
  // exam_questions?: IExam_Question[];
  // exam_question_details?: IExam_Question_Detail[];
}

export interface IMaster_Photo_Libraries extends IPagination {
  data: IMaster_Photo_Library[];
}
