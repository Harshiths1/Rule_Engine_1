class Node {
    constructor(type, left = null, right = null, value = null, attribute = null, operator = null) {
      this.type = type;
      this.left = left;
      this.right = right;
      this.value = value;
      this.attribute = attribute;
      this.operator = operator;
    }
  }
  
  function tokenize(ruleString) {
    return ruleString.match(/\(|\)|AND|OR|[<>=]+|\w+|\d+|'[^']*'/g);
  }
  
  function parseExpression(tokens) {
    if (tokens[0] === '(') {
      const left = parseExpression(tokens.slice(1));
      const operator = tokens[tokens.indexOf(left) + 1];
      const right = parseExpression(tokens.slice(tokens.indexOf(left) + 2, -1));
      return new Node("operator", left, right, operator);
    } else {
      const attribute = tokens[0];
      const operator = tokens[1];
      const value = tokens[2].replace(/'/g, '');
      return new Node("operand", null, null, value, attribute, operator);
    }
  }
  
  export function createRule(ruleString) {
    const tokens = tokenize(ruleString);
    return parseExpression(tokens);
  }
  
  export function combineRules(rules) {
    if (rules.length === 1) {
      return createRule(rules[0]);
    }
    
    const combined = new Node("operator", null, null, "AND");
    combined.left = createRule(rules[0]);
    combined.right = combineRules(rules.slice(1));
    return combined;
  }
  
  export function evaluateRule(root, data) {
    if (root.type === "operator") {
      if (root.value === "AND") {
        return evaluateRule(root.left, data) && evaluateRule(root.right, data);
      } else if (root.value === "OR") {
        return evaluateRule(root.left, data) || evaluateRule(root.right, data);
      }
    } else {
      const attributeValue = data[root.attribute];
      if (attributeValue === undefined) {
        return false;
      }
      
      switch (root.operator) {
        case "=":
          return attributeValue == root.value;
        case ">":
          return attributeValue > parseFloat(root.value);
        case "<":
          return attributeValue < parseFloat(root.value);
        default:
          return false;
      }
    }
    return false;
  }