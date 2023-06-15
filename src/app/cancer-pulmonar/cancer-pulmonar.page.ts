import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-cancer-pulmonar',
  templateUrl: './cancer-pulmonar.page.html',
  styleUrls: ['./cancer-pulmonar.page.scss'],
})

export class CancerPulmonarPage implements OnInit {
  pacienteSeleccionado:any;
  medicoId: number;
  Genero: string;
  ConsumoAlcohol: number;
  AlergiaPolvo: number;
  RegistroGenetico: number;
  EnfermedadPulmonar: number;
  DietaEquilibrada: number;
  Obesidad: number;
  Tabaquismo: number;
  FumadorPasivo: number;
  DolorPecho: number;
  TosConSangre: number;
  fatiga: number;
  PerdidaPeso: number;
  DificultadRespirar: number;
  Sibilancia: number;
  DificultadTragar: number;
  TosSeca: number;
  resultados: string;
  fecha:string;

  exito:string;
  error:string;
  idPrediccionCancerPulmonar:any;
  searchTerm: string = '';
  pacientes: any[] = [];
  idPacienteSeleccionado: number;

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

  predecirCancerPulmonar(datos: any): string {
    if (
      datos.ConsumoAlcohol ||
      datos.AlergiaPolvo ||
      datos.RegistroGenetico ||
      datos.EnfermedadPulmonar ||
      datos.DietaEquilibrada ||
      datos.Obesidad ||
      datos.Tabaquismo ||
      datos.FumadorPasivo ||
      datos.DolorPecho ||
      datos.TosConSangre ||
      datos.fatiga ||
      datos.PerdidaPeso ||
      datos.DificultadRespirar ||
      datos.Sibilancia ||
      datos.DificultadTragar ||
      datos.TosSeca
    ) {
      return 'Tiene Cancer de Pulmon';
    } else {
      return 'No tiene Cancer de pulmon';
    }
  }
  

  enviarFormulario3() {
    if (this.pacienteSeleccionado) {
      const codigoPaciente = this.pacienteSeleccionado;
      console.log('Código de paciente:', codigoPaciente);

      this.resultados = this.predecirCancerPulmonar({
        ConsumoAlcohol: this.ConsumoAlcohol,
        AlergiaPolvo: this.AlergiaPolvo,
        RegistroGenetico: this.RegistroGenetico,
        EnfermedadPulmonar: this.EnfermedadPulmonar,
        DietaEquilibrada: this.DietaEquilibrada,
        Obesidad: this.Obesidad,
        Tabaquismo: this.Tabaquismo,
        FumadorPasivo: this.FumadorPasivo,
        DolorPecho: this.DolorPecho,
        TosConSangre: this.TosConSangre,
        fatiga: this.fatiga,
        PerdidaPeso: this.PerdidaPeso,
        DificultadRespirar: this.DificultadRespirar,
        Sibilancia: this.Sibilancia,
        DificultadTragar: this.DificultadTragar,
        TosSeca: this.TosSeca,
      });
      const fecha = new Date().toISOString();
      const formulario = {
        paciente: this.pacienteSeleccionado,
        medico:this.medicoId,
        Genero: this.Genero,
        ConsumoAlcohol: this.ConsumoAlcohol,
        AlergiaPolvo: this.AlergiaPolvo,
        RegistroGenetico: this.RegistroGenetico,
        EnfermedadPulmonar: this.EnfermedadPulmonar,
        DietaEquilibrada: this.DietaEquilibrada,
        Obesidad: this.Obesidad,
        Tabaquismo: this.Tabaquismo,
        FumadorPasivo: this.FumadorPasivo,
        DolorPecho: this.DolorPecho,
        TosConSangre: this.TosConSangre,
        fatiga: this.fatiga,
        PerdidaPeso: this.PerdidaPeso,
        DificultadRespirar: this.DificultadRespirar,
        Sibilancia: this.Sibilancia,
        DificultadTragar: this.DificultadTragar,
        TosSeca: this.TosSeca,
        resultados:this.resultados,
        fecha: this.fecha
      };
      this.apiService
        .enviarFormulario3(
          this.pacienteSeleccionado.id,
          this.medicoId,
          this.Genero,
          this.ConsumoAlcohol,
          this.AlergiaPolvo,
          this.RegistroGenetico,
          this.EnfermedadPulmonar,
          this.DietaEquilibrada,
          this.Obesidad,
          this.Tabaquismo,
          this.FumadorPasivo,
          this.DolorPecho,
          this.TosConSangre,
          this.fatiga,
          this.PerdidaPeso,
          this.DificultadRespirar,
          this.Sibilancia,
          this.DificultadTragar,
          this.TosSeca,
          this.resultados,
          fecha
        ).subscribe((response: any) => {
          console.log('Éxito', response);

          this.pacienteSeleccionado = null;
          this.Genero = ''; 
          this.ConsumoAlcohol= null;
          this.AlergiaPolvo= null;
          this.RegistroGenetico= null;
          this.EnfermedadPulmonar= null;
          this.DietaEquilibrada= null;
          this.Obesidad= null;
          this.Tabaquismo= null;
          this.FumadorPasivo= null;
          this.DolorPecho= null;
          this.TosConSangre= null;
          this.fatiga= null;
          this.PerdidaPeso= null;
          this.DificultadRespirar= null;
          this.Sibilancia= null;
          this.DificultadTragar= null;
          this.TosSeca= null;
          this.exito = 'Predicción exitosa';

      setTimeout(() => {
        this.exito = null;
      }, 3000); 
        },
        (error: any) => {
          console.error('Error al enviar el formulario de anemia:', error);
          this.pacienteSeleccionado = null;
          this.Genero = ''; 
          this.ConsumoAlcohol= null;
          this.AlergiaPolvo= null;
          this.RegistroGenetico= null;
          this.EnfermedadPulmonar= null;
          this.DietaEquilibrada= null;
          this.Obesidad= null;
          this.Tabaquismo= null;
          this.FumadorPasivo= null;
          this.DolorPecho= null;
          this.TosConSangre= null;
          this.fatiga= null;
          this.PerdidaPeso= null;
          this.DificultadRespirar= null;
          this.Sibilancia= null;
          this.DificultadTragar= null;
          this.TosSeca= null;
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
      this.apiService.buscarPacientes(this.searchTerm)
        .subscribe((response: any) => {
          this.pacientes = response;
        }, (error) => {
          console.error('Error al buscar Paciente:', error);
        });
    } else {
      this.pacientes = []; 
    }
  }

  seleccionarPaciente(paciente: any) {
    this.pacienteSeleccionado = paciente;
    this.searchTerm = paciente.nombre+ ' ' +paciente.apellido;
    
  }


}