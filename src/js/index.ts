import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { provide, consume } from "@lit/context";
import { AuthServiceContext } from "./services/auth_service";

@customElement("my-app")
export class ProviderEl extends LitElement {
  @provide({ context: AuthServiceContext })
  @property()
  data = "Initial";

  render() {
    return html`
      <h3>Provider's data: <code>${this.data}</code></h3>
      <slot></slot>
    `;
  }
}

@customElement("consumer-el")
export class ConsumerEl extends LitElement {
  @consume({ context: AuthServiceContext })
  providedData: string = "";

  render() {
    return html` <h3>Consumer data: <code>${this.providedData}</code></h3> `;
  }
}
