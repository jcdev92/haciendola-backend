import { Module } from '@nestjs/common';
import { FileConverterService } from './file-converter/file-converter.service';

@Module({
  providers: [FileConverterService],
  exports: [FileConverterService],
  controllers: [],
})
export class CommonModule {}
