import { describe, expect, test, vi } from "vitest"
import { createRoot } from "react-dom/client";

vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

describe("index.tsx", () => {
  test("should render app into root element", async () => {
    // Creamos un div root falso en el DOM
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);

    // Importamos el entrypoint DESPUÉS de mockear
    await import("./main");

    // Verificamos que createRoot fue llamado con el div
    expect(createRoot).toHaveBeenCalledWith(root);

    // Y que a ese root se le llamó a .render con algo (StrictMode + GifsApp)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance = (createRoot as any).mock.results[0].value;
    expect(instance.render).toHaveBeenCalledTimes(1);
  });
});