import ChgHashService from "./Interfaces/chg-hash-service.Interface";
import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
@Injectable()
 class BcryptHashService implements ChgHashService{
    async compare(plainText: any, hashedText: any): Promise<Boolean> {
        return bcrypt.compare(plainText, hashedText)
    }

    async hash(plainText: any): Promise<string> {
        return bcrypt.hash(plainText,8)
    }
}
export default BcryptHashService