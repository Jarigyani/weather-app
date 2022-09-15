import { FC, useState } from 'react';
import useSWR from 'swr';
import Weather from './Weather';

type Props = {
  country: string;
  className: string;
};
const Selector: FC<Props> = (props) => {
  const fetcher = (url: string) =>
    fetch(url).then((res) =>
      res.json().then((result) => {
        setLoc(`lat=${result[0].lat}&lon=${result[0].lon}`);
        setName(result[0].name);
        return 1;
      })
    );

  const [loc, setLoc] = useState<string>('');
  const [name, setName] = useState<string>('');
  const { data, error } = useSWR(
    `${import.meta.env.VITE_OW_GEO_API_URL}/direct?q=${props.country}&appid=${
      import.meta.env.VITE_OW_API_KEY
    }`,
    fetcher
  );

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div></div>;

  return <Weather name={name} loc={loc} className={props.className} />;
};
export default Selector;
