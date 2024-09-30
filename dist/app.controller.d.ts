import { AppService } from './app.service';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { Histogram } from 'prom-client';
export declare class AppController {
    private readonly appService;
    private readonly httpRequestDurationHistogram;
    constructor(appService: AppService, httpRequestDurationHistogram: Histogram<string>);
    getHello(): {
        message: string;
    };
    createItem(createItemDto: CreateItemDto): {
        item_id: number;
        name: string;
        status: string;
    };
    getItem(id: string): {
        item_id: number;
        name: string;
    };
    updateItem(id: string, updateItemDto: UpdateItemDto): {
        item_id: number;
        name: string;
        status: string;
    };
    deleteItem(id: string): {
        item_id: number;
        status: string;
    };
}
