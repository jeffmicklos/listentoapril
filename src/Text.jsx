import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import $ from 'jquery';
import sample from 'lodash/sample';

function choose(array) {
  return array[Math.floor(Math.random() * array.length)];
}

class Text extends Component {
  state = {
    counts: [],
  };

  componentWillUnmount() {
    document
      .querySelectorAll('.witch')
      .forEach((e) => e.parentNode.removeChild(e));
  }

  componentDidMount() {
    setInterval(() => {
      const maxGroupCount = 4;
      this.setState({
        counts: [
          ...this.state.counts,
          {
            count: Math.round(Math.random() * maxGroupCount),
            top: Math.random() * 100,
            left: Math.random() * 100,
          },
        ],
      });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.counts.length !== this.state.counts.length) {
      let newOne = this.state.counts[this.state.counts.length - 1];

      const randTop = Math.random();
      const randLeft = Math.random();
      const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const texts = [
        'webtape',
        'constant escapement',
        'elsewhere / elsewhen',
        'elsewhen',
        'elsewhere',
        'static angel',
        'children of the night',
        'kiss your knee',
        'suburban slumber',
        'southwest extreme triangle',
        'to the archives',
      ];

      const text = choose(texts);

      Array.from(Array(newOne.count).keys()).map((i) => {
        const el = document.createElement('span');

        $(el).css({
          position: 'absolute',
          top: randTop * 100 + Math.random() * sample(nums) + '%',
          left: randLeft * 100 + Math.random() * sample(nums) + '%',
        });

        el.className = 'tape';

        el.style.fontSize = sample(['10px', '13px', '18px', '6px']);

        if (sample(nums) % 2 === 0) {
          el.className = `tape blink-${sample([1, 2, 3])}`;
        }

        el.innerText = choose(texts);

        setTimeout(() => document.body.appendChild(el), Math.random() * 250);

        const int = setInterval(() => {
          if (sample(nums) % 2 !== 0) {
            el.remove();
            clearInterval(int);
          }
        }, Math.random() * Math.random() * 10000);
      });
    }
  }

  render() {
    return (
      <div className="quote-container quote-container--tape">
        {/*this.state.counts.map(set => {
          return Array.from(Array(set.count).keys()).map(i => (
            <span
              className="witch"
              style={{
                top: `${set.top + i * 2}%`,
                left: `${set.left + i * 2}%`,
              }}
            >
              Witch
            </span>
          ));
        })*/}
      </div>
    );
  }
}

export default Text;
