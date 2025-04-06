import {Injectable, NotFoundException} from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from '../printer/printer.service';
import { Patient } from '../patients/entities/patient.entity';
import { billReport } from './documents/bill.report';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumptionSheetsService } from 'src/consumption/consumption-sheets/consumption-sheets.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly printer: PrinterService,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly consumptionSheetService: ConsumptionSheetsService,
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
    const consumptionSheet = await this.consumptionSheetService.findOneIncludingDeleted(consumptionSheetId)

    // Check if the consumption sheet was found.
    if (!consumptionSheet) {
      throw new NotFoundException(
        `Consumption sheet with ID ${consumptionSheetId} not found`,
      );
    }

    const patient = consumptionSheet.patient;

    // Refactor patient information
    const patientData = {
      admissionDate: this.formatDate(consumptionSheet.admission_date),
      medicoName: consumptionSheet.doctor,
      roomNumber: consumptionSheet.room.name,
      patientName: `${patient.first_surname} ${patient.second_surname} ${patient.name}`,
      diagnosis: consumptionSheet.diagnosis,
      admissionTime: this.formatTime(consumptionSheet.admission_date),
    };

    // Refactor consumption data
    const consumptions = consumptionSheet.consumptions.map((consumption) => ({
      quantity: consumption.quantity,
      description: consumption.product.name,
      code: consumption.product.category.code,
      totalAmount: consumption.total,
    }));

    // Group consumption by description and code
    const groupedConsumptions = consumptions.reduce((acc, curr) => {
      const key = `${curr.description}-${curr.code}`;
      if (!acc[key]) {
        acc[key] = { ...curr };
      } else {
        acc[key].quantity += curr.quantity;
        acc[key].totalAmount += curr.totalAmount;
      }
      return acc;
    }, {});

    const consumptionsRefactor = Object.values(groupedConsumptions);

    // Final result to send
    const reportData = {
      patientInfo: patientData,
      consumptionsInfo: consumptionsRefactor,
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
