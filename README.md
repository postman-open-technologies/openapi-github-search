# GitHub OpenAPI Search

The goal of this project is to provide a robust yet easy way to search Github for OpenAPI and Swagger definitions. Understanding that there is a lot of noise available, that we only care about OpenAPIs that validate, and that the Github API has rate limits that require you to automate the crawling over time. Providing a robust open-source solution that will crawl public Github repositories for machine-readable API definitions.
The project will consist of developing an open-source API that allows you to pass in search parameters and then utilize the GitHub API to perform the search, helping simplify the search interface,  and handle conducting a search in an asynchronous way, allowing the user to make a call to initiate, but then separate calls to receive results over time as results come in, helping show outcomes over time.

## Tech Stack
- Node JS/Express JS
- Typescript
- Jest (For testing)
- Docker
- Python (Scripting)
- ElasticSearch

## Dev Runbook 
Dependancies: NodeJS 19, npm, Github APIKey
How to get a Github API Key: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens  

## Setting up OpenAPI Search with Docker Compose

1. Clone the repository to your local setup
2. Make sure you have Docker installed locally.
3. Make a `.env` file in the directory and add the variables: 
	 **PORT**= **(port number you want to host the api)**
	 **GITHUB_API_KEY**= **(github API key)**
	 **ES_HOST**= **(determines location of elasticsearch db)** 
4. Run `docker compose up`
5. Two Containers - Elasticsearch (The database container) and an instance of the server should have started.
6. Now to load the database with OpenAPI Files, run 
`python scripts/seed_script.py` from the root of the folder. (Takes around 2-3hrs) 

Check out the loading details below, to learn more about the loading script. 

## Setting up the server manually

 1. Clone the repository to your local setup
 2. Run `npm i`
 3. Make a `.env` file in the directory and add the variables: 
	 **PORT**= **(port number you want to host the api)**
	 **GITHUB_API_KEY**= **(github API key)**
	 **ES_HOST**= **(determines location of elasticsearch db)**  
4.  Run `npm run build:watch` on one terminal.
5.  On another terminal, run `npm run start` to start the server on the port specified on. 
6.  Now the nodejs server should be running! To test it just go to `localhost:{{PORT}}` and then you will be able to see the admin panel through which you can inference with some of the API's
7. Now to load the database with OpenAPI Files, run 
`python scripts/seed_script.py` from the root of the folder. (Takes around 2-3hrs)

## Setting up ElasticSearch locally (Manually)
	1. docker pull docker.elastic.co/elasticsearch/elasticsearch:8.8.2
    2. docker network create elastic
    3. docker run \ 
        -p 9200:9200 \
        -p 9300:9300 \
        -e "discovery.type=single-node" \
        -e "xpack.security.enabled=false" \
        docker.elastic.co/elasticsearch/elasticsearch:8.8.2

## Loading Details
Currently, we are only indexing OpenAPI Files from the top 2000 most popular organisations from Github (Based on stars). Although more organisations can be indexed by adding them to the `scripts/assets/organisations.txt` file.
The organisation.txt file has the top 1000 organisations by stars. 
The organisations2.txt file has the next 1000 organisations by stars.
You can change the org list in the seed_script.py to load more data. 
More can be added using the gitstar_ranking script. 

## API Endpoints
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/19841716-f1801bb7-b189-429b-a875-91b115d349a2?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D19841716-f1801bb7-b189-429b-a875-91b115d349a2%26entityType%3Dcollection%26workspaceId%3D5ebe19fb-61d4-47a7-9cae-de3834853f6b)

🚧Under Construction
