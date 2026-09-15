import assert from 'node:assert/strict';
import { test } from 'node:test';
import { FEE_STRUCTURES, calculateGrossFromNet, calculateNetFromGross } from '../lib/fees';

test('receiving $1000 net computes the expected Stripe US gross-up', () => {
  const result = calculateGrossFromNet(1000, FEE_STRUCTURES.stripe_us);
  assert.equal(result.gross, 1030.18);
  assert.equal(result.fee, 30.18);
  assert.equal(result.net, 1000.0);
  assert.equal(Math.round((result.gross - result.fee) * 100) / 100, result.net);
});

test('charging a gross amount deducts the Stripe US fee correctly', () => {
  const result = calculateNetFromGross(1030.18, FEE_STRUCTURES.stripe_us);
  assert.equal(result.gross, 1030.18);
  assert.equal(result.fee, 30.18);
  assert.equal(result.net, 1000.0);
});

test('Stripe ACH charge mode floors the fee at the $0.30 minimum', () => {
  const result = calculateNetFromGross(10, FEE_STRUCTURES.stripe_ach);
  assert.equal(result.fee, 0.3);
  assert.equal(result.net, 9.7);
});

test('Stripe ACH charge mode caps the fee at the $5.00 maximum', () => {
  const result = calculateNetFromGross(10000, FEE_STRUCTURES.stripe_ach);
  assert.equal(result.fee, 5);
  assert.equal(result.net, 9995);
});

test('Stripe ACH receive mode accounts for the fee floor', () => {
  const result = calculateGrossFromNet(10, FEE_STRUCTURES.stripe_ach);
  assert.equal(result.fee, 0.3);
  assert.equal(result.gross, 10.3);
});
