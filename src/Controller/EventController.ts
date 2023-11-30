import { Controller, Get, Body, Post } from '@nestjs/common';

import { EventsService } from 'src/Service/Event.Service';

@Controller('event')
export class EventController {
    constructor(private service: EventsService) { }


}