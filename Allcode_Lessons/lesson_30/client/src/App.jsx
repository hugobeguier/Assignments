import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [file, setFile] = useState('');
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  const getImages = async () => {
    console.log("GET IMAGES");
    try {
      const response = await axios.get("http://localhost:4000/api/get-images");
      
      if (response.data.images) {
        setImages(response.data.images);
      }

    } catch (error) {
      setError("Sometihng went wrong fetching the images.");
      console.log(error);
    }

  }

  const uploadFile = async () => {

    const formData = new FormData();
    formData.append('file', file);

    try {

      const response = await axios.post("http://localhost:4000/api/upload-image", formData);

      if (response.data.success) {
        getImages();
        setSuccess(response.data.success);
      } else if (response.data.error) {
        setError(response.data.error);
      }

    } catch (error) {
      console.log(error);
      setError("Something went wrong with the file upload");
    }
  };

  useEffect(() => {
    getImages();
  }, []);


  return (
    <>
      <main className="flex flex-col gap-12 min-h-screen bg-gray-950 p-12">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-2xl font-semibold text-white">Upload an image!</h1>
          {success ? <p className="bg-green-500 text-white p-4 rounded-xl">{success}</p> : null}
          {error ? <p className="bg-red-500 text-white p-4 rounded-xl"> {error}</p> : null}
          <input type="file" onChange={handleFileChange} className="border rounded-xl w-[11rem] text-white" />
          <button onClick={uploadFile} className="bg-blue-500 text-white py-2 px-4 rounded-xl w-[10rem] hover:bg-blue-400">
            Upload
          </button>
        </div>

        <div className="grid gird-cols-3 gap-6">

          {images.map((image, index) => (
            <div key={index} className="relative" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
              <img src={"http://localhost:4000" + image.filePath} className="border-2 border-gray-600 object-cover w-full h-[20rem]" />
              {hoveredIndex === index && (<button className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded shadow">Remove</button>)}
            </div>
          ))}
        </div>  
      </main>
    </>
  );
}

export default App;
