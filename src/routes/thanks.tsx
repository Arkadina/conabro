import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Thanks() {
  const [time, setTime] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time === 0) {
      navigate("/");
    }
  }, [time, navigate]);

  return (
    <div className="min-h-[100vh] flex-1 items-center justify-center bg-background-main flex flex-col py-20 space-y-4">
      <p className="text-2xl">Obrigado por participar da pesquisa!! ❤️</p>
      <p className="text-base">Você será redirecionado para a home em {time} segundos.</p>
    </div>
  );
}
