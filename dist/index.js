// server/index.ts
import express2 from "express";
import multer from "multer";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  contactSubmissions;
  currentUserId;
  currentSubmissionId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contactSubmissions = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentSubmissionId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createContactSubmission(insertSubmission) {
    const id = this.currentSubmissionId++;
    const submission = {
      ...insertSubmission,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  async getContactSubmissions() {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  email: text("email").notNull(),
  telefone: text("telefone"),
  nivel: text("nivel").notNull(),
  area: text("area").notNull(),
  descricao: text("descricao").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  createdAt: true
});

// server/email.ts
import nodemailer from "nodemailer";
var NodemailerEmailService = class {
  transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }
  async sendContactNotification(submission, attachments) {
    const mailOptions = {
      from: process.env.EMAIL_USER || "gt.analytics.contact@gmail.com",
      to: "gt.analytics.contact@gmail.com",
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
            ${submission.telefone ? `<p><strong>Telefone:</strong> ${submission.telefone}</p>` : ""}
            <p><strong>N\xEDvel Acad\xE9mico:</strong> ${submission.nivel}</p>
            <p><strong>\xC1rea de Estudo:</strong> ${submission.area}</p>
          </div>

          <div style="background-color: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="color: #1e40af; margin-top: 0;">Descri\xE7\xE3o do Projeto</h3>
            <div style="white-space: pre-wrap; line-height: 1.6;">${submission.descricao}</div>
          </div>

          ${attachments && attachments.length > 0 ? `
          <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e40af; margin-top: 0;">Ficheiros Anexados</h3>
            <p>O cliente anexou ${attachments.length} ficheiro(s):</p>
            <ul>
              ${attachments.map((file) => `<li>${file.filename}</li>`).join("")}
            </ul>
          </div>
          ` : ""}

          <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e;">
              <strong>A\xE7\xE3o Necess\xE1ria:</strong> Responder ao cliente em at\xE9 24 horas conforme prometido no site.
            </p>
          </div>
        </div>
      `
    };
    if (attachments && attachments.length > 0) {
      mailOptions.attachments = attachments.map((file) => ({
        filename: file.filename,
        content: file.content,
        contentType: file.contentType
      }));
    }
    try {
      await this.transporter.sendMail(mailOptions);
      console.log("\u2705 Email notification sent successfully to gt.analytics.contact@gmail.com");
    } catch (error) {
      console.error("\u274C Failed to send email notification:", error);
      console.log("\u{1F4A1} To fix this: Generate an App Password in Gmail Security settings");
      console.log("   1. Enable 2-factor authentication");
      console.log('   2. Generate App Password for "Mail"');
      console.log("   3. Update EMAIL_PASS secret with the 16-character app password");
    }
  }
};
var ConsoleEmailService = class {
  async sendContactNotification(submission, attachments) {
    console.log("=== EMAIL NOTIFICATION ===");
    console.log("To: gt.analytics.contact@gmail.com");
    console.log("Subject: Novo Contacto -", submission.nome);
    console.log("Content:");
    console.log("Nome:", submission.nome);
    console.log("Email:", submission.email);
    if (submission.telefone) console.log("Telefone:", submission.telefone);
    console.log("N\xEDvel:", submission.nivel);
    console.log("\xC1rea:", submission.area);
    console.log("Descri\xE7\xE3o:", submission.descricao);
    if (attachments && attachments.length > 0) {
      console.log("Anexos:", attachments.map((f) => f.filename).join(", "));
    }
    console.log("==========================");
  }
};
var emailService = process.env.EMAIL_PASS && process.env.EMAIL_USER ? new NodemailerEmailService() : new ConsoleEmailService();

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2, upload2) {
  app2.post("/api/contact", (req, res, next) => {
    upload2.array("files", 5)(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({
            success: false,
            message: "Ficheiro demasiado grande. O tamanho m\xE1ximo permitido \xE9 25MB por ficheiro."
          });
        }
        return res.status(400).json({
          success: false,
          message: "Erro no upload do ficheiro."
        });
      }
      next();
    });
  }, async (req, res) => {
    try {
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
      const files = req.files;
      const attachments = files ? files.map((file) => ({
        filename: file.originalname,
        content: file.buffer,
        contentType: file.mimetype
      })) : [];
      await emailService.sendContactNotification(validatedData, attachments);
      console.log("New contact submission:", submission);
      if (attachments.length > 0) {
        console.log("Attachments:", attachments.map((f) => f.filename).join(", "));
      }
      res.json({
        success: true,
        message: "Obrigado pelo seu contacto! Entraremos em contacto consigo em breve."
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Dados inv\xE1lidos",
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
  app2.get("/api/contact", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }
  // 25MB limit (Gmail attachment limit)
});
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app, upload);
  app.use((err, _req, res, _next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        success: false,
        message: "Ficheiro demasiado grande. O tamanho m\xE1ximo permitido \xE9 25MB por ficheiro."
      });
    }
    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(413).json({
        success: false,
        message: "Demasiados ficheiros. M\xE1ximo 5 ficheiros permitidos."
      });
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: "Tipo de ficheiro n\xE3o suportado."
      });
    }
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
