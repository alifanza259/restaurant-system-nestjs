import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
    transform(value: Express.Multer.File, metadata: ArgumentMetadata) {
        // "value" is an object containing the file's attributes and metadata
        if (!value) {
            return null
        }
        const tenMb = 10 * 1000 * 1000;
        return value.size < tenMb ? value : null;
    }
}