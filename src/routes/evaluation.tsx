import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "../lib/utils";
import { CheckIcon } from "lucide-react";
import { supabase } from "../services/supabase";
import { useNavigate, useSearchParams } from "react-router";
import { Spinner } from "../components/ui/spinner";

const imageNames = [
  "BW-2.jpg",
  "BW-3.jpg",
  "BW-4.jpg",
  "BW-11.jpg",
  "BW-5.jpg",
  "BW-8.jpg",
  "BW-6.jpg",
  "BW-10.jpg",
  "BW-7.jpg",
  "BW-12.jpg",
  "BW-37.jpg",
  "BW-9.jpg",
  "BW-13.jpg",
  "BW-16.jpg",
  "BW-15.jpg",
  "BW-1.jpg",
  "BW-17.jpg",
  "BW-14.jpg",
  "BW-18.jpg",
  "BW-20.jpg",
  "BW-19.jpg",
  "BW-23.jpg",
  "BW-22.jpg",
  "BW-21.jpg",
  "BW-26.jpg",
  "BW-24.jpg",
  "BW-27.jpg",
  "BW-38.jpg",
  "BW-25.jpg",
  "BW-39.jpg",
];

type answersType = {
  key: number;
  image_id: string;
  answer: string;
};

// colocar som

function Evaluation() {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [lastImage, setLastImage] = useState<number>(0);
  const [answers, setAnswers] = useState<answersType[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  let participant_id = searchParams.get("participant_id");

  const submitAnswers = useCallback(async () => {
    if (answers.length === imageNames.length) {
      const { error } = await supabase.from("answers").insert(
        answers.map((answer) => ({
          participant_id,
          image_name: answer.image_id,
          evaluation: answer.answer,
        }))
      );

      if (error) {
        alert(error);
      }

      navigate("/thanks");
    }
  }, [answers, imageNames.length, participant_id, supabase]);

  useEffect(() => {
    if (answers.length === imageNames.length) {
      submitAnswers();
    }
  }, [currentImage, imageNames.length, submitAnswers]);

  async function handleAnswer(answer: string) {
    if (answers.length < imageNames.length) {
      const formattedAnswer = {
        key: currentImage,
        image_id: imageNames[currentImage],
        answer,
      };

      const newAnswerIndex = answers.findIndex((filterAnswer) => {
        console.log(filterAnswer.key == currentImage && "igual");
        return filterAnswer.key == currentImage;
      });

      if (newAnswerIndex === -1) {
        setAnswers((prev) => [...prev, formattedAnswer]);
      } else {
        setAnswers((prev) => {
          const newAnswers = [...prev];
          newAnswers[newAnswerIndex] = {
            ...newAnswers[newAnswerIndex],
            answer,
          };
          return newAnswers;
        });
      }

      // agora decide pra onde ir
      if (currentImage < lastImage) {
        setCurrentImage(lastImage);
      } else {
        setLastImage((prev) => prev + 1);
        setCurrentImage((prev) => prev + 1);
      }
    }
  }

  return (
    <div
      className={cn(
        "min-h-[100vh] flex-1 items-center justify-between bg-background-main flex flex-col py-20",
        answers.length == imageNames.length && "!justify-center"
      )}
    >
      {answers.length < imageNames.length && (
        <>
          <div className="text-center">
            <p className="font-medium text-3xl 2xl:text-4xl">Selecione uma alternativa</p>
            <p className="2xl:text-2xl">Escolha entre as opções apresentadas.</p>
          </div>
          <EvaluationStepper
            currentImage={currentImage}
            answers={answers}
            setLastImage={setLastImage}
            setCurrentImage={setCurrentImage}
          />
          <div className="flex space-x-5">
            <AnimatePresence mode="wait">
              <motion.img
                key={imageNames[currentImage]} // chave única para cada imagem
                src={`./imgs/${imageNames[currentImage]}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-[700px] 3xl:w-[1000px]"
                style={{
                  borderRadius: "20px",
                }}
              />
            </AnimatePresence>

            <div className="flex items-center justify-center flex-col space-y-6 min-h-[500px]">
              <div className="bg-black/50  bg-opa text-white font-medium left-4 top-3 px-2 rounded-2xl">
                Imagem: {currentImage + 1}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-green text-white font-semibold px-8 py-6 w-[300px] md:w-[400px] rounded-2xl shadow-md hover:shadow-lg cursor-pointer 2xl:text-xl"
                onClick={() => handleAnswer("SV")}
              >
                Normal
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-red text-white font-semibold px-8 py-6 w-[300px] md:w-[400px] rounded-2xl shadow-md hover:shadow-lg cursor-pointer 2xl:text-xl"
                onClick={() => handleAnswer("CV")}
              >
                Comprometida
              </motion.button>
            </div>
          </div>
        </>
      )}

      {currentImage == imageNames.length && <Spinner size="large" className="text-orange" />}
    </div>
  );
}

function EvaluationStepper({
  answers,
  currentImage,
  setCurrentImage,
}: {
  answers: answersType[];
  setCurrentImage: (num: number) => void;
  setLastImage: (num: number) => void;
  currentImage: number;
}) {
  return (
    <div className="space-x-2 text-center min-w-[800px] flex-row flex">
      {imageNames.map((_, index) => {
        const isAnsweredIndex = answers.findIndex((a) => a.key === index);

        const isAnswered = isAnsweredIndex !== -1;
        let backgroundColor;

        if (isAnswered) {
          backgroundColor = answers[isAnsweredIndex].answer === "SV" ? "bg-green" : "bg-red";
        } else {
          if (index === currentImage) {
            backgroundColor = "bg-white-gray border-2 border-black";
          } else {
            backgroundColor = "bg-white-gray";
          }
        }

        return (
          <div
            className={cn(
              "bg-muted text-muted-foreground data-[state=active]:bg-orange data-[state=completed]:bg-orange data-[state=active]:text-primary-foreground data-[state=completed]:text-primary-foreground relative flex size-6 2xl:size-10 shrink-0 items-center justify-center rounded-full text-xs font-medium",
              backgroundColor
            )}
            onClick={() => currentImage >= index && setCurrentImage(index)}
            key={index}
          >
            {<span className={cn("2xl:text-base", isAnswered && "text-white")}>{index + 1}</span>}
            {/* <CheckIcon
              className={cn(
                "absolute scale-0 opacity-0 transition-all",
                isAnswered && "opacity-100 scale-100 text-white"
              )}
              size={16}
              aria-hidden="true"
            /> */}
          </div>
        );
      })}
      <div
        className={cn(
          "bg-muted group-data-[state=completed]/step:bg-primary m-0.5 group-data-[orientation=horizontal]/stepper:h-0.5 group-data-[orientation=horizontal]/stepper:w-full group-data-[orientation=horizontal]/stepper:flex-1 group-data-[orientation=vertical]/stepper:h-12 group-data-[orientation=vertical]/stepper:w-0.5"
        )}
      />
    </div>
  );
}

export default Evaluation;
