import * as React from "react";
import { FC } from "react";
import { City } from "../../models";
import Card from "../Card";

interface Props {
  cities?: City[];
}

const View: FC<Props> = ({ cities }) => {
  return (
    <div className="c-view">
      {cities.map((el) => (
        <Card key={el.id} city={el} />
      ))}
    </div>
  );
};

export default View;
