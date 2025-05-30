import React, { useEffect } from 'react';
import { Modal } from './Modal';
import 'regenerator-runtime/runtime';

interface LinkContainerProps {
  data: AppState;
  setData: React.Dispatch<React.SetStateAction<AppState>>;
}

const LinkContainer: React.FC<LinkContainerProps> = ({ data, setData }) => {
  useEffect(() => {
    toggleScrollLock();
  }, [data]);

  const fetchSchemaPG = (uri) => {
    fetch('/db/pg/sdl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uri: uri }),
    })
      .then(async (response) => {
          let json = null;
        try {
          json = await response.json();
        } catch {
          json = null;
        }
        return json;
      })
      .then((response) => {
        setData({ ...data, link: uri, modal: false, schema: response.schema, tables: response.tables });
      });
  };

  const onSubmit = async (event) => {
    event.preventDefault(event);
    console.log('onSubmit', event.target.link.value);
    if (event.target.link.value.trim() !== '') {
      fetchSchemaPG(event.target.link.value);
    }
  };

  const fetchSchemaMySQL = (host, user, password, database) => {
    fetch('/db/mySQL/sdl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ host, user, password, database }),
    })
      .then((response) => response.json())
      .then((response) => {
        setData({ link: '', modal: false, schema: response.schema, d3Data: response.d3Data });
      });
  };

  const onSubmitMySQL = async (event) => {
    event.preventDefault(event);
    const { host, user, password, database } = event.target;
    // if (event.target.link.value.trim() !== '') {
    //   fetchSchemaPG(event.target.link.value);
    // }
    fetchSchemaMySQL(host.value, user.value, password.value, database.value);
  };

  const onSubmitSample = async (event) => {
    event.preventDefault(event);
    fetch('/db/pg/sdl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uri: 'postgres://koyeb-adm:npg_eC3dP6qlZIbU@ep-broad-fog-a2tpr30m.eu-central-1.pg.koyeb.app/koyebdb',
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setData({
          ...data,
          link: 'postgres://koyeb-adm:npg_eC3dP6qlZIbU@ep-broad-fog-a2tpr30m.eu-central-1.pg.koyeb.app/koyebdb',
          modal: false,
          schema: response.schema,
          tables: response.tables,
        });
      });
  };

  const closeModal = () => {
    setData({ ...data, modal: false });
  };

  const toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };

  return (
    <React.Fragment>
      {data.modal ? (
        <Modal onSubmit={onSubmit} onSubmitMySQL={onSubmitMySQL} onSubmitSample={onSubmitSample} closeModal={closeModal} />
      ) : null}
    </React.Fragment>
  );
};

export default LinkContainer;
