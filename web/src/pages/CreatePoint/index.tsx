import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { LeafletMouseEvent } from "leaflet";
import { Map, TileLayer, Marker } from "react-leaflet";
import axios from "axios";

import "./styles.css";

// Services
import api from "../../services/api";

// Assets
import logo from "../../assets/logo.svg";

// Components
import Dropzone from "../../components/Dropzone";

// Types
type Item = {
  id: number;
  title: string;
  image_url: string;
};

type StatesIBGEResponse = { sigla: string };
type CitiesIBGEResponse = { nome: string };

const CreatePoint: React.FC = () => {
  // Arrays empty to loads
  const [items, setItems] = useState<Item[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // Inputs
  const [selectedFile, setSelectedFile] = useState<File>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const [uf, setUf] = useState("0");
  const [city, setCity] = useState("0");
  const [selectItems, setSelectItems] = useState<number[]>([]);
  const [initialMapPosition, setInitialMapPosition] = useState<
    [number, number]
  >([0, 0]);
  const [selectMapPosition, setSelectMapPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setInitialMapPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const response = await api.get("/items");

      if (response?.data) {
        setItems(response.data);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await axios.get<StatesIBGEResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );

      if (response?.data) {
        const satialized = response.data.map((state) => state.sigla);

        setStates(satialized);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setCities([]);

      const response = await axios.get<CitiesIBGEResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );

      if (response?.data) {
        const satialized = response.data.map((theCity) => theCity.nome);

        setCities(satialized);
      }
    })();
  }, [uf]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleMapClick = (e: LeafletMouseEvent) => {
    const location = e.latlng;

    setSelectMapPosition([location.lat, location.lng]);
  };

  const handleSelectUF = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUf(e.target.value);
  };

  const handleSelectCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  const handleSelectItem = (id: number) => {
    const alreadySelected = selectItems.includes(id);

    if (alreadySelected) {
      const filteredItems = selectItems.filter((item) => item !== id);

      setSelectItems(filteredItems);
    } else {
      setSelectItems([...selectItems, id]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const [latitude, longitude] = selectMapPosition;
    const items = selectItems;

    let form_data = new FormData();

    const data: any = {
      ...formData,
      uf,
      city,
      latitude: String(latitude),
      longitude: String(longitude),
      items: items.join(","),
    };

    if (selectedFile) {
      data.image = selectedFile;
    }

    for (var key in data) {
      form_data.append(key, data[key]);
    }

    try {
      await api.post("/points", form_data);

      alert("Ponto de coleta criado!");
    } catch (error) {
      alert("Ocorreu um erro!");
    }
  };

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do
          <br />
          ponto de coleta
        </h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">Nome da entidate</label>
            <input
              onChange={handleInputChange}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleInputChange}
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                onChange={handleInputChange}
                type="text"
                name="whatsapp"
                id="whatsapp"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialMapPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={selectMapPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf" value={uf} onChange={handleSelectUF}>
                <option defaultValue="0">Selecione uma UF</option>
                {states.map((uf) => (
                  <option value={uf} key={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={city}
                onChange={handleSelectCity}
              >
                <option defaultValue="0">Selecione uma cidade</option>
                {cities.map((cityName) => (
                  <option value={cityName} key={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>
          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                className={selectItems.includes(item.id) ? "selected" : ""}
                onClick={() => handleSelectItem(item.id)}
              >
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
