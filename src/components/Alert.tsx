import { X } from "lucide-react"
import { useAlertStore } from "../store";
import { useEffect } from "react";

const getClassName = (alertClass: string) => {
  if (alertClass === "alert-danger") {
    return "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative";
  } else if (alertClass === "alert-success") {
    return "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative";
  } else if (alertClass === "alert-info") {
    return "bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative";
  }
};

export default function AlertMessage() {

  const alertTitle = useAlertStore((state) => state.alertTitle);
  const alertMessage = useAlertStore((state) => state.alertMessage);
  const alertClass = useAlertStore((state) => state.alertClass);

  const setAlertClass = useAlertStore((state) => state.setAlertClass);

  const setAlertMessage = useAlertStore((state) => state.setAlertMessage);

  const handleCancel = () => {
    setAlertClass("none");
  }

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertClass("none");
        setAlertMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alertMessage, setAlertClass, setAlertMessage]);

  return (
    <>
      {alertClass !== "none" && (
        <div className={getClassName(alertClass)} role="alert">
          <strong className="font-bold">{alertTitle}</strong>
          <span className="px-1 pr-2 block sm:inline">{alertMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 pl-3 px-3 py-3" style={{ cursor: "pointer" }}>
            <X onClick={handleCancel} />
          </span>
        </div>
      )}
    </>
  );
}
