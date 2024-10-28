# HowsAir Frontend

## Description

**HowsAir** is a frontend application designed for managing and visualizing environmental measurement data. Built with **React**, **Tailwind CSS**, **TypeScript**, and **Vite**, this application provides an intuitive interface for users to access environmental data collected from various sources.

## Environment Variable Configuration

Set up the `.env` file in the root of the frontend directory with the following environment variables, adjusting values according to your environment:

### Frontend (`frontend/.env`)

```plaintext
VITE_NODE_ENV=development
VITE_STRIPE_PUBLIC_KEY='pk_test_51QDRm2CT2jgWOtj9VLfB099wx9zYQIdvEJ601KiN4S0DOjNgmCVwRANOS1bI2W3uzGhLnROMkxoet9xWH37fwwQC00zXbiOOes'
```

- For **development** environments, ensure `VITE_NODE_ENV` is set to `development`.
- For **production** environments, update `VITE_NODE_ENV` to `production`.

## Part 1: Development

### Install Dependencies and Run the Frontend

1. **Navigate to the Frontend Directory**:

   ```bash
   cd frontend
   ```

2. **Install Dependencies**:

   Execute the following command to install the necessary dependencies:

   ```bash
   npm install
   ```

3. **Run the Frontend**:

   Start the development server:

   ```bash
   npm run dev
   ```

   The frontend application will be available at `http://localhost:5173`.

## Part 2: Production

In the **production** environment, you should build the frontend and serve the static files from the backend.

1. **Build the Frontend**:

   Run the following command to compile the frontend for production:

   ```bash
   npm run build
   ```

   This will generate a `dist` folder containing all compiled assets.

2. **Move Compiled Assets to Backend**:

   After building, copy the contents of the `dist` folder to the `dist/frontend` directory in your backend folder. You can use the following command:

   ```bash
   cp -R dist/* ../backend/dist/frontend/
   ```

3. **Serve the Application**:

   Ensure that your backend is set up to serve the static files from the `dist/frontend` directory.

## Testing

To ensure code quality and functionality, you can run tests using **Vitest**. Follow these steps:

1. **Run Tests**:

   Execute the following command to run the tests:

   ```bash
   npm run test
   ```

   This command will run all the test cases defined in the application to ensure everything is functioning correctly.

## Other Related Repositories

This project is part of a larger ecosystem that includes:

- **HowsAir for Android**: The mobile client for managing and visualizing environmental measurements, developed for Android. You can find the repository [here](https://github.com/HowsAir/android).

- **HowsAir for Arduino**: The firmware for the Arduino devices that capture environmental measurements. You can find the repository [here](https://github.com/HowsAir/arduino).

- **HowsAir's Server**: The backend server that provides API endpoints for the frontend. You can find the repository [here](https://github.com/HowsAir/server).