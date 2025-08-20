import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  CheckCircle, 
  Shield, 
  Mail, 
  Calculator, 
  TrendingUp, 
  Handshake, 
  FileText,
  GraduationCap,
  Clock,
  Lock,
  Bus,
  BarChart3,
  Lightbulb,
  Table,
  Presentation,
  Laptop,
  Star
} from "lucide-react";
import { useLanguage } from "@/i18n/context";
import backgroundImage from "@assets/image_Amtk6rHP_1753609343800_raw_1753724019960.jpg";

export default function Home() {
  const { language } = useLanguage();

  // Content translations
  const content = {
    pt: {
      hero: {
        title: "Análise de Dados Quantitativos",
        subtitle: "Dissertações de Mestrado – Teses de Doutoramento – Artigos para Publicação",
        description: "Transforme os seus dados em resultados robustos e claros. Deixe a estatística com a GT Analytics e priorize o seu tempo no que é mais importante.",
        quoteButton: "Simular Orçamento",
        contactButton: "Contacto Direto",
        freeQuote: "Orçamento grátis",
        confidentiality: "Confidencialidade garantida"
      },
      services: {
        title: "Os Nossos Serviços",
        description: "Soluções estatísticas completas para a sua investigação académica",
        quote: "Simular Orçamento",
        contact: "Falar Connosco"
      },
      howItWorks: {
        title: "Como Funciona",
        subtitle: "Um processo simples em 5 passos",
        steps: {
          contact: {
            title: "Contacto",
            description: "Envie a descrição dos dados que quer analisar e os objetivos do seu trabalho através do formulário."
          },
          quote: {
            title: "Orçamento Rápido",
            description: "Receba um orçamento gratuito e detalhado."
          },
          analysis: {
            title: "Análise",
            description: "Após a sua aprovação, será iniciado imediatamente o tratamento e a análise dos seus dados."
          },
          followUp: {
            title: "Acompanhamento",
            description: "Será contactado(a) ao longo da análise dos seus dados para validar os resultados obtidos."
          },
          delivery: {
            title: "Entrega",
            description: "Receberá um relatório final em formato Word com a descrição da metodologia adotada, das análises estatísticas realizadas e a apresentação dos resultados."
          }
        }
      },
      whyUs: {
        title: "Porquê a GT Analytics?",
        academic: {
          title: "Especialização Académica",
          description: "Focamos exclusivamente em análises para dissertações e teses, garantindo que os nossos métodos estão alinhados com as exigências académicas."
        },
        rigor: {
          title: "Rigor Científico",
          description: "Aplicamos metodologias estatísticas robustas e reconhecidas, assegurando a validade e fiabilidade dos resultados."
        },
        support: {
          title: "Apoio Personalizado",
          description: "Acompanhamos todo o processo, desde a preparação dos dados até à interpretação dos resultados, adaptando-nos às suas necessidades específicas."
        },
        time: {
          title: "Poupança de Tempo",
          description: "Permite-lhe focar-se na escrita e conceptualização da sua investigação, enquanto nós tratamos da componente estatística."
        }
      },
      cta: {
        title: "Precisa de ajuda com a sua análise de dados?",
        subtitle: "Peça o seu orçamento gratuito e sem compromisso",
        quoteButton: "Simular Orçamento",
        contactButton: "Contacto Direto"
      },
      testimonials: {
        title: "O que dizem os nossos clientes",
        subtitle: "Testemunhos que confiam na GT Analytics"
      },
      footer: {
        description: "Especialistas em análise estatística para dissertações e teses. Transformamos os seus dados em resultados claros e robustos.",
        quickLinks: "Links Rápidos",
        contact: "Contacto",
        confidentiality: "Confidencialidade garantida",
        copyright: "© 2024 GT Analytics. Todos os direitos reservados."
      }
    },
    en: {
      hero: {
        title: "Quantitative Data Analysis",
        subtitle: "Master's Dissertations – Doctoral Theses – Articles for Publication",
        description: "Transform your data into robust and clear results. Leave the statistics to GT Analytics and prioritize your time on what matters most.",
        quoteButton: "Get Quote",
        contactButton: "Direct Contact",
        freeQuote: "Free quote",
        confidentiality: "Confidentiality guaranteed"
      },
      services: {
        title: "Our Services",
        description: "Complete statistical solutions for your academic research",
        quote: "Get Quote",
        contact: "Contact Us"
      },
      howItWorks: {
        title: "How It Works",
        subtitle: "A simple 5-step process",
        steps: {
          contact: {
            title: "Contact",
            description: "Send a description of the data you want to analyze and your work objectives through the form."
          },
          quote: {
            title: "Quick Quote",
            description: "Receive a free and detailed quote."
          },
          analysis: {
            title: "Analysis",
            description: "After your approval, data processing and analysis will begin immediately."
          },
          followUp: {
            title: "Follow-up",
            description: "You will be contacted throughout the data analysis to validate the obtained results."
          },
          delivery: {
            title: "Delivery",
            description: "You will receive a final report in Word format with the description of the adopted methodology, statistical analyses performed, and presentation of results."
          }
        }
      },
      whyUs: {
        title: "Why GT Analytics?",
        academic: {
          title: "Academic Specialization",
          description: "We focus exclusively on analyses for dissertations and theses, ensuring our methods align with academic requirements."
        },
        rigor: {
          title: "Scientific Rigor",
          description: "We apply robust and recognized statistical methodologies, ensuring the validity and reliability of results."
        },
        support: {
          title: "Personalized Support",
          description: "We accompany the entire process, from data preparation to result interpretation, adapting to your specific needs."
        },
        time: {
          title: "Time Saving",
          description: "Allows you to focus on writing and conceptualizing your research while we handle the statistical component."
        }
      },
      cta: {
        title: "Need help with your data analysis?",
        subtitle: "Request your free quote with no commitment",
        quoteButton: "Get Quote",
        contactButton: "Direct Contact"
      },
      testimonials: {
        title: "What our clients say",
        subtitle: "Testimonials from those who trust GT Analytics"
      },
      footer: {
        description: "Specialists in statistical analysis for dissertations and theses. We transform your data into clear and robust results.",
        quickLinks: "Quick Links",
        contact: "Contact",
        confidentiality: "Confidentiality guaranteed",
        copyright: "© 2024 GT Analytics. All rights reserved."
      }
    },
    es: {
      hero: {
        title: "Análisis de Datos Cuantitativos",
        subtitle: "Disertaciones de Máster – Tesis Doctorales – Artículos para Publicación",
        description: "Transforme sus datos en resultados robustos y claros. Deje la estadística a GT Analytics y priorice su tiempo en lo más importante.",
        quoteButton: "Presupuesto",
        contactButton: "Contacto Directo",
        freeQuote: "Presupuesto gratis",
        confidentiality: "Confidencialidad garantizada"
      },
      services: {
        title: "Nuestros Servicios",
        description: "Soluciones estadísticas completas para su investigación académica",
        quote: "Presupuesto",
        contact: "Contactar"
      },
      howItWorks: {
        title: "Cómo Funciona",
        subtitle: "Un proceso simple en 5 pasos",
        steps: {
          contact: {
            title: "Contacto",
            description: "Envíe la descripción de los datos que quiere analizar y los objetivos de su trabajo a través del formulario."
          },
          quote: {
            title: "Presupuesto Rápido",
            description: "Reciba un presupuesto gratuito y detallado."
          },
          analysis: {
            title: "Análisis",
            description: "Después de su aprobación, se iniciará inmediatamente el procesamiento y análisis de sus datos."
          },
          followUp: {
            title: "Seguimiento",
            description: "Será contactado(a) durante el análisis de sus datos para validar los resultados obtenidos."
          },
          delivery: {
            title: "Entrega",
            description: "Recibirá un informe final en formato Word con la descripción de la metodología adoptada, los análisis estadísticos realizados y la presentación de resultados."
          }
        }
      },
      whyUs: {
        title: "¿Por qué GT Analytics?",
        academic: {
          title: "Especialización Académica",
          description: "Nos enfocamos exclusivamente en análisis para disertaciones y tesis, garantizando que nuestros métodos estén alineados con las exigencias académicas."
        },
        rigor: {
          title: "Rigor Científico",
          description: "Aplicamos metodologías estadísticas robustas y reconocidas, asegurando la validez y fiabilidad de los resultados."
        },
        support: {
          title: "Apoyo Personalizado",
          description: "Acompañamos todo el proceso, desde la preparación de datos hasta la interpretación de resultados, adaptándonos a sus necesidades específicas."
        },
        time: {
          title: "Ahorro de Tiempo",
          description: "Le permite enfocarse en la escritura y conceptualización de su investigación mientras nosotros nos encargamos del componente estadístico."
        }
      },
      cta: {
        title: "¿Necesita ayuda con su análisis de datos?",
        subtitle: "Solicite su presupuesto gratuito sin compromiso",
        quoteButton: "Presupuesto",
        contactButton: "Contacto Directo"
      },
      testimonials: {
        title: "Lo que dicen nuestros clientes",
        subtitle: "Testimonios de quienes confían en GT Analytics"
      },
      footer: {
        description: "Especialistas en análisis estadístico para disertaciones y tesis. Transformamos sus datos en resultados claros y robustos.",
        quickLinks: "Enlaces Rápidos",
        contact: "Contacto",
        confidentiality: "Confidencialidad garantizada",
        copyright: "© 2024 GT Analytics. Todos los derechos reservados."
      }
    }
  };

  const t = content[language];

  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative py-20 lg:py-28 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-white/80"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gt-text-slate-900 mb-6">
              <span className="text-blue-600">{t.hero.title}</span>
            </h1>
            <p className="text-2xl lg:text-3xl gt-text-slate-700 mb-6 font-medium">
              {t.hero.subtitle}
            </p>
            <p className="text-xl lg:text-2xl gt-text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
            
            <div className="mb-8 space-x-4">
              <Link href="/orcamento">
                <Button size="lg" className="gt-accent hover:bg-orange-600 text-lg px-8 py-4 shadow-lg">
                  {t.hero.quoteButton}
                </Button>
              </Link>
              <Link href="/contacto">
                <Button size="lg" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white text-lg px-8 py-4 shadow-lg">
                  {t.hero.contactButton}
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm gt-text-slate-600">
              <div className="flex items-center">
                <CheckCircle className="text-green-500 mr-2 h-5 w-5" />
                <span>{t.hero.freeQuote}</span>
              </div>
              <div className="flex items-center">
                <Shield className="text-green-500 mr-2 h-5 w-5" />
                <span>{t.hero.confidentiality}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold gt-text-slate-900 mb-4">
              {t.howItWorks.title}
            </h2>
            <p className="text-lg gt-text-slate-600 max-w-2xl mx-auto">
              {t.howItWorks.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              {
                icon: <Mail className="h-8 w-8 text-blue-600" />,
                step: 1,
                title: t.howItWorks.steps.contact.title,
                description: t.howItWorks.steps.contact.description,
                bgColor: "bg-blue-100",
                stepColor: "bg-blue-600"
              },
              {
                icon: <Calculator className="h-8 w-8 text-green-600" />,
                step: 2,
                title: t.howItWorks.steps.quote.title,
                description: t.howItWorks.steps.quote.description,
                bgColor: "bg-green-100",
                stepColor: "bg-green-600"
              },
              {
                icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
                step: 3,
                title: t.howItWorks.steps.analysis.title,
                description: t.howItWorks.steps.analysis.description,
                bgColor: "bg-purple-100",
                stepColor: "bg-purple-600"
              },
              {
                icon: <Handshake className="h-8 w-8 text-orange-600" />,
                step: 4,
                title: t.howItWorks.steps.followUp.title,
                description: t.howItWorks.steps.followUp.description,
                bgColor: "bg-orange-100",
                stepColor: "bg-orange-600"
              },
              {
                icon: <FileText className="h-8 w-8 text-indigo-600" />,
                step: 5,
                title: t.howItWorks.steps.delivery.title,
                description: t.howItWorks.steps.delivery.description,
                bgColor: "bg-indigo-100",
                stepColor: "bg-indigo-600"
              }
            ].map((item) => (
              <Card key={item.step} className="text-center">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${item.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    {item.icon}
                  </div>
                  <div className={`${item.stepColor} text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mx-auto mb-3`}>
                    {item.step}
                  </div>
                  <h3 className="font-semibold gt-text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm gt-text-slate-600 text-justify">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Why Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold gt-text-slate-900 mb-4">
              {t.whyUs.title}
            </h2>

          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
                title: t.whyUs.academic.title,
                description: t.whyUs.academic.description,
                bgColor: "bg-blue-100"
              },
              {
                icon: <Clock className="h-8 w-8 text-orange-600" />,
                title: t.whyUs.time.title,
                description: t.whyUs.time.description,
                bgColor: "bg-orange-100"
              },
              {
                icon: <Lock className="h-8 w-8 text-green-600" />,
                title: t.whyUs.rigor.title,
                description: t.whyUs.rigor.description,
                bgColor: "bg-green-100"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className={`w-16 h-16 ${item.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold gt-text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-sm gt-text-slate-600 text-justify">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 gt-bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold gt-text-slate-900 mb-4">
              {t.testimonials.title}
            </h2>
            <p className="text-lg gt-text-slate-600 max-w-2xl mx-auto">
              {t.testimonials.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ana S.",
                role: "Mestranda em Psicologia",
                initials: "AS",
                testimonial: "O apoio foi fundamental para conseguir terminar a minha tese a tempo. Muito profissionais e rápidos! Recomendo vivamente."
              },
              {
                name: "Miguel C.",
                role: "Doutorando em Engenharia",
                initials: "MC",
                testimonial: "Excelente qualidade na análise estatística. As explicações foram claras e ajudaram-me a compreender melhor os resultados."
              },
              {
                name: "Carla R.",
                role: "Mestranda em Sociologia",
                initials: "CR",
                testimonial: "Serviço impecável! A confidencialidade foi respeitada e o resultado excedeu as minhas expectativas. Muito obrigada!"
              }
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="gt-text-slate-600 mb-4 italic">"{testimonial.testimonial}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-semibold text-sm">{testimonial.initials}</span>
                    </div>
                    <div>
                      <p className="font-semibold gt-text-slate-900">{testimonial.name}</p>
                      <p className="text-sm text-slate-500">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {t.cta.subtitle}
          </p>
          <div className="space-x-4">
            <Link href="/orcamento">
              <Button size="lg" className="gt-accent hover:bg-orange-600 text-lg px-8 py-4">
                {t.cta.quoteButton}
              </Button>
            </Link>
            <Link href="/contacto" onClick={() => window.scrollTo(0, 0)}>
              <Button size="lg" variant="outline" className="text-blue-600 bg-white border-white hover:bg-blue-600 hover:text-white text-lg px-8 py-4">
                {t.cta.contactButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
