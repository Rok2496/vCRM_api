import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { MediaProvider } from 'src/common/constant';

export class ProviderDTO implements Readonly<ProviderDTO> {
  @ApiProperty({ enum: MediaProvider })
  @IsEnum(MediaProvider)
  @IsOptional()
  provider?: MediaProvider;
}
