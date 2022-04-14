import { useEffect, useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import { Button } from '@mui/material';
import _, { isNull } from 'lodash';
import urls from '../assets/urls.json';
import { useSnackbar } from 'notistack';
import { Store } from '../Store/Provider';

//<Types>
import { AutoComplete } from '../types/AutoCompleteType';
import { Capture } from '../types/Capture';
//</Types>
import getRequest from '../utils/getRequest';
import enqueueAction from '../utils/enqueueAction';
import showSnackBar from '../utils/showSnackBar';
import { useSearchParams } from 'react-router-dom';
//<redux >
import { useFetchCitiesQuery } from '../reduxSlices/weather';
//</redux>
const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = urls.baseUrl;
const forecastsUrl = `${baseUrl}/forecasts/v1/daily/5day/`;
const autocompleteUrl = `${baseUrl}/locations/v1/cities/autocomplete${apiKey}&q=`;

interface Props {
  setCityWeather: Function;
}

export default function SearchInput(props: Props) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const [data, setData] = useState<AutoComplete[]>([]);
  const [capture, setCapture] = useState<Capture>();
  const [input, setInput] = useState<string>('');
  const { dispatch } = useContext(Store);
  const [searchParams, setSearchParams] = useSearchParams();
  //~~~~~~~~~~~~~~~~redux related
  const { data = [], isFetching, isError } = useFetchCitiesQuery(input);

  //~~~~~~~~~~~~~~~~redux related

  useEffect(() => {
    if (capture) {
      getRequest(forecastsUrl + capture.Key + apiKey, {
        setData: props.setCityWeather,
        action: action,
        enqueueSnackbar: enqueueSnackbar,
        page: 'searchComponent',
        capture: capture,
      });
    }
  }, [capture]);

  const handleClick = (event: any, value: any, reason: any) => {
    if (reason === 'selectOption') {
      setCapture(value);
      setSearchParams('selectedFavoriteKey', { replace: true, state: '' });
    }
  };

  const onChangeInput = _.debounce((e) => {
    let res = /^[a-zA-Z ]+$/.test(e.target.value);
    if (res) {
      return setInput(e.target.value);
    } else {
      return showSnackBar(enqueueSnackbar, action, 'English letters please');
    }
  }, 500);

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
                    Country: {
                      LocalizedName: isError
                        ? 'Couldnt Fetch, check the apikey'
                        : 'Type a city name...',
                    },
                  },
                ]
          }
          isOptionEqualToValue={(option, value) =>
            option.Country.LocalizedName === value.Country.LocalizedName
          }
          renderOption={(props: any, data: AutoComplete) => (
            <Button
              disabled={
                data.Country.LocalizedName ===
                  'Couldnt Fetch check the apikey' ||
                data.Country.LocalizedName === 'Type a city name...'
                  ? true
                  : false
              }
              {...props}
              key={Math.random()}
            >
              {data.Country.LocalizedName} - {data.LocalizedName}
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
