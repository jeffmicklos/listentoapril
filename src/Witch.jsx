import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import $ from 'jquery';
import sample from 'lodash/sample';

class Witch extends Component {
  state = {
    counts: [],
  };

  componentWillUnmount() {
    document
      .querySelectorAll('.witch')
      .forEach(e => e.parentNode.removeChild(e));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.counts.length !== this.state.counts.length) {
      let newOne = this.state.counts[this.state.counts.length - 1];

      const randTop = Math.random();
      const randLeft = Math.random();
      const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

      Array.from(Array(newOne.count).keys()).map(i => {
        const el = document.createElement('span');

        $(el).css({
          position: 'absolute',
          top: randTop * 100 + Math.random() * sample(nums) + '%',
          left: randLeft * 100 + Math.random() * sample(nums) + '%',
        });

        el.className = 'witch';

        el.style.fontSize = sample(['12px', '36px', '24px', '16px']);

        if (sample(nums) % 2 === 0) {
          el.className = `witch blink-${sample([1, 2, 3])}`;
        }

        el.innerText = 'WITCH';

        setTimeout(() => document.body.appendChild(el), Math.random() * 250);

        setTimeout(() => {
          if (sample(nums) % 2 !== 0) {
            el.remove();
          }
        }, Math.random() * Math.random() * 10000);
      });
    }
  }

  render() {
    return (
      <div className="quote-container">
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
        <button
          className="button"
          onClick={() =>
            this.setState({
              counts: [
                ...this.state.counts,
                {
                  count: Math.round(Math.random() * 10),
                  top: Math.random() * 100,
                  left: Math.random() * 100,
                },
              ],
            })
          }
        >
          witch
        </button>
        <Link to={this.props.link} className="button">
          way
        </Link>
      </div>
    );
  }
}

export default Witch;
