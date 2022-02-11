import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function Wire({ link }) {
  return (
    <div className="article-container">
      <p>
        When a band is a side project for all five people involved, it&rsquo;s
        easy to go most of a decade releasing two songs per year. This is the
        case with April, whose sound has also remained consistent and unified
        through time: they deal in slow yet propulsive drones made with piano,
        treated guitar and tape.
      </p>
      <p>
        If their music is cinematic, it&rsquo;s less Hollywood and more nature
        documentary, exemplified by the loops which sound like abstracted
        chirping birds or crackling fire. It makes perfect sense that many of
        these were recorded in cabins in remote Gold Rush towns like Julian,
        California. The visual aesthetic, on the other hand, works with cloudy
        black and white minimalism, culminating in a nonsensical abstraction of
        a website resembling Radiohead&rsquo;s early 2000s web presence. If the
        music is like a forest, it&rsquo;s a dense one.
      </p>
      <p>
        This Is The New Trance comes after a trail of singles released at a
        leisurely pace. While not reaching the same level of sentimentality as
        the singles, the quietly rumbling calm of April&rsquo;s music is vast as
        ever, owing a lot to the pine-scented Sigur Rós spin-off project Jónsi
        &amp; Alex. This is reflected more literally in a guest harp part from
        Mary Lattimore (a friend of the aforementioned duo) on
        <i>&ldquo;Undercurrent/Watershed.&rdquo;</i> The album&rsquo;s highlight
        is the last track proper - discounting the fake Japanese bonus track{' '}
        <i>&ldquo;Graphene&rdquo;</i> –{' '}
        <i>&ldquo;Night&nbsp;Shade/Moon&nbsp;Beam.&rdquo;</i> Played on
        harmonium with an underpainting of chimes and crackling loop textures,
        it sounds like a lullaby.
      </p>

      <p>
        The members of April have known one another since high school.
        They&rsquo;d previously played together in emo and post-rock bands, but
        eventually ambient seemed like the only way to express themselves. This
        could explain why their sound is so consistent. When people know each
        other for long enough, they develop a sort of telepathy - a profound hum
        audible to the human ear.
      </p>

      <cite
        style={{
          fontStyle: 'normal',
          display: 'block',
          textAlign: 'right',
          marginBottom: '40px',
        }}
      >
        Catherine Sinow, <i>Wire Magazine</i>, August 2021
      </cite>

      <Link to={link} className="button">
        we&rsquo;ve made it
      </Link>
    </div>
  );
}
