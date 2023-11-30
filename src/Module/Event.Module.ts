import { Module } from '@nestjs/common'


import { EventController } from 'src/Controller/EventController'
import { EventsService } from 'src/Service/Event.Service'
import { DatabaseModule } from 'src/database/database.module'

@Module({
    imports: [DatabaseModule],
    controllers: [EventController],
    providers: [EventsService]
})
export class EventsModule { }