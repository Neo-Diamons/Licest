import React, { useEffect } from "react";
import Status from "../types/status";
import './CardsSettings.css';

interface ChildProps {
  open: boolean;
  setOpen: (newValue: boolean) => void;
}

export const CardsSettings = ({open, setOpen}: ChildProps) => {
  const [listData, setListData] = React.useState<Status[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("name") === "" || data.get("image-url") === "" || data.get("status") === "" || isNaN(Number(data.get("season")))) {
      return;
    }

    fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/cards`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.get('name'),
        image: data.get('image-url'),
        season: data.get('season'),
        publish: data.get('publish'),
        status_id: data.get('status')
      }),
    })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));

    setOpen(!open);
  }

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/status`, {
        method: "GET"
      })
          .then(res => res.json())
          .then(json => setListData(json))
          .catch(err => console.log(err));
    }

    fetchData()

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(!open);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [open, setOpen]);

  return (
    <div className="CardsSettings-background">
      <div className="CardsSettings">
        <div className="CardsSettings-header">
          <h2>Create Card</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="CardsSettings-settings">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" />
          </div>
          <div className="CardsSettings-settings">
            <label htmlFor="image-url">Image url</label>
            <input type="text" name="image-url" />
          </div>
          <div className="CardsSettings-settings">
            <label htmlFor="image-url">Season</label>
            <input type="text" name="season" />
          </div>
          <div className="CardsSettings-settings">
            <label htmlFor="image-url">Publish</label>
            <input type="text" name="publish" />
          </div>
          <div className="CardsSettings-settings">
            <label htmlFor="status">Status</label>
            <select name="status" id="status">
              {listData.map((status) => (
                  <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}
