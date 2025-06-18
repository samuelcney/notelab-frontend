"use client";
import { AnimatePresence, motion } from "framer-motion";

import { ResetPasswordForm } from "@/presentation/pages/recover-password/steps/reset-password.form";
import { SendEmailForm } from "@/presentation/pages/recover-password/steps/send-email.form";
import { ValidateTokenForm } from "@/presentation/pages/recover-password/steps/validate-token.form";
import { Step } from "@/utils/Enums";
import { useState } from "react";

export default function RecoverPasswordPage() {
  const [step, setStep] = useState<Step>(Step.SendEmail);

  return (
    <div className="w-[90%] h-[90%] flex flex-col justify-center items-center font-semibold">
      <AnimatePresence>
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          className="w-[65%] flex flex-col gap-5"
        >
          {step === Step.SendEmail && (
            <SendEmailForm onSuccess={() => setStep(Step.ValidateToken)} />
          )}
          {step === Step.ValidateToken && (
            <ValidateTokenForm onSuccess={() => setStep(Step.ResetPassword)} />
          )}
          {step === Step.ResetPassword && <ResetPasswordForm />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
