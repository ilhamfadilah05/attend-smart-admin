import toast from "react-hot-toast";

export default function alertNotification(description: string, status: string, duration?: number) {
  switch (status) {
    case "success":
      toast.success(description, {
        duration: duration || 3000,
        position: "top-right",
        style: {
          background: "#00b324",
          color: "white",
          padding: "8px",
          zIndex: "9999",
        },
      });
      break;

    case "error":
      toast.error(description, {
        duration: duration || 6000,
        position: "top-right",
        style: {
          background: "#D04848",
          color: "white",
          padding: "8px",
          zIndex: "9999",
        },
      });
      break;

    default:
      toast.success(description, {
        position: "top-right",
        className: "bg-green",
        style: {
          zIndex: "9999",
        },
      });
      break;
  }
}
