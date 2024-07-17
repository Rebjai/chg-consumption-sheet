import { Injectable } from '@nestjs/common';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { PrinterService } from '../printer/printer.service';
import { Patient } from '../patients/entities/patient.entity';
import { billReport } from './documents/bill.report';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsumptionDetail } from '../consumption-details/entities/consumption-detail.entity';

@Injectable()
export class ReportsService {
  constructor(
    private readonly printer: PrinterService,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(ConsumptionDetail)
    private consumptionDetailRepository: Repository<ConsumptionDetail>,
  ) {}

  async trayendoDatos(): Promise<Patient[]> {
    return await this.patientRepository.find();
  }

  async getBillReport(patientId: number): Promise<PDFKit.PDFDocument> {
    const patientData = await this.getPatientReport(patientId);
    // console.log('Contenido de patientData: ', patientData);
    const docDefinition: TDocumentDefinitions = billReport(patientData);
    return this.printer.createPdf(docDefinition);
  }

  /*async getPatientReport(patientId: number) {
    const queryBuilder = this.consumptionDetailRepository
      .createQueryBuilder('cd')
      .select([
        'SUM(cd.quantity) AS Cantidad',
        'pr.name AS Descripcion',
        'psc.code AS Codigo',
        'SUM(cd.total) AS ImporteTotal',
      ])
      .innerJoin('cd.product', 'pr')
      .innerJoin('cd.consumption_sheet', 'cs')
      .innerJoin('pr.category', 'psc')
      .where('cs.patient_id = :patientId', { patientId })
      .groupBy('pr.name, psc.code');

    const dataString = await await queryBuilder.getRawMany();
    console.log('datos traidos de la BDD: ', dataString);
    const dataRefactor = dataString.map((row) => ({
      cantidad: Number(row.cantidad),
      descripcion: row.descripcion,
      codigo: row.codigo,
      importetotal: Number(row.importetotal),
    }));
    // console.log(dataRefactor);
    return dataRefactor;
  }*/

  /*async getPatientReport(patientId: number) {
    // Consulta para obtener la información del paciente
    const patientInfoQuery = this.consumptionDetailRepository
      .createQueryBuilder('cd')
      .select([
        "to_char(cs.admission_date, 'DD         MM       YYYY') AS FechaIngreso",
        'cs.doctor AS NombreMedico',
        'r.name AS NumeroCuarto',
        "p.first_surname || ' ' || p.second_surname || ' ' || p.name AS NombrePaciente",
        'cs.diagnosis AS Diagnostico',
        "to_char(cs.admission_date, 'HH12:MI AM') AS HoraIngreso",
      ])
      .innerJoin('cd.consumption_sheet', 'cs')
      .innerJoin('cs.patient', 'p')
      .innerJoin('cs.room', 'r')
      .where('cs.patient_id = :patientId', { patientId })
      .groupBy(
        'cs.admission_date, cs.doctor, r.name, p.first_surname, p.second_surname, p.name, cs.diagnosis',
      )
      .getRawOne();

    // Consulta para obtener la lista de insumos
    const insumosQuery = this.consumptionDetailRepository
      .createQueryBuilder('cd')
      .select([
        'SUM(cd.quantity) AS Cantidad',
        'pr.name AS Descripcion',
        'psc.code AS Codigo',
        'SUM(cd.total) AS ImporteTotal',
      ])
      .innerJoin('cd.product', 'pr')
      .innerJoin('cd.consumption_sheet', 'cs')
      .innerJoin('pr.category', 'psc')
      .where('cs.patient_id = :patientId', { patientId })
      .groupBy('pr.name, psc.code')
      .getRawMany();

    // Ejecuta ambas consultas
    const [patientInfo, insumos] = await Promise.all([
      patientInfoQuery,
      insumosQuery,
    ]);
    // Imprimir los datos traídos de la BDD
    /!*console.log('Datos del paciente traídos de la BDD:', patientInfo);
    console.log('Lista de insumos traídos de la BDD:', insumos);*!/

    // Refactoriza los datos de los insumos
    const insumosRefactor = insumos.map((row) => ({
      cantidad: Number(row.cantidad),
      descripcion: row.descripcion,
      codigo: row.codigo,
      importetotal: Number(row.importetotal),
    }));

    // Resultado final que se enviará
    const resultadoFinal = {
      patientInfo,
      insumos: insumosRefactor,
    };

    // Imprimir el resultado final que se enviará
    // console.log('Resultado final que se enviará:', resultadoFinal);

    // Combina los resultados en un solo objeto y lo retorna
    return resultadoFinal;
  }*/

  async getPatientReport(patientId: number) {
    // Obtener la información del paciente junto con sus relaciones
    const patient = await this.patientRepository.findOne({
      where: { id: patientId },
      relations: [
        'consumption_sheet',
        'consumption_sheet.room',
        'consumption_sheet.consumptions',
        'consumption_sheet.consumptions.product',
        'consumption_sheet.consumptions.product.category',
      ],
    });

    // Verificar si se encontró el paciente
    if (!patient) {
      throw new Error(`Paciente con ID ${patientId} no encontrado`);
    }

    const consumptionSheet = patient.consumption_sheet;

    // Refactorizar la información del paciente
    const patientInfo = {
      fechaingreso: this.formatDate(consumptionSheet.admission_date),
      nombremedico: consumptionSheet.doctor,
      numerocuarto: consumptionSheet.room.name,
      nombrepaciente: `${patient.first_surname} ${patient.second_surname} ${patient.name}`,
      diagnostico: consumptionSheet.diagnosis,
      horaingreso: this.formatTime(consumptionSheet.admission_date),
    };

    // Refactorizar los datos de los insumos
    const insumos = consumptionSheet.consumptions.map((consumption) => ({
      cantidad: consumption.quantity,
      descripcion: consumption.product.name,
      codigo: consumption.product.category.code,
      importetotal: consumption.total,
    }));

    // Resultado final que se enviará
    const reportData = {
      patientInfo,
      insumos,
    };

    // Imprimir el resultado final que se enviará
    console.log('Data final que se enviará:', reportData);

    // Combina los resultados en un solo objeto y lo retorna
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
