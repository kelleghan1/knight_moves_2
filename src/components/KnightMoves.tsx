import React from 'react';

export const KnightMoves = () => {
  const test = async () => {
    await Promise.resolve({done: true})
    .then(res => {
      console.log(res)
    })
  }

  test()

  return (
    <div>{'react setup from scratch without cra testing ts'}</div>
  );
}