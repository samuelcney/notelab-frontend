"use client";

import { PageRoot } from "@/components/layout/PageRoot";
import { notify } from "@/components/presentation/toast/Toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { teacherRequestSchema } from "@/main/schemas/send-request.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Music } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof teacherRequestSchema>;

export default function SendTeacherRequestPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(teacherRequestSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setShowSuccess(true);
      notify("Solicitação enviada com sucesso!", "success");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PageRoot>
      <div className="flex flex-1 w-full h-full pt-6 px-1 flex-col">
        <div className="mt-6 mb-14">
          {showSuccess ? (
            <Alert className="bg-green-50 border-green-200 max-w-3xl mx-auto">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">
                Solicitação enviada com sucesso!
              </AlertTitle>
              <AlertDescription className="text-green-700">
                Sua solicitação para se tornar professor foi recebida.
              </AlertDescription>
            </Alert>
          ) : (
            <Card className="max-w-3xl mx-auto bg-background border-0 shadow-none">
              <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Music className="h-10 w-10 text-foreground" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold">
                  Torne-se um Professor de Música
                </CardTitle>
                <CardDescription className="text-sm text-foreground">
                  Preencha o formulário abaixo e envie seu certificado para
                  começar a ensinar música em nossa plataforma
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Nome Completo</Label>
                      <Input
                        {...register("fullName")}
                        placeholder="Seu nome completo"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>CPF</Label>
                      <Input
                        {...register("cpf")}
                        placeholder="000.000.000-00"
                      />
                      {errors.cpf && (
                        <p className="text-red-500 text-sm">
                          {errors.cpf.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        {...register("email")}
                        placeholder="seu@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Telefone</Label>
                      <Input
                        {...register("phone")}
                        placeholder="(00) 00000-0000"
                        type="tel"
                        maxLength={11}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Formação Musical</Label>
                      <Select
                        onValueChange={(
                          value:
                            | "conservatory"
                            | "graduation"
                            | "post-graduation"
                            | "master"
                            | "doctorate"
                            | "self-taught"
                        ) => setValue("musicalEducation", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione sua formação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conservatory">
                            Conservatório
                          </SelectItem>
                          <SelectItem value="graduation">
                            Graduação em Música
                          </SelectItem>
                          <SelectItem value="post-graduation">
                            Pós-Graduação
                          </SelectItem>
                          <SelectItem value="master">Mestrado</SelectItem>
                          <SelectItem value="doctorate">Doutorado</SelectItem>
                          <SelectItem value="self-taught">
                            Autodidata
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.musicalEducation && (
                        <p className="text-red-500 text-sm">
                          {errors.musicalEducation.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Anos de Experiência</Label>
                      <Select
                        onValueChange={(
                          value: "1-2" | "3-5" | "6-10" | "10+"
                        ) => setValue("yearsExperience", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 anos</SelectItem>
                          <SelectItem value="3-5">3-5 anos</SelectItem>
                          <SelectItem value="6-10">6-10 anos</SelectItem>
                          <SelectItem value="10+">Mais de 10 anos</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.yearsExperience && (
                        <p className="text-red-500 text-sm">
                          {errors.yearsExperience.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Instrumentos que Ensina</Label>
                    <Input
                      {...register("instruments")}
                      placeholder="Violão, Piano, etc."
                    />
                    {errors.instruments && (
                      <p className="text-red-500 text-sm">
                        {errors.instruments.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Biografia Profissional</Label>
                    <Textarea
                      {...register("biography")}
                      placeholder="Fale sobre sua experiência"
                      rows={4}
                    />
                    {errors.biography && (
                      <p className="text-red-500 text-sm">
                        {errors.biography.message}
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Certificado</Label>
                    <Input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          setValue("certificate", e.target.files[0]);
                        }
                      }}
                    />
                    {errors.certificate && (
                      <p className="text-red-500 text-sm">
                        {errors.certificate.message}
                      </p>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => router.back()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-greenApp hover:bg-greenApp/80 text-white font-semibold"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
        </div>
      </div>
    </PageRoot>
  );
}
