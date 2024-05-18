import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import SearchBar from "../searchBar/SearchBar";
import ImageGallery from "../imageGallery/ImageGallery";
import ImageModal from "../imageModal/ImageModal";
import Loader from "../loader/Loader";
import ErrorMessage from "../errorMessage/ErrorMessage";
import LoadMoreBtn from "../loadMoreBtn/LoadMoreBtn";
import { Image, ServerResponse } from "../../Types.ts";

import { Toaster } from "react-hot-toast";

import "./App.css";

function App() {
  const [images, setImages] = useState<Image[] | null>(null);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  const fetchImages = async (
    searchQuery: string,
    numPage: number
  ): Promise<Image[]> => {
    try {
      setLoading(true);
      const res: AxiosResponse<ServerResponse> = await axios.get(
        `https://api.unsplash.com/search/photos?page=${numPage}&query=${searchQuery}`,
        {
          headers: {
            Authorization:
              "Client-ID Ph4PpdJNR_bfnGbfoO28ljpqE_IueaOsvzxI3HR8ys0",
          },
        }
      );
      return res.data.results.slice(0, 9) as Image[];
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (query !== "") {
          const newImages = await fetchImages(query, page);
          setImages((prevImages: Image[] | null) => {
            if (prevImages === null) {
              return newImages;
            } else {
              return [...prevImages, ...newImages];
            }
          });
        }
      } catch (error) {
        setError("An unknown error occurred.");
      }
    };

    fetchData();
  }, [query, page]);

  function handleSubmit(searchQuery: string): void {
    setQuery(searchQuery);
    setError(null);
    setPage(1);
    setImages([]);
  }

  const handleLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const modalOpen = (photo: Image): void => {
    setSelectedImage(photo);
    setModalIsOpen(true);
  };

  const closeModal = (): void => {
    setModalIsOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {error ? (
        <ErrorMessage message={error} />
      ) : images ? (
        <>
          <ImageGallery images={images} openModal={modalOpen} />
          {images.length > 0 && !error && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      ) : null}
      {modalIsOpen && selectedImage && (
        <ImageModal
          image={selectedImage}
          openModal={modalIsOpen}
          closeModal={closeModal}
        />
      )}
      {loading && <Loader />}
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;