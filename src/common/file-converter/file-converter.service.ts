import { Injectable } from '@nestjs/common';
import { readFile, utils } from 'xlsx';

// type arrayEntities = Array<Product | User>;
@Injectable()
export class FileConverterService {
  constructor() {}

  xlsxToJson(filePath: string): any[] {
    const workbook = readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data: any[] = utils.sheet_to_json(worksheet);
    // convert keys in lowercase
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        // separe keys with spaces
        const words = key.toLocaleLowerCase().split(' ');
        if (words.length > 1) {
          // capitalize each letter after first word
          for (let i = 1; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
          }
        }
        const newKey = words.join('');
        item[newKey] = item[key];
        delete item[key];
      });
    });

    return data;
  }
}
