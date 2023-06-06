"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const http_exception_fillter_1 = require("./common/filters/http-exception.fillter");
const transform_interceptor_1 = require("./common/interceptor/transform.interceptor");
const logger_middleware_1 = require("./common/middleware/logger.middleware");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(logger_middleware_1.logger);
    app.useGlobalFilters(new http_exception_fillter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe());
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map