import { Injectable } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from '../printer/printer.service';
import { Patient } from '../patients/entities/patient.entity';
import { billReport } from './documents/bill.report';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumptionSheet } from '../consumption-sheets/entities/consumption-sheet.entity';

@Injectable()
export class ReportsService {
  constructor(
    private readonly printer: PrinterService,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(ConsumptionSheet)
    private consumptionSheetRepository: Repository<ConsumptionSheet>,
  ) {}

  async getData(): Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  async getBillReport(consumptionSheetId: number): Promise<PDFKit.PDFDocument> {
    const patientData = await this.getPatientReport(consumptionSheetId);
    const docDefinition: TDocumentDefinitions = billReport(patientData);
    return this.printer.createPdf(docDefinition);
  }

  async getPatientReport(consumptionSheetId: number) {
    // get the information from the consumption sheet along with its relationships
    const consumptionSheet = await this.consumptionSheetRepository.findOne({
      where: { id: consumptionSheetId },
      relations: [
        'patient',
        'room',
        'consumptions',
        'consumptions.product',
        'consumptions.product.category',
      ],
    });

    // Check if the consumption sheet was found.
    if (!consumptionSheet) {
      throw new Error(
        `Consumption sheet with ID ${consumptionSheetId} not found`,
      );
    }

    const patient = consumptionSheet.patient;

    // Refactor patient information
    const patientInfo = {
      fechaingreso: this.formatDate(consumptionSheet.admission_date),
      nombremedico: consumptionSheet.doctor,
      numerocuarto: consumptionSheet.room.name,
      nombrepaciente: `${patient.first_surname} ${patient.second_surname} ${patient.name}`,
      diagnostico: consumptionSheet.diagnosis,
      horaingreso: this.formatTime(consumptionSheet.admission_date),
    };

    // Refactor consumption data
    const insumos = consumptionSheet.consumptions.map((consumption) => ({
      cantidad: consumption.quantity,
      descripcion: consumption.product.name,
      codigo: consumption.product.category.code,
      importetotal: consumption.total,
    }));

    // Group consumption by description and code
    const insumosAgrupados = insumos.reduce((acc, curr) => {
      const key = `${curr.descripcion}-${curr.codigo}`;
      if (!acc[key]) {
        acc[key] = { ...curr };
      } else {
        acc[key].cantidad += curr.cantidad;
        acc[key].importetotal += curr.importetotal;
      }
      return acc;
    }, {});

    const insumosRefactor = Object.values(insumosAgrupados);

    // Final result to send
    const reportData = {
      patientInfo,
      insumos: insumosRefactor,
    };
    // console.log('Data final que se enviará:', reportData);
    return reportData;
  }

  private formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}        ${month}    ${year}`;
  }

  private formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    return `${formattedHours}:${minutes} ${ampm}`;
  }
}
