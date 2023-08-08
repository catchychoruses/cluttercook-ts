export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      DATABASE_URL: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      BASE_URL: string;
      ENV: 'test' | 'dev' | 'prod';
      NODE_ENV: 'development' | 'production';
    }
  }
}
