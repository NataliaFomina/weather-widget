import { City, Config, Reference } from "./models";

const LOCAL_STORAGE_KEY = "weatherwidget.config";

function saveConfig(config: Config) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
}

function loadConfig(): Config {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
}

function citiesToReferences(cities: City[]): Reference[] {
  return cities.map((el) => {
    return {
      city: el.name,
      country: el.sys.country,
    };
  });
}

export { saveConfig, loadConfig, citiesToReferences };
