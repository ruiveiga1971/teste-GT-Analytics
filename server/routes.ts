import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSubmissionSchema } from "@shared/schema";
import { emailService } from "./email";
import { z } from "zod";
import type { Multer } from "multer";

export async function registerRoutes(app: Express, upload: Multer): Promise<Server> {
  // Contact form submission with file upload support
  app.post("/api/contact", (req, res, next) => {
    upload.array('files', 5)(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ 
            success: false, 
            message: "Ficheiro demasiado grande. O tamanho máximo permitido é 25MB por ficheiro.",
          });
        }
        return res.status(400).json({ 
          success: false, 
          message: "Erro no upload do ficheiro.",
        });
      }
      next();
    });
  }, async (req, res) => {
    try {
      // Parse form data from multipart request
      const formData = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone || null,
        nivel: req.body.nivel,
        area: req.body.area,
        descricao: req.body.descricao
      };
      
      const validatedData = insertContactSubmissionSchema.parse(formData);
      
      const submission = await storage.createContactSubmission(validatedData);
      
      // Process file attachments
      const files = req.files as Express.Multer.File[];
      const attachments = files ? files.map(file => ({
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype
      })) : [];
      
      // Send email notification with attachments
      await emailService.sendContactNotification(validatedData, attachments);
      
      console.log("New contact submission:", submission);
      if (attachments.length > 0) {
        console.log("Attachments:", attachments.map(f => f.filename).join(', '));
      }
      
      res.json({ 
        success: true, 
        message: "Obrigado pelo seu contacto! Entraremos em contacto consigo em breve." 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      } else {
        console.error("Error processing contact submission:", error);
        res.status(500).json({ 
          success: false, 
          message: "Erro interno do servidor" 
        });
      }
    }
  });

  // Get all contact submissions (for admin purposes)
  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ 
        success: false, 
        message: "Erro interno do servidor" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
