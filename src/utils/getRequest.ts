import axios, { Axios, AxiosError } from 'axios';
import { DailyForecast } from '../types/5dayForeCast';
import { Capture } from '../types/Capture';
interface Options {
  setData?: Function;
  enqueueSnackbar?: Function;
  action?: Function;
  intermidiate?: boolean;
  //city captured in fav screen and passed to weather screen
  capture?: Capture;
  page?:
    | 'favorites'
    | 'weather'
    | 'searchComponent'
    | 'favweatheritemComponent';
}

/**
 * axios get wrapper
 */
const getRequest = (url: string, options: Options) => {
  axios
    .get(url)
    .then((res) => {
      console.log('res.data', res.data);
      if (options.page === 'searchComponent') {
        const dataToSave = {
          foreCast: res.data,
          key: options.capture.Key,
          city: options.capture.LocalizedName,
        };
        return options.setData((prev: any) => (prev = dataToSave));
      }

      if (options.page === 'weather') {
        return options.setData(
          (prevState: DailyForecast) => (prevState = res.data.DailyForecasts)
        );
      }

      if (options.page === 'favweatheritemComponent') {
        return options.setData((prevData: any) => (prevData = res.data[0]));
      }

      return options.setData((prevData: any) => (prevData = res.data));
    })
    .catch((err: AxiosError) => {
      console.clear();
      options.enqueueSnackbar("Couldn't fetch data" + err.message, {
        variant: 'warning',
        preventDuplicate: true,
        action: options.action,
      });
    });
};

export default getRequest;
