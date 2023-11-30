import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import * as path from 'path';

import { Notifications } from 'src/Entity/Notification';
import { NotificationToken } from 'src/Entity/notification-token';

firebase.initializeApp({
    credential: firebase.credential.cert(
        path.join(__dirname, '..', '..', 'firebase-adminsdk.json'),
    ),
});

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notifications) private readonly notificationsRepo: Repository<Notifications>,
        @InjectRepository(NotificationToken) private readonly notificationTokenRepo: Repository<NotificationToken>,
    ) { }

    sendPush = async (user: any, title: string, body: string): Promise<void> => {
        try {
            const notification = await this.notificationTokenRepo.findOne({
                where: { user: { id: user.id }, status: 'ACTIVE' },
            });
            if (notification) {
                await this.notificationsRepo.save({
                    notification_token: notification,
                    title,
                    body,
                    status: 'ACTIVE',
                    created_by: user.username,
                });
                await firebase
                    .messaging()
                    .send({
                        notification: { title, body },
                        token: notification.notification_token,
                        android: { priority: 'high' },
                    })
                    .catch((error: any) => {
                        console.error(error);
                    });
            }
        } catch (error) {
            return error;
        }
    };
}