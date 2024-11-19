import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivityService {

  private data=[{
    "name": "Diseñar base de datos",
    "fecha": "2024-11-28",
    "status": 0,
    "prioridad": true
  },
  {
    "name": "Comenzar frontend",
    "fecha": "2024-11-29",
    "status": 1,
    "prioridad": false
  },
]

  create(createActivityDto: CreateActivityDto) {
    return 'This action adds a new activity';
  }

  findAll() {
    return this.data;
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
