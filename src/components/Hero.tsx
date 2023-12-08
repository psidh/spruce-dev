export default function Hero() {
  const backgroundImageUrl = 'url("/home.jpeg")';

  return (
    <div className="flex-col px-20 py-12">
      <div>
        <h1 className="text-6xl mb-32 text-center font-semibold">
          Shovel Operator
        </h1>
      </div>
      <div className="flex justify-between items-start">
        <img src="/home.jpg" alt="Home" className="w-[45%] h-[45%] rounded-lg" />
        <div className="text-justify w-1/2 px-6">
          <h2 className='text-3xl mb-8  font-normal'>Lorem ipsum dolor</h2>
          <p className='text-justify my-4 leading-8'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum</p>
          <p className='text-justify my-4 leading-8'> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum</p>
        </div>
      </div>
    </div>
  );
}
