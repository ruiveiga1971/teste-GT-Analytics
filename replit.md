# GT Analytics - Statistical Analysis Platform

## Overview
GT Analytics is a full-stack web application designed for a Portuguese statistical consulting service. Its primary purpose is to assist students with thesis and dissertation data analysis. The platform functions as a modern, responsive marketing website, incorporating contact form capabilities and an interactive price estimator for statistical analysis services. The project aims to streamline client engagement for data analysis needs, offering clear service breakdowns and transparent pricing.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Core Technologies
The application employs a monorepo structure, separating frontend, backend, and shared code.
- **Frontend**: React 18 with TypeScript, Wouter for routing, Tailwind CSS with shadcn/ui for styling, TanStack Query for server state, React Hook Form with Zod for forms, and Vite for building.
- **Backend**: Node.js with Express.js, TypeScript with ES modules, RESTful API endpoints, Drizzle ORM for database interaction (PostgreSQL dialect), and Express sessions for session management.
- **Shared**: Common TypeScript schemas and types for type-safe communication.

### Key Features and Design
- **Frontend Pages**: Includes Home, Services, About, FAQ, Contact, and a sophisticated Price Estimator.
- **Price Estimator**: Features multi-step assessments for database preparation and analysis objectives, dynamic real-time cost calculation, detailed cost breakdowns, and integration with the contact form for formal proposals, including file upload capabilities.
- **Backend API**: Provides endpoints for contact form submissions (`POST /api/contact`) with validation and automatic email notifications.
- **Email System**: Automated email notifications for all form submissions, configured for Gmail SMTP with attachment support.
- **Database Schema**: Designed with tables for users and contact submissions, storing essential client and request details.
- **UI Components**: Utilizes a comprehensive component library based on shadcn/ui for consistent and responsive design across all form controls, layout, navigation, and feedback elements.
- **Data Flow**: Emphasizes client-side validation with Zod, server-side processing, and seamless user feedback. Navigation is client-side with Wouter, supporting responsive design and mobile menus.
- **Deployment**: Optimized for Replit deployment, with a production build process that bundles frontend assets and backend code into a single deployable unit. Environment-based configuration handles database connections and development/production modes.

## External Dependencies

- **@neondatabase/serverless**: For PostgreSQL database connectivity.
- **@tanstack/react-query**: For server state management in the frontend.
- **@radix-ui/react-***: Headless UI components used by shadcn/ui.
- **drizzle-orm**: Type-safe ORM for database interactions.
- **react-hook-form**: For efficient form state management.
- **zod**: For schema validation across frontend and backend.
- **tailwindcss**: Utility-first CSS framework for styling.
- **@replit/vite-plugin-***: Replit-specific development tools for integration.

## Recent Changes

### January 20, 2025 - Price Estimator Major Update
- **Updated Pricing Structure**: Revised plan costs - Explica: 475€ (was 495€), Valida: 575€ (was 595€)
- **Enhanced Plan Descriptions**: Added emojis and detailed subtitles for each plan with comprehensive service descriptions
- **Database Preparation Options Restructure**: Updated Step 1 with specific pricing tiers (55€, 85€, 125€)
- **Step 2 Objective Updates**: Refined analysis objective descriptions for clarity
- **Plan Details Enhancement**: Updated all plan descriptions with specific statistical tests and academic formatting standards
- **Removed Important Note**: Eliminated the disclaimer about report writing limitations from the price estimator results section
- **Simplified Proposal Language**: Removed "em 24 horas" references and streamlined proposal request text
- **Updated Section Title**: Changed "A sua Proposta" to "A sua seleção" in results section
- **Added Price Transparency**: Replaced "Proposta em 24h" guarantee with "Preços transparentes" clickable card that opens detailed pricing PDF
- **Updated About Page Content**: Replaced academic biography with service-focused description emphasizing partnership, rigor, and transformative results
- **Refined About Page Layout**: Adjusted image height and text content, removed duplicate description below image for cleaner presentation
- **Updated Services Page Plans**: Completely revised all four analysis plans (Observa, Compara, Explica, Valida) with detailed service descriptions and academic focus
- **Added Individual Service Pricing**: New "Preçário por Serviço a vulso" button in Services page that opens detailed PDF pricing for individual statistical services
- **Updated PDF Pricing Document**: Replaced pricing PDF with latest version containing comprehensive service breakdown and pricing structure

### August 19, 2025 - Final Content Updates and PDF Integration
- **FAQ Content Refinements**: Updated "Quanto tempo demora a análise?" to reflect "2 a 3 semanas" for complex projects
- **Service Description Updates**: Modified "Fornecem apoio após a entrega?" to focus on "serviço complementar de explicação/tutoria online"
- **FAQ Cleanup**: Removed "Posso solicitar métodos estatísticos específicos?" and "Trabalham com todas as áreas académicas?" questions
- **Contact Page Updates**: Eliminated all "24 horas" time commitments, replaced with "Preencha o formulário em baixo e receba o seu orçamento grátis"
- **Home Page Card Layout**: Transformed "Porquê a GT Analytics?" section into consistent card format with updated content for academic specialization
- **PDF Integration Milestone**: Successfully integrated final pricing PDF ("Preçário_1755630773453.pdf") with corrected link functionality - **CONFIRMED WORKING**

### August 19, 2025 - Complete Homepage Internationalization
- **Full Homepage Translation**: Successfully completed translation of all homepage sections including Hero, Como Funciona, Porquê GT Analytics, Testimonials, and Call-to-Action
- **Footer Internationalization**: Translated Footer component with all sections (description, quick links, contact info, copyright)
- **Dynamic Content System**: All text content now switches seamlessly between Portuguese, English, and Spanish
- **User Testing Confirmed**: Complete translation functionality verified working across all homepage sections and footer
- **Translation Coverage**: Homepage now 100% internationalized with Portuguese as primary reference language

### August 19, 2025 - Complete Services Page Internationalization
- **Full Services Page Translation**: Successfully implemented comprehensive i18n system for Services page with all sections translated
- **Hero Section**: Translated page title, subtitle, and CTA button across all three languages
- **Service Cards**: Translated all three service types (Consultoria, Análise de Dados, Redação de Relatório) with features and descriptions
- **Analysis Plans**: Complete translation of all four plans (Observa, Compara, Explica, Valida) with detailed service descriptions and features
- **Dynamic Buttons**: Translated all interactive elements including "Ver Planos", "Preçário por Serviço", and plan toggle functionality
- **Software Section**: Translated software descriptions and section content
- **Process Section**: Translated all four process steps with dynamic icon mapping
- **Publications & CTA**: Translated publications title and call-to-action section
- **User Testing Confirmed**: All Services page sections verified working correctly across Portuguese, English, and Spanish languages
- **Translation Methodology**: Portuguese maintained as reference language with systematic section-by-section translation approach

### August 19, 2025 - Complete About Page Internationalization
- **Full About Page Translation**: Successfully implemented comprehensive i18n system for About page with all sections translated
- **Hero Section**: Translated page title across all three languages
- **Main Content**: Translated image alt text and all descriptive paragraphs about GT Analytics and Gisela Teixeira
- **Values Section**: Complete translation of 6 core values with dynamic icon mapping and descriptions
- **Publications Section**: Translated section title (Publication Examples / Ejemplos de Publicaciones)
- **CTA Section**: Translated call-to-action title, subtitle, and button text
- **User Testing Confirmed**: All About page sections verified working correctly across Portuguese, English, and Spanish languages
- **Translation Coverage**: About page now 100% internationalized following established methodology