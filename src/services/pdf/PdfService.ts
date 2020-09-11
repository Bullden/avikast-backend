/* eslint-disable class-methods-use-this */
import {Injectable} from '@nestjs/common';
import {IPdfService} from './IPdfService';
import Resume from '../../entities/Resume';
import PdfPrinter from 'pdfmake';
import fs from 'fs';
import User from '../../entities/User';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class PdfService implements IPdfService {
  public async createPdfResume(user: User, resume: Resume, link: string) {
    const fonts1 = {
      Roboto: {
        normal: './fonts/Roboto-Regular.ttf',
        bold: './fonts/Roboto-Medium.ttf',
        italics: './fonts/Roboto-Italic.ttf',
        bolditalics: './fonts/Roboto-MediumItalic.ttf',
      },
    };

    const printer = new PdfPrinter(fonts1);
    const docDefinition = {
      content: [
        {
          text: 'Avikast Resume',
          style: 'watermark',
        },
        {text: `${user.name}`, style: 'header'},

        {text: `Summary`, style: 'subheader'},
        {text: `${resume.summary}`, style: 'text'},

        {text: `Education`, style: 'subheader'},
        {text: `${resume.education}`, style: 'text'},

        {text: `Experience`, style: 'subheader'},
        {text: `${resume.experience}`, style: 'text'},

        {text: `Awards`, style: 'subheader'},
        {text: `${resume.awards}`, style: 'text'},
        {
          text: 'Render in avikast.com',
          style: 'sign',
        },
      ],
      styles: {
        watermark: {
          fontSize: 12,
          color: '#C82FC6',
        },
        header: {
          fontSize: 30,
          bold: true,
          color: 'blue',
        },
        subheader: {
          fontSize: 24,
          bold: true,
          color: 'black',
        },
        text: {
          fontSize: 18,
        },
      },
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.end();
    const fileName = uuidv4();
    await pdfDoc.pipe(fs.createWriteStream(`../files/${link}`));
    return fileName;
  }
}
