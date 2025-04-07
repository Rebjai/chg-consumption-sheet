import { PaginationDto } from "src/common/dto/pagination.dto";

export class GetAllAreasQuery {
  constructor(public readonly pagination: PaginationDto = new PaginationDto()) {}
}
