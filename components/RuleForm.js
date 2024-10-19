import React, { useState } from 'react';

export default function RuleForm({ addRule }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ruleString, setRuleString] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addRule({ name, description, ruleString });
    setName('');
    setDescription('');
    setRuleString('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">Rule Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ruleString" className="block mb-2">Rule String:</label>
        <input
          type="text"
          id="ruleString"
          value={ruleString}
          onChange={(e) => setRuleString(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Rule
      </button>
    </form>
  );
}