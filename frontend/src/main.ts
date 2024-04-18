import "./styles/style.css";
import "./styles/common-styles.scss";
// import { handleSubmitButton } from "./handleSubmitButton.ts";
import { App } from "src/view/app.ts";

// document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
//   <div>
//     <div class="work_field">
//         <div class="input_field">
//             <input placeholder="Topic" id="topic">
//             <input placeholder="Payload" id="payload">
//         </div>
//         <button type="button" id="submit-button">Submit value</button>
//     </div>
//   </div>
// `;
//
// handleSubmitButton(
//     document.querySelector<HTMLButtonElement>("#submit-button")!,
// );

new App().init();
