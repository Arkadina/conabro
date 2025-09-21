import LogoContainer from "../components/LogoContainer";
import InputContainer from "../components/InputContainer";

import logoUFRGS from "../assets/logo-ufrgs.svg";
import logoESPERO from "../assets/logo-espero.svg";
import logoODONTO from "../assets/logo-odonto.svg";

export default function Home() {
  console.log("home");
  return (
    <div className="min-h-[100vh] flex-1 bg-background-main flex ">
      <div className="bg-orange w-[300px] xl:w-[450px] flex items-center justify-between flex-col p-6 lg:p-10 ">
        <p className="text-lg text-white-gray text-center font-medium">
          Projeto desenvolvido pelo grupo ESPERO, da faculdade de Odontologia na Universidade
          federal do Rio Grande do Sul.
        </p>
        <div className="space-y-20">
          <LogoContainer src={logoESPERO} width="150" height="150" alt="" right="15" top="10" />
          <LogoContainer src={logoODONTO} width="190" height="190" alt="" left="20" top="15" />
        </div>
        <img src={logoUFRGS} alt="UFRGS logo" />
      </div>
      <div className="mx-auto py-15 space-y-4 max-w-[350px] md:max-w-[450px] lg:max-w-[600px] 2xl:max-w-[800px] ">
        <p className="text-lg lg:text-xl 2xl:text-3xl text-gray font-medium text-center">
          Você está sendo convidado para participar de um questionario, responda com suas
          informações abaixo.
        </p>
        <InputContainer />
      </div>
    </div>
  );
}
