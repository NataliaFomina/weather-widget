import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Button, Input } from "antd";
import * as arrayMove from "array-move";
import SortableList, { SortableItem, SortableKnob } from "react-easy-sort";
import { City } from "../../models";
import { EnterOutlined, DeleteOutlined } from "@ant-design/icons";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { fetchCityByName } from "../../api";
import "./Settings.scss";

interface Props {
  cities?: City[];
  onCitiesChanged?: (cities: City[]) => void;
}

const Settings: FC<Props> = ({ cities, onCitiesChanged }) => {
  const [data, setData] = useState([]);
  const formSchema = Yup.object().shape({
    location: Yup.string(),
  });

  useEffect(() => {
    if (cities) {
      setData(cities);
    } else {
      setData([]);
    }
  }, [cities]);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    const newData = arrayMove(data, oldIndex, newIndex);
    setData(newData);
    onCitiesChanged(newData);
  };

  const onSubmit = (values: any, actions: any) => {
    actions.setSubmitting(true);
    fetchCityByName(values.location)
      .then((city: City) => {
        cities.push(city);
        setData([...cities]);
        onCitiesChanged([...cities]);
        actions.resetForm({});
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const onRemove = (city: City) => {
    const newData = cities.filter((el) => el.id !== city.id);
    setData(newData);
    onCitiesChanged(newData);
  };

  return (
    <div className="c-settings">
      <span className="c-settings__title">Settings</span>
      <SortableList
        onSortEnd={onSortEnd}
        className="c-settings__list"
        draggedItemClassName="dragged"
      >
        {data.map((element) => (
          <SortableItem key={element.id}>
            <div className="c-settings__item">
              <SortableKnob>
                <span className="material-icons c-settings__item-icon">
                  menu
                </span>
              </SortableKnob>
              <span className="c-settings__item-text">
                {element.name}, {element.sys.country}
              </span>
              <Button
                htmlType="submit"
                className="c-settings__item-remove-button"
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => onRemove(element)}
              />
            </div>
          </SortableItem>
        ))}
      </SortableList>
      <div className="c-settings__add-location">
        <Formik
          initialValues={{ location: "" }}
          enableReinitialize={true}
          validationSchema={formSchema}
          onSubmit={onSubmit}
        >
          {({ values, isSubmitting, handleChange, handleBlur }) => (
            <Form>
              <span className="c-settings__add-location-label">
                Add location:
              </span>
              <div className="c-settings__add-location-field">
                <Input
                  className="c-settings__add-location-input"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Button
                  htmlType="submit"
                  className="c-settings__add-location-button"
                  icon={<EnterOutlined />}
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Settings;
