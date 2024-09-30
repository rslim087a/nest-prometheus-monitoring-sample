import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Histogram } from 'prom-client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectMetric('http_request_duration_seconds') private readonly httpRequestDurationHistogram: Histogram<string>,
  ) {}

  @Get()
  getHello(): { message: string } {
    return { message: 'Hello World' };
  }

  @Post('items')
  createItem(@Body() createItemDto: CreateItemDto) {
    const end = this.httpRequestDurationHistogram.startTimer();
    const result = this.appService.createItem(createItemDto);
    end({ method: 'POST', route: '/items', code: '200' });
    return result;
  }

  @Get('items/:id')
  getItem(@Param('id') id: string) {
    const end = this.httpRequestDurationHistogram.startTimer();
    try {
      const result = this.appService.getItem(+id);
      end({ method: 'GET', route: '/items/:id', code: '200' });
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        end({ method: 'GET', route: '/items/:id', code: '404' });
      }
      throw error;
    }
  }

  @Put('items/:id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    const end = this.httpRequestDurationHistogram.startTimer();
    try {
      const result = this.appService.updateItem(+id, updateItemDto);
      end({ method: 'PUT', route: '/items/:id', code: '200' });
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        end({ method: 'PUT', route: '/items/:id', code: '404' });
      }
      throw error;
    }
  }

  @Delete('items/:id')
  deleteItem(@Param('id') id: string) {
    const end = this.httpRequestDurationHistogram.startTimer();
    try {
      const result = this.appService.deleteItem(+id);
      end({ method: 'DELETE', route: '/items/:id', code: '200' });
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        end({ method: 'DELETE', route: '/items/:id', code: '404' });
      }
      throw error;
    }
  }
}