import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { Formatter } from '../../helpers/formatter';

const logoVirgen: Content = {
  image: 'src/assets/virgen3.png',
  width: 40,
};

const styles: StyleDictionary = {
  h1: {
    fontSize: 28,
    color: '#1b64de',
    italics: true,
    margin: [0, 5],
  },
  h2: {
    fontSize: 10,
    color: 'black',
    bold: true,
    margin: [0, 5],
  },
  h3: {
    fontSize: 10,
    color: 'white',
    bold: true,
    margin: [0, 5],
    background: '#1b64de',
  },
};

export const billReport = (patientData): TDocumentDefinitions => {
  const total = patientData.insumos.reduce(
    (acc, patient) => acc + patient.importetotal,
    0,
  );
  return {
    content: [
      {
        // Header content
        columns: [
          logoVirgen,
          {
            text: [
              {
                text: 'Clínica Hospital Guadalupe \n',
                style: 'h1',
              },
              {
                text: 'CON SERVICIOS DE HOSPITALIZACIÓN, CIRUGÍA GENERAL \n',
                style: 'h2',
              },
              {
                text: 'GINECOLOGÍA, TRAUMATOLOGÍA Y URGENCIAS. \n',
                style: 'h2',
              },
              {
                text: 'HOJA DE CONSUMO ÚNICA PARA INGRESO DEL PACIENTE',
                style: 'h3',
              },
            ],
            alignment: 'center',
          },
          {
            image: 'src/assets/virgen3.png',
            width: 40,
            alignment: 'right',
          },
        ],
        // Header content
      },

      {
        // Medication table content
        margin: [0, 20],
        // layout: 'lightHorizontalLines',
        table: {
          widths: [150, '*', 'auto', 'auto', 'auto'],
          body: [
            [
              { text: 'HORA DE INGRESO: ' + patientData.patientInfo.horaingreso , fontSize: 10, border: [true, true, false, true] },
              { text: 'POR EL MÉDICO: '+ patientData.patientInfo.nombremedico, fontSize: 10, border: [false, true, true, true] },
              { text: 'FECHA', alignment: 'center', fontSize: 10, colSpan: 3 },
              {},
              {},
            ],
            [
              {
                text: 'CUARTO No: ' + patientData.patientInfo.numerocuarto,
                fontSize: 10,
                border: [true, true, false, true],
              },
              {
                text: 'NOMBRE DEL PACIENTE: ' + patientData.patientInfo.nombrepaciente,
                fontSize: 10,
                border: [false, true, true, true],
              },
              { text: 'DIA', fontSize: 10 },
              { text: 'MES', fontSize: 10 },
              { text: 'AÑO', fontSize: 10 },
            ],
            [
              { text: 'DIAGNOSTICO: ' + patientData.patientInfo.diagnostico, fontSize: 10, colSpan: 2 },
              { text: '' },
              { text: patientData.patientInfo.fechaingreso, border: [true, false, true, true], colSpan: 3 },
              { text: '', border: [true, false, true, true] },
              { text: '', border: [true, false, true, true] },
            ],
          ],
        },
      },

      {
        // Medication table content
        margin: [0, 0],
        // layout: 'lightHorizontalLines',
        table: {
          widths: [80, '*', 'auto', 'auto'],
          headerRows: 1, // With this line, each page will show the table headers
          body: [
            [
              { text: 'CANTIDAD', alignment: 'center' },
              { text: 'DESCRIPCION', alignment: 'center' },
              { text: 'CODIGO', alignment: 'center' },
              { text: 'IMPORTE', alignment: 'center' },
            ],
            ...patientData.insumos.map((patientData) => [
              { text: patientData.cantidad, alignment: 'center' },
              patientData.descripcion,
              { text: patientData.codigo, alignment: 'right' },
              { text: Formatter.currency(patientData.importetotal), bold: true, alignment: 'right' },
            ]),

            [
              {},
              {},
              {
                text: 'Total',
                alignment: 'right',
                fillColor: '#1b64de',
                color: 'white',
                bold: true,
                margin: [5, 5],
                fontSize: 14,
              },
              {
                text: Formatter.currency(total),
                bold: true,
                alignment: 'right',
                fillColor: '#1b64de',
                color: 'white',
                margin: [5, 5],
                fontSize: 14,
              },
            ],
          ],
        },
        // Medication table content
      },
    ],
    styles: styles,
  };
};
