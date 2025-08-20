import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useLanguage } from "@/i18n/context";

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { language } = useLanguage();

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const content = {
    pt: {
      hero: {
        title: "Perguntas Frequentes",
        subtitle: "Esclarecemos as dúvidas mais comuns sobre os nossos serviços de análise estatística"
      },
      faqs: [
        {
          question: "O serviço é confidencial?",
          answer: "Sim, garantimos sigilo absoluto dos seus dados e do seu trabalho. Todos os projetos são tratados com total confidencialidade e os ficheiros são eliminados após a conclusão do serviço. Nunca partilhamos informações com terceiros e respeitamos rigorosamente a privacidade dos nossos clientes."
        },
        {
          question: "Como é calculado o preço?",
          answer: "O preço depende da complexidade da análise, do número de variáveis, tipo de métodos estatísticos necessários e da urgência do projeto. Cada projeto recebe um orçamento personalizado e justo baseado no preçário de serviços a vulso. Ou pode optar por um dos planos. Não há custos ocultos e o custo final é fixo após aprovação."
        },
        {
          question: "E se eu precisar de alterações?",
          answer: "Incluímos uma revisão gratuita no nosso serviço standard. Se precisar de ajustamentos adicionais ou alterações significativas ao projeto original, discutiremos as opções disponíveis de forma transparente. O nosso objetivo é garantir a sua total satisfação."
        },
        {
          question: "Em que formato recebo os resultados?",
          answer: "Receberá um relatório completo em formato Word com os resultados da análise dos dados, tabelas e gráficos prontos para integrar no seu trabalho académico ou artigo."
        },
        {
          question: "Vocês fazem o trabalho por mim?",
          answer: "Não. É prestado um serviço de consultoria e análise de dados para o apoiar. O trabalho e a autoria continuam a ser seus. Ajudamos a compreender e apresentar os seus dados de forma adequada, mas o trabalho académico e a interpretação final são da sua responsabilidade."
        },
        {
          question: "Quanto tempo demora a análise?",
          answer: "O tempo varia consoante a complexidade do projeto. Projetos mais complexos podem demorar 2 a 3 semanas. Sempre acordamos prazos realistas no orçamento e respeitamos rigorosamente os compromissos assumidos."
        },
        {
          question: "Que tipos de dados podem analisar?",
          answer: "A GT Analytics trabalha com dados quantitativos. Aceita bases de dados em formatos Excel, SPSS e CSV."
        },
        {
          question: "Fornecem apoio após a entrega?",
          answer: "A GT Analytics presta um serviço complementar de explicação/tutoria online."
        },
        {
          question: "Como garantem a qualidade da análise?",
          answer: "A qualidade da análise é assegurada pela formação avançada em estatística, experiência em investigação e utilização de softwares profissionais de reconhecimento internacional (SPSS e R)."
        }
      ],
      cta: {
        title: "Ainda tem dúvidas?",
        subtitle: "Entre em contacto connosco para esclarecimentos adicionais",
        button: "Contactar"
      },
      contact: {
        title: "Não encontrou a resposta que procurava?",
        subtitle: "Entre em contacto connosco diretamente. Teremos o maior prazer em esclarecer todas as suas dúvidas e fornecer informações detalhadas sobre o nosso serviço.",
        contactButton: "Contactar Agora",
        emailButton: "Enviar Email"
      },
      tips: {
        title: "Dicas para o seu Contacto",
        subtitle: "Para obter o orçamento mais preciso, inclua estas informações no seu pedido",
        items: [
          {
            title: "Tipo de Dados",
            description: "Descreva que tipo de dados tem (questionários, experiências, observações, etc.)"
          },
          {
            title: "Número de Variáveis",
            description: "Indique quantas variáveis pretende analisar e se são categóricas ou contínuas"
          },
          {
            title: "Objetivos do Estudo",
            description: "Explique as suas hipóteses de investigação e o que pretende descobrir"
          },
          {
            title: "Prazos",
            description: "Informe-nos sobre os seus prazos para podermos planear adequadamente"
          }
        ]
      }
    },
    en: {
      hero: {
        title: "Frequently Asked Questions",
        subtitle: "We clarify the most common questions about our statistical analysis services"
      },
      faqs: [
        {
          question: "Is the service confidential?",
          answer: "Yes, we guarantee absolute confidentiality of your data and work. All projects are treated with complete confidentiality and files are deleted after service completion. We never share information with third parties and strictly respect our clients' privacy."
        },
        {
          question: "How is the price calculated?",
          answer: "The price depends on the complexity of the analysis, number of variables, type of statistical methods needed, and project urgency. Each project receives a personalized and fair quote based on our individual service pricing. Or you can choose one of our plans. There are no hidden costs and the final cost is fixed after approval."
        },
        {
          question: "What if I need changes?",
          answer: "We include a free revision in our standard service. If you need additional adjustments or significant changes to the original project, we will discuss available options transparently. Our goal is to ensure your complete satisfaction."
        },
        {
          question: "In what format do I receive the results?",
          answer: "You will receive a complete report in Word format with data analysis results, tables and graphs ready to integrate into your academic work or article."
        },
        {
          question: "Do you do the work for me?",
          answer: "No. We provide consultation and data analysis services to support you. The work and authorship remain yours. We help you understand and present your data appropriately, but the academic work and final interpretation are your responsibility."
        },
        {
          question: "How long does the analysis take?",
          answer: "Time varies according to project complexity. More complex projects can take 2 to 3 weeks. We always agree on realistic deadlines in the quote and strictly respect our commitments."
        },
        {
          question: "What types of data can you analyze?",
          answer: "GT Analytics works with quantitative data. We accept databases in Excel, SPSS and CSV formats."
        },
        {
          question: "Do you provide support after delivery?",
          answer: "GT Analytics provides a complementary online explanation/tutoring service."
        },
        {
          question: "How do you guarantee analysis quality?",
          answer: "Analysis quality is ensured by advanced statistical training, research experience, and use of internationally recognized professional software (SPSS and R)."
        }
      ],
      cta: {
        title: "Still have questions?",
        subtitle: "Contact us for additional clarifications",
        button: "Contact"
      },
      contact: {
        title: "Didn't find the answer you were looking for?",
        subtitle: "Contact us directly. We will be happy to clarify all your questions and provide detailed information about our service.",
        contactButton: "Contact Now",
        emailButton: "Send Email"
      },
      tips: {
        title: "Tips for Your Contact",
        subtitle: "To get the most accurate quote, include this information in your request",
        items: [
          {
            title: "Data Type",
            description: "Describe what type of data you have (questionnaires, experiments, observations, etc.)"
          },
          {
            title: "Number of Variables",
            description: "Indicate how many variables you want to analyze and whether they are categorical or continuous"
          },
          {
            title: "Study Objectives",
            description: "Explain your research hypotheses and what you want to discover"
          },
          {
            title: "Deadlines",
            description: "Inform us about your deadlines so we can plan appropriately"
          }
        ]
      }
    },
    es: {
      hero: {
        title: "Preguntas Frecuentes",
        subtitle: "Aclaramos las dudas más comunes sobre nuestros servicios de análisis estadístico"
      },
      faqs: [
        {
          question: "¿Es confidencial el servicio?",
          answer: "Sí, garantizamos confidencialidad absoluta de sus datos y trabajo. Todos los proyectos son tratados con total confidencialidad y los archivos se eliminan tras la conclusión del servicio. Nunca compartimos información con terceros y respetamos rigurosamente la privacidad de nuestros clientes."
        },
        {
          question: "¿Cómo se calcula el precio?",
          answer: "El precio depende de la complejidad del análisis, número de variables, tipo de métodos estadísticos necesarios y urgencia del proyecto. Cada proyecto recibe un presupuesto personalizado y justo basado en nuestro tarifario de servicios individuales. O puede elegir uno de los planes. No hay costos ocultos y el costo final es fijo tras la aprobación."
        },
        {
          question: "¿Y si necesito cambios?",
          answer: "Incluimos una revisión gratuita en nuestro servicio estándar. Si necesita ajustes adicionales o cambios significativos al proyecto original, discutiremos las opciones disponibles de forma transparente. Nuestro objetivo es garantizar su total satisfacción."
        },
        {
          question: "¿En qué formato recibo los resultados?",
          answer: "Recibirá un informe completo en formato Word con los resultados del análisis de datos, tablas y gráficos listos para integrar en su trabajo académico o artículo."
        },
        {
          question: "¿Hacen el trabajo por mí?",
          answer: "No. Prestamos un servicio de consultoría y análisis de datos para apoyarlo. El trabajo y la autoría siguen siendo suyos. Ayudamos a comprender y presentar sus datos de forma adecuada, pero el trabajo académico y la interpretación final son su responsabilidad."
        },
        {
          question: "¿Cuánto tiempo toma el análisis?",
          answer: "El tiempo varía según la complejidad del proyecto. Proyectos más complejos pueden tomar 2 a 3 semanas. Siempre acordamos plazos realistas en el presupuesto y respetamos rigurosamente nuestros compromisos."
        },
        {
          question: "¿Qué tipos de datos pueden analizar?",
          answer: "GT Analytics trabaja con datos cuantitativos. Aceptamos bases de datos en formatos Excel, SPSS y CSV."
        },
        {
          question: "¿Proporcionan apoyo después de la entrega?",
          answer: "GT Analytics presta un servicio complementario de explicación/tutoría online."
        },
        {
          question: "¿Cómo garantizan la calidad del análisis?",
          answer: "La calidad del análisis está asegurada por la formación avanzada en estadística, experiencia en investigación y uso de software profesional de reconocimiento internacional (SPSS y R)."
        }
      ],
      cta: {
        title: "¿Aún tiene dudas?",
        subtitle: "Contáctenos para aclaraciones adicionales",
        button: "Contactar"
      },
      contact: {
        title: "¿No encontró la respuesta que buscaba?",
        subtitle: "Contáctenos directamente. Tendremos el mayor placer en aclarar todas sus dudas y proporcionar información detallada sobre nuestro servicio.",
        contactButton: "Contactar Ahora",
        emailButton: "Enviar Email"
      },
      tips: {
        title: "Consejos para su Contacto",
        subtitle: "Para obtener el presupuesto más preciso, incluya esta información en su solicitud",
        items: [
          {
            title: "Tipo de Datos",
            description: "Describa qué tipo de datos tiene (cuestionarios, experimentos, observaciones, etc.)"
          },
          {
            title: "Número de Variables",
            description: "Indique cuántas variables desea analizar y si son categóricas o continuas"
          },
          {
            title: "Objetivos del Estudio",
            description: "Explique sus hipótesis de investigación y lo que pretende descubrir"
          },
          {
            title: "Plazos",
            description: "Infórmenos sobre sus plazos para que podamos planificar adecuadamente"
          }
        ]
      }
    }
  };

  const t = content[language];

  return (
    <div>
      {/* Hero Section */}
      <section className="gt-gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="h-16 w-16 text-blue-600 mx-auto mb-6" />
          <h1 className="text-4xl lg:text-5xl font-bold gt-text-slate-900 mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl gt-text-slate-600">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {t.faqs.map((item, index) => (
              <Card key={index} className="border hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <button
                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    onClick={() => toggleItem(index)}
                  >
                    <span className="text-lg font-semibold gt-text-slate-900 pr-4">
                      {item.question}
                    </span>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openItems.includes(index) && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-slate-200 pt-4">
                        <p className="gt-text-slate-600 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4">
                  {t.contact.title}
                </h3>
                <p className="text-blue-700 mb-6">
                  {t.contact.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contacto" onClick={() => window.scrollTo(0, 0)}>
                    <Button size="lg" className="gt-accent hover:bg-orange-600 text-lg px-8 py-4">
                      {t.contact.contactButton}
                    </Button>
                  </Link>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white text-lg px-8 py-4"
                    onClick={() => window.location.href = 'mailto:gt.analytics.contact@gmail.com'}
                  >
                    {t.contact.emailButton}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="py-16 gt-bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold gt-text-slate-900 mb-4">
              {t.tips.title}
            </h2>
            <p className="text-lg gt-text-slate-600 max-w-2xl mx-auto">
              {t.tips.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.tips.items.map((tip, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-blue-600 font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold gt-text-slate-900 mb-2">{tip.title}</h3>
                  <p className="text-sm gt-text-slate-600">{tip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
