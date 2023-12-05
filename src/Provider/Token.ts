import { Token } from 'src/Entity/Token';
import { DataSource } from 'typeorm';



export const TokenProvider = [
    {
        provide: 'TOKEN_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Token),
        inject: ['DATA_SOURCE'],
    },
];