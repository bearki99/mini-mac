/// <reference types="multer" />
export declare class UploadService {
    getFilePath(file: Express.Multer.File): {
        folder: string;
        filePath: string;
    };
    formatFileSize(file: Express.Multer.File): string;
}
