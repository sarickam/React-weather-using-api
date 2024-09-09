import { toast } from 'react-toastify';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  let [city, setCity] = useState('');
  let [wDetails, setWdetails] = useState();
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState('');
  let [counter, setCounter] = useState(1);

  let getData = (event) => {
    event.preventDefault();
    if (!city.trim()) {
      toast.error('City name cannot be empty');
      setWdetails(undefined);
      return;
    }

    setIsLoading(true);
    setError('');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=37c4219616f4131f53c32f751ddc0512&units=metric`)
      .then((res) => res.json())
      .then((FinalRes) => {
        if (FinalRes.cod === "404") {
          setWdetails(undefined);
          toast.error('City not found');
        } else {
          setWdetails(FinalRes);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError('An error occurred while fetching the data');
      });

    setCity('');
  };

  let changeCounter = () => {
    setCounter(counter + 1)
  }
  useEffect(() => {
    console.log("Api called..")
  }, [counter])
  return (
    <div className='w-[100%] h-[100vh] bg-[#478edf]'>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px] text-white'>Simple Weather App</h1>

        <form onSubmit={getData}>
          <input type='text' value={city} onChange={(e) => setCity(e.target.value)} className='w-[300px] h-[40px] pl-3' placeholder='City Name' />
          <button className="bg-[#2323cc] text-white py-2 px-4 rounded hover:bg-blue-600" onClick={changeCounter}>Submit</button>
        </form>

        <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>
          <img src='https://i.pinimg.com/originals/44/0b/9d/440b9dc08fefeff13ec30dc0ae6a09df.gif'
            width={80} height={80} className={`absolute left-[40%] top-[0] ${isLoading ? '' : 'hidden'} `} alt='loading-image' />
          {wDetails !== undefined
            ?
            <>

              <h3 className='font-bold text-[30px]'>{wDetails.name}<span className='bg-[yellow]'>{wDetails.sys.country}</span></h3>
              <h2 className='font-bold text-[40px]'>{wDetails.main.temp}</h2>
              <img src={`http://openweathermap.org/img/w/${wDetails.weather[0].icon}.png`} alt='img' />
              <p>{wDetails.weather[0].description}</p>

            </>
            :
            "No Data Found"
          }

        </div>
      </div>
    </div>
  );
}

export default App;
