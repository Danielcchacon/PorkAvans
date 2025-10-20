import { Injectable } from '@angular/core';
import { Observable, throwError, map } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError } from 'rxjs/operators';

// ---------------------------------------------
// Define las interfaces necesarias
export interface ComidaSuministrada {
  corral_id: string;
  producto: string;
  cantidad: number;
  fecha_suministro: Date;
  usuario: string;
}

//----------------------------------
//interfaz de fase de crianza
export interface FaseCrianza {
  fase_crianza_id: number;
  nombre_fase: string;
  descripcion_fase?: string;
  edad_min_semanas?: number;
  edad_max_semanas?: number;
  peso_min_kg?: number;
  peso_max_kg?: number;
  consumo_alimento_dia_kg?: number;
  consumo_agua_dia_litros?: number;
  ganancia_diaria_gr?: number;
  tipo_alimento?: string;
  duracion_dias_estimada?: number;
  fecha_creacion?: string;
  creado_por?: string;
}

//---------------------------------------------
// Interfaz para la respuesta del endpoint de un solo usuario
export interface UsuarioData {
  imagen: string;
  id: string;
  nombre: string;
  correo: string;
  celular: string;
  user_rol: string;
}

//--------------------------------------------
export interface ComidaSuministradaResponse {
  comidas_suministradas: ComidaSuministrada[];
}
// ---------------------------------------------
export interface ComidaSuministrada {
  corral_id: string;
  producto: string;
  cantidad: number;
  fecha_suministro: Date;
  usuario: string;
}

export interface ComidaSuministradaResponse {
  comidas_suministradas: ComidaSuministrada[];
}

// ---------------------------------------------
// Definición de la interfaz CardData
export interface CardData {
  nombre: string;
  direccion: string;
  telefono: string | null;
  imagen: string;
  descripcion: string;
}

//Definicion de lainterface de ver distribuidores 
export interface Distributor {
  distributor_id: number;
  distributor_name: string;
  distributor_address: string;
  distributor_quarter: string;
  status_collection_id: number;
  collection_id: number;
  cell_phone: string;
  register_date: string;
  type_distributor: number;
  status_distributor: string;
  image: string | null;  // base64 string o null
}

export interface DistributorsResponse {
  distributors: Distributor[];
}

interface TarjetasResponse {
  tarjetas: CardData[];
}

export interface GrafData {

  mes: string;
  producto_tipo: string;
  cantidad: number;
}


interface GraficaResponse {
  graficas: GrafData[];
}

//interface de product-sale
export interface ProductosResponse {
  productos: Producto[]; // El array de productos dentro de un objeto
}

export interface ProductSale {
  product_sale_id: number;
  product_sale_name: string;
  product_sale_description: string;
  price: string;
  product_category_sale_description: string;
  product_sale_quantity: number;
  product_sale_imagen: string; // Asumiendo que `product_sale_imagen` está en formato base64 como string
  commission_id: number;
  commission_description: string;
  commission_value: number;
  commission_type_id: number;
  commission_type_description: string;
}

export interface ProductSaleAfiliado {
  product_sale_id: number;
  associate_id: string;
  product_sale_name: string;
  product_category_sale_description: string;
  price: number;
  commission_type_description: string;
  description_commission: string;
  commission_value: number;
  product_sale_quantity: number;
  start_date: string;
}



// Definición de la interfaz para un producto
export interface Producto {
  id_producto: number;
  nombre_producto: string;
  precio: string;
  descripcion: string;
}

// Definición de la interfaz para la respuesta que contiene productos
export interface Producto {
  product_name: string;
  product_description: string;
  price: number;
  description_category: string;
}


export interface ProductoRecolectado {
  user: string;
  distribuidor: string;
  fecha_recoleccion: string;
  cantidad_producto: number;
  nombre_producto: string;
}

// Definición de la interfaz para la respuesta que contiene productos
export interface ProductoRecolectadoResponse {
  productos_recolectados: ProductoRecolectado[];
}

//interface de categoria
export interface ProductCategorySale {
  product_category_sale_id: number;
  description: string;
}

//interface de comision 
export interface CommissionResponse {
  commission_id: number;
  value: number;
  commission_type_description: string;
}

//interface de productos de venta
export interface ProductSale {
  name_product: string;
  price: string;  // Puedes usar string o number dependiendo de cómo lo manejes en el frontend
  description: string;
  category_id: number;
  quantity: number;
  product_sale_imagen: string; // Aquí va la imagen, que puede ser un string en base64
  commissions_id: number;
}

//interface de sale
export interface Sale {
  venta_id: string;
  asociado_id: string;
  name: string;
  cantidad: number;
  fecha_venta: string;  // o Date dependiendo de cómo lo recibas
  total_venta: number;
  comision_generada: number;
  imagen_de_venta: string;
  estado_venta: string;
  correo_venta: string;
  observacion_venta: string;
}

export interface PreVenta {
  pre_venta_id: number;
  pre_venta_asociado_id: string;
  product_name: string;
  pre_venta_cantidad: number;
  fecha_pre_venta: string;
  total_pre_venta: number;
  imagen_pre_venta: string;
}

export interface Response {
  status: number;
  message: string;
  data: PreVenta[];
}

export interface FaseCrianzaListResponse {
  fases: FaseCrianza[];
}




@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000'; // URL del endpoint para obtener el token

  constructor(private http: HttpClient) {
  }


  // Método para traer los productos
  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/productos/view_products`);
  }

  //Metodo para traer las fases de crianza
  getFasesCrianza(): Observable<FaseCrianzaListResponse> {
    return this.http.get<FaseCrianzaListResponse>(`${this.apiUrl}/fase_crianza/view_fases_crianza`);
  }

  addProduct(payload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/productos/add_product`, payload);
  }


  // Método para actualizar el estado de la pre-venta
  changePreSaleStatus(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/sale_and_presale_router/change-status-pre-sale`, data);
  }

  // Método para obtener las ventas por asociado
  getSales(associateId: string): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/sale_and_presale_router/sales/${associateId}`);
  }

  //Metodo para obtener todos los distribuidores
  getDistributors(): Observable<DistributorsResponse> {
    return this.http.get<DistributorsResponse>(`${this.apiUrl}/distribuidor/view_distributors`);
  }


  // Método para crear un producto de venta
  createProductSale(product: any): Observable<any> {
    const url = `${this.apiUrl}/products-sales/create-product-sales`;  // Endpoint de FastAPI
    return this.http.post<any>(url, product).pipe(
      catchError((error) => {
        console.error('Error al crear el producto de venta:', error);
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Método para obtener las categorías
  public getCategories(): Observable<ProductCategorySale[]> {
    const url = `${this.apiUrl}/categority-product-sale/categories`;
    return this.http.get<ProductCategorySale[]>(url);
  }

  // Método para obtener las comisiones
  public getCommissions(): Observable<CommissionResponse[]> {
    const url = `${this.apiUrl}/commission-product-sale/commissions`;
    return this.http.get<CommissionResponse[]>(url);
  }

  //metodo para traer los productos por afiliado
  getProductsByAssociate(associateId: string): Observable<ProductSaleAfiliado[]> {
    const url = `${this.apiUrl}/associate-commission/get-products-sale-by-associate?associate_id=${associateId}`;
    console.log('URL solicitada:', url); // Depuración
    return this.http.get<ProductSaleAfiliado[]>(url).pipe(
      catchError(error => {
        console.error('Error al obtener las ventas de productos', error);
        return throwError(error);
      })
    );
  }

  // Obtener los tipos de comisión
  getCommissionTypes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/commission-product-sale/commissions_type`);
  }

  // Crear una nueva comisión
  createCommission(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/commission-product-sale/create_commissions`, data);
  }

  //metodo para hacer la compra
  createPreSale(preSaleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/sale_and_presale_router/create-pre-sales`, preSaleData);
  }


  private handleError(error: HttpErrorResponse) {
    console.error('Error en el servicio:', error);
    return throwError('Error al realizar la petición. Inténtalo de nuevo más tarde.');
  }

  //metodo para obtener la generacion del enlace
  getProductLinkByIdAndAssociate(productSaleId: number, associateId: string): Observable<string> {
    const url = `${this.apiUrl}/associate-commission/create-associates-commission`; // El URL para POST
    const body = {
      product_id: productSaleId,
      associate_id: associateId
    };



    return this.http.post<string>(url, body);  // Usamos POST
  }


  //metodo para obtener infromaciond e un solo producto
  getProductSaleById(productSaleId: number): Observable<ProductSale> {
    return this.http.get<ProductSale>(`${this.apiUrl}/products-sales/get-product-sale-by-id?product_sale_id=${productSaleId}`);
  }

  //método para obtener roles desde el backend
  getRoles(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiUrl}/user_rol/roles`, { headers });
  }

  //Metodo para actualizar un usuario 
  updateUser(id: string, data: any, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put(`${this.apiUrl}/api/update/${id}`, data, { headers });
  }

  //metodo para obtener los productos en venta 
  public getProductsSales(user_id: string): Observable<ProductSale[]> {
    return this.http.get<ProductSale[]>(`${this.apiUrl}/products-sales/products-sales?associate_id=${user_id}`).pipe(
      catchError(error => {
        console.error('Error al obtener las ventas de productos', error);
        return throwError(error);
      })
    );
  }

  getPendingSalesEvaluation(): Observable<any> {
    const url = `${this.apiUrl}/sale_and_presale_router/pending-sales-evaluation`;

    return this.http.get<any>(url).pipe(
      map(response => {
        // Verificar la estructura de la respuesta
        console.log('Respuesta de la API:', response); // Aquí puedes verificar si la respuesta contiene la propiedad 'data'
        return response; // Extraer los datos de las preventas
      }),
      catchError((error) => {
        console.error('Error al obtener las ventas pendientes:', error);
        throw error;
      })
    );
  }


  //metodo para obtener el producto que se esta promocionando por el enlace
  getProductDetails(productId: string, associateId: string): Observable<any> {
    const url = `${this.apiUrl}/associate-commission/product/${productId}/${associateId}`;
    return this.http.get<any>(url);
  }

  // Método para obtener productos del stock
  getStockProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stock-products/stock-products`); // Asegúrate que esta es la ruta correcta
  }

  // Método para obtener un usuario por su ID
  public getUsuarioPorId(id: string, token: string): Observable<UsuarioData> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Incluye el token en el encabezado
    });

    return this.http.get<UsuarioData>(`${this.apiUrl}/api/user/?id=${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener el usuario', error);
        return throwError(error);
      })
    );
  }

  // auth.service.ts
  createUser(userData: any, token: string): Observable<any> {
    const headers = { Authorization: `Bearer ${token}` }; // Agrega el token de autorización si es necesario
    return this.http.post(`${this.apiUrl}/api/insert`, userData, { headers });
  }


  // Nuevo método para obtener la comida suministrada
  public getComidaSuministrada(): Observable<ComidaSuministradaResponse> {
    return this.http.get<ComidaSuministradaResponse>(`${this.apiUrl}/comida-suministrada/comida-suministrada`).pipe(
      catchError(error => {
        console.error('Error al obtener la comida suministrada', error);
        return throwError(error);
      })
    );
  }

  public getUsuariosAutenticados(token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Se incluye el token en el encabezado
    });

    return this.http.get<any[]>(`${this.apiUrl}/`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener los usuarios autenticados', error);
        return throwError(error);
      })
    );
  }

  public login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    let body = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.post(this.apiUrl + '/token', body.toString(), { headers }).pipe(
      catchError(error => {
        console.error('Error en el servicio de login', error);
        return throwError(error);
      })
    );
  }

  // Método para almacenar token y rol en el localStorage
  public storeUserData(token: string, role: string, userEstado: string): void {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_rol', role);
    localStorage.setItem('user_estado', userEstado);
  }

  // Método para obtener el token almacenado
  public getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Método para verificar si el usuario está autenticado
  public isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Método para obtener el rol del usuario almacenado
  public getUserRole(): string | null {
    return localStorage.getItem('user_rol');
  }

  // Método para obtener el estado del usuario almacenado
  public getUserStatus(): string | null {
    return localStorage.getItem('user_estado');
  }

  public getUsuarios(): Observable<{ total_users: number }> {
    return this.http.get<{ total_users: number }>(`${this.apiUrl}/dashboard/total_users`).pipe(
      catchError(error => {
        console.error('Error al obtener usuarios', error);
        return throwError(error);
      })
    );
  }

  public getDeuda(): Observable<{ total_deuda: number }> {
    return this.http.get<{ total_deuda: number }>(`${this.apiUrl}/dashboard/total_deuda`).pipe(
      catchError(error => {
        console.error('Error al obtener la deuda', error);
        return throwError(error);
      })
    );
  }

  public getDistribuidores(): Observable<{ total_distribuidores: number }> {
    return this.http.get<{ total_distribuidores: number }>(`${this.apiUrl}/dashboard/total_distribuidores`).pipe(
      catchError(error => {
        console.error('Error al obtener distribuidores', error);
        return throwError(error);
      })
    );
  }

  public get_pago_mes(): Observable<{ pago_mes: number }> {
    return this.http.get<{ pago_mes: number }>(`${this.apiUrl}/dashboard/pago_mes`).pipe(
      catchError(error => {
        console.error('Error al obtener el pago del mes', error);
        return throwError(error);
      })
    );
  }

  public get_total_productos(): Observable<{ total_productos: number }> {
    return this.http.get<{ total_productos: number }>(`${this.apiUrl}/dashboard/total_productos`).pipe(
      catchError(error => {
        console.error('Error al obtener el total de productos', error);
        return throwError(error);
      })
    );
  }

  public getCardData(): Observable<CardData[]> {
    return this.http.get<TarjetasResponse>(`${this.apiUrl}/dashboard/tarjetas`).pipe(
      map(response => response.tarjetas), // Extrae el array de tarjetas de la respuesta
      catchError(error => {
        console.error('Error al obtener los datos de las tarjetas', error);
        return throwError(error);
      })
    );
  }

  public get_productos(): Observable<ProductosResponse> {
    return this.http.get<ProductosResponse>(`${this.apiUrl}/dashboard/productos`).pipe(
      catchError(error => {
        console.error('Error al obtener los productos', error);
        return throwError(error);
      })
    );
  }

  public getGrafica(): Observable<GrafData[]> {
    return this.http.get<GraficaResponse>(`${this.apiUrl}/dashboard/grafica`).pipe(
      map(response => response.graficas),
      catchError(error => {
        console.error('Error al obtener los datos de la grafica', error);
        return throwError(error);
      })
    );
  }

  public getProductosRecolectados(): Observable<ProductoRecolectadoResponse> {
    return this.http.get<ProductoRecolectadoResponse>(`${this.apiUrl}/recollection/productos-recolectados`).pipe(
      catchError(error => {
        console.error('Error al obtener los productos recolectados', error);
        return throwError(error);
      })
    );
  }

  public agregarProductoRecolectado(producto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/recollection/agregar-producto-recolectado`, producto).pipe(
      catchError(error => {
        console.error('Error al agregar el producto recolectado', error);
        return throwError(error);
      })
    );
  }

  // Método para agregar comida suministrada
  public agregarComidaSuministrada(comida: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/comida-suministrada/agregar-comida-suministrada`, comida).pipe(
      catchError(error => {
        console.error('Error al agregar la comida suministrada', error);
        return throwError(error);
      })
    );
  }

  // Método para actualizar el estado del usuario
  public actualizarEstadoUsuario(userId: string, estado: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Asegúrate de enviar el tipo de contenido adecuado
    });
    const url = `${this.apiUrl}/api/update_status/${userId}?status=${estado}`;

    return this.http.put<any>(url, {}, { headers }).pipe(  // El cuerpo está vacío porque los parámetros se envían como query
      catchError(error => {
        console.error('Error al actualizar el estado del usuario', error);
        return throwError(error);
      })
    );

  }


}


