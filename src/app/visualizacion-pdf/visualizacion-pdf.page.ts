import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { ActivatedRoute } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-visualizacion-pdf',
  templateUrl: './visualizacion-pdf.page.html',
  styleUrls: ['./visualizacion-pdf.page.scss']
})
export class VisualizacionPdfPage implements OnInit {
  pacienteId: number;
  paciente: any;
  enfermedades: any[];

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const pacienteId = +params.get('id'); // Obtener el id del paciente como número
      console.log("pacienteId:", pacienteId);
      // Llamar a los métodos para obtener los datos del paciente y las enfermedades
      this.getPaciente(pacienteId);
      this.getEnfermedades(pacienteId);
    });
  }

  getPaciente(pacienteId: number) {
    this.apiService.getPaciente(pacienteId).subscribe(
      (paciente: any) => {
        this.paciente = paciente;
        console.log("paciente:", paciente);
        // Aquí puedes asignar los datos del paciente a las propiedades correspondientes en tu clase
        // Por ejemplo: this.nombrePaciente = paciente.nombre;
        // ...
      },
      (error) => {
        console.error('Error al obtener los datos del paciente:', error);
      }
    );
  }

  getEnfermedades(pacienteId: number) {
    this.apiService.getEnfermedades(pacienteId).subscribe(
      (enfermedades: any[]) => {
        this.enfermedades = enfermedades;
        console.log("enfermedades:", enfermedades);
        // Aquí puedes asignar los datos de las enfermedades a las propiedades correspondientes en tu clase
        // Por ejemplo: this.enfermedades = enfermedades;
        // ...
      },
      (error) => {
        console.error('Error al obtener los datos de las enfermedades:', error);
      }
    );
  }
  exportarPdf(enfermedad: any) {
    const documentoPdf = {
      content: [
        // Datos del paciente
        { text: 'Datos del Paciente', style: 'header' },
        { text: `Nombre: ${this.paciente?.nombre}` },
        { text: `Apellido: ${this.paciente?.apellido}` },
        { text: `Correo Electronico: ${this.paciente?.correo_electronico}` },
        { text: `Edad: ${this.paciente?.edad}` },
        { text: `Peso: ${this.paciente?.peso}` },
        { text: `Estatura: ${this.paciente?.altura}` },
        { text: `direccion de casa: ${this.paciente?.direccion}` },
        { text: `Numero de celular: ${this.paciente?.numero_celular}` },
        { text: `Carnet de Identidad: ${this.paciente?.ci}` },
        // Agrega aquí los demás datos del paciente
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 20, 0, 10], // Margen inferior de 20 y superior de 10
        }
      }
    };
  
    // Agregar los datos específicos de la enfermedad seleccionada
    if (enfermedad.enfermedad === 'anemia') {
      documentoPdf.content.push(
        { text: 'Datos de Anemia', style: 'header' },
        { text: `Hemoglobina: ${enfermedad.datos.Hemogobina}` },
        { text: `MCH: ${enfermedad.datos.MCH}` },
        { text: `MCHC: ${enfermedad.datos.MCHC}` },
        { text: `MCV: ${enfermedad.datos.MCV}` },
        { text: `Resultado: ${enfermedad.datos.Resultado}` },
        // Agrega aquí los demás datos de la enfermedad de anemia
      );
      
    } else if (enfermedad.enfermedad === 'diabetes') {
      documentoPdf.content.push(
        { text: 'Datos de Diabetes', style: 'header' },
        { text: `Hipertensión: ${enfermedad.datos.hipertension}` },
        { text: `Cardiopatía: ${enfermedad.datos.cardiopatia}` },
        { text: `Nivel del consumo de cigarrillos: ${enfermedad.datos.fumador}` },
        { text: `MCI: ${enfermedad.datos.MCI}` },
        { text: `Niveles de Hemoglobina: ${enfermedad.datos.nivelesHemoglobina}` },
        { text: `Niveles de la Glucosa: ${enfermedad.datos.nivelGlucosa}` },
        { text: `Resultado de la predicción: ${enfermedad.datos.resultado}` },
        // Agrega aquí los demás datos de la enfermedad de diabetes
      );
    }
  
    // Generar y descargar el PDF
    // pdfMake.createPdf(documentoPdf).download('datos_paciente.pdf');
    pdfMake.createPdf(documentoPdf).open();
  }
  
}



//   ngOnInit() {
//     this.route.paramMap.subscribe((params) => {
//       const idPaciente = Number(params.get('idPaciente'));
//       this.obtenerDatosPaciente(idPaciente);
//     });
//   }

//   obtenerDatosPaciente(idPaciente: number) {
//     this.apiService.obtenerPaciente(idPaciente).subscribe(
//       (paciente: any) => {
//         this.paciente = paciente;
//         this.obtenerEnfermedadesPaciente(paciente);
//       },
//       (error) => {
//         console.error('Error al obtener los datos del paciente:', error);
//       }
//     );
//   }

//   obtenerEnfermedadesPaciente(paciente: any) {
//     this.apiService.obtenerHistorial().subscribe(
//       (historial: any[]) => {
//         const historialPaciente = historial.find((item) => item.paciente === paciente.id);

//         if (historialPaciente) {
//           this.enfermedades = [];

//           if (historialPaciente.anemia) {
//             this.apiService.obtenerEnfermedadAnemia(historialPaciente.anemia).subscribe(
//               (enfermedad: any) => {
//                 this.enfermedades.push(enfermedad);
//                 console.log('Enfermedad de anemia:', enfermedad);
//               },
//               (error) => {
//                 console.error('Error al obtener la enfermedad de anemia:', error);
//               }
//             );
//           }

//           if (historialPaciente.diabetes) {
//             this.apiService.obtenerEnfermedadDiabetes(historialPaciente.diabetes).subscribe(
//               (enfermedad: any) => {
//                 this.enfermedades.push(enfermedad);
//                 console.log('Enfermedad de diabetes:', enfermedad);
//               },
//               (error) => {
//                 console.error('Error al obtener la enfermedad de diabetes:', error);
//               }
//             );
//           }

//           if (historialPaciente.cancer_pulmonar) {
//             this.apiService.obtenerEnfermedadCancerPulmonar(historialPaciente.cancer_pulmonar).subscribe(
//               (enfermedad: any) => {
//                 this.enfermedades.push(enfermedad);
//                 console.log('Enfermedad de cáncer:', enfermedad);
//               },
//               (error) => {
//                 console.error('Error al obtener la enfermedad de cáncer:', error);
//               }
//             );
//           }
//           console.log('Enfermedad de cáncer:', this.enfermedades);

//         } else {
//           console.log('No se encontró un historial para el paciente con ID', paciente.id);
//         }
//       },
//       (error) => {
//         console.error('Error al obtener el historial:', error);
//       }
//     );
//   }
//   exportPdf(enfermedad: any) {
//     // Definir los estilos para el PDF
//     const styles = {
//       header: {
//         fontSize: 18,
//         bold: true,
//         margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
//       },
//       subheader: {
//         fontSize: 16,
//         bold: true,
//         margin: [0, 10, 0, 5] // Margen inferior de 5 unidades
//       },
//       paragraph: {
//         fontSize: 12,
//         margin: [0, 0, 0, 10] // Margen inferior de 10 unidades
//       }
//     };
  
//     // Crear el contenido del PDF
//     const content = [
//       { text: 'Datos del Paciente:', style: 'header' },
//       { text: `Nombre: ${this.paciente.nombre}`, style: 'paragraph' },
//       { text: `Apellido: ${this.paciente.apellido}`, style: 'paragraph' },
//       { text: `Correo Electrónico: ${this.paciente.correo_electronico}`, style: 'paragraph' },
//       { text: `Edad: ${this.paciente.edad}`, style: 'paragraph' },
//       { text: '\nDatos de la Enfermedad:', style: 'header' }
//     ];
  
//     // Agregar los datos de la enfermedad seleccionada
//     switch (enfermedad.id) {
//       case 23: // Enfermedad de anemia
//         content.push(
//           { text: 'Detalles de la enfermedad de anemia', style: 'subheader' },
//           { text: `ID: ${enfermedad.id}`, style: 'paragraph' },
//           { text: `Hemoglobina: ${enfermedad.Hemoglobina}`, style: 'paragraph' },
//           { text: `MCH: ${enfermedad.MCH}`, style: 'paragraph' },
//           { text: `MCHC: ${enfermedad.MCHC}`, style: 'paragraph' }
//         );
//         break;
//       case 2: // Enfermedad de cáncer
//         content.push(
//           { text: 'Detalles de la enfermedad de cáncer', style: 'subheader' },
//           { text: `ID: ${enfermedad.id}`, style: 'paragraph' },
//           { text: `Edad: ${enfermedad.edad}`, style: 'paragraph' },
//           { text: `Género: ${enfermedad.Genero}`, style: 'paragraph' },
//           { text: `Consumo de Alcohol: ${enfermedad.ConsumoAlcohol}`, style: 'paragraph' },
//           { text: `Alergia al Polvo: ${enfermedad.AlergiaPolvo}`, style: 'paragraph' }
//         );
//         break;
//       case 13: // Enfermedad de diabetes
//         content.push(
//           { text: 'Detalles de la enfermedad de diabetes', style: 'subheader' },
//           { text: `ID: ${enfermedad.id}`, style: 'paragraph' },
//           { text: `Género: ${enfermedad.genero}`, style: 'paragraph' },
//           { text: `Hipertensión: ${enfermedad.hipertension}`, style: 'paragraph' },
//           { text: `Cardiopatía: ${enfermedad.cardiopatia}`, style: 'paragraph' },
//           { text: `Fumador: ${enfermedad.fumador}`, style: 'paragraph' }
//         );
//         break;
//       default:
//         // Enfermedad desconocida
//         content.push({ text: 'Enfermedad desconocida', style: 'paragraph' });
//         break;
//     }
  
//     // Definir el documento PDF
//     const docDefinition = {
//       content: content,
//       styles: styles
//     };
  
//     // Generar el PDF y abrirlo en una nueva ventana
//     pdfMake.createPdf(docDefinition).open();
//   }
  
  
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ApiService } from '../servicios/api.service';

// @Component({
//   selector: 'app-visualizacion-pdf',
//   templateUrl: './visualizacion-pdf.page.html',
//   styleUrls: ['./visualizacion-pdf.page.scss']
// })

// export class VisualizacionPdfPage implements OnInit {
//   paciente: any;
//   enfermedades: any[];

//   constructor(private route: ActivatedRoute, private apiService: ApiService) {}

//   ngOnInit() {
//     this.route.paramMap.subscribe((params) => {
//       const idPaciente = Number(params.get('idPaciente'));
//       this.obtenerDatosPaciente(idPaciente);
//     });
//   }

//   obtenerDatosPaciente(idPaciente: number) {
//     this.apiService.obtenerPaciente(idPaciente).subscribe(
//       (paciente: any) => {
//         this.paciente = paciente;
//         this.obtenerEnfermedadesPaciente(paciente);
//       },
//       (error) => {
//         console.error('Error al obtener los datos del paciente:', error);
//       }
//     );
//   }

//   obtenerEnfermedadesPaciente(paciente: any) {
//     this.enfermedades = [];
//     console.log('pacientes:',paciente)


//     if (paciente.anemia) {
//       this.apiService.obtenerEnfermedadAnemia(paciente.anemia).subscribe(
//         (enfermedad: any) => {
//           this.enfermedades.push(enfermedad);
//           console.log('Enfermedad de anemia:', enfermedad);
//         },
//         (error) => {
//           console.error('Error al obtener la enfermedad de anemia:', error);
//         }
//       );
//     }

//     if (paciente.diabetes) {
//       this.apiService.obtenerEnfermedadDiabetes(paciente.diabetes).subscribe(
//         (enfermedad: any) => {
//           this.enfermedades.push(enfermedad);
//         },
//         (error) => {
//           console.error('Error al obtener la enfermedad de diabetes:', error);
//         }
//       );
//     }

//     if (paciente.cancer_pulmonar) {
//       this.apiService.obtenerEnfermedadCancerPulmonar(paciente.cancer_pulmonar).subscribe(
//         (enfermedad: any) => {
//           this.enfermedades.push(enfermedad);
//         },
//         (error) => {
//           console.error('Error al obtener la enfermedad de cáncer:', error);
//         }
//       );
//     }
//   }
// }
















// export class VisualizacionPdfPage implements OnInit {
//   paciente: any;
//   enfermedades: any[];

//   constructor(private route: ActivatedRoute, private apiService: ApiService) {}

//   ngOnInit() {
//     this.route.paramMap.subscribe((params) => {
//       const idPaciente = Number(params.get('idPaciente'));
//       this.obtenerDatosPaciente(idPaciente);
//     });
//   }

//   obtenerDatosPaciente(idPaciente: number) {
//     this.apiService.obtenerPaciente(idPaciente).subscribe(
//       (paciente: any) => {
//         this.paciente = paciente;
//         this.obtenerEnfermedadesPaciente(paciente);
//       },
//       (error) => {
//         console.error('Error al obtener los datos del paciente:', error);
//       }
//     );
//   }

//   obtenerEnfermedadesPaciente(paciente: any) {
//     this.enfermedades = [];

//     if (paciente.anemia) {
//       this.apiService.obtenerEnfermedadAnemia(paciente.anemia).subscribe(
//         (enfermedad: any) => {
//           console.log('Enfermedad de anemia:', enfermedad);
//           this.enfermedades.push(enfermedad);
//         },
//         (error) => {
//           console.error('Error al obtener la enfermedad de anemia:', error);
//         }
//       );
//     }

//     if (paciente.diabetes) {
//       this.apiService.obtenerEnfermedadDiabetes(paciente.diabetes).subscribe(
//         (enfermedad: any) => {
//           this.enfermedades.push(enfermedad);
//           console.log('Enfermedad de diabetes:', enfermedad);
//         },
//         (error) => {
//           console.error('Error al obtener la enfermedad de diabetes:', error);
//         }
//       );
//     }

//     if (paciente.cancer_pulmonar) {
//       this.apiService.obtenerEnfermedadCancerPulmonar(paciente.cancer_pulmonar).subscribe(
//         (enfermedad: any) => {
//           this.enfermedades.push(enfermedad);
//           console.log('Enfermedad de cancer:', enfermedad);
//         },
//         (error) => {
//           console.error('Error al obtener la enfermedad de cáncer:', error);
//         }
//       );
//     }
//     console.log('Enfermedades', this.enfermedades);
//   }
// }





























// export class VisualizacionPdfPage implements OnInit {
//   pacienteId: number;
//   paciente: any;
//   anemia:any;
//   diabetes:any;
//   cancerPulmonar:any;

//   constructor(
//     private route: ActivatedRoute,
//     private apiService: ApiService
//   ) {}

//   ngOnInit() {
//     this.route.paramMap.subscribe(params => {
//       this.pacienteId = Number(params.get('id'));
//       this.obtenerDatosPacienteEnfermedades(this.pacienteId);
//     });
//   }

//   obtenerDatosPacienteEnfermedades(pacienteId: number) {
//     this.apiService.obtenerHistorial().subscribe(
//       (historial: any[]) => {
//         const pacienteHistorial = historial.find(item => item.paciente === pacienteId);
//         if (pacienteHistorial) {
//           this.apiService.obtenerPaciente(pacienteHistorial.paciente).subscribe(
//             (paciente: any) => {
//               this.paciente = paciente;
//               this.anemia = null;
//               this.diabetes = null;
//               this.cancerPulmonar = null;
  
//               if (pacienteHistorial.anemia) {
//                 this.apiService.obtenerAnemia(pacienteHistorial.anemia).subscribe(
//                   (anemia: any) => {
//                     this.anemia = anemia;
//                   },
//                   (error) => {
//                     console.error('Error al obtener los datos de la anemia:', error);
//                   }
//                 );
//               }
  
//               if (pacienteHistorial.diabetes) {
//                 this.apiService.obtenerDiabetes(pacienteHistorial.diabetes).subscribe(
//                   (diabetes: any) => {
//                     this.diabetes = diabetes;
//                   },
//                   (error) => {
//                     console.error('Error al obtener los datos de la diabetes:', error);
//                   }
//                 );
//               }
  
//               if (pacienteHistorial.cancer_pulmonar) {
//                 this.apiService.obtenerCancerPulmonar(pacienteHistorial.cancer_pulmonar).subscribe(
//                   (cancerPulmonar: any) => {
//                     this.cancerPulmonar = cancerPulmonar;
//                   },
//                   (error) => {
//                     console.error('Error al obtener los datos del cáncer pulmonar:', error);
//                   }
//                 );
//               }
//             },
//             (error) => {
//               console.error('Error al obtener los datos del paciente:', error);
//             }
//           );
//         }
//       },
//       (error) => {
//         console.error('Error al obtener el historial:', error);
//       }
//     );
//   }
// }
// export class VisualizacionPdfPage implements OnInit {
//   paciente: any;
//   anemia: any;
//   diabetes: any;
//   cancerPulmonar: any;

//   constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService,private route: ActivatedRoute) {}

//   ngOnInit() {
//     this.route.params.subscribe((params) => {
//       const pacienteId = Number(params['id']);
//       this.obtenerDatosPacienteEnfermedades(pacienteId);
//     });
//   }

//   obtenerDatosPacienteEnfermedades(pacienteId: number) {
//     this.apiService.obtenerHistorial().subscribe(
//       (historial: any) => {
//         const pacienteHistorial = historial.find(item => item.paciente === pacienteId);
//         if (pacienteHistorial) {
//           this.apiService.obtenerPaciente(pacienteHistorial.paciente).subscribe(
//             (paciente: any) => {
//               this.paciente = paciente;
  
//               if (pacienteHistorial.anemia) {
//                 this.apiService.obtenerAnemia(pacienteHistorial.anemia).subscribe(
//                   (anemia: any) => {
//                     this.anemia = anemia;
//                     this.mostrarDatosPacienteEnfermedades();
//                   },
//                   (error) => {
//                     console.error('Error al obtener los datos de la anemia:', error);
//                   }
//                 );
//               }
  
//               if (pacienteHistorial.diabetes) {
//                 this.apiService.obtenerDiabetes(pacienteHistorial.diabetes).subscribe(
//                   (diabetes: any) => {
//                     this.diabetes = diabetes;
//                     this.mostrarDatosPacienteEnfermedades();
//                   },
//                   (error) => {
//                     console.error('Error al obtener los datos de la diabetes:', error);
//                   }
//                 );
//               }
  
//               if (pacienteHistorial.cancer_pulmonar) {
//                 this.apiService.obtenerCancerPulmonar(pacienteHistorial.cancer_pulmonar).subscribe(
//                   (cancerPulmonar: any) => {
//                     this.cancerPulmonar = cancerPulmonar;
//                     this.mostrarDatosPacienteEnfermedades();
//                   },
//                   (error) => {
//                     console.error('Error al obtener los datos del cáncer pulmonar:', error);
//                   }
//                 );
//               }
//             },
//             (error) => {
//               console.error('Error al obtener los datos del paciente:', error);
//             }
//           );
//         }
//       },
//       (error) => {
//         console.error('Error al obtener el historial:', error);
//       }
//     );
//   }
  
//   mostrarDatosPacienteEnfermedades() {
//     if (this.paciente && (this.anemia || this.diabetes || this.cancerPulmonar)) {
//       // Aquí puedes mostrar los datos en la página visualizacion-pdf
//       console.log('Datos del paciente:', this.paciente);
//       console.log('Datos de la anemia:', this.anemia);
//       console.log('Datos de la diabetes:', this.diabetes);
//       console.log('Datos del cáncer pulmonar:', this.cancerPulmonar);
//     }
//   }
// }































  // usuario: any; // Variable para almacenar los datos del usuario seleccionado
  // enfermedad: string; // Variable para almacenar la enfermedad (diabetes o anemia)
  // pacienteId: number;
  // paciente: any;
  // historialFormularios: any[];
  // paciente: Paciente;

  // constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService, private route: ActivatedRoute,) {}

  // ngOnInit() {
    // Obtener el parámetro de la URL (ID del usuario) y cargar los datos del usuario
    // this.activatedRoute.params.subscribe(params => {
    //   const id = params['id'];
    //   this.enfermedad = params['enfermedad'];
    //   this.obtenerDatosUsuario(id);
      
//     this.route.paramMap.subscribe(params => {
//       this.pacienteId = +params.get('id');
//       this.obtenerDetallesPaciente();
//       this.obtenerHistorialFormularios();
//     });
//   }
  
//   obtenerDetallesPaciente() {
//     this.apiService.obtenerDatosPaciente(this.pacienteId).subscribe(
//       (response: any) => {
//         this.paciente = response;
//       },
//       (error) => {
//         console.error('Error al obtener los detalles del paciente:', error);
//       }
//     );
//   }

//   obtenerHistorialFormularios() {
//     this.apiService.obtenerHistorialFormulariosPaciente(this.pacienteId).subscribe(
//       (response: any[]) => {
//         this.historialFormularios = response;
//       },
//       (error) => {
//         console.error('Error al obtener el historial de formularios:', error);
//       }
//     );
//   }
// }






//   obtenerDatosUsuario1(id: number) {
//     // Llamar al servicio API para obtener los datos del usuario por su ID y enfermedad
//     if (this.enfermedad === 'diabetes') {
//       this.apiService.obtenerDatosUsuarioDiabetes(id)
//         .subscribe((response: any) => {
//           this.usuario = response;
//         }, (error) => {
//           console.error('Error al obtener los datos del usuario:', error);
//         });
//     } else if (this.enfermedad === 'anemia') {
//       this.apiService.obtenerDatosUsuarioAnemia(id)
//         .subscribe((response: any) => {
//           this.usuario = response;
//         }, (error) => {
//           console.error('Error al obtener los datos del usuario:', error);
//         });
//     } else if (this.enfermedad === 'cancerPulmonar') {
//       this.apiService.obtenerDatosUsuariocancerpulmonar(id)
//         .subscribe((response: any) => {
//           this.usuario = response;
//         }, (error) => {
//           console.error('Error al obtener los datos del usuario:', error);
//         });
//     }
//   }
//   obtenerDatosUsuario(id: number){
//     this.apiService.obtenerDatosPacientes(id)
//     .subscribe((response: any) => {
//       this.usuario = response;
//     }, (error) => {
//       console.error('Error al obtener los datos del usuario:', error);
//     });
// }

 



// generarPDF() {
//     // Configurar la definición del documento PDF utilizando los datos del usuario
//     let docDefinition;
//     if (this.enfermedad === 'diabetes') {
//       docDefinition = {
//         content: [
//           { text: 'Informe de Diabetes', style: 'header' },
//           { text: `Nombre: ${this.usuario.nombreUsuario}`, style: 'subheader' },
//           { text: `Género: ${this.usuario.genero}`, style: 'content' },
//           { text: `Hipertensión: ${this.usuario.hipertencion}`, style: 'content' },
//           { text: `Cardiopatía: ${this.usuario.cardiopatia}`, style: 'content' },
//           { text: `Fumador: ${this.usuario.fumador}`, style: 'content' },
//           { text: `MCI: ${this.usuario.MCI}`, style: 'content' },
//           { text: `Niveles de Hemoglobina: ${this.usuario.nivelesHemoglobina}`, style: 'content' },
//           { text: `Nivel de Glucosa: ${this.usuario.nivelGlucosa}`, style: 'content' },
//           { text: `Edad: ${this.usuario.edad}`, style: 'content' },
//           { text: `Resultado: ${this.usuario.resultado}`, style: 'content' },
//           // Agrega más campos específicos para diabetes
//         ],
//         styles: {
//           header: {
//             fontSize: 20,
//             bold: true,
//             margin: [0, 0, 0, 10], // Margen inferior de 10 unidades
//             alignment: 'center'
//           },
//           subheader: {
//             fontSize: 16,
//             bold: true,
//             margin: [0, 10, 0, 5], // Margen inferior de 5 unidades y superior de 10 unidades
//             alignment: 'center'
//           },
//           content: {
//             fontSize: 12,
//             margin: [0, 0, 0, 5] // Margen inferior de 5 unidades
//           }
//         }
//       };
//     } else if (this.enfermedad === 'anemia') {
//       docDefinition = {
//         content: [
//           { text: 'Informe de Anemia', style: 'header' },
//           { text: `Nombre: ${this.usuario.nombreUsuario}`, style: 'subheader' },
//           { text: `Género: ${this.usuario.genero}`, style: 'content' },
//           { text: `Hemoglobina: ${this.usuario.Hemogobina}`, style: 'content' },
//           { text: `MCH: ${this.usuario.MCH}`, style: 'content' },
//           { text: `MCHC: ${this.usuario.MCHC}`, style: 'content' },
//           { text: `MCV: ${this.usuario.MCV}`, style: 'content' },
//           { text: `Resultado: ${this.usuario.Resultado}`, style: 'content' },
//           // Agrega más campos específicos para anemia
//         ],
//         styles: {
//           header: {
//             fontSize: 20,
//             bold: true,
//             margin: [0, 0, 0, 10], // Margen inferior de 10 unidades
//             alignment: 'center'
//           },
//           subheader: {
//             fontSize: 16,
//             bold: true,
//             margin: [0, 10, 0, 5], // Margen inferior de 5 unidades y superior de 10 unidades
//             alignment: 'center'
//           },
//           content: {
//             fontSize: 12,
//             margin: [0, 0, 0, 5] // Margen inferior de 5 unidades
//           }
//         }
//       };
//     } else if (this.enfermedad === 'cancerPulmonar') {
//       docDefinition = {
//         content: [
//           { text: 'Informe de Cáncer Pulmonar', style: 'header' },
//           { text: `Nombre: ${this.usuario.nombreUsuario}`, style: 'subheader' },
//           { text: `Género: ${this.usuario.Genero}`, style: 'content' },
//           { text: `Edad: ${this.usuario.edad}`, style: 'content' },
//           { text: `Consumo de Alcohol: ${this.usuario.ConsumoAlcohol}`, style: 'content' },
//           { text: `Alergia al Polvo: ${this.usuario.AlergiaPolvo}`, style: 'content' },
//           { text: `Registro Genético: ${this.usuario.RegistroGenetico}`, style: 'content' },
//           { text: `Enfermedad Pulmonar: ${this.usuario.EnfermedadPulmonar}`, style: 'content' },
//           { text: `Dieta Equilibrada: ${this.usuario.DietaEquilibrada}`, style: 'content' },
//           { text: `Obesidad: ${this.usuario.Obesidad}`, style: 'content' },
//           { text: `Tabaquismo: ${this.usuario.Tabaquismo}`, style: 'content' },
//           { text: `Fumador Pasivo: ${this.usuario.FumadorPasivo}`, style: 'content' },
//           { text: `Dolor en el Pecho: ${this.usuario.DolorPecho}`, style: 'content' },
//           { text: `Tos con Sangre: ${this.usuario.TosConSangre}`, style: 'content' },
//           { text: `Fatiga: ${this.usuario.fatiga}`, style: 'content' },
//           { text: `Pérdida de Peso: ${this.usuario.PerdidaPeso}`, style: 'content' },
//           { text: `Dificultad para Respirar: ${this.usuario.DificultadRespirar}`, style: 'content' },
//           { text: `Sibilancia: ${this.usuario.Sibilancia}`, style: 'content' },
//           { text: `Dificultad para Tragar: ${this.usuario.DificultadTragar}`, style: 'content' },
//           { text: `Tos Seca: ${this.usuario.TosSeca}`, style: 'content' },
//           { text: `Resultados: ${this.usuario.resultados}`, style: 'content' },
//         ],
//         styles: {
//           header: {
//             fontSize: 20,
//             bold: true,
//             margin: [0, 0, 0, 10], // Margen inferior de 10 unidades
//             alignment: 'center'
//           },
//           subheader: {
//             fontSize: 16,
//             bold: true,
//             margin: [0, 10, 0, 5], // Margen inferior de 5 unidades y superior de 10 unidades
//             alignment: 'center'
//           },
//           content: {
//             fontSize: 12,
//             margin: [0, 0, 0, 5] // Margen inferior de 5 unidades
//           }
//         }
//       };
//     }

  
//     // Generar el PDF
//     pdfMake.createPdf(docDefinition).open();
//   }
// }
//   pdfMake.vfs = pdfFonts.pdfMake.vfs; 

























// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../servicios/api.service';
// import { ActivatedRoute } from '@angular/router';
// import * as pdfMake from 'pdfmake/build/pdfmake';

// @Component({
//   selector: 'app-visualizacion-pdf',
//   templateUrl: 'visualizacion-pdf.page.html',
//   styleUrls: ['visualizacion-pdf.page.scss'],
// })
// export class VisualizacionPdfPage implements OnInit {
//   usuario: any; // Variable para almacenar los datos del usuario seleccionado
//   enfermedad: string; // Variable para almacenar la enfermedad (diabetes o anemia)

//   constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) {}

//   ngOnInit() {
//     // Obtener el parámetro de la URL (ID del usuario) y cargar los datos del usuario
//     this.activatedRoute.params.subscribe(params => {
//       const id = params['id'];
//       this.enfermedad = params['enfermedad'];
//       this.obtenerDatosUsuario(id);
//     });
//   }

//   obtenerDatosUsuario(id: number) {
//     // Llamar al servicio API para obtener los datos del usuario por su ID y enfermedad
//     if (this.enfermedad === 'diabetes') {
//       this.apiService.obtenerDatosUsuarioDiabetes(id)
//         .subscribe((response: any) => {
//           this.usuario = response;
//         }, (error) => {
//           console.error('Error al obtener los datos del usuario:', error);
//         });
//     } else if (this.enfermedad === 'anemia') {
//       this.apiService.obtenerDatosUsuarioAnemia(id)
//         .subscribe((response: any) => {
//           this.usuario = response;
//         }, (error) => {
//           console.error('Error al obtener los datos del usuario:', error);
//         });
//     }
//   }

//   exportarPDF() {
//     // Configurar la definición del documento PDF utilizando los datos del usuario
//     const docDefinition = {
//       content: [
//         { text: `Nombre: ${this.usuario.nombreUsuario}`, fontSize: 16, bold: true },
//         { text: `Género: ${this.usuario.genero}`, fontSize: 12 },
//         // Agrega más campos según los datos que desees mostrar en el PDF
//       ],
//     };

//     // Generar el PDF y descargarlo
//     pdfMake.createPdf(docDefinition).download();
//   }
// }

// <ion-content>
//   <!-- Contenido de tu página -->
//   <button (click)="exportarPDF()">Exportar a PDF</button>
// </ion-content>
