import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/i18n/context";
import ptTranslations from '@/i18n/translations/pt.json';
import enTranslations from '@/i18n/translations/en.json';
import esTranslations from '@/i18n/translations/es.json';
import { 
  Calculator,
  Database,
  Target,
  FileText,
  CheckCircle,
  Mail,
  User,
  Phone,
  GraduationCap,
  BookOpen,
  Upload,
  Clock,
  Shield,
  Euro
} from "lucide-react";

// Schema will be created dynamically based on language

type PriceEstimatorData = z.infer<typeof priceEstimatorSchema>;

interface EstimateResult {
  planName: string;
  baseCost: number;
  extraCost: number;
  totalCost: number;
  includes: string[];
  extraService: string;
}

export default function PriceEstimator() {
  const [databasePrep, setDatabasePrep] = useState<string>("");
  const [analysisPlan, setAnalysisPlan] = useState<string>("");
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();
  const { language } = useLanguage();

  const translations = {
    pt: ptTranslations,
    en: enTranslations,
    es: esTranslations,
  };

  const content = {
    pt: {
      hero: {
        title: "Simulador de Orçamento",
        subtitle: "Obtenha uma estimativa personalizada para o seu projeto de análise estatística",
        description: "Complete os passos abaixo para receber um orçamento detalhado baseado nas suas necessidades específicas."
      },
      steps: {
        step1: {
          title: "Passo 1: Preparação da Base de Dados",
          subtitle: "A sua base de dados está pronta para análise estatística?",
          options: {
            ready: "Sim, está pronta (sem custo adicional)",
            needs_prep_small: "Precisa de preparação (até 250 linhas) - +55€",
            needs_prep_medium: "Precisa de preparação (251-500 linhas) - +85€",
            needs_prep_large: "Precisa de preparação (mais de 500 linhas) - +125€",
            unsure: "Não tenho a certeza - +125€"
          }
        },
        step2: {
          title: "Passo 2: Objetivo da Análise",
          subtitle: "Que tipo de análise estatística necessita?"
        }
      },
      plans: {
        observa: {
          name: "Plano Observa",
          subtitle: "📊 Ideal para caracterizar a amostra e descrever os dados",
          includes: [
            "Estatística descritiva completa: frequência absoluta e relativa, média, mediana, moda, desvio-padrão, variância, quartis, assimetria e curtose",
            "Resultados tabelados e interpretados para fácil inserção no trabalho académico/artigo"
          ]
        },
        compara: {
          name: "Plano Compara",
          subtitle: "⚖️ Indicado para estudos que envolvem comparação entre grupos ou momentos",
          includes: [
            "Inclui tudo do Plano Observa, mais:",
            "Testes de normalidade (Shapiro-Wilk, Kolmogorov-Smirnov) e homogeneidade de variâncias (Levene)",
            "Comparação de grupos independentes (teste t ou Mann-Whitney, ANOVA ou Kruskal-Wallis)",
            "Comparação de medidas emparelhadas (pré-pós ou repetidas)",
            "Testes post-hoc quando aplicável",
            "Resultados tabelados e interpretados para fácil inserção no trabalho académico/artigo"
          ]
        },
        explica: {
          name: "Plano Explica",
          subtitle: "🧩 Recomendado para quem precisa analisar relações e prever resultados",
          includes: [
            "Inclui tudo dos Planos Observa e Compara, mais:",
            "Análise de associação entre variáveis (Qui-quadrado, correlação de Pearson/Spearman)",
            "Regressão linear simples e múltipla (sem limite do número de variáveis preditoras)",
            "Regressão logística binária, se aplicável (sem limite do número de variáveis preditoras)",
            "Modelos de regressão hierárquica (se aplicável)",
            "Verificação de pressupostos estatísticos e qualidade de ajustamento dos modelos",
            "Resultados tabelados e interpretados para fácil inserção no trabalho académico/artigo"
          ]
        },
        valida: {
          name: "Plano Valida",
          subtitle: "🔬 Desenhado para estudos que envolvem desenvolvimento ou validação de instrumentos",
          includes: [
            "Inclui tudo dos Planos Observa, Compara e Explica se aplicável, mais:",
            "Análise Fatorial Exploratória (AFE) – identificação das dimensões do instrumento",
            "Análise Fatorial Confirmatória (AFC) – validação da estrutura fatorial do instrumento",
            "Avaliação da qualidade de ajustamento local",
            "Análise da validade convergente e discriminante",
            "Consistência interna (Alfa de Cronbach) global e por dimensão",
            "Resultados tabelados e interpretados para fácil inserção no trabalho académico/artigo"
          ]
        }
      },
      result: {
        title: "A sua seleção",
        plan: "Plano selecionado",
        baseCost: "Custo base",
        extraCost: "Custo adicional",
        totalCost: "Total estimado",
        includes: "Inclui",
        extraService: "Serviço adicional"
      },
      form: {
        title: "Dados para a Proposta",
        fields: {
          nome: { label: "Nome Completo *", error: "Nome deve ter pelo menos 2 caracteres" },
          email: { label: "Email *", error: "Email inválido" },
          telefone: { label: "Telefone" },
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
            label: "Informações Adicionais *",
            placeholder: "Descreva o seu estudo, variáveis, objetivos...",
            error: "Descrição deve ter pelo menos 10 caracteres"
          },
          files: {
            label: "Anexar Ficheiros (Opcional)",
            selected: "ficheiro(s) anexado(s)",
            change: "Clique para alterar",
            upload: "Clique para anexar ficheiros",
            types: "Questionário, base de dados, etc."
          }
        },
        submit: {
          sending: "A enviar...",
          button: "Enviar Pedido de Proposta",
          privacy: "Receberá uma proposta detalhada por email."
        },
        messages: {
          success: {
            title: "Proposta enviada com sucesso!",
            description: "Receberá a proposta formal detalhada."
          },
          error: {
            title: "Erro ao enviar proposta",
            description: "Tente novamente ou contacte-nos diretamente."
          }
        }
      },
      pricing: {
        title: "Preços transparentes",
        description: "Consulte o nosso preçário detalhado"
      }
    },
    en: {
      hero: {
        title: "Budget Simulator",
        subtitle: "Get a personalized estimate for your statistical analysis project",
        description: "Complete the steps below to receive a detailed quote based on your specific needs."
      },
      steps: {
        step1: {
          title: "Step 1: Database Preparation",
          subtitle: "Is your database ready for statistical analysis?",
          options: {
            ready: "Yes, it's ready (no additional cost)",
            needs_prep_small: "Needs preparation (up to 250 rows) - +€55",
            needs_prep_medium: "Needs preparation (251-500 rows) - +€85",
            needs_prep_large: "Needs preparation (more than 500 rows) - +€125",
            unsure: "I'm not sure - +€125"
          }
        },
        step2: {
          title: "Step 2: Analysis Objective",
          subtitle: "What type of statistical analysis do you need?"
        }
      },
      plans: {
        observa: {
          name: "Observe Plan",
          subtitle: "📊 Ideal for characterizing the sample and describing data",
          includes: [
            "Complete descriptive statistics: absolute and relative frequency, mean, median, mode, standard deviation, variance, quartiles, skewness and kurtosis",
            "Tabulated and interpreted results for easy insertion into academic work/article"
          ]
        },
        compara: {
          name: "Compare Plan",
          subtitle: "⚖️ Suitable for studies involving comparison between groups or moments",
          includes: [
            "Includes everything from Observe Plan, plus:",
            "Normality tests (Shapiro-Wilk, Kolmogorov-Smirnov) and homogeneity of variances (Levene)",
            "Independent group comparison (t-test or Mann-Whitney, ANOVA or Kruskal-Wallis)",
            "Paired measures comparison (pre-post or repeated)",
            "Post-hoc tests when applicable",
            "Tabulated and interpreted results for easy insertion into academic work/article"
          ]
        },
        explica: {
          name: "Explain Plan",
          subtitle: "🧩 Recommended for those who need to analyze relationships and predict results",
          includes: [
            "Includes everything from Observe and Compare Plans, plus:",
            "Association analysis between variables (Chi-square, Pearson/Spearman correlation)",
            "Simple and multiple linear regression (no limit on number of predictor variables)",
            "Binary logistic regression, if applicable (no limit on number of predictor variables)",
            "Hierarchical regression models (if applicable)",
            "Verification of statistical assumptions and model fit quality",
            "Tabulated and interpreted results for easy insertion into academic work/article"
          ]
        },
        valida: {
          name: "Validate Plan",
          subtitle: "🔬 Designed for studies involving instrument development or validation",
          includes: [
            "Includes everything from Observe, Compare and Explain Plans if applicable, plus:",
            "Exploratory Factor Analysis (EFA) – identification of instrument dimensions",
            "Confirmatory Factor Analysis (CFA) – validation of instrument factor structure",
            "Local fit quality assessment",
            "Convergent and discriminant validity analysis",
            "Internal consistency (Cronbach's Alpha) global and per dimension",
            "Tabulated and interpreted results for easy insertion into academic work/article"
          ]
        }
      },
      result: {
        title: "Your Selection",
        plan: "Selected plan",
        baseCost: "Base cost",
        extraCost: "Additional cost",
        totalCost: "Estimated total",
        includes: "Includes",
        extraService: "Additional service"
      },
      form: {
        title: "Proposal Data",
        fields: {
          nome: { label: "Full Name *", error: "Name must have at least 2 characters" },
          email: { label: "Email *", error: "Invalid email" },
          telefone: { label: "Phone" },
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
            label: "Additional Information *",
            placeholder: "Describe your study, variables, objectives...",
            error: "Description must have at least 10 characters"
          },
          files: {
            label: "Attach Files (Optional)",
            selected: "file(s) attached",
            change: "Click to change",
            upload: "Click to attach files",
            types: "Questionnaire, database, etc."
          }
        },
        submit: {
          sending: "Sending...",
          button: "Send Proposal Request",
          privacy: "You will receive a detailed proposal by email."
        },
        messages: {
          success: {
            title: "Proposal sent successfully!",
            description: "You will receive the detailed formal proposal."
          },
          error: {
            title: "Error sending proposal",
            description: "Please try again or contact us directly."
          }
        }
      },
      pricing: {
        title: "Transparent pricing",
        description: "Check our detailed pricing"
      }
    },
    es: {
      hero: {
        title: "Simulador de Presupuesto",
        subtitle: "Obtenga una estimación personalizada para su proyecto de análisis estadístico",
        description: "Complete los pasos a continuación para recibir un presupuesto detallado basado en sus necesidades específicas."
      },
      steps: {
        step1: {
          title: "Paso 1: Preparación de la Base de Datos",
          subtitle: "¿Está su base de datos lista para análisis estadístico?",
          options: {
            ready: "Sí, está lista (sin costo adicional)",
            needs_prep_small: "Necesita preparación (hasta 250 filas) - +55€",
            needs_prep_medium: "Necesita preparación (251-500 filas) - +85€",
            needs_prep_large: "Necesita preparación (más de 500 filas) - +125€",
            unsure: "No estoy seguro - +125€"
          }
        },
        step2: {
          title: "Paso 2: Objetivo del Análisis",
          subtitle: "¿Qué tipo de análisis estadístico necesita?"
        }
      },
      plans: {
        observa: {
          name: "Plan Observa",
          subtitle: "📊 Ideal para caracterizar la muestra y describir los datos",
          includes: [
            "Estadística descriptiva completa: frecuencia absoluta y relativa, media, mediana, moda, desviación estándar, varianza, cuartiles, asimetría y curtosis",
            "Resultados tabulados e interpretados para fácil inserción en el trabajo académico/artículo"
          ]
        },
        compara: {
          name: "Plan Compara",
          subtitle: "⚖️ Indicado para estudios que involucran comparación entre grupos o momentos",
          includes: [
            "Incluye todo del Plan Observa, más:",
            "Pruebas de normalidad (Shapiro-Wilk, Kolmogorov-Smirnov) y homogeneidad de varianzas (Levene)",
            "Comparación de grupos independientes (prueba t o Mann-Whitney, ANOVA o Kruskal-Wallis)",
            "Comparación de medidas emparejadas (pre-post o repetidas)",
            "Pruebas post-hoc cuando sea aplicable",
            "Resultados tabulados e interpretados para fácil inserción en el trabajo académico/artículo"
          ]
        },
        explica: {
          name: "Plan Explica",
          subtitle: "🧩 Recomendado para quien necesita analizar relaciones y predecir resultados",
          includes: [
            "Incluye todo de los Planes Observa y Compara, más:",
            "Análisis de asociación entre variables (Chi-cuadrado, correlación de Pearson/Spearman)",
            "Regresión lineal simple y múltiple (sin límite en el número de variables predictoras)",
            "Regresión logística binaria, si es aplicable (sin límite en el número de variables predictoras)",
            "Modelos de regresión jerárquica (si es aplicable)",
            "Verificación de supuestos estadísticos y calidad de ajuste de los modelos",
            "Resultados tabulados e interpretados para fácil inserción en el trabajo académico/artículo"
          ]
        },
        valida: {
          name: "Plan Valida",
          subtitle: "🔬 Diseñado para estudios que involucran desarrollo o validación de instrumentos",
          includes: [
            "Incluye todo de los Planes Observa, Compara y Explica si es aplicable, más:",
            "Análisis Factorial Exploratorio (AFE) – identificación de las dimensiones del instrumento",
            "Análisis Factorial Confirmatorio (AFC) – validación de la estructura factorial del instrumento",
            "Evaluación de la calidad de ajuste local",
            "Análisis de la validez convergente y discriminante",
            "Consistencia interna (Alfa de Cronbach) global y por dimensión",
            "Resultados tabulados e interpretados para fácil inserción en el trabajo académico/artículo"
          ]
        }
      },
      result: {
        title: "Su Selección",
        plan: "Plan seleccionado",
        baseCost: "Costo base",
        extraCost: "Costo adicional",
        totalCost: "Total estimado",
        includes: "Incluye",
        extraService: "Servicio adicional"
      },
      form: {
        title: "Datos para la Propuesta",
        fields: {
          nome: { label: "Nombre Completo *", error: "El nombre debe tener al menos 2 caracteres" },
          email: { label: "Email *", error: "Email inválido" },
          telefone: { label: "Teléfono" },
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
            label: "Información Adicional *",
            placeholder: "Describa su estudio, variables, objetivos...",
            error: "La descripción debe tener al menos 10 caracteres"
          },
          files: {
            label: "Adjuntar Archivos (Opcional)",
            selected: "archivo(s) adjuntado(s)",
            change: "Haga clic para cambiar",
            upload: "Haga clic para adjuntar archivos",
            types: "Cuestionario, base de datos, etc."
          }
        },
        submit: {
          sending: "Enviando...",
          button: "Enviar Solicitud de Propuesta",
          privacy: "Recibirá una propuesta detallada por email."
        },
        messages: {
          success: {
            title: "¡Propuesta enviada con éxito!",
            description: "Recibirá la propuesta formal detallada."
          },
          error: {
            title: "Error al enviar propuesta",
            description: "Inténtelo de nuevo o contáctenos directamente."
          }
        }
      },
      pricing: {
        title: "Precios transparentes",
        description: "Consulte nuestro tarifario detallado"
      }
    }
  };

  // Use JSON translations for the specific texts
  const t = translations[language].priceEstimator;
  const contentT = content[language];

  // Create schema dynamically based on language
  const formSchema = z.object({
    nome: z.string().min(2, contentT.form?.fields?.nome?.error || "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email(contentT.form?.fields?.email?.error || "Email inválido"),
    telefone: z.string().optional(),
    nivel: z.string().min(1, contentT.form?.fields?.nivel?.error || "Selecione o nível académico"),
    area: z.string().min(2, contentT.form?.fields?.area?.error || "Área de estudo é obrigatória"),
    pacoteSelecionado: z.string().min(1, "Selecione um pacote"),
    descricao: z.string().min(10, contentT.form?.fields?.descricao?.error || "Descrição deve ter pelo menos 10 caracteres"),
  });

  const form = useForm<PriceEstimatorData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      nivel: "",
      area: "",
      pacoteSelecionado: "",
      descricao: "",
    },
  });

  const analysisPlans = {
    observa: {
      name: t.plans?.observa?.name || contentT.plans.observa.name,
      cost: 125,
      emoji: "🌐",
      subtitle: t.plans?.observa?.subtitle || contentT.plans.observa.subtitle,
      includes: t.plans?.observa?.includes || contentT.plans.observa.includes
    },
    compara: {
      name: t.plans.compara.name, 
      cost: 295,
      emoji: "🔍",
      subtitle: t.plans.compara.subtitle,
      includes: t.plans.compara.includes
    },
    explica: {
      name: t.plans.explica.name,
      cost: 475,
      emoji: "📈",
      subtitle: t.plans.explica.subtitle,
      includes: t.plans.explica.includes
    },
    valida: {
      name: t.plans.valida.name,
      cost: 575,
      emoji: "🧪",
      subtitle: t.plans.valida.subtitle,
      includes: t.plans.valida.includes
    }
  };

  const updateProposal = () => {
    if (!analysisPlan) {
      setEstimate(null);
      return;
    }

    let extraCost = 0;
    let extraService = "";

    if (databasePrep === "needs_prep_small") {
      extraCost = 55;
      extraService = language === "pt" ? "Preparação da base de dados (até 250 linhas)" :
                     language === "en" ? "Database preparation (up to 250 rows)" :
                     "Preparación de la base de datos (hasta 250 filas)";
    } else if (databasePrep === "needs_prep_medium") {
      extraCost = 85;
      extraService = language === "pt" ? "Preparação da base de dados (251-500 linhas)" :
                     language === "en" ? "Database preparation (251-500 rows)" :
                     "Preparación de la base de datos (251-500 filas)";
    } else if (databasePrep === "needs_prep_large" || databasePrep === "unsure") {
      extraCost = 125;
      extraService = databasePrep === "needs_prep_large" 
        ? (language === "pt" ? "Preparação da base de dados (mais de 500 linhas)" :
           language === "en" ? "Database preparation (more than 500 rows)" :
           "Preparación de la base de datos (más de 500 filas)")
        : (language === "pt" ? "Análise e preparação da base de dados (se necessário)" :
           language === "en" ? "Database analysis and preparation (if needed)" :
           "Análisis y preparación de la base de datos (si es necesario)");
    }

    const plan = analysisPlans[analysisPlan as keyof typeof analysisPlans];
    const totalCost = plan.cost + extraCost;

    const result: EstimateResult = {
      planName: plan.name,
      baseCost: plan.cost,
      extraCost,
      totalCost,
      includes: plan.includes,
      extraService
    };

    setEstimate(result);
    form.setValue("pacoteSelecionado", `${plan.name} - ${totalCost}€`);
  };

  useEffect(() => {
    updateProposal();
  }, [databasePrep, analysisPlan]);

  const estimatorMutation = useMutation({
    mutationFn: async (data: PriceEstimatorData) => {
      const formData = new FormData();
      formData.append('nome', data.nome);
      formData.append('email', data.email);
      if (data.telefone) formData.append('telefone', data.telefone);
      formData.append('nivel', data.nivel);
      formData.append('area', data.area);
      
      const descricaoCompleta = `SIMULAÇÃO DE ORÇAMENTO:
Pacote selecionado: ${data.pacoteSelecionado}
Preparação da base de dados: ${databasePrep === "ready" ? "Não necessária" : databasePrep === "needs_prep" ? "Necessária" : "Não tenho certeza"}
${estimate ? `
DETALHES DA SIMULAÇÃO:
- Plano: ${estimate.planName}
- Custo base: ${estimate.baseCost}€
- Custo extra: ${estimate.extraCost}€
- Total estimado: ${estimate.totalCost}€
- Serviços incluídos: ${estimate.includes.join(", ")}
${estimate.extraService ? `- Serviço extra: ${estimate.extraService}` : ""}
` : ""}
DESCRIÇÃO ADICIONAL:
${data.descricao}`;
      
      formData.append('descricao', descricaoCompleta);
      
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
        title: t.form?.messages?.success?.title || "Proposta enviada com sucesso!",
        description: t.form?.messages?.success?.description || "Receberá a proposta formal detalhada.",
      });
      form.reset();
      setFiles([]);
      setDatabasePrep("");
      setAnalysisPlan("");
      setEstimate(null);
    },
    onError: (error) => {
      toast({
        title: t.form?.messages?.error?.title || "Erro ao enviar proposta",
        description: t.form?.messages?.error?.description || "Tente novamente ou contacte-nos diretamente por email.",
        variant: "destructive",
      });
      console.error("Price estimator error:", error);
    },
  });

  const onSubmit = (data: PriceEstimatorData) => {
    estimatorMutation.mutate(data);
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
          <Calculator className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl lg:text-5xl font-bold gt-text-slate-900 mb-6">
            {t.hero?.title || "Simular Orçamento"}
          </h1>
          <p className="text-xl gt-text-slate-600 mb-8">
            {t.hero?.subtitle || "Obtenha uma estimativa inicial do custo da sua análise estatística."}
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
            <p className="text-blue-700 font-semibold flex items-center justify-center">
              <Clock className="mr-2 h-5 w-5" />
              {t.hero?.description || "Proposta de orçamento formal gratuita após receber o seu pedido"}
            </p>
          </div>
        </div>
      </section>

      {/* Configurator */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Step 1: Database Preparation */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-blue-600" />
                <span>{t.steps?.step1?.title || "Passo 1: Preparação da Base de Dados"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="gt-text-slate-600 mb-6">
                {t.steps?.step1?.subtitle || "A sua base de dados já está pronta para análise ou precisa de tratamento prévio (limpeza e organização)?"}
              </p>
              
              <RadioGroup value={databasePrep} onValueChange={setDatabasePrep}>
                <div className="flex items-start space-x-2 mb-4">
                  <RadioGroupItem value="ready" id="ready" className="mt-1" />
                  <div>
                    <Label htmlFor="ready" className="cursor-pointer font-medium">
                      {t.steps?.step1?.options?.ready || "Sim, a base de dados está pronta para ser trabalhada no SPSS ou no R (ex.: as variáveis estão codificadas)."}
                    </Label>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2 mb-4">
                  <RadioGroupItem value="needs_prep_header" id="needs_prep_header" className="mt-1" disabled />
                  <div>
                    <Label htmlFor="needs_prep_header" className="cursor-pointer font-medium">
                      {(t.steps?.step1?.options as any)?.needs_prep_header || "Não, necessito do serviço complementar de preparação da base de dados, que inclui:"}
                    </Label>
                    <ul className="text-sm text-slate-600 mt-2 ml-4 space-y-1">
                      {((t.steps?.step1?.options as any)?.needs_prep_list || [
                        "Verificação e tratamento de valores em falta",
                        "Correção de erros de digitação", 
                        "Codificação ou recodificação de variáveis"
                      ]).map((item: string, index: number) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                    <p className="text-sm font-medium text-slate-700 mt-3 mb-2">{(t.steps?.step1?.options as any)?.database_size_question || "A minha base de dados tem"}:</p>
                    <div className="ml-4 space-y-3">
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="needs_prep_small" id="needs_prep_small" className="mt-1" />
                        <div>
                          <Label htmlFor="needs_prep_small" className="cursor-pointer">
                            {t.steps?.step1?.options?.needs_prep_small || "Até 250 linhas (55€)"}
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="needs_prep_medium" id="needs_prep_medium" className="mt-1" />
                        <div>
                          <Label htmlFor="needs_prep_medium" className="cursor-pointer">
                            {t.steps?.step1?.options?.needs_prep_medium || "Entre 251 e 500 linhas (85€)"}
                          </Label>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <RadioGroupItem value="needs_prep_large" id="needs_prep_large" className="mt-1" />
                        <div>
                          <Label htmlFor="needs_prep_large" className="cursor-pointer">
                            {t.steps?.step1?.options?.needs_prep_large || "Mais de 500 linhas (125€)"}
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <RadioGroupItem value="unsure" id="unsure" className="mt-1" />
                  <div>
                    <Label htmlFor="unsure" className="cursor-pointer font-medium">
                      {t.steps?.step1?.options?.unsure || "Não tenho a certeza. Podem analisar a minha base de dados e dizer se precisa de preparação? (125€)"}
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Step 2: Analysis Objective */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-6 w-6 text-blue-600" />
                <span>{t.steps?.step2?.title || "Passo 2: Objetivo Principal da Análise"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="gt-text-slate-600 mb-6">
                {t.steps?.step2?.subtitle || "Qual é o principal objetivo da sua análise estatística?"}
              </p>
              
              <RadioGroup value={analysisPlan} onValueChange={setAnalysisPlan}>
                <Card className="border-2 hover:border-blue-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="observa" id="observa" />
                      <Label htmlFor="observa" className="cursor-pointer font-semibold">
                        {(t.steps?.step2?.options as any)?.observa || "Caracterizar a amostra e descrever os dados"}
                      </Label>
                    </div>
                    <p className="text-sm text-slate-600 ml-6">
                      {t.plans?.observa?.name || "Plano Observa"}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-2 hover:border-blue-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="compara" id="compara" />
                      <Label htmlFor="compara" className="cursor-pointer font-semibold">
                        {(t.steps?.step2?.options as any)?.compara || "Comparar variáveis entre diferentes grupos ou momentos"}
                      </Label>
                    </div>
                    <p className="text-sm text-slate-600 ml-6">
                      {t.plans?.compara?.name || "Plano Compara"}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-2 hover:border-blue-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="explica" id="explica" />
                      <Label htmlFor="explica" className="cursor-pointer font-semibold">
                        {(t.steps?.step2?.options as any)?.explica || "Analisar relações e prever resultados"}
                      </Label>
                    </div>
                    <p className="text-sm text-slate-600 ml-6">
                      {t.plans?.explica?.name || "Plano Explica"}
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-2 hover:border-blue-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value="valida" id="valida" />
                      <Label htmlFor="valida" className="cursor-pointer font-semibold">
                        {(t.steps?.step2?.options as any)?.valida || "Analisar as propriedades psicométricas de um instrumento (escala, questionário)"}
                      </Label>
                    </div>
                    <p className="text-sm text-slate-600 ml-6">
                      {t.plans?.valida?.name || "Plano Valida"}
                    </p>
                  </CardContent>
                </Card>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Results Section */}
          {estimate && (
            <Card className="mb-8 bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-800">
                  <Euro className="h-6 w-6" />
                  <span>{t.result?.title || "A sua seleção"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-lg">
                        {analysisPlans[analysisPlan as keyof typeof analysisPlans]?.emoji} {estimate.planName} – {estimate.baseCost}€
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 font-medium">
                      {analysisPlans[analysisPlan as keyof typeof analysisPlans]?.subtitle}
                    </p>
                  </div>
                  
                  {estimate.extraCost > 0 && (
                    <div className="flex justify-between items-center">
                      <span>{t.result?.extraService || "Serviço extra"} - {estimate.extraService}:</span>
                      <span className="font-bold text-lg">{estimate.extraCost}€</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-800">{t.result?.totalCost || "Custo Total"}:</span>
                      <span className="text-2xl font-bold text-blue-800">{estimate.totalCost}€</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">{t.result?.includes || "Inclui"}:</h4>
                    <div className="space-y-2">
                      {estimate.includes.map((item, index) => (
                        <div key={index} className="text-sm gt-text-slate-600">
                          {item.startsWith("Inclui tudo") || item.includes("mais:") ? (
                            <p className="font-medium text-slate-700">{item}</p>
                          ) : (
                            <div className="flex items-start space-x-2">
                              <span className="text-blue-600 mt-1">•</span>
                              <span>{item}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  

                </div>
              </CardContent>
            </Card>
          )}

          {/* Submission Form */}
          {estimate && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <span>{t.form?.title || "Receber Proposta Formal"}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div>
                      <Label htmlFor="nome" className="flex items-center space-x-2 text-sm font-semibold gt-text-slate-700 mb-2">
                        <User className="h-4 w-4" />
                        <span>{t.form?.fields?.nome?.label || "Nome completo"}</span>
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
                        <span>{t.form?.fields?.email?.label || "Email"}</span>
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
                        <span>{t.form?.fields?.telefone?.label || "Telefone"}</span>
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
                        <span>{t.form?.fields?.nivel?.label || "Nível académico"}</span>
                      </Label>
                      <Select onValueChange={(value) => form.setValue("nivel", value)}>
                        <SelectTrigger className="transition-colors focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder={t.form?.fields?.nivel?.placeholder || "Selecione o seu nível"} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="licenciatura">Licenciatura</SelectItem>
                          <SelectItem value="mestrado">Mestrado</SelectItem>
                          <SelectItem value="doutoramento">Doutoramento</SelectItem>
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
                      <span>{t.form?.fields?.area?.label || "Área de estudo"}</span>
                    </Label>
                    <Input
                      id="area"
                      {...form.register("area")}
                      placeholder={t.form?.fields?.area?.placeholder || "Ex: Psicologia, Enfermagem, Gestão..."}
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
                      <span>{t.form?.fields?.descricao?.label || "Descrição do projeto"}</span>
                    </Label>
                    <Textarea
                      id="descricao"
                      {...form.register("descricao")}
                      rows={4}
                      placeholder={t.form?.fields?.descricao?.placeholder || "Descreva brevemente o seu projeto de investigação, as suas hipóteses e objetivos..."}
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
                      <span>{t.form?.fields?.files?.label || "Ficheiros (opcional)"}</span>
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
                            <p className="text-green-600 mb-1">
                              {files.length} {language === "pt" ? "ficheiro(s) selecionado(s)" :
                                            language === "en" ? "file(s) selected" :
                                            "archivo(s) seleccionado(s)"}
                            </p>
                            <p className="text-sm text-slate-500">
                              {language === "pt" ? "Clique para alterar" :
                               language === "en" ? "Click to change" :
                               "Haga clic para cambiar"}
                            </p>
                          </>
                        ) : (
                          <>
                            <Upload className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                            <p className="gt-text-slate-600 mb-1">
                              {language === "pt" ? "Clique para anexar ficheiros ou arraste aqui" :
                               language === "en" ? "Click to attach files or drag here" :
                               "Haga clic para adjuntar archivos o arrastre aquí"}
                            </p>
                            <p className="text-sm text-slate-500">
                              {language === "pt" ? "Base de dados, questionário, objetivos (PDF, Word, Excel)" :
                               language === "en" ? "Database, questionnaire, objectives (PDF, Word, Excel)" :
                               "Base de datos, cuestionario, objetivos (PDF, Word, Excel)"}
                            </p>
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
                      disabled={estimatorMutation.isPending}
                      className="gt-accent hover:bg-orange-600 text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all"
                    >
                      {estimatorMutation.isPending 
                        ? ((t as any).form?.button?.loading || "A enviar...")
                        : ((t as any).form?.button?.send || "Receber Proposta")}
                    </Button>
                    
                    <p className="text-sm text-slate-500 mt-4">
                      {(t as any).form?.privacy || "Os seus dados pessoais são protegidos conforme a nossa política de privacidade."}
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-16 gt-bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gt-text-slate-900 mb-4">
              {(t as any).guarantees?.title || "Garantias GT Analytics"}
            </h2>
            <p className="text-lg gt-text-slate-600 max-w-2xl mx-auto">
              {(t as any).guarantees?.subtitle || "Compromissos que assumimos com todos os nossos clientes"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Euro className="h-8 w-8 text-orange-600" />,
                title: (t as any).guarantees?.items?.pricing?.title || "Preços transparentes",
                description: (t as any).guarantees?.items?.pricing?.description || "Sem custos ocultos. O preço acordado é o preço final."
              },
              {
                icon: <Shield className="h-8 w-8 text-green-600" />,
                title: (t as any).guarantees?.items?.confidentiality?.title || "Confidencialidade absoluta",
                description: (t as any).guarantees?.items?.confidentiality?.description || "Os seus dados são tratados com total confidencialidade."
              },
              {
                icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
                title: (t as any).guarantees?.items?.quality?.title || "Qualidade garantida",
                description: (t as any).guarantees?.items?.quality?.description || "Revisão ilimitada até à sua satisfação completa."
              }
            ].map((guarantee, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {guarantee.icon}
                  </div>
                  <h3 className="text-lg font-semibold gt-text-slate-900 mb-3">{guarantee.title}</h3>
                  <p className="gt-text-slate-600 whitespace-pre-line">{guarantee.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}