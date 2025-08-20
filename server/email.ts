import nodemailer from 'nodemailer';

export interface EmailService {
  sendContactNotification(submission: {
    nome: string;
    email: string;
    telefone?: string | null;
    nivel: string;
    area: string;
    descricao: string;
  }, attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>): Promise<void>;
}

class NodemailerEmailService implements EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Gmail SMTP configuration with secure options
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendContactNotification(submission: {
    nome: string;
    email: string;
    telefone?: string | null;
    nivel: string;
    area: string;
    descricao: string;
  }, attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>): Promise<void> {
    const mailOptions: any = {
      from: process.env.EMAIL_USER || 'gt.analytics.contact@gmail.com',
      to: 'gt.analytics.contact@gmail.com',
      subject: `Novo Contacto - ${submission.nome}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
            Novo Contacto - GT Analytics
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Dados do Cliente</h3>
            <p><strong>Nome:</strong> ${submission.nome}</p>
            <p><strong>Email:</strong> ${submission.email}</p>
            ${submission.telefone ? `<p><strong>Telefone:</strong> ${submission.telefone}</p>` : ''}
            <p><strong>Nível Académico:</strong> ${submission.nivel}</p>
            <p><strong>Área de Estudo:</strong> ${submission.area}</p>
          </div>

          <div style="background-color: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-top: 0;">Descrição do Projeto</h3>
            <div style="white-space: pre-wrap; line-height: 1.6;">${submission.descricao}</div>
          </div>

          ${attachments && attachments.length > 0 ? `
          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Ficheiros Anexados</h3>
            <p>O cliente anexou ${attachments.length} ficheiro(s):</p>
            <ul>
              ${attachments.map(file => `<li>${file.filename}</li>`).join('')}
            </ul>
          </div>
          ` : ''}

          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>Ação Necessária:</strong> Responder ao cliente em até 24 horas conforme prometido no site.
            </p>
          </div>
        </div>
      `
    };

    // Add attachments if provided
    if (attachments && attachments.length > 0) {
      mailOptions.attachments = attachments.map(file => ({
        filename: file.filename,
        content: file.content,
        contentType: file.contentType
      }));
    }

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Email notification sent successfully to gt.analytics.contact@gmail.com');
    } catch (error) {
      console.error('❌ Failed to send email notification:', error);
      console.log('💡 To fix this: Generate an App Password in Gmail Security settings');
      console.log('   1. Enable 2-factor authentication');
      console.log('   2. Generate App Password for "Mail"');
      console.log('   3. Update EMAIL_PASS secret with the 16-character app password');
      // Don't throw the error to avoid breaking the contact form
      // The form submission should still work even if email fails
    }
  }
}

// Fallback service for development/testing
class ConsoleEmailService implements EmailService {
  async sendContactNotification(submission: {
    nome: string;
    email: string;
    telefone?: string | null;
    nivel: string;
    area: string;
    descricao: string;
  }, attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType: string;
  }>): Promise<void> {
    console.log('=== EMAIL NOTIFICATION ===');
    console.log('To: gt.analytics.contact@gmail.com');
    console.log('Subject: Novo Contacto -', submission.nome);
    console.log('Content:');
    console.log('Nome:', submission.nome);
    console.log('Email:', submission.email);
    if (submission.telefone) console.log('Telefone:', submission.telefone);
    console.log('Nível:', submission.nivel);
    console.log('Área:', submission.area);
    console.log('Descrição:', submission.descricao);
    if (attachments && attachments.length > 0) {
      console.log('Anexos:', attachments.map(f => f.filename).join(', '));
    }
    console.log('==========================');
  }
}

// Export the appropriate service based on environment
export const emailService: EmailService = process.env.EMAIL_PASS && process.env.EMAIL_USER
  ? new NodemailerEmailService()
  : new ConsoleEmailService();