### Intelligence E-commerce Service Application

>Buyers can view the recommended products based on their views or purchase recordings and get the summary comment by AI. Retailers can manage the products, view sales and user portraits, and chat with an AI agent about the sales question.  

##### configuration

> configure the environment variables in .env file
> set Github action variables to support CI/CD

##### deployment instructions

> This project includes three sectors: front-end service named platform, back-end service named platform-api and AI servic named platform-ai.


- docker
  > requirments: DockerService in your OS
  > Execute deploy.sh to create the docker image and run it.

- local env
  > requirments: NodeJS > 20 and RUST > 1.7
  > run npm install and npm run dev in platform and platform-ai
  > run start.sh in platform-api

##### advanced technologies

- Nextjs - SEO friendly, support server-side rendering and easy to package and deploy
- Actix-web - memory-safe and secure, high concurrency.
- ExpressJs - suited for use with Langchain
- Docker - package project into container image, easy to deploy them to different cloud environment
- Github Action - CI/CD
- Langchain - create the AI agent easily with multiple community tools
- cloud - easy to scale and distributed deployment
- Nginx - loading balance
