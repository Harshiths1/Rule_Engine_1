import React, { useState } from 'react';

export default function RuleList({ rules, evaluateRule }) {
  const [evaluationData, setEvaluationData] = useState({});
  const [evaluationResults, setEvaluationResults] = useState({});

  const handleEvaluate = async (id) => {
    const result = await evaluateRule(id, evaluationData[id]);
    setEvaluationResults({ ...evaluationResults, [id]: result });
  };

  const handleInputChange = (id, field, value) => {
    setEvaluationData({
      ...evaluationData,
      [id]: { ...(evaluationData[id] || {}), [field]: value },
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Rules</h2>
      {rules.map((rule) => (
        <div key={rule._id} className="mb-8 p-4 border rounded">
          <h3 className="text-xl font-semibold mb-2">{rule.name}</h3>
          <p className="mb-2">{rule.description}</p>
          <p className="mb-4"><strong>Rule:</strong> {rule.ruleString}</p>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Evaluate Rule:</h4>
            <input
              type="text"
              placeholder="age"
              onChange={(e) => handleInputChange(rule._id, 'age', e.target.value)}
              className="mr-2 px-2 py-1 border rounded"
            />
            <input
              type="text"
              placeholder="department"
              onChange={(e) => handleInputChange(rule._id, 'department', e.target.value)}
              className="mr-2 px-2 py-1 border rounded"
            />
            <input
              type="text"
              placeholder="salary"
              onChange={(e) => handleInputChange(rule._id, 'salary', e.target.value)}
              className="mr-2 px-2 py-1 border rounded"
            />
            <input
              type="text"
              placeholder="experience"
              onChange={(e) => handleInputChange(rule._id, 'experience', e.target.value)}
              className="mr-2 px-2 py-1 border rounded"
            />
            <button
              onClick={() => handleEvaluate(rule._id)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Evaluate
            </button>
          </div>
          {evaluationResults[rule._id] !== undefined && (
            <p>
              <strong>Result:</strong>{' '}
              {evaluationResults[rule._id] ? 'False' : 'True'}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}