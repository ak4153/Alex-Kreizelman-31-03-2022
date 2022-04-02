interface Weather {
  Key: string;
  Category: string;
  Text: string;
  EffectiveDate: string;
  LocalizedName: string;
  DailyForecasts: [
    {
      Temperature: { Minimun: { Value: string }; Maximum: { Value: string } };
      Date: string;
      Day: {
        Icon: number;
        IconPhrase: string;
      };
    }
  ];
}
export default Weather;
