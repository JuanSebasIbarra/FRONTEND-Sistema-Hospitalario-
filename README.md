# Sistema de Gestión Médica Frontend

Frontend for the patient-facing clinic portal of the "Sistema de Gestión Médica" university project.

The application consumes a REST API backend and is being built with a modular frontend structure that supports parallel development. All source code, technical naming, and internal logic are written in English. All user-facing interface text must remain in Spanish.

## Description

This project provides the frontend foundation for a medical management portal where patients will be able to:

- schedule medical appointments
- consult their medical history
- receive medical prescriptions
- request laboratory exams

At this stage, the repository contains only the shared frontend base. Full business modules are intentionally deferred.

## Goals

- establish a clean and scalable React foundation
- keep the shared base simple and easy to maintain
- support modular growth without overengineering
- reduce merge conflicts between parallel frontend branches
- centralize API integration and environment configuration

## Tech Stack

- React
- Vite
- React Router
- Axios
- CSS for global styling

## Folder Structure

```text
src/
  components/
    ui/
  layouts/
  modules/
    appointments/
    home/
    laboratory/
    medicalHistory/
    patients/
    prescriptions/
  router/
  services/
  styles/
  utils/
```

### Structure Notes

- `components/ui`: shared presentational components
- `layouts`: shared application layouts
- `modules`: feature-oriented folders with pages and route definitions
- `router`: router creation, navigation config, and route composition
- `services`: centralized API client and module service placeholders
- `styles`: global styles
- `utils`: shared helpers for future use

## Installation

### Prerequisites

- Node.js 22 or compatible LTS version
- npm

### Steps

1. Clone the repository.
2. Create a `.env` file based on `.env.example`.
3. Install dependencies:

```bash
npm install
```

## Run Commands

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Environment Variables

The project currently uses the following Vite environment variable:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### Notes

- `VITE_API_BASE_URL`: base URL for the REST API consumed by the frontend

## Branch Strategy

Development is planned in two phases:

1. Build the shared frontend foundation on `main`.
2. Split module work into parallel branches.

Planned branch split:

- `patients + appointments`
- `history + prescriptions + laboratory`

The `main` branch should remain focused on shared infrastructure, common UI, routing composition, environment setup, and other cross-cutting concerns.

## Work Division

Recommended ownership for parallel development:

- Developer 1:
  `src/modules/patients`, `src/modules/appointments`, `src/services/patientService.js`, `src/services/appointmentService.js`
- Developer 2:
  `src/modules/medicalHistory`, `src/modules/prescriptions`, `src/modules/laboratory`, `src/services/medicalHistoryService.js`, `src/services/prescriptionService.js`, `src/services/laboratoryService.js`

Shared areas that should be edited carefully:

- `src/components/ui`
- `src/layouts`
- `src/router`
- `src/styles`
- `src/services/apiClient.js`

## Commit Convention

Use short, descriptive commits with a conventional prefix when possible.

Recommended format:

```text
type: short description
```

Examples:

- `feat: add appointments module foundation`
- `refactor: reorganize shared router structure`
- `style: adjust global layout spacing`
- `docs: add project setup guide`

Suggested common prefixes:

- `feat`
- `fix`
- `refactor`
- `docs`
- `style`
- `chore`

## Deployment Note

This project is not production-ready yet. Before deployment, make sure to:

- configure the correct `VITE_API_BASE_URL` for the target environment
- validate API connectivity against the backend
- confirm that user-facing text remains in Spanish
- build and test the application in production mode

For now, deployment should be treated as a later project phase after the business modules are implemented.
