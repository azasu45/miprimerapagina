import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("listado-el")
export class ListadoAsientos extends LitElement {
  providedData = "";

  render() {
    return html`<p>${this.providedData}</p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "listado-el": ListadoAsientos;
  }
}
