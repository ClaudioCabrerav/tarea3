<!-- Button trigger modal -->
<div class="text-right mx-2 my-2">
    <button type="button" class="btn btn-primary mx-2" (click)="abrirModal(crearProductoModal)">
        Crear Producto
    </button>
</div>

<!-- Modal -->
<ng-template #crearProductoModal let-modal>
    <div class="modal-header">
        <h4 class="modal-title" id="modal-basic-title">Crear Producto</h4>
        <button type="button" class="close" aria-label="Close" (click)="modal.close('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <!-- <app-crear-producto (productoCreado)="cargarProductos()"></app-crear-producto> -->
        <app-crear-producto></app-crear-producto>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="modal.close('Cross click')">Cerrar</button>
    </div>
</ng-template>


<div *ngIf="loading; else mostrarProductos">
    Cargando productos.
</div>
<ng-template #mostrarProductos>
    <div class="table-responsive">
        <table class="table table-sm table-hover">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Imagen</th>
                    <th scope="col">Título</th>
                    <th scope="col">Categoría</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let producto of productos">
                    <th>{{producto.id}}</th>
                    <td>
                        <div style="width: 48px; height: 48px;">
                            <img [src]="producto.image" width="48px" height="48px">
                        </div>
                    </td>
                    <td>{{producto.title}}</td>
                    <td>{{producto.category}}</td>
                    <td>${{producto.price}}</td>
                    <td>
                        <button type="button" class="btn btn-success mx-2" (click)="abrirModal(editarProductoModal)">
                                Editar
                            </button>

                        <ng-template #editarProductoModal let-modal>
                            <div class="modal-header">
                                <h4 class="modal-title" id="modal-basic-title">Editar Producto</h4>
                                <button type="button" class="close" aria-label="Close" (click)="modal.close('Cross click')">
                                    <span aria-hidden="true">&times;</span>
                                  </button>
                            </div>
                            <div class="modal-body">
                                <app-producto-editar [productoEditar]="producto"></app-producto-editar>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline-dark" (click)="modal.close('Cross click')">Cerrar</button>
                            </div>
                        </ng-template>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</ng-template>

<!-- <app-lista-categorias></app-lista-categorias> -->