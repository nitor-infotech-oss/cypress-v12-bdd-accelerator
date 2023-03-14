# Repo for Cypress Browsers Images:
# https://github.com/cypress-io/cypress-docker-images/tree/master/browsers
 
#---------------------------Config One---------------------------


# pull image
FROM ruby
RUN mkdir /cypressE2E
WORKDIR /cypressE2E
# copy cypress code from host to container
COPY . /cypressE2E
RUN gem install nokogiri
RUN gem install hiptest-publisher
RUN hiptest-publisher -c hiptest-publisher.conf --test-run-id=418182 --only=features

# make directory inside container
FROM cypress/browsers:latest
ARG browser="chrome"
ARG runEnv="qa"
RUN mkdir /cypressE2E
WORKDIR /cypressE2E
COPY --from=0 /cypressE2E ./
RUN ls
# execute the tests
RUN npm install
RUN $(npm bin)/cypress verify
RUN npm run runCypressE2E -- --env runEnv=${runEnv} --browser ${browser}