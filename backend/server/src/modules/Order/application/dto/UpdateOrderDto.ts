import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../domain/entities/OrderStatus';

export default class UpdateOrderDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  @IsUUID()
  orderId!: string;

  @IsEnum(OrderStatus)
  @ApiProperty({
    enum: OrderStatus,
  })
  status!: OrderStatus;
}
