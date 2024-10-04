import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { toInt, removeChars, getStringFrom, splitByAny, replaceAll, getStringBetween } from './string';
import { lessThan, sum } from './number';
import { tap, map, reduce, pipe, filter } from 'ramda';

const hasHeader = (string) => string.startsWith("//");

const getDelimiters = (string) => {
  if (!hasHeader(string)) return [",", "\n"]; // Default delimiters

  const extractDelimiters = pipe(
    getStringBetween("//", "\n"),
    splitByAny("]["),
    map(removeChars("[]"))
  );

  return extractDelimiters(string);
};

const extractBody = (text) => {
  const getBody = getStringFrom("\n");
  return hasHeader(text) ? getBody(text) : text;
};

const checkNegatives = (numbers) => {
  const negativePieces = numbers.filter(lessThan(0));
  if (negativePieces.length > 0) throw new Error("Negatives not allowed: " + negativePieces.join(","));
};

const clean = replaceAll("\n");

const calculateSum = (inputString) => {
  const delimiters = getDelimiters(inputString);

  const work = pipe(
    extractBody,
    (body) => replaceAll("\n", ",")(body), 
    (body) => splitByAny(delimiters)(body), 
    map(toInt),
    filter(lessThan(1000)), 
    tap(checkNegatives),
    reduce(sum, 0)
  );

  return work(inputString);
};

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    try {
      const calcResult = calculateSum(input);
      setResult(`Result: ${calcResult}`);
      setError(null); 
    } catch (e) {
      setError(e.message); 
      setResult(null); 
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        String Calculator
      </Typography>
      <TextField
        fullWidth
        label="Enter numbers"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleCalculate}>
        Calculate
      </Button>
      {result && (
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {result}
        </Typography>
      )}
      {error && (
        <Typography variant="h6" color="error" gutterBottom>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default StringCalculator;
