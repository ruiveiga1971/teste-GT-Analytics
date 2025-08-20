import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { pt } from "date-fns/locale";
import { Mail, Phone, Calendar, GraduationCap, BookOpen } from "lucide-react";

interface ContactSubmission {
  id: number;
  nome: string;
  email: string;
  telefone?: string | null;
  nivel: string;
  area: string;
  descricao: string;
  createdAt: string;
}

export default function Admin() {
  const { data: submissions, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/contact"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">Carregando submissões...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Submissões de Contacto
          </h1>
          <p className="text-gray-600">
            {submissions?.length || 0} submissões recebidas
          </p>
        </div>

        {!submissions || submissions.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-gray-500">
              Nenhuma submissão recebida ainda.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <Card key={submission.id} className="overflow-hidden">
                <CardHeader className="bg-blue-50 border-b">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-blue-900">
                      {submission.nome}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {formatDistanceToNow(new Date(submission.createdAt), {
                        addSuffix: true,
                        locale: pt,
                      })}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Contact Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Informações de Contacto
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-2 text-gray-400" />
                          <a 
                            href={`mailto:${submission.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {submission.email}
                          </a>
                        </div>
                        {submission.telefone && (
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-2 text-gray-400" />
                            <a 
                              href={`tel:${submission.telefone}`}
                              className="text-blue-600 hover:underline"
                            >
                              {submission.telefone}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                          <span className="text-gray-600">
                            {new Date(submission.createdAt).toLocaleDateString('pt-PT', {
                              day: '2-digit',
                              month: '2-digit', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Academic Info */}
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <GraduationCap className="h-4 w-4 mr-2" />
                        Informações Académicas
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <GraduationCap className="h-3 w-3 mr-2 text-gray-400" />
                          <span className="text-gray-600">
                            <span className="font-medium">Nível:</span> {submission.nivel}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <BookOpen className="h-3 w-3 mr-2 text-gray-400" />
                          <span className="text-gray-600">
                            <span className="font-medium">Área:</span> {submission.area}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      Descrição do Projeto
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {submission.descricao}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}