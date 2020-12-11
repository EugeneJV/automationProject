# Automation test project

## Getting started

- To run tests using this framework, you need to have chrome version no lower than 87.0.0

- Clone the repository

```
git clone https://github.com/EugeneJV/automationProject.git
```

- Install dependencies

```
cd automationProject/e2eTests
npm i
```

## e2e tests regular parallel running

```javascript
npm run regularTestSuiteInParalel // to run full regular test suite in parallel
```

## e2e tests selective running

```javascript
npm run authorizationFlowNotRegisteredUserTest // to run tests selectively

npm run authorizationFlowRegisteredUserTest // to run tests selectively

npm run checkMyProfileTest // to run tests selectively
```