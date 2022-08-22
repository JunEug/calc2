const url = require('url');
const ipAddress = "127.0.0.1";
const port = "4000"
const httpModule = require("http");
const log = require('./winston.js')



httpModule.createServer((request, response) => {
    let url_parts = url.parse(request.url, true);

    log.info("Got request", request.method, request.url)

    let operation = url_parts.pathname.replace("/", "");
    let firstNumber = url_parts.query.number_1;
    let secondNumber = url_parts.query.number_2;

    if (operation === undefined || firstNumber === undefined || secondNumber === undefined) {
        response.setTimeout(10, () => {
            log.error("Wrong URL!");
            response.end("Wrong URL!");
        });
    } else {
            let result = JSON.stringify(getResult(operation.toLowerCase(), Number(firstNumber), Number(secondNumber)));
            response.setTimeout(10, () => {
                log.info("Result: " + result);
                response.setHeader('Content-Type', 'application/json');
                response.end(result);
            });
        }
    }
).listen(port, ipAddress);

function getResult(operation, number1, number2) {
    let result = 0;

    switch(operation) {
        case "add":
            return result = number1 + number2;
        case "divide":
            if (number2 !== 0) {
            return result = number1 / number2;
            } else {
                return result = "Division by 0!";
            }
        case "multiply":
            return result = number1 * number2;
        case "subtract":
            return result = number1 - number2;
        default:
            return result = "Unknown operation";
    }
}