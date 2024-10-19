import React, { useState, useEffect } from 'react';
import RuleForm from '../components/RuleForm';
import RuleList from '../components/RuleList';

export default function Home() {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    const res = await fetch('/api/rules');
    const data = await res.json();
    setRules(data);
  };

  const addRule = async (rule) => {
    const res = await fetch('/api/rules', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rule),
    });
    if (res.ok) {
      fetchRules();
    }
  };

  const evaluateRule = async (id, data) => {
    const res = await fetch('/api/rules', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, data }),
    });
    const result = await res.json();
    return result.result;
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">Rule Engine</h1>
      <RuleForm addRule={addRule} />
      <RuleList rules={rules} evaluateRule={evaluateRule} />
    </div>
  );
}