# Nest.js Prometheus Monitoring Sample

This project is a sample Nest.js application with Prometheus monitoring integration.

## Prerequisites

- Node.js 14.x or higher
- npm (Node package manager)
- Postman (optional, for testing API endpoints)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/nest-prometheus-monitoring-sample.git
   cd nest-prometheus-monitoring-sample
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To run the application in development mode, use:

```
npm run start:dev
```

For production, first build the application:

```
npm run build
```

Then start it:

```
npm run start:prod
```

The application will start and be available at `http://localhost:3000`.

## API Endpoints

The following endpoints are available:

- `GET /`: Root endpoint
- `POST /items`: Create a new item
- `GET /items/{item_id}`: Retrieve an item
- `PUT /items/{item_id}`: Update an item
- `DELETE /items/{item_id}`: Delete an item
- `GET /metrics`: Prometheus metrics endpoint

## Monitoring

The application exposes Prometheus metrics at the `/metrics` endpoint. You can configure your Prometheus server to scrape these metrics for monitoring.

## Development

If you want to make changes to the project:

1. Make your changes to the relevant files in the `src` directory.
2. Run the application in development mode to see your changes.

## Testing

To run the tests:

```
npm run test
```

For end-to-end tests:

```
npm run test:e2e
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.