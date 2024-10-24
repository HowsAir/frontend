import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/apiClient";
import { RegisterFormData, ToastMessageType } from "../types/mainTypes";
import { useAppContext } from "../contexts/AppContext";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const registrationAttempted = useRef(false);

  // Estado para mensajes de error
  const [errorMessage, setErrorMessage] = useState<string | null>(
    "No hay pago realizado, acción denegada"
  );

  // Mutation para el registro
  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      console.log("Registro completado con éxito");
      queryClient.invalidateQueries("validateToken");
      showToast({
        message: "Tu compra ha sido realizada con exito, comprueba tu correo",
        type: ToastMessageType.SUCCESS,
      });
      localStorage.removeItem("userData");
      navigate("/");
    },
    onError: (error: Error) => {
      console.log("Error en mutation:", error.message);
      localStorage.removeItem("userData");
      showToast({
        message: error.message,
        type: ToastMessageType.ERROR,
      });
      setErrorMessage(error.message);
    },
  });

  // Ejecutar registro solo una vez al montar
  useEffect(() => {
    const handleRegistration = () => {
      // Si ya se intentó el registro, no hacer nada
      if (registrationAttempted.current) {
        console.log("Registration already attempted, skipping");
        return;
      }

      const userData = localStorage.getItem("userData");
      console.log("Checking userData:", userData ? "exists" : "not found");

      if (!userData) {
        console.log("No userData found, showing error message");
        return;
      }

        const parsedData: RegisterFormData = JSON.parse(userData);
        console.log("Starting registration process");
        setErrorMessage(null);
        registrationAttempted.current = true;
        mutation.mutate(parsedData);
    };

    handleRegistration();
  }, []); // Empty dependency array

  // Efecto para redirección en caso de error
  useEffect(() => {
    if (errorMessage) {
      console.log("Error encontrado, redirigiendo a /register en 5 segundos");
      const timer = setTimeout(() => {
        navigate("/register");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, navigate]);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="text-center">
        {errorMessage ? (
          <div className="text-red-600 text-lg mb-4">{errorMessage}</div>
        ) : (
          <>
            <div className="text-2xl mb-4">Estamos procesando tu pago</div>
            <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 mb-4 animate-spin mx-auto"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
