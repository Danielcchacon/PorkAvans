import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// @ts-ignore
import { AuthService } from '../auth.service';
// @ts-ignore
import ApexCharts from 'apexcharts';
import { CardData, GrafData, Producto, ProductosResponse  } from '../../app/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  usuarios: number = 0;
  total_distribuidores: number = 0;
  total_deuda: number = 0;
  pago_mes: number = 0;
  total_productos: number = 0;
  cardData: CardData[] = [];  // Variable para almacenar los datos de las tarjetas
  grafData: GrafData[] = [];  // Variable para almacenar los datos del gráfico
  productosData: Producto[] = [];  // Variable para almacenar los datos de productos
  userRole: string = '';  // Agregar propiedad para el rol


  constructor(private router: Router, private authService: AuthService) {
    const token = localStorage.getItem('access_token');
    this.getUserRole(); 
    if (!token) {
      this.router.navigate(['/login']).then(() => {
        // Puedes agregar alguna acción aquí si es necesario
      }).catch(error => {
        // Manejo de errores si la navegación falla
        console.error('Error durante la navegación:', error);
      });
    }
    
  }

  
  getUserRole() {
    const role = localStorage.getItem('user_rol');  // Suponiendo que el rol está guardado en el localStorage
    console.log(this.userRole);
    this.userRole = role ? role : '';  // Si no hay rol, asignar un valor por defecto
    
  }

  ngOnInit(): void {
    this.authService.getGrafica().subscribe(
      (data: GrafData[]) => { // Asumimos que data es un array de GrafData
        this.grafData = data; // Directamente asignamos data a grafData
        console.log('Datos de la gráfica:', this.grafData);
        this.initChart(this.grafData); // Pasamos el array directamente
      },
      error => console.error('Error al obtener los datos de la gráfica', error)
    );

    this.setupMenuInteractions();
    this.loadDashboardData();
    this.loadCardData();  // Cargar los datos de las tarjetas
    this.loadgrafData();
    this.loadProductosData(); // Cargar los datos de productos
  }



  initChart(data: GrafData[]): void {
    // Verificar si 'graficaData' es un array
    const graficaData = data;
    if (!Array.isArray(graficaData)) {
      console.error('Los datos proporcionados no son un array:', graficaData);
      
    }

    const baldeGrandeData: any[] = [];
    const baldePequenoData: any[] = [];
    const baldePequenoGratisData: any[] = [];
    const purinadeengorde: any[] =[];
    const purinadelevante: any[] =[];

    // Agrupar los datos por tipo de producto y fecha
    const groupedData: { [key: string]: { [key: number]: number } } = graficaData.reduce(
      (acc: { [key: string]: { [key: number]: number } }, { mes, producto_tipo, cantidad }) => {
        const timestamp = new Date(mes).getTime();

        if (!acc[producto_tipo]) {
          acc[producto_tipo] = {};
        }

        if (!acc[producto_tipo][timestamp]) {
          acc[producto_tipo][timestamp] = 0;
        }

        acc[producto_tipo][timestamp] += cantidad;

        return acc;
      },
      {} // Valor inicial de acc
    ); 
       
    Object.keys(groupedData).forEach(productoTipo => {
      const data = Object.entries(groupedData[productoTipo])
        .map(([timestamp, cantidad]) => [parseInt(timestamp, 10), cantidad]);

      if (productoTipo === 'BALDE GRANDE') {
        baldeGrandeData.push(...data);
      } else if (productoTipo === 'BALDE PEQUEÑO') {
        baldePequenoData.push(...data);
      } else if (productoTipo === 'BALDE PEQUEÑO GRATIS') {
        baldePequenoGratisData.push(...data);
      }else if (productoTipo === 'PURINA DE ENGORDE'){
        purinadeengorde.push(...data);
      }else if (productoTipo === 'PURINA DE LEVANTE'){
        purinadelevante.push(...data);
      }
    });

    // Configuración de la gráfica
    const options = {
      chart: {
        height: 380,
        type: "line"
      },
      series: [
        {
          name: "Balde Grande",
          type: "column",
          data: baldeGrandeData
        },
        {
          name: "Balde Pequeño",
          type: "column",
          data: baldePequenoData
        },
        {
          name: "Balde Pequeño Gratis",
          type: "column",
          data: baldePequenoGratisData
        },
        {
          name: "Purina de Levante",
          type: "column",
          data: purinadelevante
        },
        {
          name: "Purina de Engorde",
          type: "column",
          data: purinadeengorde
        }
      ],
      stroke: {
        width: [0, 4],
        curve: 'smooth'
      },
      title: {
        text: "Trafico de Productos",
        align: 'center',
        style: {
          fontSize: '26px',
          fontWeight: 700,
          fontFamily: 'Arial, sans-serif',
          color: '#333',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
        }
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Productos Recolectados"
          }
        }
      ],
      tooltip: {
        x: {
          format: 'dd MMM yyyy' // Formato de la fecha en el tooltip
        }
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }
  



  setupMenuInteractions(): void {
    // Resto del código JavaScript
    const html = document.documentElement;
    const body = document.body;
    const menuLinks = document.querySelectorAll(".admin-menu a");
    const collapseBtn = document.querySelector(".admin-menu .collapse-btn");
    const toggleMobileMenu = document.querySelector(".toggle-mob-menu");
    const switchInput = document.querySelector(".switch input");
    const switchLabel = document.querySelector(".switch label");
    // const switchLabelText = switchLabel.querySelector("span:last-child");
    const collapsedClass = "collapsed";
    const lightModeClass = "light-mode";

    /*TOGGLE HEADER STATE*/
    //   collapseBtn.addEventListener("click", function () {
    //     body.classList.toggle(collapsedClass);
    //     this.getAttribute("aria-expanded") == "true"
    //       ? this.setAttribute("aria-expanded", "false")
    //       : this.setAttribute("aria-expanded", "true");
    //     this.getAttribute("aria-label") == "collapse menu"
    //       ? this.setAttribute("aria-label", "expand menu")
    //       : this.setAttribute("aria-label", "collapse menu");
    //   });
    //
    //   /*TOGGLE MOBILE MENU*/
    //   toggleMobileMenu.addEventListener("click", function () {
    //     body.classList.toggle("mob-menu-opened");
    //     this.getAttribute("aria-expanded") == "true"
    //       ? this.setAttribute("aria-expanded", "false")
    //       : this.setAttribute("aria-expanded", "true");
    //     this.getAttribute("aria-label") == "open menu"
    //       ? this.setAttribute("aria-label", "close menu")
    //       : this.setAttribute("aria-label", "open menu");
    //   });
    //
    //   /*SHOW TOOLTIP ON MENU LINK HOVER*/
    //   for (const link of menuLinks) {
    //     link.addEventListener("mouseenter", function () {
    //       if (
    //         body.classList.contains(collapsedClass) &&
    //         window.matchMedia("(min-width: 768px)").matches
    //       ) {
    //         const tooltip = this.querySelector("span").textContent;
    //         this.setAttribute("title", tooltip);
    //       } else {
    //         this.removeAttribute("title");
    //       }
    //     });
    //   }
    //
    //   /*TOGGLE LIGHT/DARK MODE*/
    //   if (localStorage.getItem("dark-mode") === "false") {
    //     html.classList.add(lightModeClass);
    //     switchInput.checked = false;
    //     // switchLabelText.textContent = "Light"; // Ajusta según tu necesidad
    //   }
    //
    //   switchInput.addEventListener("input", function () {
    //     html.classList.toggle(lightModeClass);
    //     if (html.classList.contains(lightModeClass)) {
    //       // switchLabelText.textContent = "Light";
    //       localStorage.setItem("dark-mode", "false");
    //     } else {
    //       // switchLabelText.textContent = "Dark";
    //       localStorage.setItem("dark-mode", "true");
    //     }
    //   });
    // }

  }

  
  loadProductosData(): void {
    this.authService.get_productos().subscribe(
      (response: ProductosResponse) => {
        this.productosData = response.productos;
        console.log('Datos de los productos:', this.productosData);
      },
      error => console.error('Error al obtener los productos', error)
    );
  }


  loadCardData(): void {
    this.authService.getCardData().subscribe(
      data => {
        this.cardData = data;
        console.log('Datos de las tarjetas:', this.cardData);
      },
      error => console.error('Error al obtener los datos de las tarjetas', error)
    );
  }

  loadgrafData(): void {
    this.authService.getGrafica().subscribe(
      data => {
        this.grafData = data;
        console.log('Datos de la grafica:', this.grafData);
      },
      error => console.error('Error al obtener los datos de la grafica', error)
    );
  }

  loadDashboardData(): void {
    this.authService.getUsuarios().subscribe(
      data => {
        this.usuarios = data.total_users; // Usa 'total_users' en lugar de 'count'
        console.log('Cantidad de usuarios:', this.usuarios);
      },
      error => console.error('Error al obtener usuarios', error)
    );

    this.authService.getDistribuidores().subscribe(
      data => {
        this.total_distribuidores = data.total_distribuidores; // Usa 'total_distribuidores' en lugar de 'count'
        console.log('Cantidad de distribuidores:', this.total_distribuidores);
      },
      error => console.error('Error al obtener distribuidores', error)
    )

    this.authService.getDeuda().subscribe(
      data => {
        this.total_deuda = data.total_deuda; // Usa 'total_distribuidores' en lugar de 'count'
        console.log('Total de la Deuda:', this.total_deuda);
      },
      error => console.error('Error al obtener la deuda', error)
    )

    this.authService.get_pago_mes().subscribe(
      data => {
        this.pago_mes = data.pago_mes; // Usa 'total_distribuidores' en lugar de 'count'
        console.log('Pago en el Mes:', this.pago_mes);
      },
      error => console.error('Error al obtener el pago del mes', error)
    )

    this.authService.get_total_productos().subscribe(
      data => {
        this.total_productos = data.total_productos;
        console.log('Cantidad Total de Productos:', this.total_productos);
      },
      error => console.error('Error al obtener el total de produtos', error)
    )

  }
}



// --------------------------------

