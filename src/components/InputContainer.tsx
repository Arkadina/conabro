import { useId, useState } from "react";

import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Input } from "./ui/input";

import { ChevronDownIcon, ChevronRightIcon, PinIcon } from "lucide-react";
import { FcBusinessman, FcReading, FcReadingEbook } from "react-icons/fc";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { FcBusinesswoman } from "react-icons/fc";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Spinner } from "./ui/spinner";
import { useNavigate } from "react-router";
import { supabase } from "../services/supabase";

type Inputs = {
  name: string;
  gender: "male" | "female";
  hasMoreThanFiveYears: boolean;
  hasCheckedTerms: boolean;
};

function InputContainer() {
  const { register, handleSubmit, control } = useForm<Inputs>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  let navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data, e) => {
    // @ts-ignore
    data.hasMoreThanFiveYears = data.hasMoreThanFiveYears === "true";
    e?.preventDefault();

    setIsLoading(true);

    const { data: participant } = await supabase
      .from("participants")
      .insert({
        name: data.name,
        gender: data.gender,
        has_more_than_five_years: data.hasMoreThanFiveYears,
      })
      .select()
      .single();

    navigate(`/how-it-works?participant_id=${participant.id}`);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <UserInput register={register} />
        <hr className="my-5" />
        <Label className="mb-4">Gênero</Label>
        <GenderRadioGroup control={control} />
        <hr className="mt-5 mb-5" />
        <Label className="mb-4">Anos de experiência</Label>
        <ExperienceRadioGroup control={control} />
        <hr className="my-5 bg-[#EFEAEA]" />
        <ConsentCheckbox control={control} />
        <div className="flex justify-end w-full mt-5">
          <Button
            className="relative pe-12 bg-orange hover:bg-[#FF906B] cursor-pointer text-white"
            variant="secondary"
            type="submit"
          >
            {isLoading ? <Spinner size="small" className="text-white" /> : "Continuar"}
            <span className="bg-primary-foreground/15 pointer-events-none absolute inset-y-0 end-0 flex w-9 items-center justify-center ">
              <ChevronRightIcon className="opacity-60" size={16} aria-hidden="true" />
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
}

function GenderRadioGroup({ control }: { control: any }) {
  return (
    <Controller
      name="gender"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <RadioGroup className="gap-2" value={field.value} onValueChange={field.onChange}>
          {/* Feminino */}
          <div className="border-input has-data-[state=checked]:border-primary/50 relative flex items-center gap-2 rounded-md border p-4 shadow-xs outline-none">
            <RadioGroupItem
              value="female"
              id="female"
              aria-describedby="female-description"
              className="order-1 after:absolute after:inset-0"
            />
            <div className="flex grow items-center gap-3">
              <FcBusinesswoman size={30} />
              <div className="grid grow gap-2">
                <Label htmlFor="female" className="2xl:text-base">
                  Feminino
                </Label>
              </div>
            </div>
          </div>

          {/* Masculino */}
          <div className="border-input has-data-[state=checked]:border-primary/50 relative flex items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
            <RadioGroupItem
              value="male"
              id="male"
              aria-describedby="male-description"
              className="order-1 after:absolute after:inset-0"
            />
            <div className="flex grow items-center gap-3">
              <FcBusinessman size={30} />
              <div className="grid grow gap-2">
                <Label htmlFor="male" className="2xl:text-base">
                  Masculino
                </Label>
              </div>
            </div>
          </div>
        </RadioGroup>
      )}
    />
  );
}

function ExperienceRadioGroup({ control }: { control: any }) {
  return (
    <Controller
      name="hasMoreThanFiveYears"
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <RadioGroup className="gap-2" value={field.value} onValueChange={field.onChange}>
          {/* Radio card #1 */}
          <div className="border-input has-data-[state=checked]:border-primary/50 relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
            <RadioGroupItem
              value="true"
              id={`plus5`}
              aria-describedby={`plus5-description`}
              className="order-1 after:absolute after:inset-0"
            />
            <div className="flex grow items-center gap-3">
              <FcReadingEbook size={30} />
              <div className="grid grow gap-2">
                <Label htmlFor={`plus5`} className="2xl:text-base">
                  +5 anos
                </Label>
                <p
                  id={`plus5-description`}
                  className="text-muted-foreground text-xs 2xl:text-base "
                >
                  Possuo mais de 5 anos de experiência odontológica
                </p>
              </div>
            </div>
          </div>
          {/* Radio card #2 */}
          <div className="border-input has-data-[state=checked]:border-primary/50 relative flex items-center gap-2 rounded-md border p-4 shadow-xs outline-none">
            <RadioGroupItem
              value="false"
              id={`minus5`}
              aria-describedby={`minus5-description`}
              className="order-1 after:absolute after:inset-0"
            />
            <div className="flex grow items-center gap-3">
              <FcReading size={30} />
              <div className="grid grow gap-2">
                <Label htmlFor={`minus5`} className="2xl:text-base">
                  -5 anos
                </Label>
                <p
                  id={`minus5-description`}
                  className="text-muted-foreground text-xs 2xl:text-base"
                >
                  Possuo menos de 5 anos de experiência odontológica.
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      )}
    />
  );
}

function UserInput({ register }: { register: any }) {
  const id = useId();
  return (
    <div className="*:not-first:mt-2 mt-5">
      <Label className="mb-4 2xl:text-lg" htmlFor={id}>
        Nome
      </Label>
      <Input
        id={id}
        className="2xl:text-lg"
        placeholder="Seu nome"
        {...register("name", { required: true })}
      />
    </div>
  );
}

function ConsentCheckbox({ control }: { control: any }) {
  return (
    <Controller
      name="hasCheckedTerms"
      control={control}
      defaultValue={false}
      rules={{ required: true }}
      render={({ field }) => (
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            className="order-1"
            aria-describedby={`terms-description`}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <div className="grid grow gap-2">
            <Label htmlFor="terms">
              Termo de Consentimento e Livre Esclarecido{" "}
              <span className="text-muted-foreground text-xs 2xl:text-sm leading-[inherit] font-normal">
                (TCLE)
              </span>
            </Label>
            <p id={`terms-description`} className="text-muted-foreground text-xs 2xl:text-base">
              Declaro que li e estou de acordo com o Termo de Consentimento Livre e Esclarecido. Ao
              marcar esta opção, concordo em participar voluntariamente da pesquisa conforme
              descrito no termo.
            </p>
          </div>
        </div>
      )}
    />
  );
}

function TCLE() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="divide-primary-foreground/30 inline-flex divide-x rounded-md  rtl:space-x-reverse w-full items-center justify-center ">
          <Button
            className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 cursor-pointer"
            size="icon"
            aria-label="Options"
            variant="secondary"
          >
            <ChevronDownIcon size={16} aria-hidden="true" />
          </Button>
          <Button
            className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 cursor-pointer 2xl:text-base"
            variant="secondary"
          >
            <PinIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
            Termo de Consentimento Livre e Esclarecido
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Termo de Consentimento e Livre Esclarecido
          </DialogTitle>
          <div className="overflow-y-auto">
            <DialogDescription asChild>
              <div className="px-6 py-4">
                <div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
                  <div className="space-y-1">
                    <p>
                      <strong>Account Management</strong>
                    </p>
                    <p>
                      Navigate to the registration page, provide required information, and verify
                      your email address. You can sign up using your email or through social media
                      platforms.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Password Reset Process</strong>
                    </p>
                    <p>
                      Users can reset their password through the account settings page. Click
                      &quot;Forgot Password&quot; and follow the email verification steps to regain
                      account access quickly and securely.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Service Pricing Tiers</strong>
                    </p>
                    <p>
                      We offer three primary subscription levels designed to meet diverse user
                      needs: Basic (free with limited features), Professional (monthly fee with
                      comprehensive access), and Enterprise (custom pricing with full platform
                      capabilities).
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Technical Support Channels</strong>
                    </p>
                    <p>
                      Customer support is accessible through multiple communication methods
                      including email support, live chat during business hours, an integrated
                      support ticket system, and phone support specifically for enterprise-level
                      customers.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Data Protection Strategies</strong>
                    </p>
                    <p>
                      Our platform implements rigorous security measures including 256-bit SSL
                      encryption, regular comprehensive security audits, strict data access
                      controls, and compliance with international privacy protection standards.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Platform Compatibility</strong>
                    </p>
                    <p>
                      The service supports multiple device and operating system environments,
                      including web browsers like Chrome and Firefox, mobile applications for iOS
                      and Android, and desktop applications compatible with Windows and macOS.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Subscription Management</strong>
                    </p>
                    <p>
                      Subscriptions can be cancelled at any time through account settings, with
                      pro-rated refunds available within 30 days of payment. Both monthly and annual
                      billing options are provided, with special discounts offered for annual
                      commitments.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Payment Method Options</strong>
                    </p>
                    <p>
                      We accept a wide range of payment methods including major credit cards such as
                      Visa, MasterCard, and American Express, digital payment platforms like PayPal,
                      and direct bank transfers. Regional payment options may also be available
                      depending on user location.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Customer Support</strong>
                    </p>
                    <p>
                      Our dedicated customer support team is available 24/7, providing quick and
                      efficient assistance to address any inquiries or issues you may have.
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>Privacy Policy</strong>
                    </p>
                    <p>
                      Our privacy policy outlines how we collect, use, and protect your personal
                      data, ensuring your privacy is protected at all times.
                    </p>
                  </div>
                </div>
              </div>
            </DialogDescription>
            <DialogFooter className="px-6 pb-6 sm:justify-start">
              <DialogClose asChild>
                <Button type="button">Declaro que li</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default InputContainer;
