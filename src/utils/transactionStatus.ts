export function getStatusProps(status: string): {
  text: string;
  color: string;
} {
  switch (status) {
    case "SUCCEEDED":
      return { text: "Completado", color: "#22c55e" }; // verde
    case "PENDING":
      return { text: "Pendiente", color: "#facc15" }; // amarillo
    case "FAILED":
      return { text: "Fallido", color: "#ef4444" }; // rojo
    default:
      return { text: "Desconocido", color: "#a1a1aa" }; // gris
  }
}
