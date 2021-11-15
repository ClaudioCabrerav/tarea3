import { Producto } from './../../../modelos/producto.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-producto-editar',
  templateUrl: './producto-editar.component.html',
  styleUrls: ['./producto-editar.component.css']
})
export class ProductoEditarComponent implements OnInit {

  form!: FormGroup;
  @Input() productoEditar!: Producto; 
  @Output() productoEditado = new EventEmitter<Producto>();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private activeModal: NgbModal
  ) { }

  ngOnInit(): void {
    this.crearFormulario(this.productoEditar);
  }

  crearFormulario(producto: Producto) {
    console.log(producto)
    this.form = this.fb.group({
      title: [producto.title, [Validators.required, Validators.maxLength(100)]],
      price: [producto.price, [Validators.required, Validators.min(1), Validators.max(10000000)]],
      description: [producto.description, [Validators.required, Validators.maxLength(200)]],
      image: [producto.image, [Validators.required, Validators.maxLength(200)]],
      category: [producto.category, [Validators.required, Validators.maxLength(40)]],
      rating: this.fb.group({
      count: [{value: producto.rating.count, disabled: true}, [Validators.required, Validators.min(0), Validators.max(10000000)]],
      rate: [{value: producto.rating.rate, disabled: true}, [Validators.required,Validators.min(0),Validators.max(999)]],
      }),
    });
  }

  guardarProducto() {
    if (this.form.invalid) {
      return;
    }
    this.form.disable();
    this.http.put<Producto>(environment.apiStore + 'products/'+this.productoEditar.id, this.form.value).subscribe(response => {
        console.log('response:',response);
        this.form.enable();
        this.form.reset();
        this.productoEditado.emit(response);
        this.activeModal.dismissAll(response);
    });
    console.log(this.form);
  }

}