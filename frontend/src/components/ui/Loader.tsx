const Loader = () => {
    return (
      <div className="flex space-x-2 justify-center items-center h-full">
        <span className="sr-only">Loading...</span>
        <div className="size-4 bg-white rounded-full animate-bounce [animation-delay:-0.2s]"></div>
        <div className="size-4 bg-white rounded-full animate-bounce [animation-delay:-0.10s]"></div>
        <div className="size-4 bg-white rounded-full animate-bounce"></div>
      </div>
    );
  };
  
  export default Loader;