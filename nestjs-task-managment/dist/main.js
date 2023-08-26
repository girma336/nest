"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const tranform_interceptor_1 = require("./tranform.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    const logger = new common_1.Logger();
    const port = 3000;
    app.useGlobalInterceptors(new tranform_interceptor_1.TransformInterceptor());
    await app.listen(3000);
    logger.log(`Application Listening on potr ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map