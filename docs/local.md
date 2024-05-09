# Local Development

Testing using the Red-Green-Refactor technique is strongly encourgage. Use the following command to write code and have the tests automatically run when you save changes.

```shell
npm run test:w
```

To run the code coverage, run the following command:

```shell
npm run test:c
```

You need to achieve 80%, or better, coverage otherwise the CI pipeline will fail.
