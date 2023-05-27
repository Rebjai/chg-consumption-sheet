import { Injectable } from '@nestjs/common';

@Injectable()
export class AreasService {
    findAll() {
        return [{ id: 1, name: 'QX' }, { id: 2, name: 'RECUPERACIÓN' }, { id: 3, name: 'PISO' }]
    }
}
