import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';

@Injectable()
export class AppService {
  private items: { [key: number]: string } = {};

  createItem(createItemDto: CreateItemDto) {
    const itemId = Object.keys(this.items).length + 1;
    this.items[itemId] = createItemDto.name;
    return { item_id: itemId, name: createItemDto.name, status: 'created' };
  }

  getItem(id: number) {
    if (!(id in this.items)) {
      throw new NotFoundException('Item not found');
    }
    return { item_id: id, name: this.items[id] };
  }

  updateItem(id: number, updateItemDto: UpdateItemDto) {
    if (!(id in this.items)) {
      throw new NotFoundException('Item not found');
    }
    this.items[id] = updateItemDto.name;
    return { item_id: id, name: updateItemDto.name, status: 'updated' };
  }

  deleteItem(id: number) {
    if (!(id in this.items)) {
      throw new NotFoundException('Item not found');
    }
    delete this.items[id];
    return { item_id: id, status: 'deleted' };
  }
}