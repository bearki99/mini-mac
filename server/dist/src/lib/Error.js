"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Error = (code, msg) => {
    switch (code) {
        case 400:
            throw new common_1.HttpException(msg, common_1.HttpStatus.BAD_REQUEST);
        case 401:
            throw new common_1.HttpException(msg, common_1.HttpStatus.UNAUTHORIZED);
        case 403:
            throw new common_1.HttpException(msg, common_1.HttpStatus.FORBIDDEN);
        case 404:
            throw new common_1.HttpException(msg, common_1.HttpStatus.NOT_FOUND);
        case 408:
            throw new common_1.HttpException(msg, common_1.HttpStatus.REQUEST_TIMEOUT);
        case 500:
            throw new common_1.HttpException(msg, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        case 502:
            throw new common_1.HttpException(msg, common_1.HttpStatus.BAD_GATEWAY);
    }
};
exports.default = Error;
//# sourceMappingURL=Error.js.map