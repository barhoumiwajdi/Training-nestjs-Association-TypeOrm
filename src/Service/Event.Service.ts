import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EventDto } from 'src/Dto/Event-Dto'
import { Event } from 'src/Entity/Event'
import { Repository } from 'typeorm'

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Event)
        private eventsRepository: Repository<Event>
    ) { }

    async create(eventDto: EventDto): Promise<Event> {
        try {
            const newEvent = new Event()

            newEvent.title = eventDto.title
            newEvent.start = eventDto.start
            newEvent.end = eventDto.end
            newEvent.color = eventDto.color
            newEvent.info = eventDto.info

            return this.eventsRepository.save(newEvent)
        } catch (err) {
            throw new InternalServerErrorException(err)
        }
    }

    findAll(): Promise<Event[]> {
        return this.eventsRepository.find()
    }

    findOne(id: number): Promise<Event> {
        return this.eventsRepository.findOne({
            where: { id },
        })
    }

    async updateOne(id: number, data: EventDto): Promise<Event> {
        try {
            await this.eventsRepository.update({ id }, data)
            return this.eventsRepository.findOne({
                where: { id }
            })
        } catch (err) {
            throw new InternalServerErrorException(err)
        }
    }

    async delete(id: number): Promise<void> {
        await this.eventsRepository.delete(id)
    }
}