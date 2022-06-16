//npm packages
import React, { useEffect, useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';
import _, { isNull } from 'lodash';
import { useSnackbar } from 'notistack';
import { useSearchParams } from 'react-router-dom';
//assets
import urls from '../assets/urls.json';
//Types
import { AutoComplete } from '../types/AutoCompleteType';
import { Capture } from '../types/Capture';
//utils
import getRequest from '../utils/getRequest';
import enqueueAction from '../utils/enqueueAction';
import showSnackBar from '../utils/showSnackBar';
//redux
import { useFetchCitiesQuery } from '../reduxSlices/autoCompleteSlice';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = urls.baseUrl;
const forecastsUrl = `${baseUrl}/forecasts/v1/daily/5day/`;

interface Props {
  newWeather: Function;
}

export default function SearchInput(props: Props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [capture, setCapture] = useState<Capture>();
  const [input, setInput] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const { data = [], isError } = useFetchCitiesQuery(input);

  const onChangeInput = useMemo(
    () =>
      _.debounce((e) => {
        let res = /^[a-zA-Z ]+$/.test(e.target.value);
        if (res) {
          return setInput(e.target.value);
        } else {
          return showSnackBar(
            enqueueSnackbar,
            action,
            'English letters please'
          );
        }
      }, 500),
    []
  );

  useEffect(() => {
    //handles the rendering of the searched item
    const controller = new AbortController();
    if (capture) {
      getRequest(forecastsUrl + capture.Key + apiKey, {
        setData: props.newWeather,
        action: action,
        enqueueSnackbar: enqueueSnackbar,
        page: 'searchComponent',
        capture: capture,
        cancelToken: controller.signal,
      });
    }
    return () => {
      controller.abort();
    };
  }, [capture]);

  //cleanup of debounce
  useEffect(() => {
    return () => {
      onChangeInput.cancel();
    };
  }, []);

  const handleClick = (event: any, value: any, reason: any) => {
    if (reason === 'selectOption') {
      setCapture(value);
      setSearchParams('selectedFavoriteKey', { replace: true, state: '' });
    }
  };

  const testInput = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onChangeInput(e);
  };

  //snackbar button
  const action = (key: any) =>
    enqueueAction({ key: key, closeSnackbar: closeSnackbar });

  return (
    <>
      <Stack spacing={2} sx={{ width: 300 }}>
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          onChange={handleClick}
          getOptionLabel={(data: AutoComplete) =>
            data.LocalizedName ? data.LocalizedName : ''
          }
          options={
            !isNull(data) && data!.length > 0
              ? data
              : [
                  {
                    ErrorMessage: isError
                      ? 'Couldnt Fetch, check the apikey'
                      : 'Type a city name...',
                  },
                ]
          }
          isOptionEqualToValue={(option, value) =>
            option.Country.LocalizedName === value.Country.LocalizedName
          }
          renderOption={(props: any, data: AutoComplete) => (
            <Button
              disabled={
                data.ErrorMessage === 'Couldnt Fetch, check the apikey' ||
                data.ErrorMessage === 'Type a city name...'
                  ? true
                  : false
              }
              {...props}
              key={
                data.ErrorMessage
                  ? data.ErrorMessage
                  : `${data.Country.LocalizedName} - ${data.LocalizedName}`
              }
            >
              {data.ErrorMessage
                ? data.ErrorMessage
                : `${data.Country.LocalizedName} - ${data.LocalizedName}`}
            </Button>
          )}
          renderInput={(params) => (
            <TextField
              onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) =>
                testInput(e)
              }
              {...params}
              label="Search location"
            />
          )}
        />
      </Stack>
    </>
  );
}
