# pull a base Image
FROM node:12.18.2-alpine
# use singledoctor as the working directory
RUN mkdir /singledoctor
WORKDIR /singledoctor
# copy the dependencies to install
COPY package.json /singledoctor/package.json
# copy all the env variables
COPY .env /singledoctor/.env
# cpoy all the files to the working directory
COPY . /singledoctor
# install dependencies
RUN npm install
EXPOSE 5000
ENTRYPOINT npm run dev