# CourierX – Courier System Client

CourierX is a modern, full-featured courier and parcel delivery management platform. This client application is built with Next.js, React, Redux Toolkit, and a modern UI stack, providing seamless experiences for customers, agents, and administrators.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [API Overview](#api-overview)
- [User Roles](#user-roles)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Customer Portal**: Create orders, track parcels, and view order history.
- **Agent Dashboard**: Manage assigned deliveries, update parcel statuses, and view optimized delivery routes.
- **Admin Dashboard**: Oversee all parcels, assign agents, export data (PDF/CSV), and view system statistics.
- **Authentication**: Secure login and registration for all user roles.
- **Role-Based Access**: Protected routes and dashboards for customers, agents, and admins.
- **Modern UI/UX**: Responsive design, animated elements, and intuitive navigation.
- **Notifications**: Real-time feedback and status updates.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI**: React, Tailwind CSS, Radix UI, Lottie animations
- **State Management**: Redux Toolkit, RTK Query
- **API**: RESTful backend (see API Overview)
- **Other**: TypeScript, ESLint, Sonner (notifications)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/courier-system-client.git
   cd courier-system-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
  app/           # Next.js app directory (pages, layouts, routes)
  components/    # Reusable UI and feature components
  redux/         # Redux Toolkit slices, API services, and store
  lib/           # Utility functions
  public/        # Static assets (images, lottie files)
```

- **Dashboards**: Located under `src/app/dashboard/` for each user role.
- **UI Components**: Under `src/components/ui/` for consistent design.

## Available Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm start` – Start the production server
- `npm run lint` – Run ESLint

## API Overview

The client communicates with a RESTful backend at `https://courier-system-server.vercel.app/api/v1`. Key endpoints include:

- **Authentication**: `/auth/register`, `/auth/login`
- **Parcels**: `/parcel`, `/parcel/:id`, `/parcel/agent/my-parcels`
- **Admin**: `/admin/get-all-agent`, `/admin/dashboard`, `/admin/export/pdf`, `/admin/export/csv`
- **Agent**: `/route-optimization/my-optimized-route`, `/parcel/status/:parcelId`

All protected endpoints require a valid JWT token in the `Authorization` header.

## User Roles

- **Customer**: Create and track orders, view order history.
- **Agent**: View assigned parcels, update delivery status, access optimized routes.
- **Admin**: Manage all parcels, assign agents, export data, view system stats.

Role-based access is enforced throughout the application.

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements, bug fixes, or new features.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

---

**CourierX** – Fast, safe, and reliable delivery for everyone.
