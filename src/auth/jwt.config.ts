import { ConfigModule, ConfigService } from '@nestjs/config';
const jwtConfig = {
    imports:[
        ConfigModule
    ],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService)=>({
        secret: configService.get<string>('SECRET'),
        signOptions: { expiresIn: '3000s' }
    })
    
}
export default jwtConfig