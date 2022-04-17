import axios, { AxiosError } from 'axios';
import { NewWeather } from '../types/NewWeather';
import { Capture } from '../types/Capture';
//types
import Location from '../types/Location';
import CurrentWeather from '../types/CurrentWeather';
interface Options {
  setData?: Function;
  enqueueSnackbar?: Function;
  action?: Function;
  intermidiate?: boolean;
  //city captured in fav screen and passed to weather screen
  capture?: Capture;
  keyAndCity?: { key: number; city: string };
  page?:
    | 'favorites'
    | 'weather'
    | 'searchComponent'
    | 'favweatheritemComponent'
    | 'favweatheritemComponent_setLocation';
}

/**
 * axios ".get" wrapper
 */
const getRequest = (url: string, options: Options) => {
  axios
    .get(url)
    .then((res) => {
      if (options.page === 'searchComponent') {
        const dataToSave = {
          foreCast: res.data,
          key: options.capture.Key,
          city: options.capture.LocalizedName,
        };
        return options.setData((prev: any) => (prev = dataToSave));
      }
      if (options.page === 'weather') {
        const dataToSave = {
          foreCast: res.data,
          key: options.keyAndCity.key,
          city: options.keyAndCity.city,
        };
        return options.setData(
          (prevState: NewWeather) => (prevState = dataToSave)
        );
      }

      if (options.page === 'favweatheritemComponent') {
        return options.setData(
          (prevData: CurrentWeather) => (prevData = res.data[0])
        );
      }
      if (options.page === 'favweatheritemComponent_setLocation') {
        return options.setData((prevData: Location) => (prevData = res.data));
      }
    })
    .catch((err: AxiosError) => {
      // console.clear();
      options.enqueueSnackbar('Error: ' + err.message, {
        variant: 'warning',
        preventDuplicate: true,
        action: options.action,
      });
    });
};

export default getRequest;
