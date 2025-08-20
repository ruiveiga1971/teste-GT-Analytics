import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  GraduationCap, 
  Users, 
  Award, 
  Target,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock
} from "lucide-react";
import aboutImage from "@assets/image_Amtk6rHP_1753609343800_raw_1753609757743.jpg";
import { useLanguage } from "@/i18n/context";

export default function About() {
  const { language } = useLanguage();

  const content = {
    pt: {
      hero: {
        title: "Sobre GT Analytics"
      },
      main: {
        imageAlt: "Análise de dados estatísticos",
        paragraphs: [
          "A GT Analytics nasceu da paixão por apoiar estudantes na concretização dos seus projetos académicos com confiança e sucesso. Compreende as dificuldades que muitos enfrentam, sobretudo na análise de dados quantitativos, e por isso oferece um serviço especializado, rigoroso, célere e totalmente confidencial. Aqui, cada trabalho é acompanhado com atenção ao detalhe, qualidade científica e um verdadeiro compromisso com os objetivos de quem investe no seu percurso académico.",
          "Por trás da GT Analytics está Gisela Teixeira, MScN, RN, mestre em Enfermagem, pós-graduada em Estatística Aplicada à Saúde pela Universidade NOVA de Lisboa, e doutoranda em Enfermagem na Universidade de Lisboa, com experiência no ensino superior, publicações internacionais e revisão por pares.",
          "Mais do que números, oferecemos parceria, rigor e confiança para transformar dados em resultados que fazem a diferença."
        ]
      },
      values: {
        title: "Os Nossos Valores",
        items: [
          {
            title: "Excelência Académica",
            description: "Compromisso com a qualidade científica e rigor metodológico em todas as análises estatísticas."
          },
          {
            title: "Confidencialidade",
            description: "Sigilo absoluto dos seus dados e trabalho, garantindo privacidade e proteção total."
          },
          {
            title: "Apoio Personalizado",
            description: "Cada projeto é único e recebe atenção individualizada às suas necessidades específicas."
          },
          {
            title: "Transparência",
            description: "Comunicação clara sobre métodos, prazos e custos, sem surpresas ou custos ocultos."
          },
          {
            title: "Rapidez",
            description: "Resposta eficiente e cumprimento rigoroso dos prazos acordados para o seu projeto."
          },
          {
            title: "Inovação",
            description: "Utilização das mais recentes técnicas estatísticas e software de referência internacional."
          }
        ]
      },
      publications: {
        title: "Exemplos de Publicações"
      },
      cta: {
        title: "Pronto para Começar?",
        subtitle: "Transforme os seus dados em resultados científicos credíveis",
        button: "Obter Orçamento Gratuito"
      }
    },
    en: {
      hero: {
        title: "About GT Analytics"
      },
      main: {
        imageAlt: "Statistical data analysis",
        paragraphs: [
          "GT Analytics was born from the passion to support students in achieving their academic projects with confidence and success. We understand the difficulties many face, especially in quantitative data analysis, and therefore offer a specialized, rigorous, fast and completely confidential service. Here, each work is accompanied with attention to detail, scientific quality and a true commitment to the objectives of those who invest in their academic journey.",
          "Behind GT Analytics is Gisela Teixeira, MScN, RN, Master in Nursing, postgraduate in Applied Statistics in Health from NOVA University of Lisbon, and PhD candidate in Nursing at the University of Lisbon, with experience in higher education, international publications and peer review.",
          "More than numbers, we offer partnership, rigor and confidence to transform data into results that make a difference."
        ]
      },
      values: {
        title: "Our Values",
        items: [
          {
            title: "Academic Excellence",
            description: "Commitment to scientific quality and methodological rigor in all statistical analyses."
          },
          {
            title: "Confidentiality",
            description: "Absolute secrecy of your data and work, ensuring privacy and total protection."
          },
          {
            title: "Personalized Support",
            description: "Each project is unique and receives individualized attention to your specific needs."
          },
          {
            title: "Transparency",
            description: "Clear communication about methods, deadlines and costs, without surprises or hidden costs."
          },
          {
            title: "Speed",
            description: "Efficient response and strict compliance with agreed deadlines for your project."
          },
          {
            title: "Innovation",
            description: "Use of the latest statistical techniques and internationally recognized software."
          }
        ]
      },
      publications: {
        title: "Publication Examples"
      },
      cta: {
        title: "Ready to Start?",
        subtitle: "Transform your data into credible scientific results",
        button: "Get Free Quote"
      }
    },
    es: {
      hero: {
        title: "Acerca de GT Analytics"
      },
      main: {
        imageAlt: "Análisis de datos estadísticos",
        paragraphs: [
          "GT Analytics nació de la pasión por apoyar a los estudiantes en la realización de sus proyectos académicos con confianza y éxito. Comprendemos las dificultades que muchos enfrentan, especialmente en el análisis de datos cuantitativos, y por eso ofrecemos un servicio especializado, riguroso, rápido y completamente confidencial. Aquí, cada trabajo es acompañado con atención al detalle, calidad científica y un verdadero compromiso con los objetivos de quienes invierten en su camino académico.",
          "Detrás de GT Analytics está Gisela Teixeira, MScN, RN, Máster en Enfermería, posgrado en Estadística Aplicada a la Salud por la Universidad NOVA de Lisboa, y candidata a PhD en Enfermería en la Universidad de Lisboa, con experiencia en educación superior, publicaciones internacionales y revisión por pares.",
          "Más que números, ofrecemos asociación, rigor y confianza para transformar datos en resultados que marcan la diferencia."
        ]
      },
      values: {
        title: "Nuestros Valores",
        items: [
          {
            title: "Excelencia Académica",
            description: "Compromiso con la calidad científica y rigor metodológico en todos los análisis estadísticos."
          },
          {
            title: "Confidencialidad",
            description: "Secreto absoluto de sus datos y trabajo, garantizando privacidad y protección total."
          },
          {
            title: "Apoyo Personalizado",
            description: "Cada proyecto es único y recibe atención individualizada a sus necesidades específicas."
          },
          {
            title: "Transparencia",
            description: "Comunicación clara sobre métodos, plazos y costos, sin sorpresas o costos ocultos."
          },
          {
            title: "Rapidez",
            description: "Respuesta eficiente y cumplimiento estricto de los plazos acordados para su proyecto."
          },
          {
            title: "Innovación",
            description: "Uso de las técnicas estadísticas más recientes y software de referencia internacional."
          }
        ]
      },
      publications: {
        title: "Ejemplos de Publicaciones"
      },
      cta: {
        title: "¿Listo para Comenzar?",
        subtitle: "Transforme sus datos en resultados científicos creíbles",
        button: "Obtener Presupuesto Gratuito"
      }
    }
  };

  const t = content[language];

  return (
    <div>
      {/* Hero Section */}
      <section className="gt-gradient-hero py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold gt-text-slate-900 mb-6">
            {t.hero.title}
          </h1>

        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            {/* Image and Text Row */}
            <div className="grid grid-cols-2 gap-8 mb-16">
              {/* Image Column */}
              <div className="relative overflow-hidden h-full min-h-96">
                <img 
                  src={aboutImage} 
                  alt={t.main.imageAlt} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white bg-opacity-40"></div>
              </div>
              
              {/* Text Column */}
              <div className="flex items-center">
                <div className="text-lg gt-text-slate-600 space-y-6 text-justify">
                  {t.main.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

          </div>
          
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Mobile Image */}
            <div className="relative overflow-hidden mb-8">
              <img 
                src={aboutImage} 
                alt={t.main.imageAlt} 
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-white bg-opacity-30"></div>
            </div>
            
            {/* Mobile Text */}
            <div className="text-lg gt-text-slate-600 space-y-6 text-justify mb-8">
              {t.main.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

          </div>
        </div>
      </section>



      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold gt-text-slate-900 mb-4">
              {t.values.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.values.items.map((value, index) => {
              const icons = [
                <GraduationCap className="h-8 w-8 text-blue-600" />,
                <Shield className="h-8 w-8 text-green-600" />,
                <Users className="h-8 w-8 text-purple-600" />,
                <CheckCircle className="h-8 w-8 text-orange-600" />,
                <Clock className="h-8 w-8 text-red-600" />,
                <Target className="h-8 w-8 text-indigo-600" />
              ];
              const bgColors = ["bg-blue-100", "bg-green-100", "bg-purple-100", "bg-orange-100", "bg-red-100", "bg-indigo-100"];
              
              return (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className={`w-16 h-16 ${bgColors[index]} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                      {icons[index]}
                    </div>
                    <h3 className="text-lg font-semibold gt-text-slate-900 mb-3">{value.title}</h3>
                    <p className="text-sm gt-text-slate-600 text-justify">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Publications Examples Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold gt-text-slate-900 mb-4">
              {t.publications.title}
            </h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
                reference: "Teixeira, G., Gaspar, F., & Lucas, P. (2024). Development and Validation of the Portuguese Transcultural Nursing Leadership Questionnaire (QLTE-PT). Journal of Nursing Management, 2024(1), 5750265. https://doi.org/https://doi.org/10.1155/2024/5750265",
                url: "https://doi.org/https://doi.org/10.1155/2024/5750265"
              },
              {
                reference: "Teixeira, G., Picoito, R., Gaspar, F., & Lucas, P. (2024). Cultural Competence and Nursing Work Environment: Impact on Culturally Congruent Care in Portuguese Multicultural Healthcare Units. Healthcare, 12(23), 2430. https://doi.org/10.3390/healthcare12232430",
                url: "https://doi.org/10.3390/healthcare12232430"
              }
            ].map((publication, index) => (
              <div 
                key={index} 
                className="bg-gray-100 p-6 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                onClick={() => window.open(publication.url, '_blank')}
              >
                <p className="text-sm leading-relaxed text-left gt-text-slate-700">
                  {index === 0 ? (
                    <>
                      Teixeira, G., Gaspar, F., & Lucas, P. (2024). Development and Validation of the Portuguese Transcultural Nursing Leadership Questionnaire (QLTE-PT). <em>Journal of Nursing Management</em>, 2024(1), 5750265. https://doi.org/https://doi.org/10.1155/2024/5750265
                    </>
                  ) : (
                    <>
                      Teixeira, G., Picoito, R., Gaspar, F., & Lucas, P. (2024). Cultural Competence and Nursing Work Environment: Impact on Culturally Congruent Care in Portuguese Multicultural Healthcare Units. <em>Healthcare</em>, 12(23), 2430. https://doi.org/10.3390/healthcare12232430
                    </>
                  )}
                </p>
              </div>
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
          <Link href="/orcamento">
            <Button size="lg" className="gt-accent hover:bg-orange-600 text-lg px-8 py-4">
              {t.cta.button}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
