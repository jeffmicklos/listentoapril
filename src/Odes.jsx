import React, { useState, useCallback, useEffect, useRef } from 'react';
import shuffle from 'lodash/shuffle';
import sample from 'lodash/sample';
import random from 'lodash/random';
import sampleSize from 'lodash/sampleSize';
import without from 'lodash/without';
import baseSample from 'lodash/_baseSample';
import classNames from 'classnames';

export function useTimeout(callback, delay) {
  const timeoutRef = useRef(null);
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  useEffect(() => {
    const tick = () => savedCallback.current();
    if (typeof delay === 'number') {
      timeoutRef.current = window.setTimeout(tick, delay);
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);
  return timeoutRef;
}
const ODES = [
  'The Old Krikorian',
  'The Scene',
  'Harbinson Canyon',
  'Proctor Valley Rd.',
  'Hotel St. James',
  'Gelato Vero',
  //'Le Stats',
  //'Korova',
  'Cosmos',
  'Bertos',
  'The Salk Institute',
  'Tourmaline',
  'Tribute',
  '3034 Dwight St.',
  'Bassams (Market St.)',
  'Room 3327',
  'Sodium Vapor',
  'Cottonwood',
  'Escapement',
];

const init = sampleSize(ODES, 4);

export default function Odes() {
  console.log('redndering');
  const [odes, setOdes] = useState(init);
  const [willWipe, setWillWipe] = useState(false);
  const [indexToReplace, setIndexToReplace] = useState(null);

  useEffect(() => {
    let duration = random(1000, 8000);
    if (willWipe) {
      duration = 10000;
    }

    if (odes[0] === 'April') {
      duration = 10000;
    }

    if (willWipe) {
      setTimeout(() => {
        setOdes(['April', 'San Diego', 'California', 'This is the New Trance']);
        setWillWipe(false);
      }, 10000);
      return;
    }

    setTimeout(() => {
      let current = [...odes];
      const next = sample(without(ODES, ...current));
      const i = random(0, 3);

      if (current[0] === 'April') {
        current = sampleSize(ODES, 4);
      } else {
        current[i] = next;
      }

      setIndexToReplace(i);

      if (random(0, 5) === 3) {
        setWillWipe(true);
        return;
      }

      setTimeout(() => {
        setOdes(current);
        setIndexToReplace(null);
      }, random(200, 800));
    }, duration);
  }, [odes, willWipe]);

  return (
    <ul className="ode">
      {odes?.map((ode, index) => {
        let duration = 420;

        if (willWipe) {
          duration = random(500, 2000);
        }

        if (odes[0] === 'April') {
          duration = random(300, 1000);
        }

        return (
          <li
            key={ode}
            className={classNames({
              'flicker-3': index === indexToReplace,
              [`flicker-${random(1, 3)}`]: willWipe || odes[0] === 'April',
            })}
            style={{
              animationDuration: `${duration}ms`,
            }}
          >
            {ode}
          </li>
        );
      })}
    </ul>
  );
}
