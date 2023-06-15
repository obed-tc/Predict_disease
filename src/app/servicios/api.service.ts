import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url= "https://django2-468o.onrender.com";
  private enfermedadurl= "https://django2-468o.onrender.com";

  constructor(private http: HttpClient , public route: Router) { }

  public login(username: string , password: string ): Observable<any>{
    console.log("datos autentificacion",username,password); 
    const loginData = {
      username: username,
      password: password
    };
    return this.http.post(this.url +'/login/',loginData);
  }
  // public register(username: string,email: string,password: string): Observable<any>{
  //   return this.http.post(this.url+'/register/',{username,email,password});
  // }
  registerMedico(codigoHospital:string, nombre: string, apellido: string, correoElectronico: string,password:string, numero_celular: number, ci: number, especialidad: string, rol: string): Observable<any> {
    const form = {
      codigoHospital,
      nombre,
      apellido,
      correoElectronico,
      password,
      numero_celular,
      ci,
      especialidad,
      rol
    };
  
    return this.http.post(this.url + '/medico/', form);
  }  
  

  public registerHospital(nombre: string,direccion: string,correoElectronico: string,telefono:number): Observable<any>{
    return this.http.post(this.url+'/hospital/',{nombre,direccion,correoElectronico,telefono});
  }

  public obtenerListaMedicos(){
    return this.http.get(this.url+'/medico/');
  }
  public enviarFormulario(pacienteSeleccionado: number,
    medicoId: number,genero: string,hipertencion:number, cardiopatia: number, 
    fumador: number, MCI: number, nivelesHemoglobina: number, nivelGlucosa:number, resultado:string ,fecha:string  ): Observable<any> {
    const formData = {
    paciente:pacienteSeleccionado,
    medico:medicoId,
    genero: genero,
    hipertencion: hipertencion,
    cardiopatia: cardiopatia,
    fumador: fumador,
    MCI: MCI,
    nivelesHemoglobina: nivelesHemoglobina,
    nivelGlucosa: nivelGlucosa,
    resultado: resultado,
    fecha:fecha
    };
    return this.http.post(this.enfermedadurl + '/diabetes/', formData);
  }

  // public enviarFormulario2(pacienteSeleccionado:number, medicoId: number, 
  //   Hemogobina:number, MCH:number, MCHC:number, MCV:number, Resultado:string, fecha:string ): Observable<any> {
  //   const formData = {
  //   paciente: pacienteSeleccionado,
  //   medico:medicoId,
  //   Hemogobina:Hemogobina,
  //   MCH:MCH,
  //   MCHC:MCHC,
  //   MCV:MCV,
  //   Resultado: Resultado,
  //   fecha:fecha
  //   };
  //   return this.http.post(this.url + '/anemia/', formData);
  // }
  public enviarFormulario2(
    pacienteSeleccionado: number,
    medicoId: number,
    genero:string,
    Hemogobina: number,
    MCH: number,
    MCHC: number,
    MCV: number,
    Resultado: string,
    fecha: string
  ): Observable<any> {
    const formData = {
      paciente: pacienteSeleccionado,
      medico: medicoId,
      genero: genero,
      Hemogobina: Hemogobina,
      MCH: MCH,
      MCHC: MCHC,
      MCV: MCV,
      Resultado: Resultado,
      fecha: fecha
    };
    return this.http.post(this.url + '/anemia/', formData);
  }

  public enviarFormulario3(pacienteSeleccionado: number,medicoId:number, Genero:string, ConsumoAlcohol: number, AlergiaPolvo: number, RegistroGenetico: number,
    EnfermedadPulmonar: number, DietaEquilibrada: number, Obesidad: number, Tabaquismo: number, FumadorPasivo: number,
    DolorPecho: number, TosConSangre: number, fatiga: number, PerdidaPeso: number, DificultadRespirar: number,
    Sibilancia: number, DificultadTragar: number, TosSeca: number, resultados: string, fecha:string): Observable<any> {
    
    const formData = {
      paciente: pacienteSeleccionado,
      medicoId: medicoId,
      Genero: Genero,
      ConsumoAlcohol: ConsumoAlcohol,
      AlergiaPolvo: AlergiaPolvo,
      RegistroGenetico: RegistroGenetico,
      EnfermedadPulmonar: EnfermedadPulmonar,
      DietaEquilibrada: DietaEquilibrada,
      Obesidad: Obesidad,
      Tabaquismo: Tabaquismo,
      FumadorPasivo: FumadorPasivo,
      DolorPecho: DolorPecho,
      TosConSangre: TosConSangre,
      fatiga: fatiga,
      PerdidaPeso: PerdidaPeso,
      DificultadRespirar: DificultadRespirar,
      Sibilancia: Sibilancia,
      DificultadTragar: DificultadTragar,
      TosSeca: TosSeca,
      resultados: resultados,
      fecha: fecha
    };
  
    return this.http.post(this.enfermedadurl + '/cancerPulmonar/', formData);
  }

  public getUsuariosDiabetes(): Observable<any> {
    return this.http.get(`${this.enfermedadurl}/diabetes/`);
  }

  public getUsuariosAnemia(): Observable<any> {
    return this.http.get(`${this.enfermedadurl}/anemia/`);
  }
  public getUsuarioscancerpulmonar(): Observable<any> {
    return this.http.get(`${this.enfermedadurl}/cancerPulmonar/`);
  }

  public obtenerDatosUsuarioDiabetes(codigoPaciente: number): Observable<any> {
    return this.http.get(`${this.enfermedadurl}/diabetes/${codigoPaciente}/`);
  }
  
  public obtenerDatosUsuarioAnemia(codigoPaciente: number): Observable<any> {
    return this.http.get(`${this.enfermedadurl}/anemia/${codigoPaciente}/`);
  }

  // public obtenerDatosUsuariocancerpulmonar(id: number): Observable<any> {
  //   return this.http.get(`${this.enfermedadurl}/cancerPulmonar/${id}/`);
  // }

  public obtenerDatosMedico(id: number): Observable<any> {
    return this.http.get(`${this.url}/medico/${id}/`);
  }
  
  public getMedicos(id: number): Observable<any> {
    return this.http.get(`${this.url}/medico/${id}/`);
  }
  public buscarPacientes(searchTerm: string): Observable<any> {
    const url = `${this.url}/search/?q=${encodeURIComponent(searchTerm)}`;
    console.log('/search/?q=', url);
    return this.http.get(url);
  }
  

  public obtenerListaPacientes(){
    return this.http.get(this.url+'/paciente/');
  }
  public getPacientesAtendidosPorMedico(medicoId: number): Observable<any> {
    const url = `${this.url}/medico/pacientes/${medicoId}/`;
    return this.http.get(url);
  }  

  public Postpaciente(
    nombre: string,
    apellido: string,
    correo_electronico: string,
    edad: number,
    peso: number,
    altura: number,
    direccion: string,
    numero_celular: string,
    ci: string
  ): Observable<any> {
    const paciente = {
      id: 2,
      nombre: nombre,
      apellido: apellido,
      correo_electronico: correo_electronico,
      edad: edad,
      peso: peso,
      altura: altura,
      direccion: direccion,
      numero_celular: numero_celular,
      ci: ci
    };
    return this.http.post(this.enfermedadurl + '/paciente/', paciente);
  }
  eliminarPaciente(id: number): Observable<any> {
    const url = `${this.enfermedadurl}/paciente/${id}`;
    return this.http.delete<any>(url);
  }
  getPacientes(): Observable<any> {
    const url = `${this.enfermedadurl}/paciente/`; 
    return this.http.get(url);
  }

  public obtenerDatosPacientes(id:number): Observable<any>{
    return this.http.get(`${this.url}/medico/${id}/`);
  }

  public relacionarPacienteConAnemia(codigoPaciente: number, codigoAnemia: number): Observable<any>{
    const body = {
      codigoPaciente: codigoPaciente,
      codigoAnemia: codigoAnemia
    };
    return this.http.post(`${this.url}/enfermedades/anemia/`,body);
  }
  public relacionarPacienteConDiabetes(codigoPaciente: number, codigoDiabetes: number): Observable<any>{
    const body = {
      codigoPaciente: codigoPaciente,
      codigoDiabetes: codigoDiabetes
    };
    return this.http.post(`${this.url}/enfermedades/diabetes/`,body);
  }
  public relacionarPacienteConCancer (codigoPaciente: number, codigoCancer_pulmonar: number): Observable<any>{
    const body = {
      codigoPaciente: codigoPaciente,
      codigoCancer_pulmonar: codigoCancer_pulmonar
    };
    return this.http.post(`${this.url}/enfermedades/cancerPulmonar/`,body);
  
  }


  public obtenerHistorialFormulariosPaciente(pacienteId: number) {
    const url = `${this.url}/historial?paciente=${pacienteId}`;
    return this.http.get(url);
  }
 
  
public obtenerDetallesPaciente(idPaciente: number): Observable<any> {
    const url = `${this.url}/paciente/${idPaciente}`; // Reemplaza this.BASE_URL con la URL base de tu API
  
    return this.http.get(url);
  }
  obtenerHistorial() {
    const Url = `${this.url}/historial`;
    return this.http.get(Url);
  }

  obtenerPaciente(pacienteId: number) {
    const Url = `${this.url}/paciente/${pacienteId}`;
    return this.http.get(Url);
  }

  obtenerAnemia(id: number) {
    const Url = `${this.url}/anemia/${id}`; // Reemplaza con la URL de tu endpoint para obtener los datos de la anemia por su ID
    return this.http.get(Url);
  }

  obtenerDiabetes(id: number) {
    const Url = `${this.url}/diabetes/${id}`; // Reemplaza con la URL de tu endpoint para obtener los datos de la diabetes por su ID
    return this.http.get(Url);
  }

  obtenerCancerPulmonar(id: number) {
    const Url = `${this.url}/cancerPulmonar/${id}`; // Reemplaza con la URL de tu endpoint para obtener los datos del cáncer pulmonar por su ID
    return this.http.get(Url);
  }

  obtenerDatosEnfermedad(enfermedad: string, id: number) {
    let url: string;

    switch (enfermedad) {
      case 'anemia':
        url = `https://django2-468o.onrender.com/anemia/${id}`;
        break;
      case 'diabetes':
        url = `https://django2-468o.onrender.com/diabetes/${id}`;
        break;
      case 'cancerPulmonar':
        url = `https://django2-468o.onrender.com/cancerPulmonar/${id}`;
        break;
      default:
        return null;
    }

    return this.http.get<any>(url);
  }
  public obtenerDatosPaciente(pacienteId: number): Observable<any> {
    const url = `${this.url}/paciente/${pacienteId}`; // Reemplaza this.BASE_URL con la URL base de tu API
  
    return this.http.get(url);
  }
  public obtenerHistorialPorPacienteId(pacienteId: number) {
    const historialUrl = `${this.url}/historial/`;
    return this.http.get<any[]>(historialUrl).pipe(
      map(historial => historial.filter(item => item.paciente === pacienteId))
    );
  }

  public obtenerEnfermedadAnemia(idEnfermedad: number) {
    const url = `${this.url}/anemia/${idEnfermedad}`;
    return this.http.get(url);
  }
  public obtenerEnfermedadAnemia1(idEnfermedad: number) {
    const url = `${this.url}/anemia/${idEnfermedad}`;
    return this.http.get(url);
  }
  
  
  public obtenerEnfermedadDiabetes(idEnfermedad: number) {
    const url = `${this.url}/diabetes/${idEnfermedad}`;
    return this.http.get(url);
  }  
  public obtenerEnfermedadCancerPulmonar(idEnfermedad: number) {
    const url = `${this.url}/cancerPulmonar/${idEnfermedad}`;
    return this.http.get(url);
  }
  public getPaciente(pacienteId: number): Observable<any> {
    const url = `${this.url}/paciente/${pacienteId}`;
    return this.http.get(url);
  }

  public getEnfermedad(): Observable<any> {
    const url = `${this.url}/anemia/`;
    return this.http.get(url);
  }
  public getEnfermedades(pacienteId: number) {
    const url = `${this.url}/paciente/enfermedades/${pacienteId}/`; // Ruta para obtener las enfermedades del paciente
    return this.http.get(url);
  }
  public getEnfermedades2(enfermedadId): Observable<any> {
    const url = `${this.url}/anemia/${enfermedadId}`;
    return this.http.get(url);
  }
  public getEnfermedadPorPaciente(pacienteId: number) {
    const url = `${this.url}/paciente/${pacienteId}`;
    return this.http.get(url);
  }
  getEnfermedadAnemia(): Observable<any[]> {
    const url = 'https://django2-468o.onrender.com/anemia/';
  
    return this.http.get<any[]>(url);
  }
  
  getEnfermedadDiabetes(): Observable<any[]> {
    const url = 'https://django2-468o.onrender.com/diabetes/';
  
    return this.http.get<any[]>(url);
  }
  
  getEnfermedadCancerPulmonar(): Observable<any[]> {
    const url = 'https://django2-468o.onrender.com/cancerPulmonar/';
  
    return this.http.get<any[]>(url);
  }

  public getEnfermedadPorNombre(nombreEnfermedad: string): Observable<any[]> {
    const url = `${this.url}/${nombreEnfermedad}/`;
    return this.http.get<any[]>(url);
  }

}
