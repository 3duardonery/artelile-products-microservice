import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
  Min,
} from 'class-validator';

export class ProductDto {
  @IsNotEmpty({ message: 'Name cannot be empty or null' })
  name: string;

  @MaxLength(200, {
    message: 'Description need to have a length less than 200',
  })
  description: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'Price should be numeric' },
  )
  @IsPositive({ message: 'Price cannot be negative' })
  @Min(0.1, { message: 'Price have to be more than 0.1' })
  price: number;
}
