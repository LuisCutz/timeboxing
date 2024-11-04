import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginResponse } from './interfaces/login-response.interface';

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}

    async findAll() {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                nombre: true,
                email: true
            }
        });
    }

    async create(createUserDto: CreateUserDto) {
        try {
            // Verificar si un email ya existe en la DB
            const existingUser = await this.prisma.user.findUnique({
                where: { email: createUserDto.email }
            });

            if (existingUser) {
                throw new ConflictException('El email ya está registrado');
            }

            // Encriptar la password
            const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

            // Crear el usuario
            const user = await this.prisma.user.create({
                data: {
                    ...createUserDto,
                    password: hashedPassword,
                },
                select: {
                    id: true,
                    nombre: true,
                    email: true,
                }
            });

            // Generar JWT
            const token = this.jwtService.sign({ id: user.id });

            return {
                user,
                token,
            };
        } catch(error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new Error ('Error al crear el usuario.');
        }
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginResponse> {
        const { email, password } = loginUserDto;

        // Buscar usuario
        const user = await this.prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new UnauthorizedException('Credenciales invalidas.');
        }

         // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Credenciales inválidas.');
        }

        // Generar JWT
        const token = this.jwtService.sign({ id: user.id });

        return {
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
            },
            token,
        };
    }
}
