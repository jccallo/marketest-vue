import { ref } from "vue";
import useApi from "../composables/useApi";

const useConverter = () => {
  const { currency, rate } = useApi();

  let myHeaders = new Headers();
  myHeaders.append("apikey", "4uydvQWQ7OlnqpHBRNTtnc5LQHOQYlLX");

  let requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const getRate = async (to) => {
    await fetch(`https://api.apilayer.com/fixer/convert?to=${to}&from=pen&amount=1`, requestOptions)
    .then(response => response.text())
    .then(result => JSON.parse(result))
    .then(json => {
      rate.value = json.info.rate;
      currency.value = json.query.to;
    })
    .catch(error => console.log('error', error));
  };

  const convert = (amount) => {
    return (rate.value * parseFloat(amount)).toFixed(2);
  };

  return {
    getRate,
    rate,
    currency,
    convert,
  };
};

export default useConverter;