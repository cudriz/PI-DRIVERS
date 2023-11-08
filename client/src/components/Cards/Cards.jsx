import React from 'react'
import Card from '../Card/Card'
import style from "./Cards.module.css"

const Cards = ({cards}) => {
    return (
        <div className={style.container}>
          {cards.map((driver) => (
            <Card
              key={driver.id}
              id={driver.id}
              name={driver.name}
              surname={driver.surname}
              description={driver.description}
              image={driver.image}
              nationality={driver.nationality}
              dob={driver.dob}
              teams={driver.teams}
            />
          ))}
        </div>
      );
    };
export default Cards