import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bus, 
  BarChart3, 
  Lightbulb, 
  Table, 
  Presentation,
  Laptop,
  TrendingUp,
  PieChart,
  Target,
  FileSpreadsheet,
  CheckCircle
} from "lucide-react";
import { useLanguage } from "@/i18n/context";

export default function Services() {
  const [showPlans, setShowPlans] = useState(false);
  const { language } = useLanguage();

  const content = {
    pt: {
      hero: {
        title: "Os Nossos Serviços",
        subtitle: "A GT Analytics oferece diferentes serviços e planos para análise de dados quantitativos ajustados às necessidades do seu trabalho académico ou científico",
        button: "Simular Orçamento"
      },
      services: [
        {
          title: "Consultoria",
          description: "",
          features: [
            "Alinhamento entre pergunta de investigação e objetivos",
            "Definição da análise de dados necessária para dar resposta aos objetivos",
            "Explicação dos resultados"
          ]
        },
        {
          title: "Análise de Dados",
          description: "Análise dos dados quantitativos de forma a dar resposta aos objetivos do seu trabalho académico ou estudo científico",
          features: [],
          hasButton: true
        },
        {
          title: "Redação de Relatório",
          description: "Receba um relatório final em formato Word, redigido de acordo com a norma de formatação solicitada (APA, Vancouver, Chicago, outra). O documento incluirá a descrição detalhada da metodologia adotada, das análises estatísticas realizadas e a apresentação dos resultados, acompanhada de tabelas e gráficos.",
          features: []
        }
      ],
      buttons: {
        priceList: "Preçário por Serviço a vulso",
        showPlans: "Ver Planos",
        hidePlans: "Ocultar Planos"
      },
      plans: {
        title: "Planos de Análise de Dados",
        subtitle: "Escolha o plano que melhor se adequa às suas necessidades",
        observa: {
          title: "🟢 Plano Observa",
          description: "Ideal para caracterizar a amostra e descrever os dados",
          included: "Serviços incluídos:",
          features: [
            "Estatística descritiva completa: frequência absoluta e relativa, média, mediana, moda, desvio-padrão, variância, quartis, assimetria e curtose",
            "Resultados tabelados e interpretados para fácil inserção no trabalho académico/artigo"
          ]
        },
        compara: {
          title: "🔵 Plano Compara",
          description: "Indicado para estudos que envolvem comparação entre grupos ou momentos",
          included: "Inclui tudo do Plano Observa, mais:",
          features: [
            "Testes de normalidade (Kolmogorov-Smirnov, Shapiro-Wilk)",
            "Testes paramétricos: t-Student para amostras independentes e emparelhadas, ANOVA one-way e two-way",
            "Testes não-paramétricos: Mann-Whitney, Wilcoxon, Kruskal-Wallis, Friedman",
            "Análise post-hoc quando aplicável"
          ]
        },
        explica: {
          title: "🟠 Plano Explica",
          description: "Perfeito para identificar relações e associações entre variáveis",
          included: "Inclui tudo dos Planos Observa e Compara, mais:",
          features: [
            "Correlações de Pearson e Spearman",
            "Regressão linear simples e múltipla",
            "Regressão logística binária e multinomial",
            "Análise de pressupostos e diagnósticos de regressão"
          ]
        },
        valida: {
          title: "🔴 Plano Valida",
          description: "Ideal para validação de instrumentos e análise fatorial",
          included: "Inclui tudo dos planos anteriores, mais:",
          features: [
            "Análise fatorial exploratória (AFE)",
            "Análise fatorial confirmatória (AFC)",
            "Análise de fiabilidade (Alpha de Cronbach)",
            "Validação de construto e critério"
          ]
        }
      },
      software: {
        title: "Software Utilizado",
        subtitle: "Utilizamos as melhores ferramentas de análise estatística",
        list: [
          { name: "SPSS", description: "Software líder em análise estatística para ciências sociais" },
          { name: "R", description: "Linguagem de programação estatística de código aberto" },
          { name: "Excel", description: "Limpeza e preparação da base dados" }
        ]
      },
      process: {
        title: "Processo",
        subtitle: "O nosso processo garante qualidade, transparência e resultados excelentes",
        steps: [
          {
            title: "Análise dos Dados",
            description: "Avaliação dos dados e identificação da metodologia de análise mais apropriada."
          },
          {
            title: "Execução da Análise",
            description: "Análise estatística com software profissional."
          },
          {
            title: "Interpretação",
            description: "Apresentação clara dos resultados, dando resposta aos objetivos do estudo."
          },
          {
            title: "Entrega Final",
            description: "Entrega dos resultados na data acordada."
          }
        ]
      },
      publications: {
        title: "Exemplos de Publicações"
      },
      cta: {
        title: "Precisa de Ajuda com a sua Análise Estatística?",
        subtitle: "Entre em contacto e receba um orçamento personalizado em 24 horas",
        quoteButton: "Simular Orçamento",
        faqButton: "Ver FAQ"
      }
    },
    en: {
      hero: {
        title: "Our Services",
        subtitle: "GT Analytics offers different services and plans for quantitative data analysis tailored to the needs of your academic or scientific work",
        button: "Get Quote"
      },
      services: [
        {
          title: "Consulting",
          description: "",
          features: [
            "Alignment between research question and objectives",
            "Definition of data analysis needed to answer objectives",
            "Explanation of results"
          ]
        },
        {
          title: "Data Analysis",
          description: "Analysis of quantitative data to answer the objectives of your academic work or scientific study",
          features: [],
          hasButton: true
        },
        {
          title: "Report Writing",
          description: "Receive a final report in Word format, written according to the requested formatting standard (APA, Vancouver, Chicago, other). The document will include detailed description of the adopted methodology, statistical analyses performed, and presentation of results, accompanied by tables and graphs.",
          features: []
        }
      ],
      buttons: {
        priceList: "Individual Service Pricing",
        showPlans: "View Plans",
        hidePlans: "Hide Plans"
      },
      plans: {
        title: "Data Analysis Plans",
        subtitle: "Choose the plan that best suits your needs",
        observa: {
          title: "🟢 Observe Plan",
          description: "Ideal for characterizing the sample and describing data",
          included: "Services included:",
          features: [
            "Complete descriptive statistics: absolute and relative frequency, mean, median, mode, standard deviation, variance, quartiles, skewness and kurtosis",
            "Tabulated and interpreted results for easy insertion in academic work/article"
          ]
        },
        compara: {
          title: "🔵 Compare Plan",
          description: "Suitable for studies involving comparison between groups or time points",
          included: "Includes everything from Observe Plan, plus:",
          features: [
            "Normality tests (Kolmogorov-Smirnov, Shapiro-Wilk)",
            "Parametric tests: t-Student for independent and paired samples, one-way and two-way ANOVA",
            "Non-parametric tests: Mann-Whitney, Wilcoxon, Kruskal-Wallis, Friedman",
            "Post-hoc analysis when applicable"
          ]
        },
        explica: {
          title: "🟠 Explain Plan",
          description: "Perfect for identifying relationships and associations between variables",
          included: "Includes everything from Observe and Compare Plans, plus:",
          features: [
            "Pearson and Spearman correlations",
            "Simple and multiple linear regression",
            "Binary and multinomial logistic regression",
            "Analysis of assumptions and regression diagnostics"
          ]
        },
        valida: {
          title: "🔴 Validate Plan",
          description: "Ideal for instrument validation and factor analysis",
          included: "Includes everything from previous plans, plus:",
          features: [
            "Exploratory factor analysis (EFA)",
            "Confirmatory factor analysis (CFA)",
            "Reliability analysis (Cronbach's Alpha)",
            "Construct and criterion validation"
          ]
        }
      },
      software: {
        title: "Software Used",
        subtitle: "We use the best statistical analysis tools",
        list: [
          { name: "SPSS", description: "Leading statistical analysis software for social sciences" },
          { name: "R", description: "Open-source statistical programming language" },
          { name: "Excel", description: "Data cleaning and preparation" }
        ]
      },
      process: {
        title: "Process",
        subtitle: "Our process ensures quality, transparency and excellent results",
        steps: [
          {
            title: "Data Analysis",
            description: "Data evaluation and identification of the most appropriate analysis methodology."
          },
          {
            title: "Analysis Execution",
            description: "Statistical analysis with professional software."
          },
          {
            title: "Interpretation",
            description: "Clear presentation of results, answering the study objectives."
          },
          {
            title: "Final Delivery",
            description: "Delivery of results on the agreed date."
          }
        ]
      },
      publications: {
        title: "Publication Examples"
      },
      cta: {
        title: "Need Help with Your Statistical Analysis?",
        subtitle: "Contact us and receive a personalized quote in 24 hours",
        quoteButton: "Get Quote",
        faqButton: "View FAQ"
      }
    },
    es: {
      hero: {
        title: "Nuestros Servicios",
        subtitle: "GT Analytics ofrece diferentes servicios y planes para análisis de datos cuantitativos adaptados a las necesidades de su trabajo académico o científico",
        button: "Presupuesto"
      },
      services: [
        {
          title: "Consultoría",
          description: "",
          features: [
            "Alineación entre pregunta de investigación y objetivos",
            "Definición del análisis de datos necesario para responder a los objetivos",
            "Explicación de los resultados"
          ]
        },
        {
          title: "Análisis de Datos",
          description: "Análisis de datos cuantitativos para responder a los objetivos de su trabajo académico o estudio científico",
          features: [],
          hasButton: true
        },
        {
          title: "Redacción de Informe",
          description: "Reciba un informe final en formato Word, redactado según la norma de formato solicitada (APA, Vancouver, Chicago, otra). El documento incluirá la descripción detallada de la metodología adoptada, los análisis estadísticos realizados y la presentación de resultados, acompañada de tablas y gráficos.",
          features: []
        }
      ],
      buttons: {
        priceList: "Precios por Servicio Individual",
        showPlans: "Ver Planes",
        hidePlans: "Ocultar Planes"
      },
      plans: {
        title: "Planes de Análisis de Datos",
        subtitle: "Elija el plan que mejor se adapte a sus necesidades",
        observa: {
          title: "🟢 Plan Observa",
          description: "Ideal para caracterizar la muestra y describir los datos",
          included: "Servicios incluidos:",
          features: [
            "Estadística descriptiva completa: frecuencia absoluta y relativa, media, mediana, moda, desviación estándar, varianza, cuartiles, asimetría y curtosis",
            "Resultados tabulados e interpretados para fácil inserción en el trabajo académico/artículo"
          ]
        },
        compara: {
          title: "🔵 Plan Compara",
          description: "Indicado para estudios que involucran comparación entre grupos o momentos",
          included: "Incluye todo del Plan Observa, más:",
          features: [
            "Pruebas de normalidad (Kolmogorov-Smirnov, Shapiro-Wilk)",
            "Pruebas paramétricas: t-Student para muestras independientes y emparejadas, ANOVA de una y dos vías",
            "Pruebas no paramétricas: Mann-Whitney, Wilcoxon, Kruskal-Wallis, Friedman",
            "Análisis post-hoc cuando sea aplicable"
          ]
        },
        explica: {
          title: "🟠 Plan Explica",
          description: "Perfecto para identificar relaciones y asociaciones entre variables",
          included: "Incluye todo de los Planes Observa y Compara, más:",
          features: [
            "Correlaciones de Pearson y Spearman",
            "Regresión lineal simple y múltiple",
            "Regresión logística binaria y multinomial",
            "Análisis de supuestos y diagnósticos de regresión"
          ]
        },
        valida: {
          title: "🔴 Plan Valida",
          description: "Ideal para validación de instrumentos y análisis factorial",
          included: "Incluye todo de los planes anteriores, más:",
          features: [
            "Análisis factorial exploratorio (AFE)",
            "Análisis factorial confirmatorio (AFC)",
            "Análisis de confiabilidad (Alfa de Cronbach)",
            "Validación de constructo y criterio"
          ]
        }
      },
      software: {
        title: "Software Utilizado",
        subtitle: "Utilizamos las mejores herramientas de análisis estadístico",
        list: [
          { name: "SPSS", description: "Software líder en análisis estadístico para ciencias sociales" },
          { name: "R", description: "Lenguaje de programación estadística de código abierto" },
          { name: "Excel", description: "Limpieza y preparación de la base de datos" }
        ]
      },
      process: {
        title: "Proceso",
        subtitle: "Nuestro proceso garantiza calidad, transparencia y resultados excelentes",
        steps: [
          {
            title: "Análisis de Datos",
            description: "Evaluación de datos e identificación de la metodología de análisis más apropiada."
          },
          {
            title: "Ejecución del Análisis",
            description: "Análisis estadístico con software profesional."
          },
          {
            title: "Interpretación",
            description: "Presentación clara de los resultados, respondiendo a los objetivos del estudio."
          },
          {
            title: "Entrega Final",
            description: "Entrega de resultados en la fecha acordada."
          }
        ]
      },
      publications: {
        title: "Ejemplos de Publicaciones"
      },
      cta: {
        title: "¿Necesita Ayuda con su Análisis Estadístico?",
        subtitle: "Contáctenos y reciba un presupuesto personalizado en 24 horas",
        quoteButton: "Presupuesto",
        faqButton: "Ver FAQ"
      }
    }
  };

  const t = content[language];
  
  const services = t.services.map((service, index) => ({
    ...service,
    icon: index === 0 ? <Bus className="h-8 w-8 text-blue-600" /> :
          index === 1 ? <BarChart3 className="h-8 w-8 text-blue-600" /> :
          <FileSpreadsheet className="h-8 w-8 text-blue-600" />,
    isJustified: index === 2
  }));

  const softwareList = t.software.list;

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
          <Link href="/orcamento">
            <Button size="lg" className="gt-accent hover:bg-orange-600 text-lg px-8 py-4">
              {t.hero.button}
            </Button>
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl gt-text-slate-900">
                        {service.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {service.description && (
                    <p className={`gt-text-slate-600 mb-4 ${service.isJustified ? 'text-justify' : ''}`}>
                      {service.description}
                    </p>
                  )}
                  {service.features.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-sm gt-text-slate-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {service.hasButton && (
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
                        onClick={() => {
                          const pdfMap = {
                            pt: '/precario-pt.pdf',
                            en: '/precario-en.pdf', 
                            es: '/precario-es.pdf'
                          };
                          window.open(pdfMap[language], '_blank');
                        }}
                      >
{t.buttons.priceList}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                        onClick={() => {
                          setShowPlans(!showPlans);
                          if (!showPlans) {
                            // Scroll to plans section after a brief delay to allow content to render
                            setTimeout(() => {
                              const plansSection = document.getElementById('plans-section');
                              if (plansSection) {
                                plansSection.scrollIntoView({ behavior: 'smooth' });
                              }
                            }, 100);
                          }
                        }}
                      >
{showPlans ? t.buttons.hidePlans : t.buttons.showPlans}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      {showPlans && (
        <section id="plans-section" className="py-20 gt-bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold gt-text-slate-900 mb-4">
                {t.plans.title}
              </h2>
              <p className="text-lg gt-text-slate-600">
                {t.plans.subtitle}
              </p>
            </div>

            <div className="space-y-6">
              {/* Plano Observa */}
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 bg-green-500 rounded-full mt-1"></div>
                    <div>
                      <h3 className="text-xl font-bold gt-text-slate-900 mb-3">
                        {t.plans.observa.title}
                      </h3>
                      <p className="gt-text-slate-600 mb-4">
                        {t.plans.observa.description}
                      </p>
                      <p className="gt-text-slate-600 mb-2 font-semibold">{t.plans.observa.included}</p>
                      <ul className="gt-text-slate-600 list-disc ml-6 space-y-1">
                        {t.plans.observa.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Plano Compara */}
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 bg-blue-500 rounded-full mt-1"></div>
                    <div>
                      <h3 className="text-xl font-bold gt-text-slate-900 mb-3">
                        {t.plans.compara.title}
                      </h3>
                      <p className="gt-text-slate-600 mb-4">
                        {t.plans.compara.description}
                      </p>
                      <p className="gt-text-slate-600 mb-2 font-semibold">{t.plans.compara.included}</p>
                      <ul className="gt-text-slate-600 list-disc ml-6 space-y-1">
                        {t.plans.compara.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Plano Explica */}
              <Card className="border-l-4 border-l-orange-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 bg-orange-500 rounded-full mt-1"></div>
                    <div>
                      <h3 className="text-xl font-bold gt-text-slate-900 mb-3">
                        {t.plans.explica.title}
                      </h3>
                      <p className="gt-text-slate-600 mb-4">
                        {t.plans.explica.description}
                      </p>
                      <p className="gt-text-slate-600 mb-2 font-semibold">{t.plans.explica.included}</p>
                      <ul className="gt-text-slate-600 list-disc ml-6 space-y-1">
                        {t.plans.explica.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Plano Valida */}
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-4 h-4 bg-red-500 rounded-full mt-1"></div>
                    <div>
                      <h3 className="text-xl font-bold gt-text-slate-900 mb-3">
                        {t.plans.valida.title}
                      </h3>
                      <p className="gt-text-slate-600 mb-4">
                        {t.plans.valida.description}
                      </p>
                      <p className="gt-text-slate-600 mb-2 font-semibold">{t.plans.valida.included}</p>
                      <ul className="gt-text-slate-600 list-disc ml-6 space-y-1">
                        {t.plans.valida.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Software Section */}
      <section className="py-20 gt-bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold gt-text-slate-900 mb-4">
              {t.software.title}
            </h2>
            <p className="text-lg gt-text-slate-600 max-w-2xl mx-auto">
              {t.software.subtitle}
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softwareList.map((software, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Laptop className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold gt-text-slate-900 mb-2">
                    {software.name}
                  </h3>
                  <p className="text-sm gt-text-slate-600">{software.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold gt-text-slate-900 mb-4">
              {t.process.title}
            </h2>
            <p className="text-lg gt-text-slate-600 max-w-2xl mx-auto">
              {t.process.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.process.steps.map((step, index) => {
              const icons = [
                <FileSpreadsheet className="h-8 w-8 text-blue-600" />,
                <TrendingUp className="h-8 w-8 text-green-600" />,
                <PieChart className="h-8 w-8 text-purple-600" />,
                <Presentation className="h-8 w-8 text-orange-600" />
              ];
              const bgColors = ["bg-blue-100", "bg-green-100", "bg-purple-100", "bg-orange-100"];
              
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${bgColors[index]} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      {icons[index]}
                    </div>
                    <h3 className="text-lg font-semibold gt-text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-sm gt-text-slate-600 text-justify">{step.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Publications Examples Section */}
      <section className="py-20 gt-bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold gt-text-slate-900 mb-4">
              {t.publications.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                reference: "Teixeira, G., Picoito, R., Gaspar, F., & Lucas, P. (2024). Cultural Competence and Nursing Work Environment: Impact on Culturally Congruent Care in Portuguese Multicultural Healthcare Units. Healthcare, 12(23), 2430.",
                url: "https://doi.org/10.3390/healthcare12232430"
              },
              {
                reference: "Teixeira, G., Gaspar, F., & Lucas, P. (2024). Development and Validation of the Portuguese Transcultural Nursing Leadership Questionnaire (QLTE-PT). Journal of Nursing Management, 2024(1), 5750265.",
                url: "https://doi.org/https://doi.org/10.1155/2024/5750265"
              }
            ].map((publication, index) => (
              <Card 
                key={index} 
                className="bg-teal-900 text-white cursor-pointer hover:bg-teal-800 transition-colors duration-200"
                onClick={() => window.open(publication.url, '_blank')}
              >
                <CardContent className="p-6">
                  <p className="text-sm leading-relaxed text-justify">
                    {index === 0 ? (
                      <>
                        Teixeira, G., Picoito, R., Gaspar, F., & Lucas, P. (2024). Cultural Competence and Nursing Work Environment: Impact on Culturally Congruent Care in Portuguese Multicultural Healthcare Units. <em>Healthcare</em>, 12(23), 2430. {publication.url}
                      </>
                    ) : (
                      <>
                        Teixeira, G., Gaspar, F., & Lucas, P. (2024). Development and Validation of the Portuguese Transcultural Nursing Leadership Questionnaire (QLTE-PT). <em>Journal of Nursing Management</em>, 2024(1), 5750265. {publication.url}
                      </>
                    )}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/orcamento">
              <Button size="lg" className="gt-accent hover:bg-orange-600 text-lg px-8 py-4">
                {t.cta.quoteButton}
              </Button>
            </Link>
            <Link href="/faq" onClick={() => window.scrollTo(0, 0)}>
              <Button size="lg" variant="outline" className="text-blue-600 bg-white border-white hover:bg-blue-600 hover:text-white text-lg px-8 py-4">
                {t.cta.faqButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
