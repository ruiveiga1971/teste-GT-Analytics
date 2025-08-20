import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/i18n/context";
import { 
  Clock, 
  Mail, 
  CheckCircle, 
  Upload, 
  Shield,
  Phone,
  User,
  GraduationCap,
  BookOpen,
  FileText
} from "lucide-react";

// Schema will be created dynamically based on language
type ContactFormData = {
  nome: string;
  email: string;
  telefone?: string;
  nivel: string;
  area: string;
  descricao: string;
};

export default function Contact() {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const { language } = useLanguage();

  const content = {
    pt: {
      hero: {
        title: "Entre em Contacto",
        subtitle: "Preencha o formulário em baixo e receba o seu orçamento grátis",
        notice: "Preencha o formulário em baixo e receba o seu orçamento grátis"
      },
      form: {
        fields: {
          nome: {
            label: "Nome Completo *",
            error: "Nome deve ter pelo menos 2 caracteres"
          },
          email: {
            label: "Email *",
            error: "Email inválido"
          },
          telefone: {
            label: "Telefone"
          },
          nivel: {
            label: "Nível Académico *",
            placeholder: "Selecione o nível",
            error: "Selecione o nível académico",
            options: {
              licenciatura: "Licenciatura",
              mestrado: "Mestrado",
              doutoramento: "Doutoramento"
            }
          },
          area: {
            label: "Área de Estudo *",
            placeholder: "Ex: Psicologia, Engenharia, Medicina...",
            error: "Área de estudo é obrigatória"
          },
          descricao: {
            label: "Breve descrição do que precisa *",
            placeholder: "Descreva os seus dados, os objetivos do estudo e que tipo de análise estatística necessita...",
            error: "Descrição deve ter pelo menos 10 caracteres"
          },
          files: {
            label: "Anexar Ficheiros (Opcional - máximo 25MB)",
            selected: "ficheiro(s) selecionado(s)",
            change: "Clique para alterar",
            upload: "Clique para anexar ficheiros ou arraste aqui",
            types: "Base de dados, questionário, objetivos (PDF, Word, Excel)"
          }
        },
        submit: {
          sending: "A enviar...",
          button: "Enviar Pedido de Orçamento",
          privacy: "Ao enviar este formulário, concorda com o tratamento dos seus dados para fins de orçamento."
        },
        messages: {
          success: {
            title: "Mensagem enviada com sucesso!",
            description: "Entraremos em contacto consigo em breve com o orçamento."
          },
          error: {
            title: "Erro ao enviar mensagem",
            description: "Tente novamente ou contacte-nos diretamente por email."
          }
        }
      },
      contact: {
        title: "Ou contacte-nos diretamente"
      },
      guarantees: {
        title: "As Nossas Garantias",
        subtitle: "Compromissos que assumimos com todos os nossos clientes",
        items: [
          {
            title: "Confidencialidade Total",
            description: "Os seus dados e trabalho são tratados com total sigilo e confidencialidade."
          },
          {
            title: "Qualidade Assegurada",
            description: "Utilizamos métodos estatísticos rigorosos e software profissional reconhecido."
          },
          {
            title: "Comunicação Clara",
            description: "Mantemos contacto regular e explicamos todos os procedimentos de forma clara."
          }
        ]
      }
    },
    en: {
      hero: {
        title: "Contact Us",
        subtitle: "Fill out the form below and receive your free quote",
        notice: "Fill out the form below and receive your free quote"
      },
      form: {
        fields: {
          nome: {
            label: "Full Name *",
            error: "Name must have at least 2 characters"
          },
          email: {
            label: "Email *",
            error: "Invalid email"
          },
          telefone: {
            label: "Phone"
          },
          nivel: {
            label: "Academic Level *",
            placeholder: "Select level",
            error: "Select academic level",
            options: {
              licenciatura: "Bachelor's",
              mestrado: "Master's",
              doutoramento: "PhD"
            }
          },
          area: {
            label: "Study Area *",
            placeholder: "Ex: Psychology, Engineering, Medicine...",
            error: "Study area is required"
          },
          descricao: {
            label: "Brief description of what you need *",
            placeholder: "Describe your data, study objectives and what type of statistical analysis you need...",
            error: "Description must have at least 10 characters"
          },
          files: {
            label: "Attach Files (Optional - maximum 25MB)",
            selected: "file(s) selected",
            change: "Click to change",
            upload: "Click to attach files or drag here",
            types: "Database, questionnaire, objectives (PDF, Word, Excel)"
          }
        },
        submit: {
          sending: "Sending...",
          button: "Send Quote Request",
          privacy: "By submitting this form, you agree to the processing of your data for quote purposes."
        },
        messages: {
          success: {
            title: "Message sent successfully!",
            description: "We will contact you shortly with the quote."
          },
          error: {
            title: "Error sending message",
            description: "Please try again or contact us directly by email."
          }
        }
      },
      contact: {
        title: "Or contact us directly"
      },
      guarantees: {
        title: "Our Guarantees",
        subtitle: "Commitments we make to all our clients",
        items: [
          {
            title: "Total Confidentiality",
            description: "Your data and work are treated with complete secrecy and confidentiality."
          },
          {
            title: "Assured Quality",
            description: "We use rigorous statistical methods and recognized professional software."
          },
          {
            title: "Clear Communication",
            description: "We maintain regular contact and explain all procedures clearly."
          }
        ]
      }
    },
    es: {
      hero: {
        title: "Contáctenos",
        subtitle: "Complete el formulario a continuación y reciba su presupuesto gratuito",
        notice: "Complete el formulario a continuación y reciba su presupuesto gratuito"
      },
      form: {
        fields: {
          nome: {
            label: "Nombre Completo *",
            error: "El nombre debe tener al menos 2 caracteres"
          },
          email: {
            label: "Email *",
            error: "Email inválido"
          },
          telefone: {
            label: "Teléfono"
          },
          nivel: {
            label: "Nivel Académico *",
            placeholder: "Seleccione nivel",
            error: "Seleccione nivel académico",
            options: {
              licenciatura: "Licenciatura",
              mestrado: "Máster",
              doutoramento: "Doctorado"
            }
          },
          area: {
            label: "Área de Estudio *",
            placeholder: "Ej: Psicología, Ingeniería, Medicina...",
            error: "El área de estudio es obligatoria"
          },
          descricao: {
            label: "Breve descripción de lo que necesita *",
            placeholder: "Describa sus datos, los objetivos del estudio y qué tipo de análisis estadístico necesita...",
            error: "La descripción debe tener al menos 10 caracteres"
          },
          files: {
            label: "Adjuntar Archivos (Opcional - máximo 25MB)",
            selected: "archivo(s) seleccionado(s)",
            change: "Haga clic para cambiar",
            upload: "Haga clic para adjuntar archivos o arrastre aquí",
            types: "Base de datos, cuestionario, objetivos (PDF, Word, Excel)"
          }
        },
        submit: {
          sending: "Enviando...",
          button: "Enviar Solicitud de Presupuesto",
          privacy: "Al enviar este formulario, acepta el procesamiento de sus datos con fines de presupuesto."
        },
        messages: {
          success: {
            title: "¡Mensaje enviado con éxito!",
            description: "Nos pondremos en contacto con usted pronto con el presupuesto."
          },
          error: {
            title: "Error al enviar mensaje",
            description: "Inténtelo de nuevo o contáctenos directamente por email."
          }
        }
      },
      contact: {
        title: "O contáctenos directamente"
      },
      guarantees: {
        title: "Nuestras Garantías",
        subtitle: "Compromisos que asumimos con todos nuestros clientes",
        items: [
          {
            title: "Confidencialidad Total",
            description: "Sus datos y trabajo son tratados con total secreto y confidencialidad."
          },
          {
            title: "Calidad Asegurada",
            description: "Utilizamos métodos estadísticos rigurosos y software profesional reconocido."
          },
          {
            title: "Comunicación Clara",
            description: "Mantenemos contacto regular y explicamos todos los procedimientos claramente."
          }
        ]
      }
    }
  };

  const t = content[language];

  // Create schema dynamically based on language
  const contactFormSchema = z.object({
    nome: z.string().min(2, t.form.fields.nome.error),
    email: z.string().email(t.form.fields.email.error),
    telefone: z.string().optional(),
    nivel: z.string().min(1, t.form.fields.nivel.error),
    area: z.string().min(2, t.form.fields.area.error),
    descricao: z.string().min(10, t.form.fields.descricao.error),
  });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      nivel: "",
      area: "",
      descricao: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const formData = new FormData();
      formData.append('nome', data.nome);
      formData.append('email', data.email);
      if (data.telefone) formData.append('telefone', data.telefone);
      formData.append('nivel', data.nivel);
      formData.append('area', data.area);
      formData.append('descricao', data.descricao);
      
      // Add files if any
      files.forEach(file => {
        formData.append('files', file);
      });
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t.form.messages.success.title,
        description: t.form.messages.success.description,
      });
      form.reset();
      setFiles([]);
    },
    onError: (error) => {
      toast({
        title: t.form.messages.error.title,
        description: t.form.messages.error.description,
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="gt-gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold gt-text-slate-900 mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl gt-text-slate-600 mb-8">
            {t.hero.subtitle}
          </p>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 inline-block">
            <p className="text-orange-700 font-semibold flex items-center justify-center">
              <Clock className="mr-2 h-5 w-5" />
              {t.hero.notice}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="gt-bg-slate-50">
            <CardContent className="p-8">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div>
                    <Label htmlFor="nome" className="flex items-center space-x-2 text-sm font-semibold gt-text-slate-700 mb-2">
                      <User className="h-4 w-4" />
                      <span>{t.form.fields.nome.label}</span>
                    </Label>
                    <Input
                      id="nome"
                      {...form.register("nome")}
                      className="transition-colors focus:ring-2 focus:ring-blue-500"
                    />
                    {form.formState.errors.nome && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.nome.message}</p>
                    )}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="flex items-center space-x-2 text-sm font-semibold gt-text-slate-700 mb-2">
                      <Mail className="h-4 w-4" />
                      <span>{t.form.fields.email.label}</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className="transition-colors focus:ring-2 focus:ring-blue-500"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Telefone */}
                  <div>
                    <Label htmlFor="telefone" className="flex items-center space-x-2 text-sm font-semibold gt-text-slate-700 mb-2">
                      <Phone className="h-4 w-4" />
                      <span>{t.form.fields.telefone.label}</span>
                    </Label>
                    <Input
                      id="telefone"
                      type="tel"
                      {...form.register("telefone")}
                      className="transition-colors focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  {/* Nível Académico */}
                  <div>
                    <Label htmlFor="nivel" className="flex items-center space-x-2 text-sm font-semibold gt-text-slate-700 mb-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>{t.form.fields.nivel.label}</span>
                    </Label>
                    <Select onValueChange={(value) => form.setValue("nivel", value)}>
                      <SelectTrigger className="transition-colors focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder={t.form.fields.nivel.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="licenciatura">{t.form.fields.nivel.options.licenciatura}</SelectItem>
                        <SelectItem value="mestrado">{t.form.fields.nivel.options.mestrado}</SelectItem>
                        <SelectItem value="doutoramento">{t.form.fields.nivel.options.doutoramento}</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.nivel && (
                      <p className="text-red-500 text-sm mt-1">{form.formState.errors.nivel.message}</p>
                    )}
                  </div>
                </div>
                
                {/* Área de Estudo */}
                <div>
                  <Label htmlFor="area" className="flex items-center space-x-2 text-sm font-semibold gt-text-slate-700 mb-2">
                    <BookOpen className="h-4 w-4" />
                    <span>{t.form.fields.area.label}</span>
                  </Label>
                  <Input
                    id="area"
                    {...form.register("area")}
                    placeholder={t.form.fields.area.placeholder}
                    className="transition-colors focus:ring-2 focus:ring-blue-500"
                  />
                  {form.formState.errors.area && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.area.message}</p>
                  )}
                </div>
                
                {/* Descrição */}
                <div>
                  <Label htmlFor="descricao" className="flex items-center space-x-2 text-sm font-semibold gt-text-slate-700 mb-2">
                    <FileText className="h-4 w-4" />
                    <span>{t.form.fields.descricao.label}</span>
                  </Label>
                  <Textarea
                    id="descricao"
                    {...form.register("descricao")}
                    rows={5}
                    placeholder={t.form.fields.descricao.placeholder}
                    className="transition-colors focus:ring-2 focus:ring-blue-500 resize-vertical"
                  />
                  {form.formState.errors.descricao && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.descricao.message}</p>
                  )}
                </div>
                
                {/* File Upload */}
                <div>
                  <Label htmlFor="ficheiros" className="flex items-center space-x-2 text-sm font-semibold gt-text-slate-700 mb-2">
                    <Upload className="h-4 w-4" />
                    <span>{t.form.fields.files.label}</span>
                  </Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id="ficheiros"
                      multiple
                      accept=".pdf,.doc,.docx,.xlsx,.xls,.csv,.sav"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="cursor-pointer" onClick={() => document.getElementById('ficheiros')?.click()}>
                      {files.length > 0 ? (
                        <>
                          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                          <p className="text-green-600 mb-1">{files.length} {t.form.fields.files.selected}</p>
                          <p className="text-sm text-slate-500">{t.form.fields.files.change}</p>
                        </>
                      ) : (
                        <>
                          <Upload className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                          <p className="gt-text-slate-600 mb-1">{t.form.fields.files.upload}</p>
                          <p className="text-sm text-slate-500">{t.form.fields.files.types}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={contactMutation.isPending}
                    className="gt-accent hover:bg-orange-600 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all"
                  >
                    {contactMutation.isPending ? t.form.submit.sending : t.form.submit.button}
                  </Button>
                  
                  <p className="text-sm text-slate-500 mt-4">
                    {t.form.submit.privacy}
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <h3 className="text-lg font-semibold gt-text-slate-900 mb-4">
              {t.contact.title}
            </h3>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
              <a 
                href="mailto:gt.analytics.contact@gmail.com" 
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" />
                <span>gt.analytics.contact@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-16 gt-bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gt-text-slate-900 mb-4">
              {t.guarantees.title}
            </h2>
            <p className="text-lg gt-text-slate-600 max-w-2xl mx-auto">
              {t.guarantees.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="h-8 w-8 text-green-600" />,
                title: t.guarantees.items[0].title,
                description: t.guarantees.items[0].description
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
                title: t.guarantees.items[1].title,
                description: t.guarantees.items[1].description
              },
              {
                icon: <Mail className="h-8 w-8 text-orange-600" />,
                title: t.guarantees.items[2].title,
                description: t.guarantees.items[2].description
              }
            ].map((guarantee, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {guarantee.icon}
                  </div>
                  <h3 className="text-lg font-semibold gt-text-slate-900 mb-3">{guarantee.title}</h3>
                  <p className="gt-text-slate-600">{guarantee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
