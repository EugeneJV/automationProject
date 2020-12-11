# Automation test project

## Getting started

- Clone the repository

```
git clone 
```

- Install dependencies

```
cd e2eTests/
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