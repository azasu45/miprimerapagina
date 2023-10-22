import "../css/index.css";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { provide, consume } from "@lit/context";
import { AuthServiceContext, IAuthService } from "./services/auth_service";

@customElement("my-app")
export class ProviderEl extends LitElement {
  @provide({ context: AuthServiceContext })
  @property()
  data = {
    nombre: "Initial",
  };

  render() {
    return html`<slot></slot> <slot></slot>`;
  }
}

@customElement("consumer-el")
export class ConsumerEl extends LitElement {
  @consume({ context: AuthServiceContext })
  providedData: IAuthService = {};

  render() {
    return html` <h1>${this.providedData.nombre}</h1> `;
  }
}
