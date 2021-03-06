import React from 'react';
import { useSelector } from 'react-redux';

import Card from '../Card';
import './styles.css';

export default function YourCard() {
  const cards = useSelector((state) => state.cards);
  const user = useSelector((state) => state.user);

  return (
    <ul className="list__card">
      {cards
        .filter((el) => el.author === user.uid && el.status !== 'finish')
        .map((el, i) => {
          return <Card key={el.uid} item={el} index={i + 1} />;
        })}
    </ul>
  );
}
