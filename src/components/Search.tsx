import { useEffect, useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

import { Button } from '@mui/material';
import Weather from '../types/Weather';

import urls from '../assets/urls.json';
import apiKeyJson from '../assets/apiKey.json';
import { useSnackbar } from 'notistack';
import { Store } from '../Store/Provider';
// const autocompleteUrl = urls.autoCompleteUrl;
const apiKey = apiKeyJson.apiKey;
const baseUrl = urls.baseUrl;
const forecastsUrl = `${baseUrl}/forecasts/v1/daily/5day/`;
const autocompleteUrl = `${baseUrl}/locations/v1/cities/autocomplete${apiKey}&q=`;

interface Props {
  setCityWeather: Function;
}

export default function SearchInput(props: Props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [data, setData] = useState<any>();
  const [capture, setCapture] = useState<Weather>();
  const [input, setInput] = useState<string>('');
  const { dispatch } = useContext(Store);

  useEffect(() => {
    axios
      .get(autocompleteUrl + input)
      .then((res) => {
        setData((prevData: any) => (prevData = res.data));
      })
      .catch((err) =>
        enqueueSnackbar("Couldn't fetch data", {
          variant: 'warning',
          preventDuplicate: true,
          action,
        })
      );
  }, [input]);

  useEffect(() => {
    if (capture) {
      axios
        .get(forecastsUrl + capture.Key + apiKey)
        .then((res) => {
          const dataToSave = {
            foreCast: res.data,
            key: capture.Key,
            city: capture.LocalizedName,
          };
          props.setCityWeather(
            (prevWeather: any) => (prevWeather = dataToSave)
          );
        })
        .catch((err) =>
          enqueueSnackbar("Couldn't fetch data", {
            variant: 'warning',
            preventDuplicate: true,
            action,
          })
        );
    }
  }, [capture]);

  const handleClick = (event: any, value: any, reason: any) => {
    if (reason === 'selectOption') {
      setCapture(value);
      dispatch({ type: 'CLEAR_FAVORITE' });
    }
  };

  const onChangeInput = (e: any) => {
    //checks for english letters
    let res = /^[a-zA-Z]+$/.test(e.target.value);
    if (res) {
      setInput(e.target.value);
    } else {
      enqueueSnackbar('English letters please', {
        variant: 'warning',
        preventDuplicate: true,
        action,
      });
    }
  };

  //snackbar button
  const action = (key: any) => (
    <>
      <Button
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        DISMISS
      </Button>
    </>
  );

  return (
    <>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          onChange={handleClick}
          getOptionLabel={(data) =>
            data.AdministrativeArea.LocalizedName + ' ' + data.Key
          }
          options={data ? data : []}
          isOptionEqualToValue={(option, value) =>
            option.Country.LocalizedName === value.Country.LocalizedName
          }
          renderOption={(props: any, data) => (
            <Button {...props} key={Math.random()}>
              {data.Country.LocalizedName}-
              {data.AdministrativeArea.LocalizedName}
            </Button>
          )}
          renderInput={(params) => (
            <TextField
              onChange={onChangeInput}
              {...params}
              label="Search location"
            />
          )}
        />
      </Stack>
    </>
  );
}
