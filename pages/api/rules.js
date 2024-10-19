import { dbConnect, Rule } from '../../lib/database';
import { createRule, evaluateRule } from '../../lib/ruleEngine';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const rules = await Rule.find({});
        res.status(200).json(rules);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'POST':
      try {
        const rule = await Rule.create(req.body);
        res.status(201).json({ success: true, data: rule });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case 'PUT':
      try {
        const { id, data } = req.body;
        const rule = await Rule.findById(id);
        if (!rule) {
          return res.status(400).json({ success: false });
        }
        const ast = createRule(rule.ruleString);
        const result = evaluateRule(ast, data);
        res.status(200).json({ success: true, result });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}