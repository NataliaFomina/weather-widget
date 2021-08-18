import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Button } from "antd";
import { CloseOutlined, SettingOutlined } from "@ant-design/icons";
import Settings from "../Settings";
import View from "../View";
import { loadConfig, saveConfig, citiesToReferences } from "../../config";
import { fetchCityByGeolocation, fetchCityByName } from "../../api";
import { City } from "../../models";
import "./WeatherWidget.scss";
import "antd/dist/antd.css";

interface Props {
  cities: City[];
}

const MODE_VIEW = "view";
const MODE_SETTINGS = "settings";

const WeatherWidget: FC<Props> = () => {
  const [data, setData] = useState<City[]>([]);
  const [mode, setMode] = useState<string>(MODE_VIEW);
  console.log(mode);

  useEffect(() => {
    const config = loadConfig();
    if (config) {
      const cities: City[] = [];
      config.refs.forEach((el, i) => {
        fetchCityByName(`${el.city}, ${el.country}`).then((city: City) => {
          cities.splice(i, 0, city);
          setData([...cities]);
        });
      });
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        fetchCityByGeolocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }).then((city: City) => {
          setData([city]);
          saveConfig(
            Object.assign({}, loadConfig(), {
              refs: citiesToReferences([city]),
            })
          );
        });
      });
    }
  }, []);

  const render = () => {
    switch (mode) {
      case MODE_VIEW:
        return (
          <>
            <div className="c-weather-widget__button">
              <Button
                size="small"
                icon={<SettingOutlined />}
                onClick={() => setMode(MODE_SETTINGS)}
              />
            </div>
            <View cities={data} />
          </>
        );
      case MODE_SETTINGS:
        return (
          <>
            <div className="c-weather-widget__button">
              <Button
                size="small"
                icon={<CloseOutlined />}
                onClick={() => setMode(MODE_VIEW)}
              />
            </div>
            <Settings
              cities={data}
              onCitiesChanged={(newData: City[]) => {
                setData(newData);
                saveConfig(
                  Object.assign({}, loadConfig(), {
                    refs: citiesToReferences(newData),
                  })
                );
              }}
            />
          </>
        );
    }
  };
  return <div className="c-weather-widget">{render()}</div>;
};

export default WeatherWidget;
