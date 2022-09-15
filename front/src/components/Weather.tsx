import { FC, useEffect, useState } from 'react';
import useSWR from 'swr';
import dayjs from 'dayjs';

type Props = {
  name: string;
  loc: string;
  color: string;
};

const Weather: FC<Props> = (props) => {
  const color = props.color;
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const loc = props.loc;

  const { data, error } = useSWR(
    `${import.meta.env.VITE_OW_API_URL}/weather?${loc}&appid=${
      import.meta.env.VITE_OW_API_KEY
    }`,
    fetcher
  );

  if (error) return <div>An error has occurred.</div>;
  if (!data) {
    return (
      <div>
        <svg
          className='animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      </div>
    );
  }

  console.log(color);

  return (
    <div
      className={`w-96 h-56 m-auto rounded-xl shadow-2xl bg-gradient-to-bl from-blue-500 to-blue-300 transform hover:scale-110 transition-transform duration-300 text-white relative`}
    >
      <div className='w-full px-8 absolute top-6'>
        <div className='flex justify-between'>
          <div>
            <p className='font-light'>City Name</p>
            <p className='text-lg font-medium tracking-widest'>{props.name}</p>
          </div>
          <div>
            <img
              src={`${import.meta.env.VITE_OW_ICON_URL}/${
                data.weather[0].icon
              }.png`}
              alt='weather icon'
            />
          </div>
        </div>
        <div className='pt-2'>
          <p className='font-light'>Weather Condition</p>
          <p className='text-lg font-medium tracking-widest'>
            {data.weather[0].main}
          </p>
        </div>
        <div className='pt-6 pr-6'>
          <div className='flex justify-between'>
            <div>
              <p className='font-light text-xs'>Date</p>
              <p className='font-bold tracking-more-wider text-sm'>
                {dayjs(data.ts).format('YYYY-MM-DD')}
              </p>
            </div>
            <div>
              <p className='font-light text-xs'>Temprature</p>
              <p className='font-bold tracking-more-wider text-sm'>
                {Math.round(data.main.temp - 273)}°C
              </p>
            </div>
            <div>
              <p className='font-light text-xs'>Humidity</p>
              <p className='font-bold tracking-more-wider text-sm'>
                {data.main.humidity}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Weather;
