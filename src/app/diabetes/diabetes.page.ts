import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-diabetes',
  templateUrl: './diabetes.page.html',
  styleUrls: ['./diabetes.page.scss'],
})
export class DiabetesPage implements OnInit {
  pacienteSeleccionado: any;
  medicoId: number;
  genero: string;
  hipertencion: number;
  cardiopatia: number;
  fumador: number;
  MCI: number;
  nivelesHemoglobina: number;
  nivelGlucosa: number;
  resultado: string;
  error: string;
  exito: string;
  searchTerm: string = '';
  pacientes: any[] = [];
  idPacienteSeleccionado: number;
  fecha: string;

  constructor(private apiService: ApiService, private storage: Storage) {
    this.storage.create();
  }

  ngOnInit() {
    this.storage.get('username').then((data) => {
      if (data && data.medico) {
        this.medicoId = data.medico.id;
      }
    });
  }

  predecirDiabetes(datos: any): string {
    if (
      datos.hipertencion >= 6 ||
      datos.cardiopatia >= 7 ||
      datos.fumador >= 5 ||
      datos.MCI >= 7 ||
      datos.nivelesHemoglobina >= 6 ||
      datos.nivelGlucosa >= 8
    ) {
      return 'Tiene diabetes';
    } else {
      return 'No tiene diabetes';
    }
  }

  enviarFormulario() {
    if (this.pacienteSeleccionado) {
      console.log('Código de paciente:', this.pacienteSeleccionado);

      this.resultado = this.predecirDiabetes({
        hipertencion: this.hipertencion,
        cardiopatia: this.cardiopatia,
        fumador: this.fumador,
        MCI: this.MCI,
        nivelesHemoglobina: this.nivelesHemoglobina,
        nivelGlucosa: this.nivelGlucosa
      });

      const fecha = new Date().toISOString();
      const formulario = {
        paciente: this.pacienteSeleccionado,
        medico: this.medicoId,
        genero: this.genero,
        hipertencion: this.hipertencion,
        cardiopatia: this.cardiopatia,
        fumador: this.fumador,
        MCI: this.MCI,
        nivelesHemoglobina: this.nivelesHemoglobina,
        nivelGlucosa: this.nivelGlucosa,
        resultado: this.resultado,
        fecha: this.fecha
      };
      console.log('Datos del formulario:', formulario);
      console.log("hola:", this.pacienteSeleccionado.id)
      if (!this.pacienteSeleccionado || !this.genero || !this.hipertencion || !this.cardiopatia || !this.fumador || !this.MCI
        || !this.nivelesHemoglobina || !this.nivelGlucosa) {
        this.error = 'Por favor, complete todos los campos.';
        setTimeout(() => {
          this.error = null;
        }, 3000);
        return; // Detener el envío del formulario si falta algún campo
      }
      this.apiService.enviarFormulario(
        this.pacienteSeleccionado.id,
        this.medicoId,
        this.genero,
        this.hipertencion,
        this.cardiopatia,
        this.fumador,
        this.MCI,
        this.nivelesHemoglobina,
        this.nivelGlucosa,
        this.resultado,
        fecha
      ).subscribe(
        (response: any) => {
          console.log('Éxito', response);

          this.pacienteSeleccionado = null;
          this.genero = ''; 
          this.hipertencion=null;
          this.cardiopatia=null;
          this.fumador=null;        
          this.MCI=null;
          this.nivelesHemoglobina=null;
          this.nivelGlucosa = null;

      this.exito = 'Predicción exitosa';
          setTimeout(() => {
            this.exito = null;
          }, 3000);
        },
        (error: any) => {
          console.error('Error al enviar el formulario de diabetes:', error);
          this.pacienteSeleccionado = null;
          this.genero = ''; 
          this.hipertencion=null;
          this.cardiopatia=null;
          this.fumador=null;        
          this.MCI=null;
          this.nivelesHemoglobina=null;
          this.nivelGlucosa = null;
          this.error = 'El paciente ya ha sido registrado';
          setTimeout(() => {
            this.error = null;
          }, 3000);
        }
      );
    } else {
      console.error('No se ha seleccionado ningún paciente');
    }
  }

  buscarPacientes() {
    if (this.searchTerm && this.searchTerm.trim() !== '') {
      this.apiService.buscarPacientes(this.searchTerm).subscribe(
        (response: any) => {
          this.pacientes = response;
        },
        (error: any) => {
          console.error('Error al buscar pacientes:', error);
        }
      );
    } else {
      this.pacientes = [];
    }
  }

  seleccionarPaciente(paciente: any) {
    this.pacienteSeleccionado = paciente;
    this.searchTerm = paciente.nombre+ ' ' + paciente.apellido;
  }
}

// export class DiabetesPage implements OnInit {

//   genero: number;
//   edad: number;
//   hipertencion: number;
//   cardiopatia: number;
//   fumador: number;
//   MCI: number;
//   nivelesHemoglobina: number;
//   nivelGlucosa: number;
//   resultado: string;
//   idPrediccionDiabetes:any;
  
//   searchTerm: string = '';
//   pacientes: any[] = [];
//   pacienteSeleccionado: any;
//   idPacienteSeleccionado: number;
//   codigoPaciente: number;
//   codigoDiabetes: number;


//   constructor(private apiService: ApiService) {}

//   ngOnInit() {}

//   predecirDiabetes(datos: any): string {
//     if (
//       datos.hipertencion>=6 ||
//       datos.cardiopatia>=7 ||
//       datos.fumador>= 5 ||
//       datos.MCI >= 7 ||
//       datos.nivelesHemoglobina >= 6 ||
//       datos.nivelGlucosa >= 8
//     ) {
//       return 'Tiene diabetes';
//     } else {
//       return 'No tiene diabetes';
//     }
//   }

 
//     enviarFormulario() {
//       if (this.pacienteSeleccionado) {
//         const codigoPaciente = this.pacienteSeleccionado.id;
//         console.log('Código de paciente:', codigoPaciente);
  
//         this.resultado = this.predecirDiabetes({
//           hipertencion: this.hipertencion,
//           cardiopatia: this.cardiopatia,
//           fumador: this.fumador,
//           MCI: this.MCI,
//           nivelesHemoglobina: this.nivelesHemoglobina,
//           nivelGlucosa: this.nivelGlucosa,
//         });
  
//         this.apiService
//           .enviarFormulario(
//             this.idPacienteSeleccionado,
//             this.genero, 
//             this.edad, 
//             this.hipertencion, 
//             this.cardiopatia, 
//             this.fumador, 
//             this.MCI, 
//             this.nivelesHemoglobina, 
//             this.nivelGlucosa, 
//             this.resultado
//             )
//           .subscribe(
//             (response) => {
//               this.idPrediccionDiabetes = response.id;
//               console.log('Éxito', response);
//               console.log('ID de la predicción de anemia', this.idPrediccionDiabetes);
  
//               const codigoDiabetes = this.idPrediccionDiabetes;
//               console.log('Código de anemia:', codigoDiabetes);
  
//               const formulario = {
//                   codigoPaciente: codigoPaciente,
//                   codigoDiabetes: codigoDiabetes,
//                   genero: this.genero,
//                   edad: this.edad,
//                   hipertencion: this.hipertencion,
//                   cardiopatia: this.cardiopatia,
//                   fumador: this.fumador,
//                   MCI: this.MCI,
//                   nivelesHemoglobina: this.nivelesHemoglobina,
//                   nivelGlucosa: this.nivelGlucosa,
//                   resultado: this.resultado,
//               };
    
//               this.apiService
//                 .relacionarPacienteConDiabetes(codigoPaciente, codigoDiabetes)
//                 .subscribe(
//                   (relacionResponse) => {
//                     console.log(
//                       'Relación exitosa entre paciente y formulario de diabetes',
//                       relacionResponse
//                     );
  
//                   },
//                   (relacionError) => {
//                     console.log(codigoDiabetes);
//                     console.log(codigoPaciente);
//                     console.error(
//                       'Error al realizar la relación entre paciente y formulario de diabetes',
//                       relacionError
//                     );
//                   }
//                 );
//             },
//             (error) => {
//               console.error(error);
//             }
//           );
//       } else {
//         console.error('No se ha seleccionado ningún paciente');
//       }
//     }  
// }
