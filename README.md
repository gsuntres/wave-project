# wave-project

Wave back-end challenge project (aka freebe)

## Design and Implementation

There's going to be two calls: one that handles the file uploading and another
one that returns the desired payroll report.

Our design will follow the MVC paradigm. As such, we will have three layers:
the presentation layer (routes), the service layer, and the domain layer.

In order to simplify our implementation we will:
 * save dates as unix timestamps
 * save monetary values as integers with the last two zeroes being the decimal part of the value (e.g. 3050 represents $30.50)

## Install & Run

```bash
npm install
npm start
```

Service will be available at ```http://localhost:4000```

## Testing the service

* use Postman or a similar tool to test the api, I used Insomnia.
* use debug or console.log
* use the debugger

## Add in production

* add the ability to run in multiple environments, e.g. development, staging, production
* use a relational database or a nosql database to persist data.
* add health check, since most infrastructures will require it for liveness probes.
* add access control, e.g. jwt, or any other authorization/authentication mechanism
* limit the size of the files that the user can upload.

## Good to have (omitted to save time)

* have payroll report call take a range of dates as arguments instead of returning everything.
* file parsing should probably happen asynchronously. For that to happen, design should be reconsider.
* proper error handling, process exceptions and return error object e.g. error object with codes and descriptions.
* code linting
* verify uploaded files for correctness.
* use proper documentation tools
* validate the integrity of the data to be parsed (e.g. do we have rates for each group etc)
