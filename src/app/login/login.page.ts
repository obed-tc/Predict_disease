// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ApiService } from '../servicios/api.service';
// import { Router } from '@angular/router';
// import { Storage } from '@ionic/storage';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage implements OnInit {

//   formulariologin: FormGroup;
//   submitted = false;
//   formErrors = {
//     username: '',
//     password: ''
//   };

//   constructor(private fb: FormBuilder, private servicio: ApiService, private route: Router, private storage: Storage) {
//     this.storage.create();
//   }

//   ngOnInit() {
//     this.formulariologin = this.fb.group({
//       username: ['', [Validators.required]],
//       password: ['', Validators.required]
//     });

//     this.formulariologin.valueChanges.subscribe(() => {
//       if (this.submitted) {
//         this.validateForm();
//       }
//     });
//   }

//   login() {
//     this.submitted = true;
//     this.validateForm();

//     if (this.formulariologin.valid) {
//       this.servicio.login(this.formulariologin.value.username, this.formulariologin.value.password).subscribe(
//         (data: any) => {
//           console.log(data);
//           if (data) {
//             this.storage.set('username', data);
//             this.route.navigate(['/home']);
//           }
//         },
//         (error: any) => {
//           console.error('Error de inicio de sesión:', error);
//         }
//       );
//     }
//   }

//   validateForm() {
//     const formControls = this.formulariologin.controls;

//     for (const field in formControls) {
//       if (formControls.hasOwnProperty(field)) {
//         this.formErrors[field] = '';

//         const control = formControls[field];
//         if (control.invalid && (control.dirty || control.touched)) {
//           const errors = control.errors;
//           for (const key in errors) {
//             if (errors.hasOwnProperty(key)) {
//               this.formErrors[field] = 'Campo requerido';
//             }
//           }
//         }
//       }
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  medicoId: number;
  loading: any;
  loginError = false;
  formulariologin: FormGroup;
  submitted = false;
  formErrors = {
    username: '',
    password: ''
  };
  admins=[
    {
      'corrreo':'obed.castro@uab.edu.bo',
      'password':'12345678',
       
    },
    {
      'nombre':'jose.guzman@uab.edu.bo',
      'password':'12345678',


    }
  
  ]

  constructor(private fb: FormBuilder, private servicio: ApiService, private route: Router, private storage: Storage
    ,    private alertController: AlertController,
    private loadingController: LoadingController) {
    this.storage.create();
  }

  ngOnInit() {
    this.loginError = false;
    this.formulariologin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    this.formulariologin.valueChanges.subscribe(() => {
      if (this.submitted) {
        this.validateForm();
      }
    });
  }

  async login() {
    this.submitted = true;
    this.validateForm();
    console.log(this.admins[0]);
    const objetoEncontrado = this.admins.find(admin => admin.corrreo === this.formulariologin.value.username && admin.password === this.formulariologin.value.password);

if (objetoEncontrado) {
  console.log('El objeto está presente en la lista:', objetoEncontrado);
  this.route.navigate(['/adminhome']);

} else {
  console.log('El objeto no está presente en la lista');

    if (this.formulariologin.valid) {
      this.loading = await this.loadingController.create({
        message: 'Verificando datos...'
      });
      await this.loading.present();

      this.servicio.login(this.formulariologin.value.username, this.formulariologin.value.password).subscribe(
        (data: any) => {
          console.log(data);
          if (data) {
            this.medicoId = data.medico.id;
            console.log("medico",this.medicoId);
            this.storage.set('username', data);
            this.route.navigate(['/home']);
          }
          this.loading.dismiss();
        },
        (error: any) => {
          console.error('Error de inicio de sesión:', error);
          this.loginError = true;
          this.loading.dismiss();
        }
      );
    }
  }}
  validateForm() {
    const formControls = this.formulariologin.controls;

    for (const field in formControls) {
      if (formControls.hasOwnProperty(field)) {
        this.formErrors[field] = '';

        const control = formControls[field];
        if (control.invalid && (control.dirty || control.touched)) {
          const errors = control.errors;
          for (const key in errors) {
            if (errors.hasOwnProperty(key)) {
              this.formErrors[field] = 'Campo requerido';
            }
          }
        }
      }
    }
  }
}
