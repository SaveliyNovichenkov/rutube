import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get('HOST'),
  port: configService.get('PORT'),
  database: configService.get('DATABASE'),
  username: configService.get('USER'),
  password: configService.get('PASSWORD'),
  autoLoadEntities: true,
  synchronize: true,

  /*  port: configService.get("PORT"),
  database: configService.get("DATABASE"),
  username: configService.get("USERNAME"),
  password: configService.get("PASSWORD"),
  autoLoadEntities: true,
  synchronize: true */
});
