// import { Component, OnInit} from '@angular/core';
// import { ApiService } from '../servicios/api.service';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-registros',
//   templateUrl: './registros.page.html',
//   styleUrls: ['./registros.page.scss']

// })
// export class RegistrosPage implements OnInit {
  // usuariosDiabetes: string[] = [];
  // usuariosAnemia: string[] = [];
  // usuariosCancerPulmon: string[] = [];
  // listaPacientes: any[];
  // searchTerm: string = '';
  // constructor(private apiService: ApiService, private router: Router) {}

  // ngOnInit() {
  //   this.obtenerListaPacientes();
    // this.obtenerUsuariosDiabetes();
    // this.obtenerUsuariosAnemia();
    // this.obtenerUsuarioscancerpulmonar();
  // }

  // obtenerUsuariosDiabetes() {
  //   this.apiService.getUsuariosDiabetes()
  //     .subscribe((response: any) => {
  //       this.usuariosDiabetes = response;
  //     }, (error) => {
  //       console.error('Error al obtener los usuarios de diabetes:', error);
  //     });
  // }

  // obtenerUsuariosAnemia() {
  //   this.apiService.getUsuariosAnemia()
  //     .subscribe((response: any) => {
  //       this.usuariosAnemia = response;
  //     }, (error) => {
  //       console.error('Error al obtener los usuarios de anemia:', error);
  //     });
  // }

  // obtenerUsuarioscancerpulmonar() {
  //   this.apiService.getUsuarioscancerpulmonar()
  //     .subscribe((response: any) => {
  //       this.usuariosCancerPulmon = response;
  //     }, (error) => {
  //       console.error('Error al obtener los usuarios de cancer:', error);
  //     });
  // }
  // obtenerListaPacientes() {
  //   this.apiService.obtenerListaPacientes().subscribe(
  //     (response: any[]) => {
  //       this.listaPacientes = response;
  //     },
  //     (error) => {
  //       console.error('Error al obtener la lista de pacienetes:', error);
  //     }
  //   );
  // }

// registro.page.ts

















import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss']
})
export class RegistrosPage implements OnInit {
  listaPacientes: any[];
  pacientesAtendidos: any[] = [];
  searchTerm: string = '';
  constructor(private apiService: ApiService, private router: Router,private navCtrl: NavController, private storage: Storage) 
  {
    this.storage.create();
  }

  // ngOnInit() {
  //   this.obtenerListaPacientes();
  // }

  // obtenerListaPacientes() {
  //   this.apiService.obtenerListaPacientes().subscribe(
  //     (response: any[]) => {
  //       this.listaPacientes = response;
  //     },
  //     (error) => {
  //       console.error('Error al obtener la lista de pacientes:', error);
  //     }
  //   );
  // }
  ngOnInit() {
    this.storage.get('username').then((data) => {
      if (data && data.medico) {
        const medicoId = data.medico.id;
        this.getPacientesAtendidosPorMedico(medicoId);
      }
    });
  }

  getPacientesAtendidosPorMedico(medicoId: number) {
    this.apiService.getPacientesAtendidosPorMedico(medicoId).subscribe(
      (response: any) => {
        this.pacientesAtendidos = response;
      },
      (error: any) => {
        console.error('Error al obtener los pacientes atendidos:', error);
      }
    );
  }
    buscarPacientes() {
    this.apiService.buscarPacientes(this.searchTerm)
      .subscribe((response: any) => {
        this.listaPacientes= response;
      }, (error) => {
        console.error('Error al buscar Paciente:', error);
      });
  }
  // verDetallesPaciente(id: number) {
  //   console.log("ver   ",id)
  //   this.navCtrl.navigateForward(`/visualizacion-pdf/${id}`);
  // }
  verDetallesPaciente(pacienteId: number, enfermedadId: number, nombrePaciente: string) {
    this.apiService.getPacientes().subscribe(
      (response: any[]) => {
        const paciente = response.find((p) => p.nombre === nombrePaciente);
        if (paciente) {
          const pacienteId = paciente.id;
  
          // Obtener la enfermedad asociada al paciente
          this.apiService.getEnfermedades(pacienteId).subscribe(
            (enfermedadesResponse: any[]) => {
              if (enfermedadesResponse.length > 0) {
                
                this.navCtrl.navigateForward(`/visualizacion-pdf/${pacienteId}/${enfermedadesResponse}`);
              } else {
                console.log('El paciente no tiene enfermedades asociadas');
              }
            },
            (enfermedadesError) => {
              console.error('Error al obtener las enfermedades del paciente:', enfermedadesError);
            }
          );
  
          // Resto de la lógica aquí
  
        } else {
          console.log('No se encontró el paciente con el nombre especificado');
        }
      },
      (error) => {
        console.error('Error al obtener los pacientes:', error);
      }
    );
  }
}

//   verDetallesPaciente(idPaciente: number) {
//     this.apiService.obtenerPaciente(idPaciente).subscribe(
//       (paciente: any) => {
//         this.apiService.obtenerHistorial().subscribe(
//           (historial: any[]) => {
//             const pacienteEncontrado = historial.find(
//               (item) => item.paciente === idPaciente
//             );
  
//             if (pacienteEncontrado) {
//               const enfermedadesPaciente = [];
  
//               if (pacienteEncontrado.anemia) {
//                 this.apiService.obtenerEnfermedadAnemia(pacienteEncontrado.anemia).subscribe(
//                   (enfermedad: any) => {
//                     enfermedadesPaciente.push(enfermedad);
//                   },
//                   (error) => {
//                     console.error('Error al obtener la enfermedad de anemia:', error);
//                   }
//                 );
//               }
  
//               if (pacienteEncontrado.diabetes) {
//                 this.apiService.obtenerEnfermedadDiabetes(pacienteEncontrado.diabetes).subscribe(
//                   (enfermedad: any) => {
//                     enfermedadesPaciente.push(enfermedad);
//                   },
//                   (error) => {
//                     console.error('Error al obtener la enfermedad de diabetes:', error);
//                   }
//                 );
//               }
  
//               if (pacienteEncontrado.cancer_pulmonar) {
//                 this.apiService.obtenerEnfermedadCancerPulmonar(pacienteEncontrado.cancer_pulmonar).subscribe(
//                   (enfermedad: any) => {
//                     enfermedadesPaciente.push(enfermedad);
//                   },
//                   (error) => {
//                     console.error('Error al obtener la enfermedad de cáncer:', error);
//                   }
//                 );
//               }
  
//               // Aquí puedes manejar la lista de enfermedades del paciente junto con los datos del paciente en tu aplicación
//               console.log('Datos del paciente:', paciente);
//               console.log('Enfermedades del paciente:', enfermedadesPaciente);

//               // Redirigir a la página visualizacion_pdf con el ID del paciente
//               this.navCtrl.navigateForward('/visualizacion-pdf/paciente/' + idPaciente);
//             } else {
//               console.log('No se encontró un historial para el paciente con ID', idPaciente);
//             }
//           },
//           (error) => {
//             console.error('Error al obtener el historial:', error);
//           }
//         );
//       },
//       (error) => {
//         console.error('Error al obtener los datos del paciente:', error);
//       }
//     );
//   }
// }





















  
  // obtenerListaPacientes() {
  //   this.apiService.obtenerListaPacientes().subscribe(
  //     (response: any[]) => {
  //       this.listaPacientes = response;
  //     },
  //     (error) => {
  //       console.error('Error al obtener la lista de pacientes:', error);
  //     }
  //   );
  // }
  
  // verDetallesPaciente(idPaciente: number) {
  //   this.navCtrl.navigateForward('/visualizacion-pdf/' + idPaciente);
  // }

//   buscarPacientes() {
//     this.apiService.buscarPacientes(this.searchTerm)
//       .subscribe((response: any) => {
//         this.listaPacientes= response;
//       }, (error) => {
//         console.error('Error al buscar Paciente:', error);
//       });
//   }
// }
 