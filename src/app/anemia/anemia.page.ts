import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-anemia',
  templateUrl: './anemia.page.html',
  styleUrls: ['./anemia.page.scss'],
})
export class AnemiaPage implements OnInit {
  pacienteSeleccionado:any;
  medicoId: number;
  genero: string;
  Hemogobina: number;
  MCH: number;
  MCHC: number;
  MCV: number;
  Resultado: string;
  fecha: string;
  error: string;
  exito: string;
  searchTerm: string = '';
  pacientes: any[] = [];

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

  predecirAnemia(datos: any): string {
    if (datos.Hemogobina <= 4 || datos.MCH <= 2 || datos.MCHC <= 3 || datos.MCV <= 4) {
      return 'Tiene anemia';
    } else {
      return 'No tiene anemia';
    }
  }

  enviarFormulario2() {
    if (this.pacienteSeleccionado) {
      console.log('Código de paciente:', this.pacienteSeleccionado);

      this.Resultado = this.predecirAnemia({
        Hemogobina: this.Hemogobina,
        MCH: this.MCH,
        MCHC: this.MCHC,
        MCV: this.MCV
      });

      const fecha = new Date().toISOString();
      const formulario = {
        paciente: this.pacienteSeleccionado,
        medico: this.medicoId,
        genero:this.genero,
        Hemogobina: this.Hemogobina,
        MCH: this.MCH,
        MCHC: this.MCHC,
        MCV: this.MCV,
        Resultado: this.Resultado,
        fecha: fecha
      };
      console.log('Datos del formulario:', formulario);
      if (!this.pacienteSeleccionado || !this.genero || !this.Hemogobina || !this.MCH || !this.MCHC || !this.MCV) {
        this.error = 'Por favor, complete todos los campos.';
        setTimeout(() => {
          this.error = null;
        }, 3000);
        return; // Detener el envío del formulario si falta algún campo
        
      }
      this.apiService.enviarFormulario2(
        this.pacienteSeleccionado.id,
        this.medicoId,
        this.genero,
        this.Hemogobina,
        this.MCH,
        this.MCHC,
        this.MCV,
        this.Resultado,
        fecha
      ).subscribe((response: any) => {
          console.log('Éxito', response);
          this.pacienteSeleccionado = null;
          this.genero = ''; 
          this.Hemogobina = null;
          this.MCH = null;
          this.MCHC = null;
          this.MCV = null;
          this.exito = 'Predicción exitosa';

      setTimeout(() => {
        this.exito = null;
      }, 3000); 
        },
        (error: any) => {
          console.error('Error al enviar el formulario de anemia:', error);
          this.pacienteSeleccionado = null;
          this.genero = ''; // Agrega esta propiedad si no la tienes definida en la clase
          this.Hemogobina = null;
          this.MCH = null;
          this.MCHC = null;
          this.MCV = null;
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
    if (this.searchTerm && this.searchTerm.trim() !== ''){
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


// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../servicios/api.service';
// import { Storage } from '@ionic/storage';

// @Component({
//   selector: 'app-anemia',
//   templateUrl: './anemia.page.html',
//   styleUrls: ['./anemia.page.scss'],
// })
// export class AnemiaPage implements OnInit {
//   paciente: any;
//   medico: number;
//   Hemogobina: number;
//   MCH: number;
//   MCHC: number;
//   MCV: number;
//   Resultado: string;
//   fecha:any;
//   idPrediccionAnemia: any;

//   searchTerm: string = '';
//   pacientes: any[] = [];
//   pacienteSeleccionado: any;
//   idPacienteSeleccionado: number;

//   constructor(private apiService: ApiService, private storage: Storage) {}

//   ngOnInit() {
//     this.storage.get('username').then((data) => {
//       if (data && data.medico) {
//         this.medico = data.medico.id; // Asigna el ID del médico a la variable 'medico'
//       }
//     });
//   }

//   predecirAnemia(datos: any): string {
//     if (datos.Hemogobina <= 4 || datos.MCH <= 2 || datos.MCHC <= 3 || datos.MCV <= 4) {
//       return 'Tiene anemia';
//     } else {
//       return 'No tiene anemia';
//     }
//   }

//   enviarFormulario2() {
//     if (this.pacienteSeleccionado) {
//       this.paciente = this.pacienteSeleccionado.id;
//       console.log('Código de paciente:', this.paciente);

//       this.Resultado = this.predecirAnemia({
//         Hemogobina: this.Hemogobina,
//         MCH: this.MCH,
//         MCHC: this.MCHC,
//         MCV: this.MCV
//       });

//       const fechaActual = formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSSZ', 'en-US'); // Formatea la fecha actual
//     const formulario = {
//       paciente: this.paciente.id,
//       medico: this.medico,
//       Hemogobina: this.Hemogobina,
//       MCH: this.MCH,
//       MCHC: this.MCHC,
//       MCV: this.MCV,
//       Resultado: this.Resultado,
//       fecha: fechaActual
//     };
//       this.apiService.enviarFormulario2(
//         this.paciente,
//         this.medico,
//         this.Hemogobina,
//         this.MCH,
//         this.MCHC,
//         this.MCV,
//         this.Resultado,
//         this.fecha)
//         .subscribe(
//         (response: any) => {
//           this.idPrediccionAnemia = response.id;
//           console.log('Éxito', response);
//           console.log('ID de la predicción de anemia', this.idPrediccionAnemia);
//         },
//         (error: any) => {
//           console.error('Error al enviar el formulario de anemia:', error);
//         }
//       );
//     } else {
//       console.error('No se ha seleccionado ningún paciente');
//     }
//   }

//   buscarPacientes() {
//     if (this.searchTerm.trim() !== '') {
//       this.apiService.buscarPacientes(this.searchTerm).subscribe(
//         (response: any) => {
//           this.pacientes = response;
//         },
//         (error: any) => {
//           console.error('Error al buscar pacientes:', error);
//         }
//       );
//     } else {
//       this.pacientes = [];
//     }
//   }

//   seleccionarPaciente(paciente: any) {
//     this.pacienteSeleccionado = paciente;
//     this.idPacienteSeleccionado = paciente.id;
//     this.searchTerm = paciente.nombre;
//   }
// }
















// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../servicios/api.service';
// import { Storage } from '@ionic/storage';
// @Component({
//   selector: 'app-anemia',
//   templateUrl: './anemia.page.html',
//   styleUrls: ['./anemia.page.scss'],
// })
// export class AnemiaPage implements OnInit {
//   paciente: any;
//   medico: number;
//   Hemogobina: number;
//   MCH: number;
//   MCHC: number;
//   MCV: number;
//   Resultado: string;
//   idPrediccionAnemia: any;

//   searchTerm: string = '';
//   pacientes: any[] = [];
//   pacienteSeleccionado: any;
//   idPacienteSeleccionado: number;
//   // codigoPaciente: number;
//   codigoAnemia: number;

//   constructor(private apiService: ApiService, private storage: Storage) {}

//   ngOnInit() {
//     this.storage.get('username').then((data) => {
//       if (data && data.medico) {
//         this.medico = data.medico.id; // Asigna el ID del médico a la variable 'medico'
//       }
//     });
//   }

//   predecirAnemia(datos: any): string {
//     if (datos.Hemogobina <= 4 || datos.MCH <= 2 || datos.MCHC <= 3 || datos.MCV <= 4) {
//       return 'Tiene anemia';
//     } else {
//       return 'No tiene anemia';
//     }
//   }

//   enviarFormulario2() {
//     if (this.pacienteSeleccionado) {
//       this.paciente = this.pacienteSeleccionado;
//       console.log('Código de paciente:',this.paciente);

//       this.Resultado = this.predecirAnemia({
//         Hemogobina: this.Hemogobina,
//         MCH: this.MCH,
//         MCHC: this.MCHC,
//         MCV: this.MCV
//       });
//       this.apiService
//         .enviarFormulario2(
//           this.paciente,
//           this.medico,
//           this.Hemogobina,
//           this.MCH,
//           this.MCHC,
//           this.MCV,
//           this.Resultado
//         )
//         .subscribe(
//           (response) => {
//             this.idPrediccionAnemia = response.id;
//             console.log('Éxito', response);
//             console.log('ID de la predicción de anemia', this.idPrediccionAnemia);

//             const codigoAnemia = this.idPrediccionAnemia;
//             console.log('Código de anemia:', codigoAnemia);

//             const formulario = {
//               paciente: this.paciente,
//               codigoAnemia: codigoAnemia,
//               Hemogobina: this.Hemogobina,
//               MCH: this.MCH,
//               MCHC: this.MCHC,
//               MCV: this.MCV,
//               Resultado:this.Resultado
              
//             };
  
//             // Realizar la relación entre paciente y formulario de anemia
//             this.apiService
//               .relacionarPacienteConAnemia(this.paciente, codigoAnemia)
//               .subscribe(
//                 (relacionResponse) => {
//                   console.log(
//                     'Relación exitosa entre paciente y formulario de anemia',
//                     relacionResponse
//                   );

//                 },
//                 (relacionError) => {
//                   console.log(codigoAnemia);
//                   console.log(this.paciente);
//                   console.error(
//                     'Error al realizar la relación entre paciente y formulario de anemia',
//                     relacionError
//                   );
//                 }
//               );
//           },
//           (error) => {
//             console.error(error);
//           }
//         );
//     } else {
//       console.error('No se ha seleccionado ningún paciente');
//     }
//   }

//   buscarPacientes() {
//     if (this.searchTerm.trim() !== '') {
//       this.apiService.buscarPacientes(this.searchTerm).subscribe(
//         (response: any) => {
//           this.pacientes = response;
//         },
//         (error) => {
//           console.error('Error al buscar Paciente:', error);
//         }
//       );
//     } else {
//       this.pacientes = [];
//     }
//   }

//   seleccionarPaciente(paciente: any) {
//     this.pacienteSeleccionado = paciente;
//     this.idPacienteSeleccionado = paciente.id;
//     this.searchTerm = paciente.nombre;
//   }
// }














// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../servicios/api.service';

// @Component({
//   selector: 'app-anemia',
//   templateUrl: './anemia.page.html',
//   styleUrls: ['./anemia.page.scss'],
// })
// export class AnemiaPage implements OnInit {
//   nombreUsuario: string;
//   genero: number;
//   Hemogobina: number;
//   MCH: number;
//   MCHC: number;
//   MCV: number;
//   edad: number;
//   Resultado: string;
//   idPrediccionAnemia: any;

//   searchTerm: string = '';
//   pacientes: any[] = [];
//   pacienteSeleccionado: any;
//   idPacienteSeleccionado: number;
//   codigoPaciente: number;
//   codigoAnemia: number;

//   constructor(private apiService: ApiService) {}

//   ngOnInit() {}

//   predecirAnemia(datos: any): string {
//     if (datos.Hemogobina <= 4) {
//       return 'Tiene anemia';
//     } else if (datos.MCH <= 2) {
//       return 'Tiene anemia';
//     } else if (datos.MCHC <= 3) {
//       return 'Tiene anemia';
//     } else if (datos.MCV <= 4) {
//       return 'Tiene anemia';
//     } else {
//       return 'No tiene anemia';
//     }
//   }

//   enviarFormulario2() {
//     if (this.pacienteSeleccionado) {
//       const codigoPaciente = this.pacienteSeleccionado.id;
//       console.log('Código de paciente:', codigoPaciente);

//       // Verificar si this.Resultado está definido y tiene un valor
//       if (!this.Resultado) {
//         // Asignar un valor predeterminado si no está definido
//         this.Resultado = 'No se ha proporcionado un resultado';
//       }

//       this.apiService
//         .enviarFormulario2(
//           this.nombreUsuario,
//           this.genero,
//           this.Hemogobina,
//           this.MCH,
//           this.MCHC,
//           this.MCV,
//           this.edad,
//           this.Resultado
//         )
//         .subscribe(
//           (response) => {
//             this.idPrediccionAnemia = response.id;
//             console.log('Éxito', response);
//             console.log('ID de la predicción de anemia', this.idPrediccionAnemia);

//             const codigoAnemia = this.idPrediccionAnemia;
//             console.log('Código de anemia:', codigoAnemia);

//             const formulario = {
//               codigoPaciente: codigoPaciente,
//               codigoAnemia: codigoAnemia,
//               nombreUsuario: this.nombreUsuario,
//               genero: this.genero,
//               Hemogobina: this.Hemogobina,
//               MCH: this.MCH,
//               MCHC: this.MCHC,
//               MCV: this.MCV,
//               edad: this.edad,
//               Resultado: this.Resultado,
//             };

//             this.Resultado = this.predecirAnemia(formulario);

//             // Realizar la relación entre paciente y formulario de anemia
//             this.apiService
//               .relacionarPacienteConAnemia(codigoPaciente, codigoAnemia)
//               .subscribe(
//                 (relacionResponse) => {
//                   console.log(
//                     'Relación exitosa entre paciente y formulario de anemia',
//                     relacionResponse
//                   );

//                 },
//                 (relacionError) => {
//                   console.log(codigoAnemia);
//                   console.log(codigoPaciente);
//                   console.error(
//                     'Error al realizar la relación entre paciente y formulario de anemia',
//                     relacionError
//                   );
//                 }
//               );
//           },
//           (error) => {
//             console.error(error);
//           }
//         );
//     } else {
//       console.error('No se ha seleccionado ningún paciente');
//     }
//   }

//   buscarPacientes() {
//     if (this.searchTerm.trim() !== '') {
//       this.apiService.buscarPacientes(this.searchTerm).subscribe(
//         (response: any) => {
//           this.pacientes = response;
//         },
//         (error) => {
//           console.error('Error al buscar Paciente:', error);
//         }
//       );
//     } else {
//       this.pacientes = [];
//     }
//   }

//   seleccionarPaciente(paciente: any) {
//     this.pacienteSeleccionado = paciente;
//     this.idPacienteSeleccionado = paciente.id;
//     this.searchTerm = paciente.nombre;
//   }

// }
