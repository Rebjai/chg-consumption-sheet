export default interface ChgHashService{
    compare (plainText, hashedText) : Promise<Boolean>
    hash (plainText) : Promise<string>
}
export {ChgHashService}