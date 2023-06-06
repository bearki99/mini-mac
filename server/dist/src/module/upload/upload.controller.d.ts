/// <reference types="multer" />
import { UploadService } from './upload.service';
export declare class UploadController {
    private uploadService;
    private cos;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File): Promise<{
        msg: string;
        location: string;
        type: string;
        size: string;
    }>;
}
