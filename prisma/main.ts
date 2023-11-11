class Comprobacion {
  inventario_inicial: number = 0;
  compras: number = 0;
  ventas: number = 0;
  CostoDeVenta(inventario_final: number): number {
    return this.compras + this.inventario_inicial - inventario_final;
  }
}

class Kardex {
  unidad: number;
  precio: number;
  precio_total: number;
  exento: boolean = false;
  comprobacion: Comprobacion;
  constructor(
    unidad: number,
    precio: number,
    precio_total: number,
    comprobacion: Comprobacion,
    exento?: boolean
  ) {
    this.unidad = unidad;
    this.precio = precio;
    this.precio_total = precio_total;
    this.comprobacion = comprobacion;
    this.exento = exento ?? this.exento;
  }

  recalculate(): number {
    return this.comprobacion.CostoDeVenta(this.precio_total);
  }
}

class Movements {
  fecha: string;
  detalle: string;
  tipo: string;
  unidad: number;
  precio: number;
  precio_total: number;
  devolucion: boolean = false;

  constructor(
    fecha: string,
    detalle: string,
    tipo: string,
    unidad: number,
    precio: number,
    precio_total: number,
    devolucion?: boolean
  ) {
    this.fecha = fecha;
    this.detalle = detalle;
    this.tipo = tipo;
    this.unidad = unidad;
    this.precio = precio;
    this.precio_total = precio_total;
    this.devolucion = devolucion ?? this.devolucion;
  }
}

async function calculateMovement(
  kardex: Kardex,
  mov?: Movements[]
): Promise<Movements[]> {
  if (!mov) throw Error("No hay movimientos");

  const new_mov = mov.map((mov) => {
    const { tipo, devolucion, precio, unidad } = mov;

    const precio_total_calculado = unidad * precio;

    if (mov.tipo == "inicial") {
      kardex.unidad += unidad;
      kardex.precio_total += precio_total_calculado;

      kardex.comprobacion.inventario_inicial = precio_total_calculado;
    }

    if (tipo == "entrada") {
      kardex.unidad += !devolucion ? unidad : -unidad;

      kardex.precio_total += !devolucion
        ? precio_total_calculado
        : -precio_total_calculado;

      kardex.comprobacion.compras += !devolucion
        ? precio_total_calculado
        : -precio_total_calculado;
    }

    if (mov.tipo == "salida") {
      kardex.unidad -= !devolucion ? unidad : -unidad;
      kardex.precio_total -= !devolucion
        ? kardex.precio * unidad
        : -(kardex.precio * unidad);

      kardex.comprobacion.ventas += !devolucion
        ? kardex.precio * unidad
        : -(kardex.precio * unidad);
    }

    kardex.precio =
      Math.floor((kardex.precio_total / kardex.unidad) * 100) / 100;

    return mov;
  });

  return new_mov;
}

async function getMovements() {
  let kardex = new Kardex(0, 0, 0, new Comprobacion());

  let movements = [
    new Movements(
      "01/01/2009", // fecha
      "Saldo inicial al mes enero 2009", // detalle
      "inicial", // tipo
      150.0, // solo si el tipo es inicial se toma la catn de las columnas de saldo
      10.0, // solo si el tipo es inicial se toma la P.U de las columnas de saldo
      1500.0 // solo si el tipo es inicial se toma la P.T de las columnas de  saldo
    ),
    new Movements(
      "01/01/2009", // fecha
      "Compra a Proveedor 'Satipo S.A'", // detalle
      "entrada", //tipo
      150.0, // solo si el tipo es entrada se toma la catn de las columnas de entrada
      10.1, // solo si el tipo es inicial se toma la P.U de las columnas de entrada
      1515.0 // solo si el tipo es inicial se toma la P.T de las columnas de entrada
    ),
    new Movements(
      "02/01/2009", // fecha
      "Compra a Proveedor 'Napos S.A'", // detalle
      "entrada", //tipo
      350.0, // solo si el tipo es entrada se toma la catn de las columnas de entrada
      9.98, // solo si el tipo es inicial se toma la P.U de las columnas de entrada
      3493.0 // solo si el tipo es inicial se toma la P.T de las columnas de entrada
    ),
    new Movements(
      "07/01/2009", // fecha
      "Venta a la fecha", // detalle
      "salida", //tipo
      550.0, // solo si el tipo es entrada se toma la catn de las columnas de salida
      10.01, // solo si el tipo es inicial se toma la P.U de las columnas de salida
      5505.5 // solo si el tipo es inicial se toma la P.T de las columnas de salida
    ),
    new Movements(
      "08/01/2009", // fecha
      "Devolución por parte de cliente", // detalle
      "salida", // tipo
      150.0, // solo si el tipo es entrada se toma la catn de las columnas de salida
      10.01, // solo si el tipo es inicial se toma la P.U de las columnas de salida
      1501.5, // solo si el tipo es inicial se toma la P.T de las columnas de salida
      true
    ),
    new Movements(
      "10/01/2009", // fecha
      "Compra a Proveedor 'Olinis S.A'", // detalle
      "entrada", // tipo
      700.0, // solo si el tipo es entrada se toma la catn de las columnas de entrada
      9.95, // solo si el tipo es inicial se toma la P.U de las columnas de entrada
      6965.0 // solo si el tipo es inicial se toma la P.T de las columnas de  saldo
    ),
    new Movements(
      "12/01/2009", // fecha
      "Venta a la fecha", // detalle
      "salida", // tipo
      300.0, // solo si el tipo es entrada se toma la catn de las columnas de salida
      9.97, // solo si el tipo es inicial se toma la P.U de las columnas de salida
      2991.0 // solo si el tipo es inicial se toma la P.T de las columnas de salida
    ),
    new Movements(
      "15/01/2009", // fecha
      "Venta a la fecha", // detalle
      "salida", // tipo
      100.0, // unidades compradas o vendidas
      9.97, // precio de la unidad
      997.0 // precio total unidad por precio unidad
    ),
    new Movements(
      "19/01/2009", // fecha
      "Venta a la fecha", // detalle
      "salida", // tipo
      355.0, // unidades compradas o vendidas
      9.97, // precio de la unidad
      3539.35 // precio total unidad por precio unidad
    ),
    new Movements(
      "19/01/2009", // fecha
      "Compra a Proveedor 'Satipo S.A'", // detalle
      "entrada", //tipo
      900.0, // solo si el tipo es entrada se toma la catn de las columnas de entrada
      10.2, // solo si el tipo es inicial se toma la P.U de las columnas de entrada
      9180.0 // solo si el tipo es inicial se toma la P.T de las columnas de entrada
    ),
    new Movements(
      "20/01/2009", // fecha
      "Devolución de mercancía dañada", // detalle
      "entrada", //tipo
      200.0, // solo si el tipo es entrada se toma la catn de las columnas de entrada
      10.2, // solo si el tipo es inicial se toma la P.U de las columnas de entrada
      2040.0, // solo si el tipo es inicial se toma la P.T de las columnas de entrada
      true
    ),
    new Movements(
      "22/01/2009", // fecha
      "Venta a la fecha", // detalle
      "salida", // tipo
      635.0, // unidades compradas o vendidas
      10.15, // precio de la unidad
      6445.25 // precio total unidad por precio unidad
    ),
    new Movements(
      "23/01/2009", // fecha
      "Compra a Proveedor 'SantaFe S.A'", // detalle
      "entrada", //tipo
      250.0, // solo si el tipo es entrada se toma la catn de las columnas de entrada
      9.96, // solo si el tipo es inicial se toma la P.U de las columnas de entrada
      2490.0 // solo si el tipo es inicial se toma la P.T de las columnas de entrada
    ),
    new Movements(
      "24/01/2009", // fecha
      "Compra a Proveedor 'Napos S.A'", // detalle
      "entrada", //tipo
      500.0, // solo si el tipo es entrada se toma la catn de las columnas de entrada
      10.1, // solo si el tipo es inicial se toma la P.U de las columnas de entrada
      5050.0 // solo si el tipo es inicial se toma la P.T de las columnas de entrada
    ),
    new Movements(
      "27/01/2009", // fecha
      "Venta a la fecha", // detalle
      "salida", //tipo
      600.0, // solo si el tipo es entrada se toma la catn de las columnas de entrada
      10.2, // solo si el tipo es inicial se toma la P.U de las columnas de entrada
      6120.0 // solo si el tipo es inicial se toma la P.T de las columnas de entrada
    ),
    new Movements(
      "27/01/2009", // fecha
      "Compra a Proveedor 'Olinis S.A'", // detalle
      "entrada", //tipo
      700.0, // solo si el tipo es entrada se toma la catn de las columnas de entrada
      10.0, // solo si el tipo es inicial se toma la P.U de las columnas de entrada
      7000.0 // solo si el tipo es inicial se toma la P.T de las columnas de entrada
    ),
    new Movements(
      "30/01/2009", // fecha
      "Venta a la fecha", // detalle
      "salida", //tipo
      400.0, // solo si el tipo es entrada se toma la catn de las columnas de entrada
      10.03, // solo si el tipo es inicial se toma la P.U de las columnas de entrada
      4012 // solo si el tipo es inicial se toma la P.T de las columnas de entrada
    ),
    new Movements(
      "30/01/2009", // fecha
      "Venta a la fecha", // detalle
      "salida", //tipo
      350.0, // solo si el tipo es entrada se toma la catn de las columnas de entrada
      10.03, // solo si el tipo es inicial se toma la P.U de las columnas de entrada
      3510.5 // solo si el tipo es inicial se toma la P.T de las columnas de entrada
    ),
  ];

  console.table(await calculateMovement(kardex, movements));
  console.table([kardex, kardex.recalculate(), kardex.comprobacion.ventas]);
}

async function main() {
  getMovements();
}

main();

enum types {
  "compra",
  "venta",
  "inicial",
  "transporte",
}
