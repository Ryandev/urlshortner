# URL Shortner App service

## Setup

`corepack enable && corepack prepare yarn@stable --activate && yarn install && yarn setup`

##### Badges

[![Checks, Build and Deploy](https://github.com/Ryandev/urlshortner/actions/workflows/integration.yml/badge.svg)](https://github.com/Ryandev/urlshortner/actions/workflows/integration.yml) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FRyandev%2Furlshortner.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FRyandev%2Furlshortner?ref=badge_shield) [![CodeQL](https://github.com/MichaelCurrin/badge-generator/workflows/CodeQL/badge.svg)](https://github.com/MichaelCurrin/badge-generator/actions?query=workflow%3ACodeQL 'Code quality workflow status')

##### SonarCloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Ryandev_urlshortner&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Ryandev_urlshortner)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Ryandev_urlshortner&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Ryandev_urlshortner) [![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=Ryandev_urlshortner&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=Ryandev_urlshortner)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Ryandev_urlshortner&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Ryandev_urlshortner) [![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Ryandev_urlshortner&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Ryandev_urlshortner)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Ryandev_urlshortner&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Ryandev_urlshortner)

#WIP only, do **NOT** use

### Commands

### Other helpful tools

Analyze frontend js sizes:

```yarn add -D 'source-map-explorer' && yarn package && yarn run source-map-explorer dist/packages/frontend/exported/_next/static/chunks/*

```
