/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faBackward } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { SERVER_API } from "../constants/constants";
import Toast from "../components/Toast";
import { toastError, toastSuccess } from "../utils/toastUtils";
import { useNavigate } from "react-router-dom";
import URLModal from "../components/URLModal";
import { Button, Checkbox, Table } from "react-daisyui";
import { useURL } from "../contexts/URLContexts";

const URLList: React.FC = () => {
  const { getUrlList, urls } = useURL();
  const [error, setError] = useState<string>();
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [url, setUrl] = useState<
    { originalUrl: string; slug: string } | undefined
  >(undefined);
  const navigate = useNavigate();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    getUrlList();
  }, []);

  useEffect(() => {
    if (error) toastError(error);
  }, [error]);

  const handleCheck = (value: string, checked: boolean) => {
    setCheckedList((prevList) =>
      checked ? [...prevList, value] : prevList.filter((item) => item !== value)
    );
  };

  const closeModal = () => {
    ref.current?.close();
  };

  const handleShow = useCallback(
    (originalUrl: string, slug: string) => {
      setUrl({ originalUrl, slug });
      ref.current?.showModal();
    },
    [ref]
  );

  const URLTable = useMemo(() => {
    return urls?.map((url, u_index) => {
      return (
        <Table.Row key={`url_${u_index}`}>
          <Checkbox
            className="text-md"
            onChange={(e) => handleCheck(url.id, e.target.checked)}
          />
          <p className="">{u_index + 1}</p>
          <p className="whitespace-nowrap overflow-x-auto w-80">
            {url.attributes.originalUrl}
          </p>
          <a
            href={url.attributes.slug}
            target="_blank"
            className="underline"
            rel="noopener noreferrer"
          >
            {window.location.origin}/{url.attributes.slug}
          </a>
          <p className="w-5">{url.attributes.visits}</p>
          <Button
            color="ghost"
            size="sm"
            onClick={() =>
              handleShow(url.attributes.originalUrl, url.attributes.slug)
            }
          >
            update
          </Button>
        </Table.Row>
      );
    });
  }, [handleShow, urls]);

  const handleDelete = async (urlIds: string[]) => {
    try {
      const response = await axios.delete(`${SERVER_API}/url/delete`, {
        data: urlIds,
      });
      toastSuccess(
        `${response.data.meta.deletedCount} URLs are deleted successfully.`
      );
      setCheckedList([]);
      getUrlList();
    } catch (err: any) {
      setError(err.response.data.error.detail);
    }
  };

  return (
    <div className="list">
      <div className="flex justify-around items-center my-5">
        <Button size="sm" onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faBackward} />
          back
        </Button>
        <div className="text-4xl">URL LIST</div>
        <Button
          size="sm"
          disabled={checkedList.length === 0}
          onClick={() => handleDelete(checkedList)}
        >
          delete
        </Button>
      </div>
      <div className="overflow-x-auto w-screen max-w-[60rem] px-5">
        {urls?.length === 0 ? (
          <div className="text-center my-20 w-full">
            <h2 className="text-4xl font-bold text-red-600">
              There are no URLs
            </h2>
            <p className="text-lg mt-3">
              Please go back to the home and create the short URL.
            </p>
          </div>
        ) : (
          <Table>
            <Table.Head>
              <span className="flex justify-center">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span>No</span>
              <span>Long URL</span>
              <span>Shortened URL</span>
              <span>Visits</span>
              <span></span>
            </Table.Head>
            <Table.Body>{URLTable}</Table.Body>
            <Table.Footer>
              <span className="flex justify-center">
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span>No</span>
              <span>Long URL</span>
              <span>Shortened URL</span>
              <span>Visits</span>
              <span></span>
            </Table.Footer>
          </Table>
        )}
      </div>
      <Toast />
      <URLModal ref={ref} url={url} close={closeModal} />
    </div>
  );
};

export default URLList;
