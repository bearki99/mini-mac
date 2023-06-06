"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_service_1 = require("./upload.service");
const COS = require('cos-nodejs-sdk-v5');
let UploadController = class UploadController {
    constructor(uploadService) {
        this.uploadService = uploadService;
        this.cos = new COS({
            SecretId: process.env.TX_SECRET_ID,
            SecretKey: process.env.TX_SECRET_KEY,
        });
    }
    async uploadFile(file) {
        const { folder, filePath } = this.uploadService.getFilePath(file);
        const fileSize = this.uploadService.formatFileSize(file);
        const params = {
            Bucket: process.env.TX_BUCKET,
            Region: process.env.TX_REGION,
            Key: filePath,
            Body: file.buffer,
        };
        const result = await this.cos.putObject(params);
        return {
            msg: 'upload file',
            location: `https://${result.Location}`,
            type: folder,
            size: fileSize,
        };
    }
};
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
UploadController = __decorate([
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [upload_service_1.UploadService])
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map