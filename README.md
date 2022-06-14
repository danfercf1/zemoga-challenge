# Serverless Typescript AWS fro Zemoga Cahellenge

This is a Serverless project example using Typescript, ready for [AWS Lambda](https://aws.amazon.com/lambda) and [API Gateway](https://aws.amazon.com/api-gateway/).

You need to have an AWS account, to create a dedicated IAM User with credentials so Serverless can deploy your app. ([Configure AWS credentials](#configure-aws-credentials-quick-way))

## Stack

- [Node.js](https://nodejs.org/en/) 12x
- [Serverless](https://serverless.com/framework/docs/)
- [Typescript](https://www.typescriptlang.org/) (> 3.8) for type checking.
- [docker-compose.yml](https://docs.docker.com/compose/), which allow us run the App with [Docker](https://www.docker.com/).

## IDE Setup

[VSCode](https://code.visualstudio.com/) is highly preferred. Please ensure you have installed these extensions:

- Prettier
- Eslint

---

### Requirements

- Node.js

Use our node container (set up in `docker-compose.yml`)

Or install Node 16 : [https://nodejs.org/en/](https://nodejs.org/en/)

- Serverless

```bash
npm install -g serverless
```

- Local DynamoDB:

```bash
sls dynamodb install
```

## NPM Scripts

Let's add some scripts for our application in `package.json`

```json
"scripts": {
  "lint": "eslint . --ext js,ts --cache --fix",
  "prettier": "prettier --list-different './**/*.{js,ts}'",
  "typecheck": "tsc --noEmit",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

Test them :

```bash
# linter
npm run lint

# prettier
npm run prettier

# type checking
npm run typecheck
```

## Configure AWS Credentials (Quick way)

This is the quick way to set up a user for Serverless.

Here is a better way : [Configure AWS Credentials (Better way)](#configure-aws-credentials-better-way)

### Create IAM user for Serverless

- Login to AWS and navigate to IAM
- Create a new user called serverless-deploy
- Give serverless-deploy Programatic access
- Attach the AdministratorAccess policy

### Use your user credentials

Save your new AWS profile into `~/.aws/credentials` (Don't forget to set your values :D) :

```text
[serverless-deploy]
aws_access_key_id = XXX
aws_secret_access_key = XXX
region = XXX
```

Set this profile in your `serverless.yml` so Serverless can use it for deployment.

```yaml
provider:
    profile: serverless-deploy
```

(or pass it with `--profile` argument to `serverless deploy`command.)

## Deploy

```bash
# -v enables verbose output so you can see what happens
serverless deploy -v
```

You can test it with your API Gateway end point : `https://xxxxxx.execute-api.us-east-1.amazonaws.com/dev`

The command to invoke a service is:

```bash
# -f specifies the function name, -l specifiesto output the logs to the console
serverless invoke -f hello -l
```

If you want to run the service locally you can run:

```bash
npm run dev
```

## Delete your service

```bash
serverless remove
```

## Configure AWS Credentials (Better way)

### Create IAM user, IAM group and IAM Policy

Here we want to create a new IAM Policy, attach it to a new IAM group to which we will attach our new user.

Let's go to _Identity and Access Management (IAM)_ service and create a new User `serverless-deploy` with Programatic access.
Give it no permissions.

You can find how to use your user credentials with Serverless here : [Use your user credentials](#use-your-user-credentials)

Then try to deploy your serverless app

```bash
serverless deploy -v
```

Let's now create a new IAM Policy :

- Create a new IAM Policy
- Add a policy for the CloudFormation service, allow _List:DescribeStacks_ action.
- Indicate to apply this permission to all resources and click _Review Policy_ button.  
    _(If necessary, you can specify specific ressources to apply the permissions)_
- Name this policy `serverless-deploy-policy` (just for consistency) and finish to create it.

Now go back to the group `serverless-deploy-group` we created and attach it this policy.  
Then go back to the user `serverless-deploy` and attach it to the group `serverless-deploy-group`.

Let's now try to deploy again

```bash
serverless deploy -v
```

### AWS Policies configuration

You can find the required policies configuration here: IAM.json

## Total Time

The total time that I spent in the project was: 12 hours.
