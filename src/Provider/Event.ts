import { DataSource } from 'typeorm';

import { Event } from 'src/Entity/Event';

export const EventProvider = [
    {
        provide: 'EVENT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Event),
        inject: ['DATA_SOURCE'],
    },
];