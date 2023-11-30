import { DataSource } from 'typeorm';

import { Event } from 'src/Entity/Event';

export const EventProvider = [
    {
        provide: 'Event_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Event),
        inject: ['DATA_SOURCE'],
    },
];