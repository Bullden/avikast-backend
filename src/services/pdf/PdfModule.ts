import {Module} from '@nestjs/common';
import {IPdfService} from './IPdfService';
import {PdfService} from './PdfService';

@Module({
  imports: [
    //
  ],
  providers: [
    {
      provide: IPdfService,
      useClass: PdfService,
    },
  ],
  exports: [IPdfService],
})
export class PdfModule {}
