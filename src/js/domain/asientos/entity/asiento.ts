export class Asiento {
  descripcion: string;
  monto: number;

  constructor({ descripcion, monto }: { descripcion: string; monto: number }) {
    (this.descripcion = descripcion), (this.monto = monto);
  }
}
