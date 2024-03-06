import React, { Fragment, useState } from 'react';

const SIZE_TO_SIZE_NAME = {
  xxs: 'XX Small',
  xs: 'X Small',
  s: 'Small',
  m: 'Medium',
  l: 'Large',
  xl: 'X Large',
  xxl: 'XX Large',
  xxxl: 'XXX Large',
};

const items = [
  {
    name: 'The Classic Black Band Tee',
    img: 'https://res.cloudinary.com/listentoapril/image/upload/f_auto,q_auto,w_400,dpr_2.0/v1694327775/maze/shop/jeff-1.jpg',
    description: (
      <Fragment>
        We like to imagine that, in a different timeline, this tee shirt would
        be displayed proudly in a bustling suburban Hot Topic location, right
        next to Deftones, Pink Floyd, Hole, and Black Sabbath. But alas, it's
        here. Looking back, I don't know if we ever saw <i>the</i> Joy Division
        shirt at Hot Topic, so maybe its for the best that we didn't make the
        cut.
        <br />
        <br />
        Printed on an{' '}
        <a
          style={{ color: '#8787ff' }}
          href="https://www.everlane.com/products/mens-organic-cotton-crew-tee-black"
        >
          "Men's Organic Cotton Crew"
        </a>{' '}
        by Everlane
      </Fragment>
    ),
    sizes: {
      xxs: 0,
      xs: 1,
      s: 1,
      m: 0,
      l: 0,
      xxl: 0,
      xxxl: 0,
    },
  },
  {
    name: 'The Heavy-Weight Black Band Tee',
    img: 'https://res.cloudinary.com/listentoapril/image/upload/f_auto,q_auto,w_400,dpr_2.0/v1694327775/maze/shop/jeff-3.jpg',
    description: (
      <Fragment>
        A heavier weight tee shirt than you'd normally come across at the merch
        booth, this shirt would really be at home with a straight-edge band logo
        across it, or maybe just the words "BOSTON" or "FOR MY FAMILY" with a
        clip-art pair of brass knuckles. Think Champion, but "<i>Organic</i>."
        <br />
        <br />
        Printed on an{' '}
        <a
          style={{ color: '#8787ff' }}
          href="https://www.everlane.com/products/mens-surplus-tee-black"
        >
          "Men's Premium-Weight Crew"
        </a>{' '}
        by Everlane
      </Fragment>
    ),
    sizes: {
      xxs: 0,
      xs: 0,
      s: 0,
      m: 1,
      l: 2,
      xl: 2,
      xxl: 1,
      xxxl: 0,
    },
  },
  {
    name: 'The Tank Top',
    img: 'https://res.cloudinary.com/listentoapril/image/upload/f_auto,q_auto,w_400,dpr_2.0/v1694327775/maze/shop/annie.jpg',
    description: (
      <Fragment>
        More points of interest. Our "graphics software" doesn't have
        spellcheck, so there is a hidden typo somewhere on this shirt&hellip;
        Consider it an exceedingly rare misprint.
        <br />
        <br />
        Printed on an{' '}
        <a
          style={{ color: '#8787ff' }}
          href="https://www.everlane.com/products/womens-organic-cotton-cutaway-tank-black"
        >
          "Women's Organic Cutaway Tank"
        </a>{' '}
        by Everlane
      </Fragment>
    ),
    sizes: {
      xxs: 0,
      xs: 0,
      s: 1,
      m: 1,
      l: 1,
      xl: 0,
      xxl: 0,
      xxxl: 0,
    },
  },
];

export default function Shop() {
  const banner = `
:::'###::::'########::'########::'####:'##::::::::::'##:::::'##:'########:'########::::::'######::'########::'#######::'########::'########:
::'## ##::: ##.... ##: ##.... ##:. ##:: ##:::::::::: ##:'##: ##: ##.....:: ##.... ##::::'##... ##:... ##..::'##.... ##: ##.... ##: ##.....::
:'##:. ##:: ##:::: ##: ##:::: ##:: ##:: ##:::::::::: ##: ##: ##: ##::::::: ##:::: ##:::: ##:::..::::: ##:::: ##:::: ##: ##:::: ##: ##:::::::
:##:::. ##: ########:: ########::: ##:: ##:::::::::: ##: ##: ##: ######::: ########:::::. ######::::: ##:::: ##:::: ##: ########:: ######:::
:#########: ##.....::: ##.. ##:::: ##:: ##:::::::::: ##: ##: ##: ##...:::: ##.... ##:::::..... ##:::: ##:::: ##:::: ##: ##.. ##::: ##...::::
:##.... ##: ##:::::::: ##::. ##::: ##:: ##:::::::::: ##: ##: ##: ##::::::: ##:::: ##::::'##::: ##:::: ##:::: ##:::: ##: ##::. ##:: ##:::::::
:##:::: ##: ##:::::::: ##:::. ##:'####: ########::::. ###. ###:: ########: ########:::::. ######::::: ##::::. #######:: ##:::. ##: ########:
..:::::..::..:::::::::..:::::..::....::........::::::...::...:::........::........:::::::......::::::..::::::.......:::..:::::..::........::
  `;

  const mobileBaner = `
..####...#####...#####...######..##.....
.##..##..##..##..##..##....##....##.....
.######..#####...#####.....##....##.....
.##..##..##......##..##....##....##.....
.##..##..##......##..##..######..######.
........................................
........##...##..######..#####..........
........##...##..##......##..##.........
........##.#.##..####....#####..........
........#######..##......##..##.........
.........##.##...######..#####..........
........................................
..####...######...####...#####...######.
.##........##....##..##..##..##..##.....
..####.....##....##..##..#####...####...
.....##....##....##..##..##..##..##.....
..####.....##.....####...##..##..######.
........................................
  `;

  return (
    <div className="shop">
      <pre className="banner">{banner}</pre>
      <pre className="banner--mobile">{mobileBaner}</pre>

      <p>A small selection of merch, embla</p>

      <ul>
        {items.map((item) => {
          return (
            <li className="item">
              <img src={item.img} alt={item.title} />{' '}
              <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <form>
                  <table>
                    <tr>
                      <td>Cost:</td>
                      <td>$19</td>
                    </tr>
                    <tr>
                      <td>Profit:</td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          placeholder="0"
                          style={{ width: 40 }}
                        />{' '}
                        dollars
                      </td>
                    </tr>
                    <tr>
                      <td>Size:</td>
                      <td>
                        <select className="button select">
                          {Object.keys(item.sizes).map((size) => {
                            const count = item.sizes[size];
                            return (
                              <option value={size} disabled={count === 0}>
                                {SIZE_TO_SIZE_NAME[size]}{' '}
                                {count === 1 ? ' - LAST ONE!' : ''}{' '}
                                {count === 0 ? ' - SOLD OUT!' : ''}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                    </tr>
                  </table>

                  <button type="submit" className="button">
                    Buy Now with PayPal
                  </button>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
