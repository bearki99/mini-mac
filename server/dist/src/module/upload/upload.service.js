"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const image = ['gif', 'png', 'jpg', 'jpeg', 'bmp', 'webp'];
const video = ['mp4', 'webm'];
const audio = ['mp3', 'wav', 'ogg'];
const document = ['pdf', 'docs', 'md', 'doc', 'txt', 'ppt', 'markdown'];
let UploadService = class UploadService {
    getFilePath(file) {
        const filename = `${(decodeURI(file.originalname))}`;
        let folder = '';
        if (image.includes(file.originalname.split('.').pop()))
            folder = 'image';
        else if (video.includes(file.originalname.split('.').pop()))
            folder = 'video';
        else if (audio.includes(file.originalname.split('.').pop()))
            folder = 'audio';
        else if (document.includes(file.originalname.split('.').pop()))
            folder = 'document';
        else
            folder = 'other';
        const filePath = `${folder}/${filename}`;
        return { folder, filePath };
    }
    formatFileSize(file) {
        const size = file.size;
        if (size < 1000)
            return `${size}B`;
        else if (size < 1000000)
            return `${(size / 1000).toFixed(2)}KB`;
        else if (size < 1000000000)
            return `${(size / 1000000).toFixed(2)}MB`;
        else
            return `${(size / 1000000000).toFixed(2)}GB`;
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map