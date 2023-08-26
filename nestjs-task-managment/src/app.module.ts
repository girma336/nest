import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '/var/run/postgresql',
      port: 5432,
      password: 'postgres',
      username: 'girma',
      database: 'testdb',
      autoLoadEntities: true,
      synchronize:true
    }),
    AuthModule,
  ],
})
export class AppModule {}
