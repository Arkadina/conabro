import react, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Stepper, StepperIndicator, StepperItem, StepperTrigger } from "../components/ui/stepper";

import { useNavigate, useSearchParams } from "react-router";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

export default function HowItWorks() {
  return (
    <div className="min-h-[100vh] flex-1 items-center justify-between bg-background-main flex flex-col py-20">
      <HowItWorksStepper />
    </div>
  );
}

const steps = [1, 2];

const stepContents = [
  {
    key: "step1",
    content: (
      <>
        <p className="text-2xl">
          Serão apresentadas, em sequência, 30 imagens radiográficas interproximais.
        </p>
        <br />
        <p className="text-2xl">
          O avaliador deverá classificar cada imagem de acordo com a adequação da angulação
          vertical, utilizando os seguintes critérios:
        </p>
        <br />
        <ul className="ml-8 list-none space-y-3 text-base flex flex-col">
          <li className="bg-green text-white px-4 py-2 rounded-lg relative pl-6 before:content-['•'] before:absolute before:left-2 before:text-white 2xl:text-xl">
            Imagem não comprometida: quando a angulação vertical é adequada para a interpretação da
            COA.
          </li>
          <li className="bg-red text-white px-4 py-2 rounded-lg relative pl-6 before:content-['•'] before:absolute before:left-2 before:text-white 2xl:text-xl">
            Imagem comprometida: quando a angulação vertical, é inadequada para a interpretação da
            crista óssea alveolar (COA).
          </li>
        </ul>
      </>
    ),
  },
  {
    key: "step2",
    content: (
      <p className="text-2xl">
        Você deverá avaliar 30 imagens, com um tempo estimado de 5 segundos para cada uma.
      </p>
    ),
  },
];

function HowItWorksStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  function handleOnClick() {
    if (currentStep >= steps.length) {
      return navigate(`/evaluation?participant_id=${searchParams.get("participant_id")}`);
    }

    return setCurrentStep((prev) => prev + 1);
  }

  return (
    <div className="flex flex-1 items-center flex-col justify-between w-full h-full px-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepContents[currentStep - 1]?.key}
          className="px-20 h-full flex-1 justify-center flex flex-col"
          initial={{ opacity: 0, x: currentStep > 1 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(event, info) => {
            if (info.offset.x < 0 && currentStep < stepContents.length) {
              setCurrentStep((prev) => prev + 1);
            } else if (info.offset.x > 0 && currentStep > 1) {
              setCurrentStep((prev) => prev - 1);
            }
          }}
        >
          {stepContents[currentStep - 1]?.content}
        </motion.div>
      </AnimatePresence>
      <div className="mx-auto max-w-xl space-y-8 text-center">
        <div className="space-y-3">
          <Stepper value={currentStep} onValueChange={setCurrentStep} className="gap-1">
            {steps.map((step) => (
              <StepperItem key={step} step={step} className="flex-1">
                <StepperTrigger className="w-full flex-col items-start gap-2" asChild>
                  <StepperIndicator asChild className="bg-border h-1 w-full"></StepperIndicator>
                </StepperTrigger>
              </StepperItem>
            ))}
          </Stepper>
        </div>
        <div className="flex justify-center space-x-4">
          <Button
            variant="secondary"
            className="w-32"
            onClick={() => setCurrentStep((prev) => prev - 1)}
            disabled={currentStep === 1}
          >
            Voltar
          </Button>
          <Button
            variant="secondary"
            className={cn("w-32", currentStep >= steps.length && "bg-orange text-white")}
            onClick={() => handleOnClick()}
          >
            {currentStep >= steps.length ? "Começar" : "Próximo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
