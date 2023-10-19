import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

import { consume } from "@lit/context";
import { AuthServiceContext } from "../services/auth_service";

@customElement("listado-el")
export class ListadoAsientos extends LitElement {
  @consume({ context: AuthServiceContext })
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
