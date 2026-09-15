import assert from 'node:assert/strict';
import { test } from 'node:test';
import { calculateGrossFromNet, calculateNetFromGross } from '../lib/fees';

test('receiving $1000 net computes the expected Stripe gross-up', () => {
  const result = calculateGrossFromNet(1000);
  assert.equal(result.gross, 1030.18);
  assert.equal(result.fee, 30.18);
  assert.equal(result.net, 1000.0);
  assert.equal(
    Math.round((result.gross - result.fee) * 100) / 100,
    result.net,
  );
});

test('charging a gross amount deducts the Stripe fee correctly', () => {
  const result = calculateNetFromGross(1030.18);
  assert.equal(result.gross, 1030.18);
  assert.equal(result.fee, 30.18);
  assert.equal(result.net, 1000.0);
});
