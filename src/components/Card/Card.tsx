import * as React from "react";
import { FC, useState } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { City } from "../../models";
import { getIcon } from "../../api";
import "./Card.scss";

interface Props {
  city: City;
}

const Card: FC<Props> = ({ city }) => {
  const [data, setData] = useState<City>(city);

  if (data) {
    return (
      <div className="c-city">
        <div className="c-city__name">
          {data.name}, {data.sys.country}
        </div>
        <img className="c-city__icon" src={getIcon(data)} alt="Weather Image" />
        <div className="c-city__temperature">{data.main.temp}°C</div>
        <div className="c-city__description">
          Feels like: {data.main.feelsLike}°C. {data.weather.description}
        </div>
        <div className="c-city__wind">
          <span className="material-icons">near_me</span>{" "}
          <span>{data.wind.speed}m/s</span>
        </div>
        <div className="c-city__pressure">
          <span className="material-icons">speed</span>{" "}
          <span>{data.main.pressure}hPa</span>
        </div>
        <div className="c-city__humidity">Humidity: {data.main.humidity}%</div>
        <div className="c-city__visibility">
          Visibility: {data.visibility}km
        </div>
      </div>
    );
  } else {
    return (
      <div className="c-city c-city--loading">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      </div>
    );
  }
};

export default Card;