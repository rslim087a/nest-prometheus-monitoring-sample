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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const item_dto_1 = require("./dto/item.dto");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const prom_client_1 = require("prom-client");
let AppController = class AppController {
    constructor(appService, httpRequestDurationHistogram) {
        this.appService = appService;
        this.httpRequestDurationHistogram = httpRequestDurationHistogram;
    }
    getHello() {
        return { message: 'Hello World' };
    }
    createItem(createItemDto) {
        const end = this.httpRequestDurationHistogram.startTimer();
        const result = this.appService.createItem(createItemDto);
        end({ method: 'POST', route: '/items', code: '200' });
        return result;
    }
    getItem(id) {
        const end = this.httpRequestDurationHistogram.startTimer();
        try {
            const result = this.appService.getItem(+id);
            end({ method: 'GET', route: '/items/:id', code: '200' });
            return result;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                end({ method: 'GET', route: '/items/:id', code: '404' });
            }
            throw error;
        }
    }
    updateItem(id, updateItemDto) {
        const end = this.httpRequestDurationHistogram.startTimer();
        try {
            const result = this.appService.updateItem(+id, updateItemDto);
            end({ method: 'PUT', route: '/items/:id', code: '200' });
            return result;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                end({ method: 'PUT', route: '/items/:id', code: '404' });
            }
            throw error;
        }
    }
    deleteItem(id) {
        const end = this.httpRequestDurationHistogram.startTimer();
        try {
            const result = this.appService.deleteItem(+id);
            end({ method: 'DELETE', route: '/items/:id', code: '200' });
            return result;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                end({ method: 'DELETE', route: '/items/:id', code: '404' });
            }
            throw error;
        }
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [item_dto_1.CreateItemDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createItem", null);
__decorate([
    (0, common_1.Get)('items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getItem", null);
__decorate([
    (0, common_1.Put)('items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, item_dto_1.UpdateItemDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('items/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "deleteItem", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __param(1, (0, nestjs_prometheus_1.InjectMetric)('http_request_duration_seconds')),
    __metadata("design:paramtypes", [app_service_1.AppService,
        prom_client_1.Histogram])
], AppController);
//# sourceMappingURL=app.controller.js.map