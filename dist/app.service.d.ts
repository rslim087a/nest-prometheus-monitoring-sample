import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
export declare class AppService {
    private items;
    createItem(createItemDto: CreateItemDto): {
        item_id: number;
        name: string;
        status: string;
    };
    getItem(id: number): {
        item_id: number;
        name: string;
    };
    updateItem(id: number, updateItemDto: UpdateItemDto): {
        item_id: number;
        name: string;
        status: string;
    };
    deleteItem(id: number): {
        item_id: number;
        status: string;
    };
}
