function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    
  const priority = {
    '+': '1',
    '-': '1',
    '*': '2',
    '/': '2'
  };
    
  function method(a, b, operator) {
    if (operator === "/" && b === 0) {
        throw new Error("TypeError: Division by zero.")
      }
    return (operator === "+") ? a + b
    :(operator === "-") ? a - b
    :(operator === "*") ? a * b
    :(operator === "/") ? a / b : null;
  };
    
  let numbers = []; // 
  let actions = []; 
  let lastNum, lastOp;
  expr = expr.replace(/ /g, '');
  
  while (expr) {
    let token = expr[0];
    
    expr = !isNaN(+token) ?
    (
    numbers.push(parseInt(expr)),
    expr.slice(String(parseInt(expr)).length)
    ) : (
    expr.slice(1)
    );
    
    switch (token) {
    
      case '(':
        actions.push(token);
        break;
    
      case ')':
        lastOp = actions.pop();

         while ( lastOp !== "(") {
          lastNum = numbers.pop();
            numbers.push(method(numbers.pop(), lastNum, lastOp));
            lastOp = actions.pop();
          if ( lastOp === undefined) {
          throw new Error("ExpressionError: Brackets must be paired")
             }
           }
          break;
    
      case '+':
      case '-':
        lastOp = actions.pop();
        while ( lastOp !== "(" && lastOp !== undefined ) {
          lastNum = numbers.pop();
          numbers.push(method(numbers.pop(), lastNum, lastOp));
          lastOp = actions.pop();
          }
        actions.push(lastOp);
        actions.push(token);
        break;
      case '*':
      case '/':
        lastOp = actions.pop();
        while( priority[lastOp] === "2" ) {
          lastNum = numbers.pop();
            numbers.push(method(numbers.pop(), lastNum, lastOp));
            lastOp = actions.pop();
          }
        actions.push(lastOp);
        actions.push(token);
        break;
      }
    }
    
    while (numbers.length - 1){
    
      lastNum = numbers.pop();
      lastOp = actions.pop();
        numbers.push(method(numbers.pop(), lastNum, lastOp));
      }
    if ( actions.includes("(")) {
        throw new Error("ExpressionError: Brackets must be paired");
    } else return numbers[0]

}

module.exports = {
    expressionCalculator
}