import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
/*
  private data=[{
    "name": "Proyecto de TI",
    "fecha": "2024-11-27",
    "status": 0,
    "prioridad": true
  },
  {
    "name": "Solicitar beca",
    "fecha": "2024-11-27",
    "status": 2,
    "prioridad": false
  },
]
*/
  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return this.prisma.task.findMany();
  }

  findOne(id: number) {
    return this.prisma.task.findUnique({
      where: {id}
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
