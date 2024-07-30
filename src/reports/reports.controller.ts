import { Controller, Get, Param, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  // gets patients
  @Get('test')
  async getPatientData() {
    return await this.reportsService.getData();
  }
  // get the pdf with the patient consumption sheet
  @Get('bill/:sheetId')
  async getBillReport(
    @Param('sheetId') sheetId: string,
    @Res() response: Response,
  ) {
    const sheetIdNum = parseInt(
      sheetId,
      10,
    ); //Convert path parameter to number
    const pdfDoc = await this.reportsService.getBillReport(sheetIdNum);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Factura';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
  //get the patient's consumption report
  @Get('consumptionSheet/:sheetId')
  async getPatientReport(@Param('sheetId') sheetId: string) {
    const sheetIdNum = parseInt(sheetId, 10); // Convert path parameter to number
    return this.reportsService.getPatientReport(sheetIdNum);
  }
}
