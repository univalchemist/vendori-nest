import { DynamicTemplateDTO } from './dynamic-template.dto';

export class EmailDataDTO extends DynamicTemplateDTO {
  templateId: string;
  file?: Express.Multer.File;
}
