import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from 'src/Entity/Notification';
import { NotificationToken } from 'src/Entity/notification-token';
import { NotificationService } from 'src/Service/Notification.Service';


@Module({
    imports: [
        TypeOrmModule.forFeature([Notifications, NotificationToken])
    ],
    controllers: [],
    providers: [NotificationService],
    exports: [NotificationService]
})

export class NotificationModule { }