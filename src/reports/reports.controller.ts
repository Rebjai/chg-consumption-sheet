import { Controller, Get, Param, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}
  // Trae a los pacientes
  @Get('prueba')
  async obtenerDatos() {
    return await this.reportsService.trayendoDatos();
  }
  // Trae el pdf con la hoja de registro del paciente
  @Get('bill/:patientId')
  async getBillReport(
    @Param('patientId') patientId: string,
    @Res() response: Response,
  ) {
    const patientIdNum = parseInt(
      patientId,
      10,
    ); /*Convierte el parámetro de ruta a número*/
    const pdfDoc = await this.reportsService.getBillReport(patientIdNum);

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Factura';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
  //Trae el reporte de consumo del paciente
  @Get('patients/:patientId')
  async getPatientReport(@Param('patientId') patientId: string) {
    const patientIdNum = parseInt(patientId, 10); // Convierte el parámetro de ruta a número si es necesario
    return this.reportsService.getPatientReport(patientIdNum);
  }

  /*@Get('bill')
async getBillReport(@Res() response: Response) {
  const pdfDoc = await this.reportsService.getBillReport();

  response.setHeader('Content-Type', 'application/pdf');
  pdfDoc.info.Title = 'Factura';
  pdfDoc.pipe(response);
  pdfDoc.end();
}*/
}
