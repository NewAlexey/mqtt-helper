// import { BACKEND_URL } from "./BACKEND_URL.ts";

export function handleSubmitButton(buttonElement: HTMLButtonElement): void {
    const getValues = async () => {
        const inputContainer =
            document.querySelector<HTMLDivElement>(".input_field")!;

        const [topic, payload] = [
            document.querySelector<HTMLInputElement>("#topic")!.value,
            document.querySelector<HTMLInputElement>("#payload")!.value,
        ];

        try {
            await fetch("bla", {
                method: "POST",
                body: JSON.stringify({ topic, payload }),
                headers: {
                    "content-type": "application/json",
                },
            });

            inputContainer.classList.remove("error");
            inputContainer.classList.add("all-ok");
        } catch (error) {
            inputContainer.classList.remove("all-ok");
            inputContainer.classList.add("error");
        }
    };

    buttonElement.addEventListener("click", getValues);
}
