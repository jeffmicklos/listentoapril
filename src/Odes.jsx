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
  'Korova',
  'Cosmos',
  'Bertos',
  'The Salk Institute',
  'Tourmaline',
  //'Tribute',
  '3034 Dwight St.',
  'Bassams (Market St.)',
  'Room 3327',
  'Sodium Vapor',
  'Cottonwood',
  'Escapement',
  '1825',
  'Haven Bakery',
  'Punk Rock Dennys',
  'The Che',
  'Check Points',
  'Big Sonic Chill',
  'Lost Companions Intl.',
  'View Point (Lookout)',
  'Ray (At Night)',
  'Dec. 3rd, 2005',
];

const init = [
  'Sodium Vapor',
  'The Old Krikorian',
  'Hotel St. James',
  'Tourmaline',
];

/*
GOOD:

Sodium Vapor
Escapement
Bassams (Market St.)
Cottonwood

Hotel St. James
Cosmos
Proctor Valley Rd.
The Scene

Hotel St. James
Cosmos
Bassams (Market St.)
The Scene

Cosoms
Hotel St. James
Bassams (Market St.)
The Scene
*/

/*
BAD:
Gelato Vero
Room 3327
The Scene
Cosmos

Hotel St. James
Cosmos
Gelato Vero
The Scene

Cosmos
Escapement
Room 3327
Harbinson Canyon

Cosmos
Bertos
Hotel St. James
Harbinson Canyon

Sodium Vapor
Tourmaline
Bertos
The Old Krikorian

The Salk Institute
3034 Dwight St.
Hotel St. James
Escapement

Cosmos
The Old Krikorian
Cottonwood
Tourmaline

3034 Dwight St.
Tourmaline
Room 3327
Escapement

Sodium Vapor
Room 3327
The Scene
Tourmaline

3034 Dwight St.
Hotel St. James
Escapement
Tourmaline
*/

const getLine = (i, lines) => {
  let candidate;
  const candidates = without(ODES, ...lines);

  const longest = lines.reduce(
    (memo, current) => Math.max(memo, current.length),
    0,
  );

  const shortest = lines.reduce(
    (memo, current) => Math.min(memo, current.length),
    Infinity,
  );

  const aboveLength = lines[i - 1]?.length;
  const belowLength = lines[i + 1]?.length;

  if (aboveLength && belowLength) {
  }

  if (i == 0) {
    // top line should never be the longest

    candidate = sample(
      candidates.filter((candidate) => candidate.length < longest),
    );

    console.log(
      'top line, shorter than',
      longest,
      candidate,
      candidates.filter((candidate) => candidate.length < longest),
      candidates,
    );
  } else if (i === 3) {
    // bottom line should never be the shortest
    let first = candidates.filter((candidate) => candidate.length > shortest);

    candidate = sample(first);

    if (
      candidate?.length <= lines[2].length &&
      candidate?.length <= lines[1].length
    ) {
      candidate =
        sample(
          first.filter(
            (candidate) =>
              candidate.length > lines[2].length &&
              candidate.length > lines[1].length,
          ),
        ) || first;
    }
  }

  return candidate || sample(candidates);
};

export default function Odes() {
  const [odes, setOdes] = useState(init);
  const [willWipe, setWillWipe] = useState(false);
  const [indexToReplace, setIndexToReplace] = useState(null);

  useEffect(() => {
    let duration = random(1000, 8000);

    if (odes[0] === 'April') {
      duration = 10000;
    }

    if (random(0, 5) === 3 && odes[0] !== 'April') {
      setWillWipe(true);
      return;
    }

    setTimeout(() => {
      let current = [...odes];
      //const next = sample(without(ODES, ...current));
      const i = random(0, 3);

      const next = getLine(i, current);

      if (current[0] === 'April') {
        const thing = sampleSize(ODES, 4);
        current = thing;
      } else {
        current[i] = next;
        setIndexToReplace(i);
      }

      setTimeout(() => {
        setOdes(current);
        setIndexToReplace(null);
      }, random(200, 800));
    }, duration);
  }, [odes]);

  useEffect(() => {
    if (willWipe) {
      setTimeout(() => {
        setOdes([
          'April',
          'San Diego, Ca',
          'Constant Escapement',
          'This is the New Trance',
        ]);
        setWillWipe(false);
      }, 10000);
      return;
    }
  }, [willWipe]);

  return (
    <ul className="ode">
      {odes?.map((ode, index) => {
        let duration = 420;

        if (willWipe) {
          duration = random(500, 2000);
        }

        if (odes[0] === 'April') {
          duration = random(300, 700);
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
              animationDelay:
                willWipe && odes[0] !== 'April' ? `${random(0, 4000)}ms` : 0,
            }}
          >
            {ode}
          </li>
        );
      })}
    </ul>
  );
}
